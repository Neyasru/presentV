import { useEffect, useRef, useState } from 'react'
import { type GameProps, randInt, useWin } from './utils'

const EMOJIS = ['🎁', '🎀', '🎈']
const TARGET = 10

interface Gift {
  id: number
  x: number
  emoji: string
}

export default function Gifts({ onWin }: GameProps) {
  const [gifts, setGifts] = useState<Gift[]>([])
  const [score, setScore] = useState(0)
  const nextId = useRef(0)
  const done = score >= TARGET
  useWin(done, onWin)

  useEffect(() => {
    if (done) return
    const id = window.setInterval(
      () => setGifts((g) => [...g.slice(-6), { id: nextId.current++, x: randInt(80), emoji: EMOJIS[randInt(EMOJIS.length)] }]),
      700,
    )
    return () => window.clearInterval(id)
  }, [done])

  const remove = (id: number) => setGifts((g) => g.filter((x) => x.id !== id))
  const catchGift = (id: number) => {
    remove(id)
    setScore((s) => s + 1)
  }

  return (
    <>
      <p className="game-hint">Catch the falling gifts! ({score}/{TARGET})</p>
      <div className="gift-field">
        {gifts.map((g) => (
          <button
            key={g.id}
            className="gift"
            aria-label="Gift"
            style={{ left: `${g.x}%` }}
            onClick={() => catchGift(g.id)}
            onAnimationEnd={() => remove(g.id)}
          >
            {g.emoji}
          </button>
        ))}
      </div>
    </>
  )
}
