import HeroField from '@/components/fx/HeroField'
import { ArrowIcon } from '@/components/ui/Icons'
import { vars } from '@/lib/css'
import type { Content } from '@/data'
import type { Locale } from '@/lib/site'
import styles from './Hero.module.css'

function Scribble() {
  return (
    <svg className={styles.scribble} viewBox="0 0 420 28" preserveAspectRatio="none" aria-hidden focusable="false">
      <path d="M4 18C64 6 118 24 206 13S352 6 416 16" pathLength="100" />
    </svg>
  )
}

export default function Hero({ locale, content }: { locale: Locale; content: Content }) {
  const { hero, site, ui } = content
  const nf = (value: number, decimals: number) =>
    new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: false,
    }).format(value)

  const roles = hero.roles.slice(0, 5)

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.field}>
        <HeroField />
      </div>
      <div className={styles.veil} aria-hidden="true" />

      <div className={`${styles.inner} wrap`}>
        <p className={`${styles.eyebrow} mono fade-in`} style={vars({ '--i': 0 })}>
          <span className={styles.dot} aria-hidden="true" />
          <span>{site.availability}</span>
          <span className={styles.sep} aria-hidden="true">
            /
          </span>
          <span>{hero.eyebrow}</span>
        </p>

        <h1 id="hero-title" className={styles.title}>
          {hero.lines.map((line, li) => (
            <span key={line} className={styles.line}>
              {line.split(' ').map((word, wi) => (
                <span key={`${li}-${wi}`}>
                  <span className="rise" style={vars({ '--i': li * 2 + wi })}>
                    <span>{word}</span>
                  </span>{' '}
                </span>
              ))}
              {li === hero.markedLine ? <Scribble /> : null}
            </span>
          ))}
        </h1>

        <div className={styles.sub}>
          <p className={`${styles.stack} fade-in`} style={vars({ '--i': 3 })}>
            {hero.stack}
          </p>
          <p className={`${styles.roles} fade-in`} style={vars({ '--i': 4 })}>
            <span className="sr-only">{hero.rolesLabel}: {roles.join(locale === 'fa' ? '، ' : ', ')}</span>
            <span className={`${styles.rolesLabel} mono`} aria-hidden="true">
              {hero.rolesLabel}
            </span>
            <span className={styles.rolesStage} aria-hidden="true">
              {roles.map((role, i) => (
                <span key={role} className={styles.role} style={vars({ '--i': i })}>
                  {role}
                </span>
              ))}
            </span>
          </p>
        </div>

        <p className={`${styles.lead} lead fade-in`} style={vars({ '--i': 5 })}>
          {hero.lead}
        </p>

        <div className={`${styles.cta} fade-in`} style={vars({ '--i': 6 })}>
          <a className="btn btn--solid" href={hero.ctaPrimary.href} data-magnetic>
            {hero.ctaPrimary.label}
            <ArrowIcon className="btn__arrow" />
          </a>
          <a className="btn" href={hero.ctaSecondary.href} data-magnetic>
            {hero.ctaSecondary.label}
            <ArrowIcon className="btn__arrow" />
          </a>
        </div>

        <dl className={`${styles.stats} fade-in`} style={vars({ '--i': 7 })}>
          {hero.stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <dt className="mono">{stat.label}</dt>
              <dd
                data-count={stat.value}
                data-decimals={stat.decimals}
                data-suffix={stat.suffix}
                data-num-locale={locale}
                data-count-delay={1100}
              >
                {nf(stat.value, stat.decimals)}
                {stat.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <a className={`${styles.cue} mono`} href="#about">
        <span>{ui.scrollDown}</span>
        <span className={styles.cueLine} aria-hidden="true" />
      </a>

      <i className={`${styles.mark} ${styles.m1}`} aria-hidden="true" />
      <i className={`${styles.mark} ${styles.m2}`} aria-hidden="true" />
      <i className={`${styles.mark} ${styles.m3}`} aria-hidden="true" />
      <i className={`${styles.mark} ${styles.m4}`} aria-hidden="true" />
    </section>
  )
}
