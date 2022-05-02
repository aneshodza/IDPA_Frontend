import Bars from "react-bars";
import "../styles/scoreboard.css";

function Scoreboard(props) {
    return (
        <div className="scoreboard">
            <div className="scoreboard__header">
                <h1>Scoreboard</h1>
            </div>
            <div className="scoreboard__players">
                {props.players
                    .sort((b, a) => (a.guessed.length > 0 ? a.guessed.length : 0) - (b.guessed.length > 0 ? b.guessed.length : 0))
                    .map((player) => (
                        <Bars
                            data={[player.guessed.length > 0 ? player.guessed.length : 0]}
                            maxValue={props.amountQuestions}
                            value={player.guessed.length > 0 ? player.guessed.length : 0}
                            label={player.name}
                            barColor={["#9d00ec", "#5685fd", "#fd4239"][player.name.length % 3]}
                            makeUppercase={true}
                        />
                    ))}
            </div>
        </div>
    );
}
export default Scoreboard;
