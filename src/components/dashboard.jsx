import { Add, Dashboard as Dashboardicon, Person, Public } from "@mui/icons-material";
import { Container, Paper, Tab, Tabs, Box, Grid, Button, Snackbar, Alert, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import "../styles/dashboard.css"
import Game from "./game";
import { useAuth } from "../contexts/AuthProvider"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../base/firebase"

export default function Dashboard(props) {
    const [tab, setTab] = useState("account")
    const [navigationNotivSnackbar, setNavigationNotivSnackbar] = useState(0)
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [isPublic, setIsPublic] = useState(false)
    let currentUser = useAuth()
    let navigate = useNavigate()
    const location = useLocation()

    async function loadGames(pullPublic) {
        setIsPublic(pullPublic)
        let querySnapshot
        if (pullPublic) {
            querySnapshot = await getDocs(collection(db, `teachers/public/games`))
        } else {
            querySnapshot = await getDocs(collection(db, `teachers/${currentUser.currentUser.uid}/games`))
        }
        let tmpGames = []
        querySnapshot.forEach(doc => tmpGames.push(doc.data()))
        setGames(tmpGames)
        setLoading(false)
    }

    useEffect(() => {
        if (location.state?.type === "success") {
            setNavigationNotivSnackbar(1)
        }
        loadGames(false)
    }, [])
    return (
        <>
            <Container maxWidth="lg">
                <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} >
                    <Tab value="account" label="Account" icon={<Person />} onClick={() => loadGames(false)}/>
                    <Tab value="public" label="Public" icon={<Public />} onClick={() => loadGames(true)}/>
                </Tabs>
            </Container>
            <Container className="colorContainer" maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Button variant={"contained"} color="primary" style={{ height: "100px", width: "100%" }} onClick={() => navigate("/teacher/createGame")}><Add></Add></Button>
                    </Grid>
                    {loading ?
                        [1, 2, 3, 4].map(i =>
                            <Grid item xs={12} sm={6} lg={4}>
                                <Skeleton key={i} variant="rectangular" className="gameContainer" />
                            </Grid>)
                        :
                        games.map(game =>
                            <Grid item xs={12} sm={6} lg={4}>
                                <Game title={game.title} uid={game.uid} isPublic={isPublic}/>
                            </Grid>)
                    }
                </Grid>
            </Container>
            <Snackbar open={navigationNotivSnackbar === 1} autoHideDuration={6000} onClose={() => setNavigationNotivSnackbar(0)}>
                <Alert severity="success" variant="filled">
                    {location.state?.message}
                </Alert>
            </Snackbar>
        </>
    )
}
