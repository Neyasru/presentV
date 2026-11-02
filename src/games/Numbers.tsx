import { useState } from 'react'
import { type GameProps, shuffle, useWin } from './utils'

const COUNT = 12

export default function Numbers({ onWin }: GameProps) {
  const [order] = useState(() => shuffle(Array.from({ length: COUNT }, (_, i) => i + 1)))
  const [next, setNext] = useState(1)
  const [wrong, setWrong] = useState<number | null>(null)
  const done = next > COUNT
  useWin(done, onWin)

  const tap = (n: number) => {
    if (n === next) {
      setNext(next + 1)
    } else if (n > next) {
      setWrong(n)
      window.setTimeout(() => setWrong(null), 350)
    }
  }

  return (
    <>
      <p className="game-hint">Tap the numbers from 1 to {COUNT} in order!</p>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {order.map((n) => (
          <button
            key={n}
            className="tile tile-on"
            style={{ opacity: n < next ? 0.2 : 1, background: wrong === n ? '#ffb3b3' : undefined }}
            onClick={() => tap(n)}
          >
            {n}
          </button>
        ))}
      </div>
    </>
  )
}
