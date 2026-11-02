import Title from '../components/Title'
import { useConfetti } from '../useConfetti'

export default function Home() {
  useConfetti()
  return (
    <section className="card center">
      <div className="emoji bounce">🎂</div>
      <Title />
      <p className="lead">Tienes una sorpresa esperándote.</p>
      <p className="hint">Acerca el móvil a la etiqueta mágica ✨</p>
    </section>
  )
}
