import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { collection, addDoc, deleteDoc, getDoc, doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../base/firebase";
import { Button, Container, Grid, TextField, Box, CircularProgress, Backdrop } from "@mui/material";
import "../styles/loginStyle.css"
import "../styles/crossword.css"
import Crossword from "./crosswordRender";
import GuessRender from "./guessRender";

export default function PlayGame() {
    const [nick, setNick] = useState("")
    const [inLobby, setInLobby] = useState(false)
    const [crosswordData, setCrosswordData] = useState([])
    const [currentGuess, setCurrentGuess] = useState("")
    const [pastGuesses, setPastGuesses] = useState([])
    const [guessed, setGuessed] = useState([])
    const [hasStarted, setHasStarted] = useState(false)
    const [loading, setLoading] = useState({status: false, text: ""})

    let location = useLocation()
    let navigate = useNavigate()
    let unsubscribe = [];

    useEffect(async () => {
        if (location.state === null || location.state === undefined) {
            location.state = {
                lobby: location.pathname.split('/')[location.pathname.split('/').length - 1]
            }
        }
    }, [])

    useEffect(() => () => deleteDoc(doc(db, `activeGame/${location.state.lobby}/players/${location.state.userRef}`)), []);

    const joinGame = async () => {
        if (loading.status) {
            return;
        }
        setLoading({status: true, text: "Joining game"})
        const docRef = await addDoc(collection(db, `activeGame/${location.pathname.split('/')[location.pathname.split('/').length - 1]}/players`), {
            name: nick,
            pastGuesses: [],
            guessed: [],
        })
        location.state = {
            userRef: docRef.id,
            lobby: location.pathname.split('/')[location.pathname.split('/').length - 1]
        }
        unsubscribe[1] = onSnapshot(doc(db, `activeGame/${location.state.lobby}/players/invis`), (playerSnapshot) => {
            let data = playerSnapshot.data()
            if (data === undefined) {
                navigate("/")
            } else {
                setHasStarted(data.gameStarted)
            }
        })
        unsubscribe[0] = onSnapshot(doc(db, `activeGame/${location.state.lobby}/players/${location.state.userRef}`), (playerSnapshot) => {
            let playerData = playerSnapshot.data()
            if (playerData === undefined) {
                navigate("/")
            } else {
                setPastGuesses(playerData.pastGuesses)
                setGuessed(playerData.guessed)
            }
        })
        setCrosswordData(await (await getDoc(doc(db, `activeGame/${location.state.lobby}/players/invis`))).data().crosswordData)
        setInLobby(true)
        setLoading({status: false, text: ""})
    }

    const sendGuess = async () => {
        await setDoc(doc(db, `activeGame/${location.state.lobby}/players/${location.state.userRef}`), {
            name: nick,
            pastGuesses: [...pastGuesses, currentGuess],
            guessed: guessed
        })
        setCurrentGuess("")
    }

    return (
        <div>
            {inLobby ?
                hasStarted ?
                    <div className="crossword-main-parent">
                        <Crossword crosswordData={crosswordData} guessed={guessed} />
                        <div className="crossword-input">
                            <GuessRender pastGuesses={pastGuesses} />
                            <Container maxWidth="xs">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} lg={12}>
                                        <TextField className="input" label="Your Guess" variant="outlined" value={currentGuess} onChange={e => setCurrentGuess(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12} lg={12}>
                                        <Button className="enterButton" variant="contained" size="Large" onClick={sendGuess}>Send Guess</Button>
                                    </Grid>
                                </Grid>
                            </Container>
                        </div>
                    </div>
                    :
                    <div className="game-not-started-holder">
                        <div className="guess-list-item game-not-started clone-one">
                            <div className="mid-part"><h1>The game is about to start</h1></div>
                        </div>
                        <div className="guess-list-item game-not-started clone-two">
                            <div className="mid-part"><h1>The game is about to start</h1></div>
                        </div>
                        <div className="guess-list-item game-not-started clone-three">
                            <div className="mid-part"><h1>The game is about to start</h1></div>
                        </div>
                    </div>
                :
                <main>
                    <Container maxWidth="xs">
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={12}>
                                <TextField className="input" label="Nickname" variant="outlined" value={nick} onChange={e => setNick(e.target.value)} />
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <Button className="enterButton" variant="contained" size="Large" onClick={joinGame}>Pick name</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            }
            <Backdrop
                sx={{ color: '#fff', zIndex: 100 }}
                open={loading.status}
                onClick={() => { }}>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <p>{loading.text}</p>
                    <CircularProgress color="inherit"></CircularProgress>
                </Box>
            </Backdrop>
        </div>

    )
}