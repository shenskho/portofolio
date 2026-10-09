'use client'

import { useRef, useState } from 'react'
import { CheckIcon, CopyIcon } from '@/components/ui/Icons'
import { vars } from '@/lib/css'
import styles from './Contact.module.css'

interface Spark {
  id: number
  dx: number
  dy: number
}

export default function CopyButton({ value, label, doneLabel }: { value: string; label: string; doneLabel: string }) {
  const [done, setDone] = useState(false)
  const [sparks, setSparks] = useState<Spark[]>([])
  const timer = useRef(0)
  const counter = useRef(0)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Clipboard API can be blocked (insecure context): fall back to a temporary textarea.
      const ta = document.createElement('textarea')
      ta.value = value
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setDone(true)
    const base = counter.current
    counter.current += 14
    setSparks(
      Array.from({ length: 14 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.4
        const dist = 38 + Math.random() * 44
        return { id: base + i, dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist }
      }),
    )
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setDone(false)
      setSparks([])
    }, 1800)
  }

  return (
    <button type="button" className={styles.copy} onClick={copy} aria-label={label} data-done={done ? '' : undefined}>
      {done ? <CheckIcon width={18} height={18} /> : <CopyIcon width={18} height={18} />}
      <span className="sr-only" role="status">
        {done ? doneLabel : ''}
      </span>
      {sparks.map((s) => (
        <i key={s.id} className={styles.spark} style={vars({ '--dx': `${s.dx}px`, '--dy': `${s.dy}px` })} aria-hidden="true" />
      ))}
    </button>
  )
}
