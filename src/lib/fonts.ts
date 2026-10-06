import localFont from 'next/font/local'

// Self-hosted (no request to Google Fonts — faster, and reachable from Iran).
// Variable fonts: one file covers every weight we use.

/** Latin display + body. Variable weight (200–800) and width (75–100). */
export const display = localFont({
  src: '../fonts/bricolage-latin.woff2',
  variable: '--ff-display',
  weight: '200 800',
  display: 'swap',
  declarations: [{ prop: 'font-stretch', value: '75% 100%' }],
})

/** Mono for labels, HUD, code. */
export const mono = localFont({
  src: '../fonts/jetbrains-mono-latin.woff2',
  variable: '--ff-mono',
  weight: '100 800',
  display: 'swap',
})

/** Persian / Arabic script (Vazirmatn, SIL OFL). Only imported by the Persian layout. */
export const persian = localFont({
  src: '../fonts/vazirmatn-arabic.woff2',
  variable: '--ff-fa',
  weight: '100 900',
  display: 'swap',
})
