import { useState } from 'react'
import { type GameProps, randInt, useWin } from './utils'

const SIZE = 3
const SOLVED = [1, 2, 3, 4, 5, 6, 7, 8, 0]

const neighbors = (empty: number) => {
  const r = Math.floor(empty / SIZE)
  const c = empty % SIZE
  const out: number[] = []
  if (r > 0) out.push(empty - SIZE)
  if (r < SIZE - 1) out.push(empty + SIZE)
  if (c > 0) out.push(empty - 1)
  if (c < SIZE - 1) out.push(empty + 1)
  return out
}

// Se mezcla con movimientos válidos desde el estado resuelto, así siempre tiene solución.
const scramble = (): number[] => {
  let tiles = [...SOLVED]
  for (let i = 0; i < 80; i++) {
    const empty = tiles.indexOf(0)
    const opts = neighbors(empty)
    const from = opts[randInt(opts.length)]
    tiles = tiles.map((t, k) => (k === empty ? tiles[from] : k === from ? 0 : t))
  }
  return tiles.join() === SOLVED.join() ? scramble() : tiles
}

export default function Sliding({ onWin }: GameProps) {
  const [tiles, setTiles] = useState(scramble)
  const done = tiles.join() === SOLVED.join()
  useWin(done, onWin)

  const move = (i: number) => {
    const empty = tiles.indexOf(0)
    if (done || !neighbors(empty).includes(i)) return
    setTiles(tiles.map((t, k) => (k === empty ? tiles[i] : k === i ? 0 : t)))
  }

  return (
    <>
      <p className="game-hint">Slide the tiles into order, 1 to 8!</p>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {tiles.map((t, i) => (
          <button key={i} className={`tile${t ? ' tile-on' : ' tile-empty'}`} onClick={() => move(i)} aria-label={t ? `Tile ${t}` : 'Empty'}>
            {t || ''}
          </button>
        ))}
      </div>
    </>
  )
}
