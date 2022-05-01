import { Alert, Backdrop, Button, CircularProgress, Container, Grid, Input, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/loginStyle.css"
//import "../styles/background.css"
import { db } from "../base/firebase";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";


export default function WelcomePage() {
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [gameKey, setGameKey] = useState("")
    const [error, setError] = useState("")

    async function joinGame() {
        if (gameKey.toString().length !== 6) {
            setError("The Key has to be 6 Digits long")
            return
        }
        setLoading(true)
        if (!(await getDoc(doc(db, `activeGame/${gameKey}`))).exists()) {
            setError("Invalid Key")
            setLoading(false)
            return
        }
        setError(false)
        setLoading(false)
        navigate(`/play/${gameKey}`, {state: {lobby: gameKey}})
    }

    return (
        <>
            <Container maxWidth={"none"}>
                <header>
                    <Button variant="outlined" onClick={() => navigate("/teacherLogin")}>Teacher Login</Button>
                </header>
            </Container>
            <main>
                <Container maxWidth="xs">
                    <Grid container spacing={2}>
                        {error && <Grid item xs={12}><Alert severity="error" >{error}</Alert></Grid>}
                        <Grid item xs={12} lg={12}>
                            <TextField className="input" label="Enter Code" variant="outlined" type={"number"} value={gameKey} onChange={e => setGameKey(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <Button className="enterButton" variant="contained" size="Large" onClick={joinGame} >Enter</Button>
                        </Grid>
                    </Grid>
                </Container>
            </main>
            <Backdrop
                sx={{ color: '#fff', zIndex: 100 }}
                open={loading}
                onClick={() => { }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}