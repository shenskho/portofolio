import { experienceConfig } from '../../data/portfolio'
import SectionHeading from '../ui/SectionHeading'
import { useScrollReveal } from '../../hooks/useScrollReveal'

function TimelineItem({ item, index }) {
  const ref = useScrollReveal()

  return (
    <div
      ref={ref}
      className="timeline__item scroll-reveal"
      style={{ '--reveal-delay': `${index * 120}ms` }}
    >
      <div className="timeline__marker">
        <div className="timeline__dot" />
      </div>
      <div className="timeline__content">
        <span className="timeline__period">{item.period}</span>
        <h3 className="timeline__role">{item.role}</h3>
        <p className="timeline__company">{item.company}</p>
        <p className="timeline__desc">{item.description}</p>
        <div className="timeline__tags">
          {item.tags.map((tag) => (
            <span key={tag} className="timeline__tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="experience section">
      <div className="container">
        <SectionHeading subtitle={experienceConfig.subtitle} title={experienceConfig.title} />

        <div className="timeline">
          {experienceConfig.items.map((item, i) => (
            <TimelineItem key={item.company + item.role} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
