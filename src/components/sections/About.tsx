import SectionHead from '@/components/ui/SectionHead'
import { NamedIcon } from '@/components/ui/Icons'
import { vars } from '@/lib/css'
import type { Content } from '@/data'
import Portrait from './Portrait'
import styles from './About.module.css'

export default function About({ content, portraitSrc }: { content: Content; portraitSrc: string | null }) {
  const { about, site } = content
  const [statement, ...rest] = about.paragraphs
  const words = statement.split(' ')

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHead index="01" kicker={about.kicker} title={about.title} id="about-title" />

        <div className={styles.grid}>
          <div className={styles.stageCol}>
            <Portrait src={portraitSrc} labels={about.portrait} caption={`${site.name} — ${site.jobTitle}`} />
          </div>

          <div className={styles.textCol}>
            <p className={styles.statement} data-scroll-p style={vars({ '--n': words.length })}>
              {words.map((word, i) => (
                <span key={i}>
                  <span className={styles.word} style={vars({ '--i': i })}>
                    {word}
                  </span>{' '}
                </span>
              ))}
            </p>

            <div className={styles.paras} data-reveal>
              {rest.map((p) => (
                <p key={p} className="lead">
                  {p}
                </p>
              ))}
            </div>

            <ul className={styles.highlights}>
              {about.highlights.map((h, i) => (
                <li key={h.title} className={`${styles.highlight} plate`} data-reveal data-spot style={vars({ '--d': i * 80 })}>
                  <NamedIcon name={h.icon} width={26} height={26} className={styles.hIcon} />
                  <h3>{h.title}</h3>
                  <p>{h.desc}</p>
                </li>
              ))}
            </ul>

            <section className={`${styles.sheet} plate`} aria-labelledby="sheet-title" data-reveal data-spot>
              <h3 id="sheet-title" className={`${styles.sheetTitle} mono`}>
                <span className={`${styles.sheetDot}`} aria-hidden="true" />
                {about.factsTitle}
              </h3>
              <dl>
                {about.facts.map((f) => (
                  <div key={f.label} className={styles.fact}>
                    <dt className="mono">{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}
