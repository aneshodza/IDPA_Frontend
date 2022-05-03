import { Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate()
    return (
        <Container maxWidth="lg" style={{textAlign: "center", marginTop: "10%"}}>
            <h1>Unknown Website - 404</h1>
            <Button variant="contained" color="success" onClick={() => navigate("/")}>Back Home</Button>
        </Container>
    )
}