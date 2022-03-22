import { Alert, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateGame() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    let navigate = useNavigate()

    function fillInValuesIfExist() {

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
                    <Grid item xs={12} sm="6" md="4">
                        <TextField className="input" label="Please enter name of the game" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField className="input" multiline rows={15} maxRows={30} placeholder="The name of the character with the red hat is _john johnson_. " label="Please Enter text of the game" />
                        <Alert color="info">
                            Keywords for the crossword should be entered like this: <em>_Keyword_</em><br />
                            Keywords will be replaced by ocothorps: <em>"text _keyword_ text" --> "text #### text"</em> <br />
                            Spaces can be entered normally and will be replaced by a hyphen: <em>"_Müller Meier_" --> "Müller-Meier"</em>
                        </Alert>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Button className="input" variant="contained" color="danger" onClick={() => setDialogOpen(true)}>Abort</Button>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Button className="input" variant="contained">Save</Button>
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
        </>
    )
}