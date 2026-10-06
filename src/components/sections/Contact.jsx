import { useEffect, useState } from 'react'
import { socialLinks } from '../../data/portfolio'
import { useLocale } from '../../hooks/useLocale'
import Button from '../ui/Button'
import GlowCard from '../ui/GlowCard'
import SectionHeading from '../ui/SectionHeading'

const initialFormState = { name: '', email: '', message: '' }

export default function Contact() {
  const { content } = useLocale()
  const { contact, site, ui } = content
  const [formState, setFormState] = useState(initialFormState)
  const [isComposing, setIsComposing] = useState(false)

  useEffect(() => {
    if (!isComposing) return undefined

    const timeout = window.setTimeout(() => setIsComposing(false), 3000)
    return () => window.clearTimeout(timeout)
  }, [isComposing])

  const handleSubmit = (event) => {
    event.preventDefault()

    const subject = `${contact.emailSubject} ${formState.name}`
    const body = [
      `${ui.email}: ${formState.email}`,
      `${contact.formFields.name}: ${formState.name}`,
      '',
      formState.message,
    ].join('\n')

    setIsComposing(true)
    window.location.assign(
      `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    )
  }

  const handleChange = (event) => {
    setFormState((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <SectionHeading subtitle={contact.subtitle} title={contact.title} />

        <div className="contact__grid">
          <div className="contact__info">
            <p className="contact__desc">{contact.description}</p>

            <div className="contact__details">
              <a href={`mailto:${site.email}`} className="contact__detail">
                <span className="contact__detail-icon" aria-hidden="true">✉</span>
                <span className="contact__detail-copy">
                  <span className="contact__detail-label">{ui.email}</span>
                  <bdi dir="ltr">{site.email}</bdi>
                </span>
              </a>

              <a href={`tel:${site.phoneHref}`} className="contact__detail">
                <span className="contact__detail-icon" aria-hidden="true">☎</span>
                <span className="contact__detail-copy">
                  <span className="contact__detail-label">{ui.phone}</span>
                  <bdi dir="ltr">{site.phone}</bdi>
                </span>
              </a>

              <div className="contact__detail">
                <span className="contact__detail-icon" aria-hidden="true">⌖</span>
                <span className="contact__detail-copy">
                  <span className="contact__detail-label">{ui.location}</span>
                  <span>{site.location}</span>
                </span>
              </div>
            </div>

            <div className="contact__social">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <GlowCard className="contact__form-card">
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label htmlFor="name">{contact.formFields.name}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  dir="auto"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder={contact.formFields.namePlaceholder}
                />
              </div>

              <div className="contact__field">
                <label htmlFor="email">{contact.formFields.email}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  dir="ltr"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder={contact.formFields.emailPlaceholder}
                />
              </div>

              <div className="contact__field">
                <label htmlFor="message">{contact.formFields.message}</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  dir="auto"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder={contact.formFields.messagePlaceholder}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="contact__submit"
                disabled={isComposing}
              >
                {isComposing ? contact.formFields.opening : contact.formFields.submit}
              </Button>

              <p className="contact__form-status" role="status" aria-live="polite">
                {isComposing ? contact.formFields.opening : ''}
              </p>
            </form>
          </GlowCard>
        </div>
      </div>
    </section>
  )
}
