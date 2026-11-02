import { useParams } from 'react-router-dom'
import Title from '../components/Title'
import { findRoute } from '../data/routes'
import { useConfetti } from '../useConfetti'
import NotFound from './NotFound'

export default function VideoPage() {
  const { code } = useParams()
  const route = findRoute(code)
  return route ? <Video {...route} /> : <NotFound />
}

function Video({ youtubeId, title, message }: { youtubeId: string; title?: string; message?: string }) {
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
