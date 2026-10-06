import SectionHeading from '../ui/SectionHeading'
import GlowCard from '../ui/GlowCard'
import { useLocale } from '../../hooks/useLocale'

export default function About() {
  const { content } = useLocale()
  const { about, site, ui } = content

  return (
    <section id="about" className="about section">
      <div className="container">
        <SectionHeading subtitle={about.subtitle} title={about.title} />

        <div className="about__grid">
          <div className="about__text">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}

            <div className="about__info">
              <div className="about__info-item">
                <span className="about__info-label">{ui.location}</span>
                <span>{site.location}</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">{ui.email}</span>
                <a href={`mailto:${site.email}`} dir="ltr">
                  {site.email}
                </a>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">{ui.status}</span>
                <span className="about__status">{site.availability}</span>
              </div>
            </div>
          </div>

          <div className="about__highlights">
            {about.highlights.map((item, i) => (
              <GlowCard key={item.title} delay={i * 100}>
                <span className="about__highlight-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
