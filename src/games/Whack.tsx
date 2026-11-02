import { useEffect, useState } from 'react'
import { type GameProps, randInt, useWin } from './utils'

const TARGET = 8

export default function Whack({ onWin }: GameProps) {
  const [active, setActive] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const done = score >= TARGET
  useWin(done, onWin)

  useEffect(() => {
    if (done) return
    const id = window.setInterval(() => setActive(randInt(9)), 900)
    return () => window.clearInterval(id)
  }, [done])

  const hit = (i: number) => {
    if (i !== active) return
    setScore((s) => s + 1)
    setActive(null)
  }

  return (
    <>
      <p className="game-hint">Catch the cake! ({score}/{TARGET})</p>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {Array.from({ length: 9 }, (_, i) => (
          <button key={i} className="tile" onClick={() => hit(i)} aria-label={i === active ? 'Cake' : 'Empty'}>
            {i === active ? '🍰' : ''}
          </button>
        ))}
      </div>
    </>
  )
}
