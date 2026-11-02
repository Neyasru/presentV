import type { GameId } from '../games'

export interface VideoRoute {
  /** Código de la URL (ej. "3F4A67G"). Da igual mayúsculas/minúsculas. */
  code: string
  /** Tarjeta asociada al vídeo */
  card: string
  /** Solo el ID del vídeo de YouTube, no la URL completa. */
  youtubeId: string
  /** Persona que envio el video */
  person: string
  /** Minijuego que hay que superar antes de ver el vídeo. Sin él, el vídeo sale directo. */
  game?: GameId
  /** Título opcional, encima del vídeo. */
  title?: string
  /** Mensaje opcional, debajo del vídeo. */
  message?: string
}

/*
 * Juegos disponibles:
 * 'balloons' | 'memory' | 'whack' | 'simon' | 'sliding' | 'scramble' | 'oddone' | 'numbers' | 'candles'
 * | 'gifts' | 'lights' | 'rps'
 */
export const routes: VideoRoute[] = [
  { code: 'T4Y7D1S', card: 'trip', youtubeId: '9bZkp7q19f0', person: '', game: 'scramble', title: 'Dream big, shine bright 🎊' },
  { code: '3F4A67G', card: 'death', youtubeId: 'dQw4w9WgXcQ', person: '', game: 'balloons', title: 'Today the world celebrates you! 🎁', message: 'With all my love, just for you.' },
  { code: '9K2M81X', card: 'mage', youtubeId: 'jNQXAC9IVRw', person: '', game: 'memory', title: 'Happiness looks great on you 🎈' },
  { code: 'P7Q4T2Z', card: 'castle', youtubeId: '9bZkp7q19f0', person: '', game: 'whack', title: 'Make today unforgettable 🥳', message: "Here's to many, many more! 🥳" },
  { code: 'H5R8W3N', card: 'moon', youtubeId: 'dQw4w9WgXcQ', person: '', game: 'simon', title: 'You are capable of amazing things 🎉' },
  { code: 'C2V6B9L', card: 'tower', youtubeId: 'jNQXAC9IVRw', person: '', game: 'sliding', title: 'Life is sweeter with you in it 🍰' },
  { code: 'M8J3F5A', card: 'water', youtubeId: 'dQw4w9WgXcQ', person: '', game: 'oddone', title: 'Keep blooming, keep growing 🌸' },
  { code: 'K1E9U6Q', card: 'fire', youtubeId: 'jNQXAC9IVRw', person: '', game: 'numbers', title: 'Believe in your magic ✨' },
  { code: 'R3G7N2B', card: 'heart', youtubeId: '9bZkp7q19f0', person: '', game: 'gifts', title: 'You are the best gift of all 🎀' },
  { code: 'W6X1Z4D', card: 'lights', youtubeId: 'dQw4w9WgXcQ', person: '', game: 'lights', title: 'Your light makes everything brighter 💡' },
  { code: 'L9S5V8E', card: 'rps', youtubeId: 'jNQXAC9IVRw', person: '', game: 'rps', title: 'Every day is a reason to celebrate ✌️' },
]

export const findRoute = (code: string | undefined): VideoRoute | undefined => {
  if (!code) return undefined
  const wanted = code.toLowerCase()
  return routes.find((r) => r.code.toLowerCase() === wanted)
}

//https://present-v-hazel.vercel.app/9K2M81X