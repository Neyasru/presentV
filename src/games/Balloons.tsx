import { useState } from 'react'
import { type GameProps, useWin } from './utils'

const COLORS = ['#ff5ca8', '#ffd23f', '#3ec6ff', '#7bdc6b', '#a66bff', '#ff8a3d']
const SPOTS = [
  [8, 6], [42, 2], [74, 8], [24, 30], [58, 34], [10, 58], [44, 62], [74, 56],
]

export default function Balloons({ onWin }: GameProps) {
  const [popped, setPopped] = useState<number[]>([])
  const done = popped.length === SPOTS.length
  useWin(done, onWin)

  return (
    <>
      <p className="game-hint">Pop all the balloons! ({popped.length}/{SPOTS.length})</p>
      <div className="balloon-field">
        {SPOTS.map(([x, y], i) =>
          popped.includes(i) ? null : (
            <button
              key={i}
              className="pop-balloon"
              aria-label="Balloon"
              style={{ left: `${x}%`, top: `${y}%`, background: COLORS[i % COLORS.length], animationDelay: `${-i * 0.4}s` }}
              onClick={() => setPopped((p) => [...p, i])}
            />
          ),
        )}
      </div>
    </>
  )
}
