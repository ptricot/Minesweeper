
function newGame(nrows,ncols,nbombs) {
  const board = Array.from({ length: nrows }, (_, i) => Array.from({ length: ncols }, (_, j) => -1));
  const bombs = [...Array(ncols*nrows).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, nbombs)
    .map(x => {
      const q = Math.floor(x / ncols);
      const r = x % ncols;
      return [q, r];
    });
  const solvedBoard = Array.from({ length: nrows }, (_, i) =>
    Array.from({ length: ncols }, (_, j) =>
      bombs.some(([a, b]) => a === i && b === j) ? -2 :
        bombs.filter(([a,b]) => [-1,0,1].includes(a-i) && [-1,0,1].includes(b-j)).length // number of bomb neighbors
    )
  );
  return [board,solvedBoard];
}

module.exports = { newGame };
