import { Suspense, useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import Title from '../components/Title'
import { findRoute, type VideoRoute } from '../data/routes'
import { GAMES } from '../games'
import { useConfetti } from '../useConfetti'
import NotFound from './NotFound'

export default function VideoPage() {
  const { code } = useParams()
  const route = findRoute(code)
  // key: al cambiar de código se reinicia el juego.
  return route ? <Stage key={route.code} route={route} /> : <NotFound />
}

function Stage({ route }: { route: VideoRoute }) {
  const [won, setWon] = useState(!route.game)
  const onWin = useCallback(() => setWon(true), [])

  if (won) return <Video {...route} />

  const Game = GAMES[route.game!]
  return (
    <section className="card">
      <Title />
      <h2 className="video-title">Win the game to unlock your surprise 🎁</h2>
      <div className="game">
        <Suspense fallback={<p className="game-hint">Loading…</p>}>
          <Game onWin={onWin} />
        </Suspense>
      </div>
    </section>
  )
}

function Video({ youtubeId, title, message }: VideoRoute) {
  useConfetti()
  const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?playsinline=1&rel=0`
  return (
    <section className="card">
      <Title />
      {title && <h2 className="video-title">{title}</h2>}
      <div className="video-wrap">
        <iframe
          src={src}
          title={title ?? 'Surprise video'}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      {message && <p className="message">{message}</p>}
    </section>
  )
}
