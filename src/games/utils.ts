import { useEffect } from 'react'

export interface GameProps {
  onWin: () => void
}

export const shuffle = <T,>(items: T[]): T[] => {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const randInt = (n: number) => Math.floor(Math.random() * n)

/** Llama a onWin una vez (con un pequeño retardo para ver la última jugada) cuando done pasa a true. */
export function useWin(done: boolean, onWin: () => void) {
  useEffect(() => {
    if (!done) return
    const t = window.setTimeout(onWin, 700)
    return () => window.clearTimeout(t)
  }, [done, onWin])
}
