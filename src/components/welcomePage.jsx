import { Button, Container, Grid, Input, TextField } from "@mui/material";
import "../styles/welcomePage.css"


export default function WelcomePage() {
    return (
        <>
            <Container maxWidth="lg">
                <header>
                    <Button variant="outlined" >Teacher Login</Button>
                </header>
            </Container>
            <main>
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={8}>
                        <TextField className="input" label="Entry Code eingeben" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Button className="enterButton" variant="contained" size="Large">Enter</Button>
                    </Grid>
                </Grid>
            </main>
        </>
    )
}