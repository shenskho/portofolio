import SectionHeading from '../ui/SectionHeading'
import SkillBar from '../ui/SkillBar'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLocale } from '../../hooks/useLocale'

export default function Skills() {
  const { content } = useLocale()
  const { skills } = content
  const tagsRef = useScrollReveal()

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <SectionHeading subtitle={skills.subtitle} title={skills.title} />

        <div className="skills__grid">
          {skills.categories.map((category, ci) => (
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
          {skills.techStack.map((tech, i) => (
            <span
              key={tech}
              className="skills__tag"
              style={{ '--tag-index': i }}
              dir="ltr"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
