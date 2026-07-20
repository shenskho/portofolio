import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function GlowCard({ children, className = '', delay = 0 }) {
  const ref = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`glow-card scroll-reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      <div className="glow-card__border" aria-hidden="true" />
      <div className="glow-card__content">{children}</div>
    </div>
  )
}
