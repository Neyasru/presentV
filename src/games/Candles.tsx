import { useEffect, useState } from 'react'
import { type GameProps, useWin } from './utils'

const CANDLES = 6

// Mantén pulsado el botón para soplar: el medidor sube y baja si sueltas.
export default function Candles({ onWin }: GameProps) {
  const [blowing, setBlowing] = useState(false)
  const [power, setPower] = useState(0)
  const done = power >= 100
  useWin(done, onWin)

  useEffect(() => {
    if (done) return
    const id = window.setInterval(() => setPower((p) => Math.max(0, Math.min(100, p + (blowing ? 4 : -3)))), 50)
    return () => window.clearInterval(id)
  }, [blowing, done])

  const lit = done ? 0 : Math.ceil(CANDLES * (1 - power / 100))

  return (
    <>
      <p className="game-hint">Make a wish… then hold the button to blow out the candles!</p>
      <div className="candles" aria-hidden="true">
        {Array.from({ length: CANDLES }, (_, i) => (
          <span key={i} className="candle">
            <span className="flame">{i < lit ? '🔥' : '💨'}</span>
            <span className="stick" />
          </span>
        ))}
      </div>
      <div className="meter"><div className="meter-fill" style={{ width: `${power}%` }} /></div>
      <button
        className="btn blow"
        onPointerDown={() => setBlowing(true)}
        onPointerUp={() => setBlowing(false)}
        onPointerLeave={() => setBlowing(false)}
        onPointerCancel={() => setBlowing(false)}
        onContextMenu={(e) => e.preventDefault()}
      >
        Hold to blow 🌬️
      </button>
    </>
  )
}
