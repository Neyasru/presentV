import { useEffect, useState } from 'react'
import { type GameProps, randInt, useWin } from './utils'

const COLORS = ['#ff5ca8', '#ffd23f', '#3ec6ff', '#7bdc6b']
const LENGTH = 5

export default function Simon({ onWin }: GameProps) {
  const [seq] = useState(() => Array.from({ length: LENGTH }, () => randInt(4)))
  const [level, setLevel] = useState(1)
  const [round, setRound] = useState(0)
  const [pos, setPos] = useState(0)
  const [lit, setLit] = useState<number | null>(null)
  const [showing, setShowing] = useState(true)
  const [done, setDone] = useState(false)
  useWin(done, onWin)

  useEffect(() => {
    setShowing(true)
    setPos(0)
    const timers: number[] = []
    seq.slice(0, level).forEach((c, i) => {
      timers.push(window.setTimeout(() => setLit(c), 700 + i * 700))
      timers.push(window.setTimeout(() => setLit(null), 700 + i * 700 + 450))
    })
    timers.push(window.setTimeout(() => setShowing(false), 700 + level * 700))
    return () => timers.forEach(window.clearTimeout)
  }, [level, round, seq])

  const press = (c: number) => {
    if (showing || done) return
    setLit(c)
    window.setTimeout(() => setLit(null), 200)
    if (c !== seq[pos]) {
      setLevel(1)
      setRound((r) => r + 1)
    } else if (pos + 1 < level) {
      setPos(pos + 1)
    } else if (level === LENGTH) {
      setDone(true)
    } else {
      setLevel(level + 1)
    }
  }

  return (
    <>
      <p className="game-hint">
        {showing ? 'Watch the colors…' : 'Your turn! Repeat the pattern'} (round {level}/{LENGTH})
      </p>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {COLORS.map((color, c) => (
          <button
            key={c}
            className="tile"
            aria-label={`Color ${c + 1}`}
            style={{ background: color, opacity: lit === c ? 1 : 0.45, transform: lit === c ? 'scale(1.05)' : undefined }}
            onClick={() => press(c)}
          />
        ))}
      </div>
    </>
  )
}
