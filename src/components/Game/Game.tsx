import { useRef, useState } from 'react'
import Board from '../Board/Board'

type move = { row: number, col: number }

const Game = () => {
    const [boardDataHistory, setHistory] = useState<string[][]>([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState<number>(0)
    const [ascending, setAscending] = useState<boolean>(true)
    const movesDetails = useRef<move[]>([])
    const isXNext: boolean = (currentMove % 2 == 0)
    const currentBoardData: string[] = boardDataHistory[currentMove]
    const updateHistory = (latestBoardData: string[], i: number) => {
        // console.log("update")
        // console.log(latestBoardData)
        const newHistory = [...boardDataHistory.slice(0, currentMove + 1), latestBoardData]
        const newMove: move = {
            row: Math.floor(i / 3) + 1,
            col: i % 3 + 1
        }
        setHistory(newHistory)
        setCurrentMove(newHistory.length - 1)
        movesDetails.current[currentMove] = newMove
    }

    const jumpTo = (move: number) => {
        setCurrentMove(move)
    }

    const setOrder = () => {
        setAscending(!ascending)
    }
    console.log(movesDetails.current)
    const moves = boardDataHistory.map((_squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move + ", move #" + (move - 1) + `${movesDetails.current[move - 1] ? "(" + movesDetails.current[move - 1].row + ", " + movesDetails.current[move - 1].col + ")" : ""}`;
        } else {
            description = 'Go to game start';
        }
        // description +=  `${movesDetails.current[move] ? "(" + movesDetails.current[move].row + ", " + movesDetails.current[move].col + ")" : ""}`
        return (
            (move != currentMove)
                ? <li key={move}>
                    <button onClick={() => jumpTo(move)}>{description}</button>
                </li>
                : <li key={move}>
                    You are at move #{currentMove}
                    <span>{movesDetails.current[move - 1] ? ", move #" + (move - 1) + "(" + movesDetails.current[move - 1].row + ", " + movesDetails.current[move - 1].col + ")" : ""}</span>
                </li>
        );
    });

    return (
        <div className='game'>
            <div className='game-board'>
                <Board width={3} height={3} boardData={currentBoardData} isXNext={isXNext} updateHistory={updateHistory} />
            </div>

            <div className="game-info">
                <span>Order:</span><button onClick={() => setOrder()}>{(ascending) ? "ascending" : "descending"}</button>
                <ol className={`${ascending ? " " : "descending"}`}>{moves}</ol>
            </div>
        </div>
    )
}

export default Game