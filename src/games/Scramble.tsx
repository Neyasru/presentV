import { useState } from 'react'
import { type GameProps, shuffle, useWin } from './utils'

const WORD = 'CELEBRATE'

const scramble = (): string[] => {
  const s = shuffle(WORD.split(''))
  return s.join('') === WORD ? scramble() : s
}

export default function Scramble({ onWin }: GameProps) {
  const [letters] = useState(scramble)
  const [used, setUsed] = useState<number[]>([])
  const [wrong, setWrong] = useState<number | null>(null)
  const done = used.length === WORD.length
  useWin(done, onWin)

  const tap = (i: number) => {
    if (used.includes(i) || done) return
    if (letters[i] === WORD[used.length]) {
      setUsed((u) => [...u, i])
    } else {
      setWrong(i)
      window.setTimeout(() => setWrong(null), 350)
    }
  }

  return (
    <>
      <p className="game-hint">Tap the letters in order to spell the word!</p>
      <div className="slots" aria-label="Word so far">
        {WORD.split('').map((ch, k) => (
          <span key={k} className="slot">{k < used.length ? ch : ''}</span>
        ))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {letters.map((ch, i) => (
          <button
            key={i}
            className="tile tile-on"
            style={{ opacity: used.includes(i) ? 0.2 : 1, background: wrong === i ? '#ffb3b3' : undefined }}
            onClick={() => tap(i)}
          >
            {ch}
          </button>
        ))}
      </div>
    </>
  )
}
