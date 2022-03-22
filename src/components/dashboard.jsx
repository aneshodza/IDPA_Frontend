import { Add, Dashboard as Dashboardicon, Person, Public } from "@mui/icons-material";
import { Container, Paper, Tab, Tabs, Box, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import "../styles/dashboard.css"
import Game from "./game";
import { useAuth } from "../contexts/AuthProvider"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
    const [tab, setTab] = useState("account")
    let currentUser = useAuth()
    let navigate = useNavigate()


    useEffect(() => {
    }, [])
    return (
        <>
            <Container maxWidth="lg">
                <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} >
                    <Tab value="account" label="Account" icon={<Person />} />
                    <Tab value="public" label="Public" icon={<Public />} disabled />
                </Tabs>
            </Container>
            <Container className="colorContainer" maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs="12" sm="6" lg="4">
                        <Button variant={"contained"} color="secondary" style={{ height: "100px", width: "100%" }} onClick={() => navigate("/teacher/createGame")}><Add></Add></Button>
                    </Grid>
                    <Grid item xs="12" sm="6" lg="4">
                        <Game title="English Game 1" />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
