import { useState } from 'react'
import { type GameProps, randInt, useWin } from './utils'

const MOVES = ['✊', '✋', '✌️'] // piedra, papel, tijera: cada una gana a la siguiente (cíclico)
const TARGET = 3

export default function Rps({ onWin }: GameProps) {
  const [score, setScore] = useState(0)
  const [last, setLast] = useState<{ me: number; cpu: number } | null>(null)
  const done = score >= TARGET
  useWin(done, onWin)

  // Papel (1) gana a piedra (0), tijera (2) gana a papel (1), piedra (0) gana a tijera (2).
  const beats = (a: number, b: number) => (a - b + 3) % 3 === 1

  const play = (me: number) => {
    if (done) return
    const cpu = randInt(3)
    setLast({ me, cpu })
    if (beats(me, cpu)) setScore((s) => s + 1)
  }

  const result = !last ? 'Pick your move!' : last.me === last.cpu ? "It's a tie, try again!" : beats(last.me, last.cpu) ? 'You win this round! 🎉' : 'I win this one 😜'

  return (
    <>
      <p className="game-hint">Beat me at rock, paper, scissors! ({score}/{TARGET})</p>
      <div className="versus" aria-live="polite">
        <span>{last ? MOVES[last.me] : '❔'}</span>
        <span className="vs">vs</span>
        <span>{last ? MOVES[last.cpu] : '❔'}</span>
      </div>
      <p className="game-hint">{result}</p>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {MOVES.map((m, i) => (
          <button key={i} className="tile tile-on" onClick={() => play(i)} aria-label={['Rock', 'Paper', 'Scissors'][i]}>
            {m}
          </button>
        ))}
      </div>
    </>
  )
}
