import { useLocale } from '../../hooks/useLocale'
import GlowCard from '../ui/GlowCard'
import SectionHeading from '../ui/SectionHeading'

export default function Education() {
  const { content } = useLocale()
  const { education } = content

  return (
    <section id="education" className="education section">
      <div className="container">
        <SectionHeading subtitle={education.subtitle} title={education.title} />

        <div className="education__grid">
          {education.items.map((item, index) => (
            <GlowCard key={`${item.type}-${item.title}`} className="education-card" delay={index * 100}>
              <div className="education-card__topline">
                <span className="education-card__type">{item.type}</span>
                <span className="education-card__index" aria-hidden="true" dir="ltr">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="education-card__title">{item.title}</h3>
              <p className="education-card__institution">{item.institution}</p>
              <p className="education-card__period">{item.period}</p>
              <p className="education-card__description">{item.description}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
