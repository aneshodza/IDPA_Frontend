import { useEffect, useState } from "react"

export default function GuessRender(props) {
    const [guesses, setGuesses] = useState([])
    useEffect(() => {
        setGuesses(props.pastGuesses)
    }, [props.pastGuesses])
    return (
        <div className="crossword-guesses">
            <div className="guesses-list">
                {guesses.length === 0 ?
                    <div className="guess-list-item">
                        <div className="mid-part"><h2>No guess yet</h2></div>
                    </div>
                    :
                    <div className="guess-intermediate">
                        {
                            guesses.map(idx =>
                                <div className="guess-list-item">
                                    <div className="mid-part"><h2>{idx}</h2></div>
                                </div>)
                        }
                    </div>
                }
            </div>
        </div>
    )
}