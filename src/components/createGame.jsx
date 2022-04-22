import { Alert, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Backdrop, CircularProgress, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { addDoc, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../base/firebase"
import { useAuth } from "../contexts/AuthProvider"

export default function CreateGame(props) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState("none")
    const [type, setType] = useState(1)
    const [questions, setQuestions] = useState([{ q: '', a: '' }])

    console.log(props)

    //General Vars
    const currentUser = useAuth()
    let navigate = useNavigate()

    useEffect(() => {
        if (!props.create) {
            getDoc(doc(db, `teachers/${currentUser.currentUser.uid}/games/${decodeURIComponent(window.location.href.split('/')[window.location.href.split('/').length - 1])}`))
                .then(data => {
                    let pulled = data.data()
                    console.log(pulled)
                    setTitle(pulled.title)
                    if (pulled.type === 1) {
                        setText(pulled.text)
                    } else {
                        setQuestions(pulled.questions)
                    }
                    setType(pulled.type)
                })
        }
    }, [])

    function fillInValuesIfExist() {

    }


    async function createCourse() {
        if (title === "") {
            setAlert("title")
            return
        }
        if (type === 1) {
            if (text === "") {
                setAlert("text")
                return
            }
        } else {
            let l = questions.filter(question => question.q !== '' && question.a !== '').length
            if (l === 0) {
                setAlert("questions")
                return
            }
        }
        setLoading(true)
        let docRef = ''
        console.log(props.create)
        if (props.create) {
            docRef = await addDoc(collection(db, `teachers/${currentUser.currentUser.uid}/games`), {
                true: true
            })
            docRef = docRef.id
            console.log(docRef)
        } else {
            docRef = decodeURIComponent(window.location.href.split('/')[window.location.href.split('/').length - 1])
        }
        console.log(docRef)
        let course = {
            title: title,
            lastModified: new Date().toLocaleDateString("en-ZA", { year: 'numeric', month: '2-digit', day: '2-digit' }),
            uid: docRef,
            type: type
        }
        if (type === 1) {
            course['text'] = text
        } else {
            course['questions'] = questions
        }
        await setDoc(doc(db, `teachers/${currentUser.currentUser.uid}/games/${docRef}`), course)
        
        setLoading(false)
        if (props.create) {
            navigate("/teacher/dashboard", { state: { type: "success", message: title + " was successfully created!"} })
        } else {
            navigate("/teacher/dashboard", { state: { type: "success", message: title + " was successfully edited!"} })
        }
    }

    const changeQuestion = (what, value, index) => {
        console.log(what, value, index)
        let temp = questions
        if (what === 'q') {
            temp[index].q = value
        } else {
            temp[index].a = value
        }
        console.log(temp)
        setQuestions(temp)
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
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" value={type}>Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                                onChange={(e) => setType(e.target.value)}
                            >
                                <MenuItem value={1}>Gap text</MenuItem>
                                <MenuItem value={2}>Questions</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {type === 1 ?
                        <Grid item xs={12}>
                            <TextField className="input" multiline minRows={10} maxRows={30} value={text} onChange={e => setText(e.target.value)} placeholder="The name of the character with the red hat is _john johnson_. " label="Please Enter text of the game" />
                            {alert === "text" && <Alert severity="error">You must define a valid text!</Alert>}
                            <Alert severity="info">
                                Keywords for the crossword should be entered like this: <em>_Keyword_</em><br />
                                Keywords will be replaced by ocothorps: <em>"text _keyword_ text" --`&gt;` "text #### text"</em> <br />
                                Spaces can be entered normally and will be replaced by a hyphen: <em>"_Müller Meier_" --`&gt;` "Müller-Meier"</em>
                            </Alert>
                        </Grid>
                        :
                        <Grid item xs={12}>
                            {
                                questions.map((question, idx) =>
                                    <Grid container spacing={2} style={{ marginTop: '0px' }}>
                                        <Grid item xs={6}>
                                            <TextField label="Question" fullWidth value={questions[idx].q} onChange={(e) => {
                                                let tempArr = [...questions]
                                                tempArr[idx].q = e.target.value
                                                setQuestions(tempArr)
                                            }} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Awnser" fullWidth value={questions[idx].a} onChange={(e) => {
                                                let tempArr = [...questions]
                                                tempArr[idx].a = e.target.value
                                                setQuestions(tempArr)
                                            }} />
                                        </Grid>
                                    </Grid>
                                )
                            }
                            <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }} onClick={() => setQuestions([...questions, { q: '', a: '' }])}>
                                <AddCircleOutlineOutlinedIcon />
                            </Grid>
                            {alert === "questions" && <Grid item xs={12} style={{ marginTop: '20px' }}><Alert severity="error">There are no questions!</Alert></Grid>}
                        </Grid>
                    }
                    <Grid item xs={6} md={2}>
                        <Button className="input" variant="contained" color="danger" onClick={() => setDialogOpen(true)}>Abort</Button>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Button className="input" variant="contained" onClick={() => createCourse()}>{props.create ? 'Save' : 'Edit'}</Button>
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