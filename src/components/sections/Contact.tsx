import SectionHead from '@/components/ui/SectionHead'
import Marquee from '@/components/ui/Marquee'
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from '@/components/ui/Icons'
import { person } from '@/lib/site'
import { vars } from '@/lib/css'
import type { Content } from '@/data'
import CopyButton from './CopyButton'
import ContactForm from './ContactForm'
import styles from './Contact.module.css'

export default function Contact({ content, index = '07' }: { content: Content; index?: string }) {
  const { contact, site, ui } = content
  return (
    <section id="contact" className={`section ${styles.section}`} aria-labelledby="contact-title">
      <Marquee items={Array(6).fill(contact.marquee)} outline duration={60} />

      <div className={`wrap ${styles.wrap}`}>
        <div className={styles.layout}>
          <div>
            <SectionHead index={index} kicker={contact.kicker} title={contact.title} id="contact-title">
              <p className="lead" style={{ marginBlockStart: 'clamp(18px, 2.4vw, 30px)' }}>
                {contact.description}
              </p>
            </SectionHead>

            <ul className={styles.channels} data-reveal>
              <li className={styles.channel}>
                <MailIcon width={20} height={20} />
                <span className="mono">{ui.email}</span>
                <a href={`mailto:${person.email}`} className={`${styles.value} latin`}>
                  {person.email}
                </a>
                <CopyButton value={person.email} label={ui.copyEmail} doneLabel={ui.copied} />
              </li>
              <li className={styles.channel}>
                <PhoneIcon width={20} height={20} />
                <span className="mono">{ui.phone}</span>
                <a href={`tel:${person.phoneHref}`} className={styles.value} dir="ltr">
                  {site.phone}
                </a>
              </li>
              <li className={styles.channel}>
                <GitHubIcon width={20} height={20} />
                <span className="mono">GitHub</span>
                <a href={person.github} target="_blank" rel="me noopener noreferrer" className={`${styles.value} latin`}>
                  github.com/shenskho
                </a>
              </li>
              <li className={styles.channel}>
                <LinkedInIcon width={20} height={20} />
                <span className="mono">LinkedIn</span>
                <a href={person.linkedin} target="_blank" rel="me noopener noreferrer" className={`${styles.value} latin`}>
                  /in/amirhossein-gholampour
                </a>
              </li>
              <li className={styles.channel}>
                <DownloadIcon width={20} height={20} />
                <span className="mono">{ui.resume}</span>
                <a href={site.resumeUrl} target="_blank" rel="noopener" className={styles.value}>
                  PDF
                </a>
              </li>
            </ul>
          </div>

          <div data-reveal style={vars({ '--d': 100 })}>
            <ContactForm email={person.email} labels={contact.form} />
          </div>
        </div>
      </div>
    </section>
  )
}
