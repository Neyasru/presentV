import { type ComponentType, lazy } from 'react'
import type { GameProps } from './utils'

export type GameId = 'balloons' | 'memory' | 'whack' | 'simon' | 'sliding' | 'scramble' | 'oddone' | 'numbers' | 'candles' | 'gifts' | 'lights' | 'rps'

// Carga diferida: cada juego es un trozo de JS aparte que solo se descarga si se usa.
export const GAMES: Record<GameId, ComponentType<GameProps>> = {
  balloons: lazy(() => import('./Balloons')),
  memory: lazy(() => import('./Memory')),
  whack: lazy(() => import('./Whack')),
  simon: lazy(() => import('./Simon')),
  sliding: lazy(() => import('./Sliding')),
  scramble: lazy(() => import('./Scramble')),
  oddone: lazy(() => import('./OddOne')),
  numbers: lazy(() => import('./Numbers')),
  candles: lazy(() => import('./Candles')),
  gifts: lazy(() => import('./Gifts')),
  lights: lazy(() => import('./Lights')),
  rps: lazy(() => import('./Rps')),
}
