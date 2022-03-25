import { Edit, PlayArrow } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function Game(props) {
    const [color, setColor] = useState()
    useEffect(() => {
        setColor(['#9d00ec', "#5685fd", "#fd4239"][Math.floor(Math.random() * 3)])
    })
    return (
        <div className="gameContainer" style={{ backgroundColor: color }}>
            <h3>{props.title}</h3>
            <div>
                <Button className="iconButton" variant="contained" color="info"><Edit /></Button>
                <Button className="iconButton" variant="contained"><PlayArrow /></Button>
            </div>
        </div>
    )
}