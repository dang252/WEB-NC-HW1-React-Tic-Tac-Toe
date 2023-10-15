import React, { useRef, useState } from 'react'
import Square from '../Square/Square'
import uuid from 'react-uuid';

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function calculateWinner(squares: string[]) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return lines[i];
        }
    }
    return null;
}

const Board = ({ width, height, boardData, isXNext, updateHistory }: { width: number, height: number, boardData: string[], isXNext: boolean, updateHistory: (boardData: string[], index: number) => void }) => {

    // const [boardData, setBoardData] = useState<string[]>(["", "", "", "", "", "", "", "", ""])
    const onClickHandle = (i: number) => {
        // console.log("i'm running")
        if (boardData[i] || calculateWinner(boardData)) return
        // console.log("i'm still running")
        const newBoardData = boardData.slice()
        if (isXNext) {
            newBoardData[i] = "X"
        }
        else {
            newBoardData[i] = "O"
        }
        updateHistory(newBoardData, i)
    }

    const winnerSquares = calculateWinner(boardData);
    let status;
    if (winnerSquares) {
        status = 'Winner: ' + boardData[winnerSquares[0]];
    } else {
        if (!boardData.includes(null)) {
            status = 'DRAW'
        }
        else {
            status = 'Next player: ' + (isXNext ? 'X' : 'O');
        }

    }

    const board = []
    for (let i = 0; i < width; i++) {
        const col = []
        for (let j = 0; j < height; j++) {
            col.push(<Square key={uuid()} value={boardData[i * width + j]} onClickHandle={() => { onClickHandle(i * width + j) }} className={(winnerSquares) && (winnerSquares.includes(i * width + j) ? "hightlight" : null)}></Square>)
        }
        board.push(<div className='board-row' key={uuid()}>{col}</div>)
    }
    return (
        <>
            <div className="status">{status}</div>
            {board}
        </>
    )
}

export default Board