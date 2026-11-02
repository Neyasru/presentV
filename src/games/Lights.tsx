import { useState } from 'react'
import { type GameProps, randInt, useWin } from './utils'

const SIZE = 3

const press = (cells: boolean[], i: number): boolean[] => {
  const r = Math.floor(i / SIZE)
  const c = i % SIZE
  return cells.map((on, k) => {
    const kr = Math.floor(k / SIZE)
    const kc = k % SIZE
    return Math.abs(kr - r) + Math.abs(kc - c) <= 1 ? !on : on
  })
}

// Se parte de todo apagado y se aplican pulsaciones al azar, así siempre tiene solución.
const scramble = (): boolean[] => {
  let cells = Array<boolean>(SIZE * SIZE).fill(false)
  for (let n = 0; n < 6; n++) cells = press(cells, randInt(cells.length))
  return cells.some(Boolean) ? cells : scramble()
}

export default function Lights({ onWin }: GameProps) {
  const [cells, setCells] = useState(scramble)
  const done = !cells.some(Boolean)
  useWin(done, onWin)

  return (
    <>
      <p className="game-hint">Turn all the lights off! Each tap flips its neighbors too.</p>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {cells.map((on, i) => (
          <button
            key={i}
            className="tile"
            aria-label={on ? 'Light on' : 'Light off'}
            style={{ background: on ? '#ffd23f' : '#d9d2e6' }}
            onClick={() => !done && setCells(press(cells, i))}
          >
            {on ? '💡' : ''}
          </button>
        ))}
      </div>
    </>
  )
}
