import { Backdrop, Container, Grid, Button } from "@mui/material"
import { doc, getDoc, onSnapshot, collection, getDocs, deleteDoc, writeBatch, orderBy, limit, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { db } from "../base/firebase"
import Scoreboard from "./scoreboard"
import "../styles/teacherview.css"

export default function TeacherGame() {
    const location = useLocation()
    const navigate = useNavigate()
    const [gameData, setGameData] = useState({})
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)
    const [backdrop, setBackdrop] = useState(false)
    const [rangliste, setRangliste] = useState([])
    const [questions, setQuestions] = useState([])
    const [cleanText, setCleanText] = useState("Loading...")

    async function startup() {
        let temp = (await getDoc(doc(db, `activeGame/${location.state.gameKey}`))).data()
        console.log(temp)
        setGameData(temp)
        let tempGameData = temp

        temp = []
        let a = await getDocs(collection(db, `activeGame/${location.state.gameKey}/players`))
        a.forEach((i) =>
            temp.push(i.data())
        )
        setPlayers(temp.filter(p => !p.invis))

        let unsubscribe = onSnapshot(collection(db, `activeGame/${location.state.gameKey}/players`), (playersSnapshot) => {
            let tmpPlayers = []
            playersSnapshot.forEach((player) => tmpPlayers.push(player.data()))
            setPlayers(tmpPlayers.filter(p => !p.invis))
        })
        setLoading(false)
        if (tempGameData.questions !== undefined) {
            let tempQuestions = []
            for (let i = 0; i < tempGameData.questions.length; i++) {
                tempGameData.crosswordData.forEach(idx => {
                    if (idx.word.word === tempGameData.questions[i].a) {
                        tempQuestions.push(tempGameData.questions[i])
                    }
                })
            }
            setQuestions(tempQuestions)
        } else if (tempGameData.text !== undefined) {
            let finalString = tempGameData.text
            let deleteWords = []
            let splitString = tempGameData.text.split("_")
            for (let i = 1; i < splitString.length; i += 2) {
                tempGameData.crosswordData.forEach(idx => {
                    if (idx.word.word.toLowerCase() === splitString[i].replace(" ", "-").toLowerCase()) {
                        deleteWords.push(splitString[i])
                    }
                })
            }
            finalString = finalString.replace(/_/g, "")
            deleteWords.forEach(idx => {
                finalString = finalString.replace(idx, "______")
            })
            setCleanText(finalString)
        }
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

    const cleanup = () => {
        let temp = (players.sort((b, a) => (a.guessed.length > 0 ? a.guessed.length : 0) - (b.guessed.length > 0 ? b.guessed.length : 0)).slice(0, 3))
        console.log(temp)
        setRangliste(temp)
        deleteDoc(doc(db, `activeGame/${location.state.gameKey}`))
        setBackdrop(true)
    }

    useEffect(() => {
        if (players.filter(a => a.guessed.length === gameData.crosswordData.length).length > 0) {
            cleanup()
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
                    <div className="teacherview-greybox questions-holder">
                        {gameData.questions &&
                            <div>
                                <h1>QUESTIONS</h1>
                                <div>
                                    {questions.map((question, i) =>
                                        <div className="question-item"><h3>{i + 1}. {question.q}</h3></div>
                                    )}
                                </div>
                            </div>
                        }
                        {gameData.text &&
                            <div>
                                <h1>GAP TEXT</h1>
                                <p className="gaptext">{cleanText}</p>
                            </div>
                        }
                    </div>
                </Grid>
                <Grid xs={6}>
                    <div className="teacherview-greybox scoreboard-holder">
                        {players.length > 0 && <Scoreboard players={players.sort((b, a) => (a.guessed.length > 0 ? a.guessed.length : 0) - (b.guessed.length > 0 ? b.guessed.length : 0)).slice(0, 7)} amountQuestions={gameData.crosswordData.length} />}
                    </div>
                </Grid>
            </Grid>
        </Container>
        <Backdrop
            open={backdrop}
            sx={{ color: '#fff', zIndex: 100 }}
            onClick={() => { }}
        >
            <div style={{ textAlign: "center" }}>

                <h3>Rangliste</h3>
                <ol>
                {rangliste.map((player) => 
                    <li>{player.name}</li>
                )}
                </ol>
                <Button variant="contained" color="danger" onClick={endGame}>End Game</Button>
            </div>
        </Backdrop>
        <iframe width="0" height="0" src="https://www.youtube.com/embed/TW9d8vYrVFQ?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </>
    )
}