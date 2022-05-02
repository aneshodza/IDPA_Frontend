import { Edit, PlayArrow } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthProvider"


export default function Game(props) {
    const [color, setColor] = useState()
    let navigate = useNavigate()

    useEffect(() => {
        setColor(['#9d00ec', "#5685fd", "#fd4239"][Math.floor(Math.random() * 3)])
    })

    function gameLobby() {
        const gameKey = Date.now().toString().slice(7, 13) //Get 6 Digits unique Key for Game
        navigate("/teacher/gameLobby/" + gameKey, { state: { crosswordUID: props.uid, gameKey: gameKey } })
    }

    return (
        <div className="gameContainer" style={{ backgroundColor: color }}>
            <h3>{props.title}</h3>
            <div>
                <Button className="iconButton" variant="contained" color="info" onClick={() => navigate(`/teacher/edit/${props.uid}`)}><Edit /></Button>
                <Button className="iconButton" variant="contained" onClick={gameLobby}><PlayArrow /></Button>
            </div>
        </div>
    )
}