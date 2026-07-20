import { projectsConfig } from '../../data/portfolio'
import SectionHeading from '../ui/SectionHeading'
import GlowCard from '../ui/GlowCard'

export default function Projects() {
  return (
    <section id="projects" className="projects section">
      <div className="container">
        <SectionHeading subtitle={projectsConfig.subtitle} title={projectsConfig.title} />

        <div className="projects__grid">
          {projectsConfig.projects.map((project, i) => (
            <GlowCard
              key={project.id}
              className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
              delay={i * 120}
            >
              <div className={`project-card__visual project-card__visual--${project.gradient.replace(/\s+/g, '-')}`}>
                <div className="project-card__visual-pattern" />
                <span className="project-card__number">
                  {String(project.id).padStart(2, '0')}
                </span>
              </div>

              <div className="project-card__body">
                {project.featured && (
                  <span className="project-card__badge">Featured</span>
                )}
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-card__tag">{tag}</span>
                  ))}
                </div>

                <div className="project-card__links">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live Demo →
                  </a>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    Source Code ↗
                  </a>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
