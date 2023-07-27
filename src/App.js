import React, { useState, useEffect } from "react";
import aiMove from "./aiMove";
import findWinner from "./findWinner";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (xIsNext === false && !gameOver) {
      // AI's move
      const bestMove = aiMove(board);
      makeMove(bestMove);
    }
  }, [xIsNext, board, gameOver]);

  const handleClick = (index) => {
    if (gameOver || board[index]) {
      return;
    }

    makeMove(index);
  };

  const makeMove = (index) => {
    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    if (findWinner(newBoard) || newBoard.every((cell) => cell !== null)) {
      setGameOver(true);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const winner = findWinner(board);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (board.every((cell) => cell !== null)) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
    </div>
  );
}

export default App;
