import "../styles/crossword.css"

export default function Crossword(props) {
    const gridSize = 15
    var crossword = new Array(gridSize)
    for (let i = 0; i < crossword.length; i++) {
        crossword[i] = new Array(gridSize)
        for (let j = 0; j < crossword[i].length; j++) {
            crossword[i][j] = { classes: ["crossword-cell-parent"], text: "", show: false }
        }
    }

    props.crosswordData.forEach(idx => {
        props.guessed.forEach(g => {
            if (idx.pos.y === g.pos.y && idx.pos.x === g.pos.x && idx.pos.dir === g.pos.dir && idx.word.length === g.word.length) {
                idx = g
            }
        })
        crossword[idx.pos.y][idx.pos.x].classes.push("first")
        if (crossword[idx.pos.y][idx.pos.x].classes.filter(item => item === "first").length > 1) {
            crossword[idx.pos.y][idx.pos.x].classes.push("corner")
        }
        if (idx.pos.dir === "across") {
            for (let i = 0; i < idx.word.length; i++) {
                crossword[idx.pos.y][idx.pos.x + i].classes.push("used")
                crossword[idx.pos.y][idx.pos.x + i].show = idx.show
                if (idx.word.word.charAt(i) !== " ") {
                    crossword[idx.pos.y][idx.pos.x + i].text = idx.word.word.charAt(i)
                }
                if (i > 0) crossword[idx.pos.y][idx.pos.x + i].classes.push("left")
            }
            crossword[idx.pos.y][idx.pos.x].classes.push("borderless-left")
            crossword[idx.pos.y][idx.pos.x + idx.word.length - 1].classes.push("last")
            if (crossword[idx.pos.y][idx.pos.x + idx.word.length - 1].classes.filter(item => item === "last").length > 1) {
                crossword[idx.pos.y][idx.pos.x + idx.word.length - 1].classes.push("corner")
            }
        } else if (idx.pos.dir === "down") {
            for (let i = 0; i < idx.word.length; i++) {
                crossword[idx.pos.y + i][idx.pos.x].classes.push("used")
                crossword[idx.pos.y + i][idx.pos.x].show = idx.show
                if (idx.word.word.charAt(i) !== " ") {
                    crossword[idx.pos.y + i][idx.pos.x].text = idx.word.word.charAt(i)
                }
                if (i > 0) crossword[idx.pos.y + i][idx.pos.x].classes.push("top")
            }
            crossword[idx.pos.y][idx.pos.x].classes.push("borderless-top")
            crossword[idx.pos.y + idx.word.length - 1][idx.pos.x].classes.push("last")
            if (crossword[idx.pos.y + idx.word.length - 1][idx.pos.x].classes.filter(item => item === "last").length > 1) {
                crossword[idx.pos.y + idx.word.length - 1][idx.pos.x].classes.push("corner")
            }
        }
    })

    return (
        <div className="crossword-main">
            {crossword.map(idx =>
                <div className="crossword-row">
                    {idx.map(subidx =>
                        <div className={subidx.classes.join(' ')}>
                            <div className="crossword-cell-top-left"></div>
                            <div className="crossword-cell-top-right"></div>
                            <div className="crossword-cell-bottom-left"></div>
                            <div className="crossword-cell-bottom-right">{subidx.text.toUpperCase()}</div>
                        </div>
                    )}
                </div>)}
        </div>
    )
}