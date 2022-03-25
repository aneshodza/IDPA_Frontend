import { Alert, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Backdrop, CircularProgress } from "@mui/material";
import { addDoc, collection, doc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../base/firebase"
import { useAuth } from "../contexts/AuthProvider"

export default function CreateGame() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState("none")

    //General Vars
    const currentUser = useAuth()
    let navigate = useNavigate()

    function fillInValuesIfExist() {

    }


    async function createGame() {
        if (title === "") {
            setAlert("title")
            return
        }
        if (text === "") {
            setAlert("text")
            return
        }
        setLoading(true)
        let docRef = await addDoc(collection(db, `teachers/${currentUser.currentUser.uid}/games`), {
            title: title,
            text: text,
            lastModified: new Date().toLocaleDateString("en-ZA", { year: 'numeric', month: '2-digit', day: '2-digit' })
        })
        console.log("Doc added:", docRef.id)
        setLoading(false)
        navigate("/teacher/dashboard", { state: { type: "success", message: title + " was successfully created!" } })
    }

    useState(() => {
        fillInValuesIfExist()
    }, [])
    return (
        <>
            <Container maxWidth={"none"}>
                <header>
                    <Button variant="outlined" onClick={() => setDialogOpen(true)}>Back to Dashboard</Button>
                </header>
            </Container>
            <Container maxWidth="lg">
                <h3>Fill out Details of the Game</h3>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField className="input" label="Please enter name of the game" value={title} onChange={e => setTitle(e.target.value)} />
                        {alert === "title" && <Alert severity="error">You must define a valid name!</Alert>}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField className="input" multiline minRows={10} maxRows={30} value={text} onChange={e => setText(e.target.value)} placeholder="The name of the character with the red hat is _john johnson_. " label="Please Enter text of the game" />
                        {alert === "text" && <Alert severity="error">You must define a valid text!</Alert>}
                        <Alert severity="info">
                            Keywords for the crossword should be entered like this: <em>_Keyword_</em><br />
                            Keywords will be replaced by ocothorps: <em>"text _keyword_ text" --`&gt;` "text #### text"</em> <br />
                            Spaces can be entered normally and will be replaced by a hyphen: <em>"_Müller Meier_" --`&gt;` "Müller-Meier"</em>
                        </Alert>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Button className="input" variant="contained" color="danger" onClick={() => setDialogOpen(true)}>Abort</Button>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Button className="input" variant="contained" onClick={createGame}>Save</Button>
                    </Grid>
                </Grid>
            </Container>
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            >
                <DialogTitle>{"Are you sure you want to abort?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If you abort and go back to the dashboard, all changes will be lost!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="danger" onClick={() => navigate("/teacher/dashboard")}>Go to Dashboard</Button>
                    <Button variant="contained" onClick={() => setDialogOpen(false)}>Stay here</Button>
                </DialogActions>
            </Dialog>
            <Backdrop
                sx={{ color: '#fff', zIndex: 100 }}
                open={loading}
                onClick={() => { }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}