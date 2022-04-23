import { Backdrop, CircularProgress, Box } from "@mui/material"
import { setDoc, doc, getDoc, addDoc, collection, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { db } from "../base/firebase"
import { useAuth } from "../contexts/AuthProvider"

export default function GameLobby() {
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [players, setPlayers] = useState()
    const currentUser = useAuth()
    let crosswordData;
    let unsubscribe;

    async function createGame() {
        if (!location.state || !location.state.crosswordUID || !location.state.gameKey) {
            navigate("/teacher/dashboard", { state: { error: "critical error, game information missing" } }) //TODO Implement Error Handling on Dashboard
        }
        try {
            crosswordData = (await getDoc(doc(db, `teachers/${currentUser.currentUser.uid}/games/${location.state.crosswordUID}`))).data()
            console.log(crosswordData)

            //Data for the active Game
            let data = {
                teacherUID: currentUser.currentUser.uid,
                gameKey: location.state.gameKey,
                crosswordData: crosswordData.crossword,
                title: crosswordData.title,
            }
            if (crosswordData.questions) {
                data = { ...data, questions: crosswordData.questions }
            }
            if (crosswordData.text) {
                data = { ...data, text: crosswordData.text }
            }

            await setDoc(doc(db, `activeGame`, `${location.state.gameKey}`), data)
            await setDoc(doc(db, `activeGame/${location.state.gameKey}/players`, "invis"), {
                desc: "this only exists so the Collection is subscribable",
                invis: true
            })
            //Subscription to Players
            unsubscribe = onSnapshot(collection(db, `activeGame/${location.state.gameKey}/players`), (playersSnapshot) => {
                let tmpPlayers = []
                playersSnapshot.forEach((player) => tmpPlayers.push(player.data()))
                setPlayers(tmpPlayers.filter(p => !p.invis))
            })
        } catch (e) {
            console.log(e)
            navigate("/teacher/dashboard", { state: { error: "critical error, game creation failed" } })
        }
        setLoading(false)

    }

    useEffect(() => {
        createGame()
    }, [])
    return (
        <>
            Game Lobby
            {!loading && <p>{JSON.stringify(players)} </p>}
            <Backdrop
                sx={{ color: '#fff', zIndex: 100 }}
                open={loading}
                onClick={() => { }}>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <p>The game is being created, please wait a moment</p>
                    <CircularProgress color="inherit"></CircularProgress>
                </Box>
            </Backdrop>
        </>
    )
}