import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function SkillBar({ name, level, delay = 0 }) {
  const ref = useScrollReveal()

  return (
    <div ref={ref} className="skill-bar scroll-reveal" style={{ '--reveal-delay': `${delay}ms` }}>
      <div className="skill-bar__header">
        <span className="skill-bar__name">{name}</span>
        <span className="skill-bar__level">{level}%</span>
      </div>
      <div className="skill-bar__track">
        <div className="skill-bar__fill" style={{ '--level': `${level}%` }} />
      </div>
    </div>
  )
}
