import { Button, Container, Grid, Input, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/loginStyle.css"
import "../styles/background.css"


export default function WelcomePage() {
    let navigate = useNavigate()
    
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
                    <Grid item xs={12} lg={12}>
                        <TextField className="input" label="Enter Code" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <Button className="enterButton" variant="contained" size="Large" >Enter</Button>
                    </Grid>
                </Grid>
            </Container>
            </main>
        </>
    )
}