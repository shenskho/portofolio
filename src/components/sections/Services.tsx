import Link from 'next/link'
import SectionHead from '@/components/ui/SectionHead'
import { ArrowIcon } from '@/components/ui/Icons'
import { vars } from '@/lib/css'
import { localePath, type Locale } from '@/lib/site'
import type { Content } from '@/data'
import styles from './Services.module.css'

export default function Services({ locale, content }: { locale: Locale; content: Content }) {
  const { services } = content
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="wrap">
        <SectionHead index="02" kicker={services.kicker} title={services.title} id="services-title">
          <p className="lead" style={{ marginBlockStart: 'clamp(18px, 2.4vw, 30px)' }}>
            {services.intro}
          </p>
        </SectionHead>

        <ol className={styles.list}>
          {services.items.map((item, i) => (
            <li key={item.slug} className={styles.row} data-reveal style={vars({ '--d': i * 70 })}>
              <Link href={localePath(locale, `/services/${item.slug}`)} className={styles.link} data-cursor={services.cta}>
                <span className={`${styles.idx} latin`}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.desc}>{item.description}</p>
                <span className={styles.tags}>
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </span>
                <span className={styles.arrow} aria-hidden="true">
                  <ArrowIcon width={28} height={28} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
