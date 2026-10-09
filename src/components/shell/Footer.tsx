import { ArrowUpIcon, GitHubIcon, LinkedInIcon } from '@/components/ui/Icons'
import Logo from '@/components/ui/Logo'
import { person } from '@/lib/site'
import type { Content } from '@/data'
import styles from './Footer.module.css'

export default function Footer({ content, altHref }: { content: Content; altHref: string }) {
  const { footer, ui, site } = content
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.wordWrap} data-spot aria-hidden="true">
          <p className={`${styles.word} latin`}>AMIRHOSSEIN</p>
          <p className={`${styles.word} ${styles.wordFill} latin`}>AMIRHOSSEIN</p>
        </div>

        <div className={styles.row}>
          <div className={styles.brand}>
            <Logo size={30} />
            <div>
              <p>{footer.copyright}</p>
              <p className="mono">{footer.built}</p>
            </div>
          </div>

          <ul className={styles.social}>
            <li>
              <a href={person.github} target="_blank" rel="me noopener noreferrer" aria-label="GitHub" data-magnetic>
                <GitHubIcon width={20} height={20} />
              </a>
            </li>
            <li>
              <a href={person.linkedin} target="_blank" rel="me noopener noreferrer" aria-label="LinkedIn" data-magnetic>
                <LinkedInIcon width={20} height={20} />
              </a>
            </li>
            <li>
              <a href={altHref} className={styles.lang} lang={ui.languageShort === 'EN' ? 'en' : 'fa'} hrefLang={ui.languageShort === 'EN' ? 'en' : 'fa'}>
                {ui.switchLanguage}
              </a>
            </li>
          </ul>

          <a href="#top" className={styles.top} data-magnetic>
            <span>{ui.backToTop}</span>
            <ArrowUpIcon width={18} height={18} />
          </a>
        </div>
        <p className={`${styles.loc} mono`}>
          {site.location}
        </p>
      </div>
    </footer>
  )
}
