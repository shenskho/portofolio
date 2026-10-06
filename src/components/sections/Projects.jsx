import { useLocale } from '../../hooks/useLocale'
import GlowCard from '../ui/GlowCard'
import SectionHeading from '../ui/SectionHeading'

export default function Projects() {
  const { content } = useLocale()
  const { projects, ui } = content

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <SectionHeading subtitle={projects.subtitle} title={projects.title} />

        <div className="projects__grid">
          {projects.projects.map((project, index) => (
            <GlowCard
              key={project.id}
              className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
              delay={index * 120}
            >
              <div className={`project-card__visual project-card__visual--${project.gradient}`}>
                <div className="project-card__visual-pattern" />
                <span className="project-card__number" dir="ltr">
                  {String(project.id).padStart(2, '0')}
                </span>
              </div>

              <div className="project-card__body">
                <div className="project-card__eyebrow">
                  <span className="project-card__badge">
                    {project.featured ? ui.featured : ui.professionalProject}
                  </span>
                  <span className="project-card__year">{project.year}</span>
                </div>

                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-card__tag" dir="ltr">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          ))}
        </div>

        <div className="projects__samples">
          <p className="projects__samples-label">{ui.codeSamples}</p>
          <div className="projects__samples-links">
            {projects.samples.map((sample) => (
              <a
                key={sample.url}
                href={sample.url}
                target="_blank"
                rel="noopener noreferrer"
                className="projects__sample-link"
                aria-label={`${ui.viewRepository}: ${sample.label}`}
              >
                <span>{sample.label}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
