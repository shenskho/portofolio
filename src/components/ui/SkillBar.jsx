import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLocale } from '../../hooks/useLocale'

export default function SkillBar({ name, level, delay = 0 }) {
  const { language } = useLocale()
  const ref = useScrollReveal()
  const localizedLevel = new Intl.NumberFormat(
    language === 'fa' ? 'fa-IR' : 'en-US',
  ).format(level)
  const levelText = language === 'fa' ? `${localizedLevel}٪` : `${localizedLevel}%`

  return (
    <div ref={ref} className="skill-bar scroll-reveal" style={{ '--reveal-delay': `${delay}ms` }}>
      <div className="skill-bar__header">
        <bdi className="skill-bar__name" dir="ltr">{name}</bdi>
        <span className="skill-bar__level">{levelText}</span>
      </div>
      <div
        className="skill-bar__track"
        role="progressbar"
        aria-label={name}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={level}
        aria-valuetext={levelText}
      >
        <div className="skill-bar__fill" style={{ '--level': `${level}%` }} />
      </div>
    </div>
  )
}
