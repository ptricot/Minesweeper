
import bomb from "./assets/bomb.png"

export default function MineGrid({board, onCellClick, ncols}) {
  const selectColor = (v) => {
    switch (v) {
      case 1:
        return '#00e';
        break;
      case 2:
        return '#090';
        break;
      case 3:
        return '#a00';
        break;
      case 4:
        return '#30a';
        break;
      case 5:
        return '#822';
        break;
      case 6:
        return '#0aa';
        break;
      case 7:
        return '#111';
        break;
      case 8:
        return '#555';
        break;
      default:
        return 'white'
    }

  }
  return (
    <div className="board" style={{gridTemplateColumns: `repeat(${ncols}, 1fr)`}}>
    {board.map((row, i) => 
      row.map((cell,j) =>
        board[i][j] >= 1 ?
        <div
          key={`${i}-${j}`}
          className="cell cellRevealed"
          style={{ color: selectColor(board[i][j])}}
        > {board[i][j]} </div>
        : board[i][j] == 0 ?
        <div
          key={`${i}-${j}`}
          className="cell cellRevealed"
        ></div>
        : board[i][j] == -1 ?
        <div
          key={`${i}-${j}`}
          className="cell cellCovered"
          onClick={() => onCellClick(i,j)}
        ></div>
        : <div
          key={`${i}-${j}`}
          className="cell cellRevealed"
        ><img src={bomb} alt="X"></img></div>
      )
    )}
  </div>
  )
}

