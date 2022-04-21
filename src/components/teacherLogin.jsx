import { Alert, Button, CircularProgress, Container, Grid, Input, TextField, Backdrop } from "@mui/material";
import "../styles/loginStyle.css"
import { useAuth } from "../contexts/AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function TeacherLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { signin } = useAuth()
    const navigate = useNavigate()
    async function login() {
        if (!loading) {
            try {
                setLoading(true)
                let response = await signin(email, password)
                navigate("/teacher/dashboard")
            } catch (error) {
                console.log(error.message)
                if (error.message === "Firebase: Error (auth/invalid-email).") {
                    setError("Invalid Email")
                } else if (error.message === "Firebase: Error (auth/user-not-found).") {
                    setError("No user with this Email was Found")
                } else if (error.message === "Firebase: Error (auth/wrong-password).") {
                    setError("Wrong Password")
                } else {
                    setError(error.message)
                }
            } finally {
                setLoading(false)
            }
        }
    }
    return (<>
        <main>
            <Container maxWidth="xs">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {error && <Alert severity="error">{error}</Alert>}
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <TextField className="input" label="Enter Email" variant="outlined" type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <TextField className="input" label="Enter Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <Button className="enterButton" variant="contained" size="Large" onClick={login}>Enter</Button>
                    </Grid>
                </Grid>
            </Container>
        </main>
        <Backdrop
            sx={{ color: '#fff', zIndex: 100 }}
            open={loading}
            onClick={() => { }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    </>)
}