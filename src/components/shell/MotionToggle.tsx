'use client'

import { setCalmSwitch, useCalmSwitch } from '@/lib/motion'
import styles from './Nav.module.css'

/** WCAG 2.2.2: a visible way to stop all auto-moving content (marquees, cycling roles, canvas, physics). */
export default function MotionToggle({ label, className = '' }: { label: string; className?: string }) {
  const calm = useCalmSwitch()
  return (
    <button
      type="button"
      className={`${styles.motion} ${className}`}
      aria-pressed={calm}
      onClick={() => setCalmSwitch(!calm)}
      title={label}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        {calm ? <path d="M7 4.5v15l12-7.5z" /> : <path d="M6 4h4v16H6zM14 4h4v16h-4z" />}
      </svg>
      <span>{label}</span>
    </button>
  )
}
