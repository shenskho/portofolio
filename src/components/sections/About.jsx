import { aboutConfig, siteConfig } from '../../data/portfolio'
import SectionHeading from '../ui/SectionHeading'
import GlowCard from '../ui/GlowCard'

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <SectionHeading subtitle={aboutConfig.subtitle} title={aboutConfig.title} />

        <div className="about__grid">
          <div className="about__text">
            {aboutConfig.paragraphs.map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}

            <div className="about__info">
              <div className="about__info-item">
                <span className="about__info-label">Location</span>
                <span>{siteConfig.location}</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">Email</span>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">Status</span>
                <span className="about__status">{siteConfig.availability}</span>
              </div>
            </div>
          </div>

          <div className="about__highlights">
            {aboutConfig.highlights.map((item, i) => (
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
