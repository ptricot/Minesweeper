
function cellClick(board, solvedBoard, i, j) {
  if (typeof solvedBoard == "undefined") {
    return [board, "Ready"];
  }
  if (solvedBoard[i][j] == -2) {
    return [solvedBoard, "Lost"];
  }
  else {
    const pile = [[i,j]];
    while (pile.length > 0) {
      const [a,b] = pile.pop();
      board[a][b] = solvedBoard[a][b];
      if (solvedBoard[a][b] == 0) {
        [[a+1,b],[a+1,b+1],[a,b+1],[a-1,b+1],[a-1,b],[a-1,b-1],[a,b-1],[a+1,b-1]].forEach(([c,d]) => {
          if (c >= 0 && c <= (board.length-1) && d >= 0 && d <= (board[0].length-1)) {
            if (!(solvedBoard[c][d] == -2) && board[c][d] == -1) {
            pile.push([c,d])
            }
          }
        })
      }
    }
    const gamestate = board.length === solvedBoard.length && board.every((row, i) =>
        row.length === solvedBoard[i].length &&
        row.every((v, j) =>  (v===-1 && solvedBoard[i][j] === -2)| v === solvedBoard[i][j])
      ) ? "Won" : "Playing"; 
    return [board, gamestate];
  }
}

module.exports = { cellClick };
