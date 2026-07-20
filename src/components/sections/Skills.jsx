import { skillsConfig } from '../../data/portfolio'
import SectionHeading from '../ui/SectionHeading'
import SkillBar from '../ui/SkillBar'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function Skills() {
  const tagsRef = useScrollReveal()

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <SectionHeading subtitle={skillsConfig.subtitle} title={skillsConfig.title} />

        <div className="skills__grid">
          {skillsConfig.categories.map((category, ci) => (
            <div key={category.name} className="skills__category">
              <h3 className="skills__category-name">{category.name}</h3>
              {category.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={(ci * 4 + si) * 80}
                />
              ))}
            </div>
          ))}
        </div>

        <div ref={tagsRef} className="skills__tags scroll-reveal">
          {skillsConfig.techStack.map((tech, i) => (
            <span
              key={tech}
              className="skills__tag"
              style={{ '--tag-index': i }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
