import { Link } from 'react-router-dom'
import { useConfetti } from '../useConfetti'

export default function NotFound() {
  useConfetti()
  return (
    <section className="card center">
      <div className="emoji bounce">🎈</div>
      <h1 className="hero">
        <span className="hero-small">Oops, Victoria!</span>
        <span className="hero-big">Nothing here</span>
      </h1>
      <p className="lead">This balloon floated away… try another tag!</p>
      <Link className="btn" to="/">Back to the party 🎉</Link>
    </section>
  )
}
