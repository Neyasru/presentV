import { useState } from 'react'
import { type GameProps, shuffle, useWin } from './utils'

const EMOJIS = ['🎂', '🎈', '🎁', '🎉', '🍰', '🍭']

export default function Memory({ onWin }: GameProps) {
  const [cards] = useState(() => shuffle([...EMOJIS, ...EMOJIS]))
  const [open, setOpen] = useState<number[]>([])
  const [found, setFound] = useState<number[]>([])
  const done = found.length === cards.length
  useWin(done, onWin)

  const flip = (i: number) => {
    if (open.length === 2 || open.includes(i) || found.includes(i)) return
    const next = [...open, i]
    setOpen(next)
    if (next.length < 2) return
    const [a, b] = next
    if (cards[a] === cards[b]) {
      setFound((f) => [...f, a, b])
      setOpen([])
    } else {
      window.setTimeout(() => setOpen([]), 800)
    }
  }

  return (
    <>
      <p className="game-hint">Find all the matching pairs!</p>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {cards.map((c, i) => {
          const show = open.includes(i) || found.includes(i)
          return (
            <button key={i} className={`tile${show ? ' tile-on' : ''}`} onClick={() => flip(i)} aria-label={show ? c : 'Hidden card'}>
              {show ? c : '❓'}
            </button>
          )
        })}
      </div>
    </>
  )
}
