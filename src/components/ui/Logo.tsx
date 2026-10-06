/** Monogram: notched frame, an "A" built from two strokes, and the accent dot. */
export default function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden focusable="false">
      <path d="M2 2h21l7 7v21H2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.5 24.5 16 8l7.5 16.5M11.5 19.5h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24.5" cy="7.5" r="2" fill="var(--lime)" />
    </svg>
  )
}
