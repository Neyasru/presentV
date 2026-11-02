import { useEffect } from 'react'
import confetti from 'canvas-confetti'

const COLORS = ['#ff5ca8', '#ffd23f', '#3ec6ff', '#7bdc6b', '#a66bff', '#ff8a3d']

/** Explosión de confeti al montar la página (omitida con prefers-reduced-motion). */
export function useConfetti() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const base = { colors: COLORS, disableForReducedMotion: true, zIndex: 20 }
    confetti({ ...base, particleCount: 120, spread: 90, startVelocity: 45, origin: { x: 0.5, y: 0.7 } })
    const t = window.setTimeout(() => {
      confetti({ ...base, particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.8 } })
      confetti({ ...base, particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.8 } })
    }, 250)
    return () => window.clearTimeout(t)
  }, [])
}
