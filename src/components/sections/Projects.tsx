import SectionHead from '@/components/ui/SectionHead'
import { ArrowIcon, GitHubIcon } from '@/components/ui/Icons'
import { vars } from '@/lib/css'
import type { Content } from '@/data'
import ProjectCover from './ProjectCover'
import styles from './Projects.module.css'

export default function Projects({ content }: { content: Content }) {
  const { projects, ui } = content
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="wrap">
        <SectionHead index="04" kicker={projects.kicker} title={projects.title} id="projects-title">
          <p className="lead" style={{ marginBlockStart: 'clamp(18px, 2.4vw, 30px)' }}>
            {projects.subtitle}
          </p>
        </SectionHead>

        <ul className={styles.grid}>
          {projects.items.map((project, i) => (
            <li key={project.id} className={styles.cell} data-reveal style={vars({ '--d': i * 90 })} data-i={i}>
              <article className={`${styles.card} plate`} data-tilt="5" data-spot>
                <div className={styles.cover}>
                  <ProjectCover kind={project.cover} />
                  <span className={`${styles.big} latin`} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`${styles.year} mono`}>{project.year}</span>
                  {project.featured ? <span className={`${styles.badge} mono`}>{ui.featured}</span> : null}
                </div>
                <div className={styles.body}>
                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.desc}>{project.description}</p>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className={styles.samples} data-reveal>
          <h3 className="mono">{projects.samplesTitle}</h3>
          <ul>
            {projects.samples.map((sample) => (
              <li key={sample.url}>
                <a href={sample.url} target="_blank" rel="noopener noreferrer" data-cursor="GITHUB">
                  <GitHubIcon width={20} height={20} />
                  <span className={styles.sampleLabel}>{sample.label}</span>
                  <span className={`${styles.sampleUrl} latin`}>{sample.url.replace('https://', '').replace(/\/$/, '')}</span>
                  <span className="sr-only">{ui.viewRepository}</span>
                  <ArrowIcon width={20} height={20} className={styles.sampleArrow} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
