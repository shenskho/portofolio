import SectionHead from '@/components/ui/SectionHead'
import { vars } from '@/lib/css'
import type { Content } from '@/data'
import styles from './Experience.module.css'

export default function Experience({ content }: { content: Content }) {
  const { experience, education } = content
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="wrap">
        <SectionHead index="05" kicker={experience.kicker} title={experience.title} id="experience-title">
          <p className="lead" style={{ marginBlockStart: 'clamp(18px, 2.4vw, 30px)' }}>
            {experience.subtitle}
          </p>
        </SectionHead>

        <div className={styles.path} data-scroll-p>
          <span className={styles.track} aria-hidden="true">
            <span className={styles.fill} />
            <span className={styles.player} />
          </span>
          <ol className={styles.list}>
          {experience.items.map((item, i) => (
            <li key={item.company} className={styles.item} data-reveal style={vars({ '--d': i * 60 })}>
              <span className={styles.node} aria-hidden="true" />
              <article className={`${styles.card} plate`} data-spot>
                <p className={`${styles.period} mono`}>{item.period}</p>
                <h3 className={styles.role}>{item.role}</h3>
                <p className={styles.company}>
                  {item.company}
                  <span aria-hidden="true"> · </span>
                  <span className={styles.loc}>{item.location}</span>
                </p>
                <p className={styles.desc}>{item.description}</p>
                <div className="tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          ))}
          </ol>
        </div>

        <div className={styles.eduWrap} id="education">
          <header data-reveal>
            <p className="kicker mono">
              <span className="kicker__idx latin">05.1</span>
              <span className="kicker__rule" aria-hidden="true" />
              <span>{education.kicker}</span>
            </p>
            <h3 className={styles.eduTitle}>{education.title}</h3>
          </header>
          <ul className={styles.edu}>
            {education.items.map((item, i) => (
              <li key={item.title} className={`${styles.eduCard} plate`} data-reveal data-spot style={vars({ '--d': i * 80 })}>
                <p className={`${styles.eduType} mono`}>{item.type}</p>
                <h4>{item.title}</h4>
                <p className={styles.eduInst}>{item.institution}</p>
                <p className={`${styles.eduPeriod} mono`}>{item.period}</p>
                <p className={styles.eduDesc}>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
