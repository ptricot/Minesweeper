const express = require("express");
const cors = require("cors");
const { newGame } = require('./newGame');
const { cellClick } = require('./cellClick');

const app = express();
const PORT = 3000;

let board = null;
let solvedBoard = null;
let gameState = "Ready";
let startTime = null;
let gameTime = null;
let hasGuessed = false;
let firstClick = false;

app.use(
  cors({
    origin: ['http://localhost:5173']
  })
);

app.get("/api/newGame", (req, res) => {
  const {nrows, ncols, nbombs} = req.query;
  console.log(`Click on New Game`);
  [board,solvedBoard] = newGame(nrows, ncols, nbombs);
  gameState = "Playing";
  hasGuessed = false;
  firstClick = false;
  res.json({ board : board, gameState : gameState});
});

app.get("/api/cellClick", (req, res) => {
  const { i, j } = req.query;
  console.log(`Click on ${i},${j}`);
  if (gameState === "Playing") {
    [board, gameState] = cellClick(board, solvedBoard, Number(i), Number(j));
    if (hasGuessed === false) {
      hasGuessed = true;
      firstClick = true;
      startTime = Date.now();
    } else {
      firstClick = false;
    }
    if (gameState === "Won") {
      gameTime = Date.now() - startTime;
    }
  }
  res.json({ board : board, gameState : gameState, gameTime : gameTime, firstClick : firstClick});
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
