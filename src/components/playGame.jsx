import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { collection, addDoc, deleteDoc, getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../base/firebase";
import { Button, Container, Grid, TextField } from "@mui/material";
import "../styles/loginStyle.css"
import "../styles/crossword.css"
import Crossword from "./crosswordRender";
import GuessRender from "./guessRender";

export default function PlayGame(props) {
    const [nick, setNick] = useState("")
    const [inLobby, setInLobby] = useState(false)
    const [crosswordData, setCrosswordData] = useState([])
    const [currentGuess, setCurrentGuess] = useState("")
    const [pastGuesses, setPastGuesses] = useState([])
    const [guessed, setGuessed] = useState([])

    let location = useLocation()

    useEffect(async () => {
        if (location.state === null || location.state === undefined) {
            location.state = {
                lobby: location.pathname.split('/')[location.pathname.split('/').length - 1]
            }
        }
    }, [])

    useEffect( () => () => deleteDoc(doc(db, `activeGame/${location.state.lobby}/players/${location.state.userRef}`)), [] );

    const joinGame = async () => {
        const docRef = await addDoc(collection(db, `activeGame/${location.pathname.split('/')[location.pathname.split('/').length - 1]}/players`), {
            name: nick,
            pastGuesses: [],
            guessed: [],
            done: false
        })
        location.state = {
            userRef: docRef.id,
            lobby: location.pathname.split('/')[location.pathname.split('/').length - 1]
        }
        setCrosswordData(await (await getDoc(doc(db, `activeGame/${location.state.lobby}/players/invis`))).data().crosswordData)
        setInLobby(true)
    }

    const sendGuess = async () => {
        await setDoc(doc(db, `activeGame/${location.state.lobby}/players/${location.state.userRef}`), {
            name: nick,
            pastGuesses: [...pastGuesses, currentGuess],
            guessed: guessed
        })
        setPastGuesses([...pastGuesses, currentGuess])
        setGuessed((await (await getDoc(doc(db, `activeGame/${location.state.lobby}/players/${location.state.userRef}`))).data().guessed))
        setCurrentGuess("")
    }

    return (
        <div>
            {inLobby ?
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
        </div>

    )
}