import { Link } from 'react-router-dom'
import { useConfetti } from '../useConfetti'

export default function NotFound() {
  useConfetti()
  return (
    <section className="card center">
      <div className="emoji bounce">🎈</div>
      <h1 className="hero">
        <span className="hero-small">¡Ups, Victoria!</span>
        <span className="hero-big">Aquí no hay nada</span>
      </h1>
      <p className="lead">Este globo se ha escapado… ¡prueba con otra etiqueta!</p>
      <Link className="btn" to="/">Volver a la fiesta 🎉</Link>
    </section>
  )
}
