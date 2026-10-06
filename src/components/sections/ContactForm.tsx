'use client'

import { useState } from 'react'
import { ArrowIcon } from '@/components/ui/Icons'
import styles from './Contact.module.css'

interface Props {
  email: string
  labels: {
    name: string
    email: string
    message: string
    namePlaceholder: string
    emailPlaceholder: string
    messagePlaceholder: string
    submit: string
    opening: string
    subject: string
  }
}

/**
 * The site is a static export, so there is no server to post to. The form composes a
 * pre-filled mail in the visitor's own email app instead (works everywhere, no spam inbox).
 */
export default function ContactForm({ email, labels }: Props) {
  const [opening, setOpening] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const from = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const subject = `${labels.subject} ${name}`.trim()
    const body = `${message}\n\n— ${name}${from ? ` (${from})` : ''}`
    setOpening(true)
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.setTimeout(() => setOpening(false), 2400)
  }

  return (
    <form className={`${styles.form} plate`} onSubmit={onSubmit} data-spot>
      <label className={styles.field}>
        <span className="mono">{labels.name}</span>
        <input name="name" type="text" required autoComplete="name" placeholder={labels.namePlaceholder} />
      </label>
      <label className={styles.field}>
        <span className="mono">{labels.email}</span>
        <input name="email" type="email" required autoComplete="email" placeholder={labels.emailPlaceholder} dir="ltr" />
      </label>
      <label className={styles.field}>
        <span className="mono">{labels.message}</span>
        <textarea name="message" required rows={5} placeholder={labels.messagePlaceholder} />
      </label>
      <button type="submit" className="btn btn--solid" data-magnetic disabled={opening}>
        {opening ? labels.opening : labels.submit}
        <ArrowIcon className="btn__arrow" />
      </button>
    </form>
  )
}
