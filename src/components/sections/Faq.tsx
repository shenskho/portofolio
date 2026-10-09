import SectionHead from '@/components/ui/SectionHead'
import { vars } from '@/lib/css'
import type { QA } from '@/data/types'
import styles from './Faq.module.css'

export default function Faq({
  kicker,
  title,
  items,
  index = '06',
  id = 'faq',
}: {
  kicker: string
  title: string
  items: QA[]
  index?: string
  id?: string
}) {
  const body = (
    <ul className={styles.list}>
      {items.map((item, i) => (
        <li key={item.q} data-reveal style={vars({ '--d': i * 40 })}>
          <details className={styles.item}>
            <summary className={styles.q} data-cursor="OPEN">
              <span className={`${styles.n} latin`}>{String(i + 1).padStart(2, '0')}</span>
              <h3>{item.q}</h3>
              <span className={styles.plus} aria-hidden="true" />
            </summary>
            <div className={styles.a}>
              <p>{item.a}</p>
            </div>
          </details>
        </li>
      ))}
    </ul>
  )

  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <div className={styles.layout}>
          <SectionHead index={index} kicker={kicker} title={title} id={`${id}-title`} compact />
          {body}
        </div>
      </div>
    </section>
  )
}
