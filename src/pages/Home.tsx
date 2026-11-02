import Title from '../components/Title'
import { useConfetti } from '../useConfetti'

export default function Home() {
  useConfetti()
  return (
    <section className="card center">
      <div className="emoji bounce">🎂</div>
      <Title />
      <p className="lead">A surprise is waiting for you.</p>
      <p className="hint">Hold your phone near the magic tag ✨</p>
    </section>
  )
}
