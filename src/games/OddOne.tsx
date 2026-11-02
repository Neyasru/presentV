import { useState } from 'react'
import { type GameProps, randInt, useWin } from './utils'

const ROUNDS = [
  ['🙂', '🙃'],
  ['🌸', '🌼'],
  ['🐶', '🐕'],
]
const CELLS = 25

export default function OddOne({ onWin }: GameProps) {
  const [round, setRound] = useState(0)
  const [odd, setOdd] = useState(() => randInt(CELLS))
  const done = round >= ROUNDS.length
  useWin(done, onWin)

  if (done) return <p className="game-hint">Great eyes! 👀</p>
  const [base, other] = ROUNDS[round]

  const tap = (i: number) => {
    if (i !== odd) return
    setRound((r) => r + 1)
    setOdd(randInt(CELLS))
  }

  return (
    <>
      <p className="game-hint">Find the one that's different! ({round + 1}/{ROUNDS.length})</p>
      <div className="grid grid-tight" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {Array.from({ length: CELLS }, (_, i) => (
          <button key={i} className="tile tile-small" onClick={() => tap(i)} aria-label="Emoji">
            {i === odd ? other : base}
          </button>
        ))}
      </div>
    </>
  )
}
