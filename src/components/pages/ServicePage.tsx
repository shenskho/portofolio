import Link from 'next/link'
import Frame from '@/components/shell/Frame'
import HeroField from '@/components/fx/HeroField'
import Faq from '@/components/sections/Faq'
import Contact from '@/components/sections/Contact'
import { ArrowIcon } from '@/components/ui/Icons'
import JsonLd, { serviceGraph } from '@/lib/jsonld'
import { findPortrait } from '@/lib/portrait'
import { vars } from '@/lib/css'
import { getContent, getService } from '@/data'
import { localePath, serviceSlugs, type Locale, type ServiceSlug } from '@/lib/site'
import styles from './ServicePage.module.css'

export default function ServicePage({ locale, slug }: { locale: Locale; slug: ServiceSlug }) {
  const content = getContent(locale)
  const s = getService(locale, slug)
  const portrait = findPortrait()
  const home = localePath(locale)
  const related = serviceSlugs.filter((x) => x !== slug)
  const num = (n: number) => (locale === 'fa' ? new Intl.NumberFormat('fa-IR').format(n) : String(n).padStart(2, '0'))

  return (
    <Frame locale={locale} path={`/services/${slug}`}>
      <JsonLd data={serviceGraph(locale, slug, portrait?.src)} />

      <header className={styles.head}>
        <div className={styles.field}>
          <HeroField />
        </div>
        <div className={styles.veil} aria-hidden="true" />
        <div className="wrap">
          <nav aria-label="breadcrumb" className={`${styles.crumbs} mono`}>
            <ol>
              <li>
                <Link href={home}>{content.ui.breadcrumbHome}</Link>
              </li>
              <li aria-current="page">{s.navTitle}</li>
            </ol>
          </nav>
          <p className="kicker mono fade-in" style={vars({ '--i': 0 })}>
            <span className="kicker__idx latin">/</span>
            <span className="kicker__rule" aria-hidden="true" />
            <span>{s.kicker}</span>
          </p>
          <h1 className={styles.h1}>
            {s.h1.split(' ').map((word, i) => (
              <span key={i}>
                <span className="rise" style={vars({ '--i': i })}>
                  <span>{word}</span>
                </span>{' '}
              </span>
            ))}
          </h1>
          <p className={`${styles.lead} lead fade-in`} style={vars({ '--i': 6 })}>
            {s.lead}
          </p>
          <div className={`${styles.cta} fade-in`} style={vars({ '--i': 7 })}>
            <a className="btn btn--solid" href="#contact" data-magnetic>
              {s.ctaButton}
              <ArrowIcon className="btn__arrow" />
            </a>
            <Link className="btn" href={`${home}#projects`} data-magnetic>
              {content.hero.ctaPrimary.label}
              <ArrowIcon className="btn__arrow" />
            </Link>
          </div>
        </div>
      </header>

      <section className="section" aria-labelledby="includes-title">
        <div className="wrap">
          <header data-reveal>
            <p className="kicker mono">
              <span className="kicker__idx latin">01</span>
              <span className="kicker__rule" aria-hidden="true" />
              <span>{s.navTitle}</span>
            </p>
            <h2 id="includes-title" className="h2">
              {s.includesTitle}
            </h2>
          </header>
          <ul className={styles.includes}>
            {s.includes.map((item, i) => (
              <li key={item.title} className={`${styles.include} plate`} data-reveal data-spot style={vars({ '--d': (i % 3) * 80 })}>
                <span className={`${styles.num} latin`}>{String(i + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title" style={{ paddingBlockStart: 0 }}>
        <div className="wrap">
          <div className={styles.split}>
            <div data-reveal>
              <p className="kicker mono">
                <span className="kicker__idx latin">02</span>
                <span className="kicker__rule" aria-hidden="true" />
                <span>{s.navTitle}</span>
              </p>
              <h2 id="process-title" className="h2">
                {s.processTitle}
              </h2>
              <h3 className={`${styles.forTitle} mono`}>{s.forTitle}</h3>
              <ul className={styles.forList}>
                {s.forWho.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
            <ol className={styles.steps}>
              {s.process.map((step, i) => (
                <li key={step.title} className={styles.step} data-reveal style={vars({ '--d': i * 80 })}>
                  <span className={`${styles.stepN} latin`}>{num(i + 1)}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Faq kicker={s.navTitle} title={s.faqTitle} items={s.faq} index="03" />

      <section className="section" aria-labelledby="related-title" style={{ paddingBlockStart: 0 }}>
        <div className="wrap">
          <h2 id="related-title" className={`${styles.relatedTitle} mono`}>
            {s.relatedTitle}
          </h2>
          <ul className={styles.related}>
            {related.map((r) => {
              const rs = getService(locale, r)
              return (
                <li key={r} data-reveal>
                  <Link href={localePath(locale, `/services/${r}`)} className={`${styles.relatedLink} plate`} data-spot data-cursor={content.services.cta}>
                    <span>{rs.navTitle}</span>
                    <ArrowIcon width={22} height={22} className={styles.relatedArrow} />
                  </Link>
                </li>
              )
            })}
            <li data-reveal>
              <Link href={`${home}#services`} className={`${styles.relatedLink} plate`} data-spot>
                <span>{content.ui.allServices}</span>
                <ArrowIcon width={22} height={22} className={styles.relatedArrow} />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <Contact content={{ ...content, contact: { ...content.contact, title: s.ctaTitle, description: s.ctaText } }} index="04" />
    </Frame>
  )
}
