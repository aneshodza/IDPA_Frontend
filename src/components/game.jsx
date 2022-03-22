import { Edit, PlayArrow } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function Game() {
    return (
        <div className="gameContainer">
            <h3>Game</h3>
            <div>
                <Button className="iconButton" variant="contained" color="info"><Edit /></Button>
                <Button className="iconButton" variant="contained"><PlayArrow /></Button>
            </div>
        </div>
    )
}