import { Edit, PlayArrow } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function Game(props) {
    return (
        <div className="gameContainer">
            <h3>{props.title}</h3>
            <div>
                <Button variant="contained" className="iconButton" color="info"><Edit /></Button>
                <Button variant="contained" className="iconButton" ><PlayArrow /></Button>
            </div>
        </div>
    )
}