const COLORS = ['#ff5ca8', '#ffd23f', '#3ec6ff', '#7bdc6b', '#a66bff', '#ff8a3d']

// Globos que suben flotando, con posición/tiempo fijos (sin aleatoriedad en render).
const balloons = Array.from({ length: 9 }, (_, i) => ({
  left: 4 + i * 11,
  color: COLORS[i % COLORS.length],
  delay: -(i * 2.3),
  duration: 14 + (i % 4) * 3,
  size: 38 + (i % 3) * 10,
}))

export default function Decor() {
  return (
    <div className="decor" aria-hidden="true">
      {balloons.map((b, i) => (
        <span
          key={i}
          className="balloon"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size * 1.2,
            background: b.color,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
