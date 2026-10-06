import SectionHead from '@/components/ui/SectionHead'
import { vars } from '@/lib/css'
import type { Content } from '@/data'
import type { Locale } from '@/lib/site'
import SkillPlayground from './SkillPlayground'
import styles from './Skills.module.css'

export default function Skills({ locale, content }: { locale: Locale; content: Content }) {
  const { skills, ui } = content
  const nf = new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US', { useGrouping: false })

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHead index="03" kicker={skills.kicker} title={skills.title} id="skills-title">
          <p className="lead" style={{ marginBlockStart: 'clamp(18px, 2.4vw, 30px)' }}>
            {skills.intro}
          </p>
        </SectionHead>

        <div className={styles.layout}>
          <div data-reveal>
            <SkillPlayground pills={skills.pills} legend={skills.legend} hint={skills.playHint} shake={skills.shake} />
          </div>

          <div className={styles.sheet} data-reveal data-spot style={vars({ '--d': 120 })}>
            <h3 className={`${styles.sheetTitle} mono`}>{skills.sheetTitle}</h3>
            {skills.groups.map((group) => (
              <div key={group.name} className={styles.group}>
                <h4 className={styles.groupName}>{group.name}</h4>
                <ul>
                  {group.skills.map((skill) => {
                    const filled = Math.round(skill.level / 10)
                    return (
                      <li key={skill.name} className={styles.skill}>
                        <div className={styles.skillHead}>
                          <span>
                            {skill.name}
                            {skill.learning ? <em className={styles.learning}>{ui.learning}</em> : null}
                          </span>
                          <span className={`${styles.pct} latin`}>
                            {nf.format(skill.level)}%
                          </span>
                        </div>
                        <div
                          className={styles.meter}
                          role="meter"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={skill.level}
                          aria-label={skill.name}
                          data-reveal
                          data-learning={skill.learning ? '' : undefined}
                        >
                          {Array.from({ length: 10 }, (_, k) => (
                            <i key={k} className={styles.seg} data-on={k < filled ? '' : undefined} style={vars({ '--k': k })} />
                          ))}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
