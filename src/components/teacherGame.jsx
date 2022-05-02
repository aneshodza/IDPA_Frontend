import { Backdrop, Container, Grid, Button } from "@mui/material"
import { doc, getDoc, onSnapshot, collection, getDocs, deleteDoc, writeBatch, orderBy, limit, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { db } from "../base/firebase"
import Scoreboard from "./scoreboard"



export default function TeacherGame() {
    const location = useLocation()
    const navigate = useNavigate()
    const [gameData, setGameData] = useState({})
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)
    const [backdrop, setBackdrop] = useState(false)
    const [rangliste, setRangliste] = useState([])
    const [questions, setQuestions] = useState([])

    async function startup() {
        let temp = (await getDoc(doc(db, `activeGame/${location.state.gameKey}`))).data()
        console.log(temp)
        setGameData(temp)

        temp = []
        let a = await getDocs(collection(db, `activeGame/${location.state.gameKey}/players`))
        a.forEach((i) =>
            temp.push(i.data())
        )
        console.log("Players: ", temp.filter(p => !p.invis))
        setPlayers(temp.filter(p => !p.invis))

        let unsubscribe = onSnapshot(collection(db, `activeGame/${location.state.gameKey}/players`), (playersSnapshot) => {
            let tmpPlayers = []
            playersSnapshot.forEach((player) => tmpPlayers.push(player.data()))
            console.log(tmpPlayers)
            setPlayers(tmpPlayers.filter(p => !p.invis))
        })
        setLoading(false)
        for (let i = 0; i < gameData.questions; i++) {
            //TODO filter questions
            let tempQuestions = gameData.questions
            setQuestions(tempQuestions)
        }
        //TODO add Text filter 
        return unsubscribe
    }

    function endGame() {
        deleteDoc(doc(db, `activeGame/${location.state.gameKey}`))
        clearCollection(`activeGame/${location.state.gameKey}/players`)
        navigate("/")
    }

    useEffect(() => {
        const unsubscribe = startup()
    }, [])

    useEffect(() => {
        if (players.filter(a => a.guessed.length === gameData.crosswordData.length).length > 0) {
            setRangliste(players.sort((b, a) => (a.guessed.length > 0 ? a.guessed.length : 0) - (b.guessed.length > 0 ? b.guessed.length : 0)).slice(0, 3))
            deleteDoc(doc(db, `activeGame/${location.state.gameKey}`))
            setBackdrop(true)
        }
    }, [players])

    function clearCollection(path) {
        const ref = collection(db, path)
        onSnapshot(ref, (snapshot) => {
            snapshot.forEach((document) => {
                console.log(`${path}/${document.id}`)
                deleteDoc(doc(db, `${path}/${document.id}`))
            })
        })
    }

    return (<>
        <Container maxWidth={"false"}>
            <Grid container>
                <Grid item xs={6}>
                    {gameData.questions &&
                        <div style={{ marginLeft: "10%" }}>
                            <h1>Questions</h1>
                            <ol>
                                {questions.map(question =>
                                    <li style={{ fontSize: "1.2rem", marginBottom: "10px" }}>{question.q}</li>
                                )}
                            </ol>
                        </div>
                    }
                    {//Add Text gamedata.text && ....
                    }
                </Grid>
                <Grid xs={6}>
                    {players.length > 0 && <Scoreboard players={players.sort((b, a) => (a.guessed.length > 0 ? a.guessed.length : 0) - (b.guessed.length > 0 ? b.guessed.length : 0)).slice(0, 7)} amountQuestions={gameData.crosswordData.length} />}
                </Grid>
            </Grid>
        </Container>
        <Backdrop
            open={true}
            sx={{ color: '#fff', zIndex: 100 }}
            onClick={() => { }}
        >
            <div style={{ textAlign: "center" }}>

                <h3>Rangliste</h3>
                {rangliste.map((player) => {
                    <p>{player.name}</p>
                })}
                <Button variant="contained" color="danger" onClick={endGame}>End Game</Button>
            </div>
        </Backdrop>
    </>
    )
}