
import { useState, useRef } from 'react'
import './App.css'
import MineGrid from './MineGrid'
import TopBar from './TopBar'

function App() {
  const [ncols, setNcols] = useState(9);
  const [nrows, setNrows] = useState(9);
  const [nbombs, setNbombs] = useState(15);
  const [open, setOpen] = useState(false);
  const [board, setBoard] = useState(Array.from({ length: nrows }, (_, i) =>
    Array.from({ length: ncols }, (_, j) => 0)
  ));
  const [gameState, setGameState] = useState("Ready");
  const [gameTime, setGameTime] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return;
    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      setGameTime(Date.now() - startTime);
    }, 100);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const closePopup = (tempNrows, tempNcols, tempNbombs) => {
    if (tempNrows < 2  | tempNcols < 2 | tempNrows > 100 | tempNcols > 100) {return;}
    setNrows(tempNrows);
    setNcols(tempNcols);
    setNbombs(tempNbombs);
    setBoard(Array.from({ length: tempNrows }, (_, i) =>
      Array.from({ length: tempNcols }, (_, j) => 0)
    ));
    setGameState("Ready");
    setGameTime(0);
    stop();
    setOpen(false)
  }

  async function call(i,j) {
    if (open) {return;}
    try {
      const path = i == -1 ?
        `http://localhost:3000/api/newGame?ncols=${ncols}&nrows=${nrows}&nbombs=${nbombs}`
        : `http://localhost:3000/api/cellClick?i=${i}&j=${j}`;
      const response = await fetch(path);
      if (i===-1) {
        setGameTime(0);
        stop()
      }
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      if (typeof data.board !== "undefined" && data.board !== null && data.board.length == nrows && data.board[1].length == ncols) {
        setBoard(data.board);
        setGameState(data.gameState);
        if (data.firstClick) {
          start()
        }
        if (data.gameState === "Won") {
          setGameTime(data.gameTime);
          stop()
        }
        if (data.gameState === "Lost") {
          setGameTime(0);
          stop()
        }
      } else {
        throw new Error('Board received has incorrect dimensions');
      }
    }
    catch(error) {
      console.error("error", error);
    }
  }

  return (
    <>
      <div className="game">
        <TopBar gameState={gameState} gameTime={gameTime} onNGClick={call} setNcols={setNcols} setNrows={setNrows} setNbombs={setNbombs} open={open} setOpen={setOpen} closePopup={closePopup}></TopBar>
        <MineGrid board={board} onCellClick={call} ncols={ncols}></MineGrid>
      </div>
    </>
  )
}

export default App
