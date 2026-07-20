import { useState } from 'react'
import { contactConfig, siteConfig, socialLinks } from '../../data/portfolio'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import GlowCard from '../ui/GlowCard'

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormState({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <SectionHeading subtitle={contactConfig.subtitle} title={contactConfig.title} />

        <div className="contact__grid">
          <div className="contact__info">
            <p className="contact__desc">{contactConfig.description}</p>

            <div className="contact__details">
              <a href={`mailto:${siteConfig.email}`} className="contact__detail">
                <span className="contact__detail-icon">✉</span>
                <div>
                  <span className="contact__detail-label">Email</span>
                  <span>{siteConfig.email}</span>
                </div>
              </a>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="contact__detail">
                <span className="contact__detail-icon">📞</span>
                <div>
                  <span className="contact__detail-label">Phone</span>
                  <span>{siteConfig.phone}</span>
                </div>
              </a>
              <div className="contact__detail">
                <span className="contact__detail-icon">📍</span>
                <div>
                  <span className="contact__detail-label">Location</span>
                  <span>{siteConfig.location}</span>
                </div>
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
                <label htmlFor="name">{contactConfig.formFields.name}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="contact__field">
                <label htmlFor="email">{contactConfig.formFields.email}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>
              <div className="contact__field">
                <label htmlFor="message">{contactConfig.formFields.message}</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                />
              </div>
              <Button type="submit" variant="primary" className="contact__submit">
                {submitted ? '✓ Message Sent!' : contactConfig.formFields.submit}
              </Button>
            </form>
          </GlowCard>
        </div>
      </div>
    </section>
  )
}
