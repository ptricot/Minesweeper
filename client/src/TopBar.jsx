
import { useState } from 'react'
import happy from './assets/happy.png'
import cool from './assets/cool.png'
import dead from './assets/dead.png'
import cog from './assets/cog.png'

export default function TopBar({gameState, gameTime, onNGClick, open, setOpen, closePopup}) {
  const [tempNrows, setTempNrows] = useState(9);
  const [tempNcols, setTempNcols] = useState(9);
  const [tempNbombs, setTempNbombs] = useState(15);
  function timeDisplay(ms) {
    return String(Math.floor(ms/1000)).padStart(3,'0')
  }
  return (
    <div className="controlBar">
      <div className="topbar timer">{timeDisplay(gameTime)}</div>
      <button className="topbar" onClick={() => onNGClick(-1,-1)}> {gameState === "Lost" ? <img src={dead} alt="X(" className="icon"></img>
        : gameState === "Won" ? <img src={cool} alt="8)" className="icon"></img>
        : <img src={happy} alt=":)" className="icon"></img>} </button>
      <button className="topbar" onClick={() => setOpen(true)}>
        <img src={cog} alt="opt" className="icon"></img>
      </button>
      {open && <div className="popup">
        <div className="inputContainer">
          <div>Rows</div>
          <input type="number" value={tempNrows} onChange={e => setTempNrows(Number(e.target.value))} className="paramInput"></input>
          <div>Columns</div>
          <input type="number" value={tempNcols} onChange={e => setTempNcols(Number(e.target.value))} className="paramInput"></input>
          <div>Bombs</div>
          <input type="number" value={tempNbombs} onChange={e => setTempNbombs(Number(e.target.value))} className="paramInput"></input>
        </div>
        <button className="popButton" onClick={() => closePopup(tempNrows, tempNcols, tempNbombs)}>OK</button>
      </div>}
    </div>
  )
}
