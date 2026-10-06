import type { Metadata } from 'next'
import '@/styles/globals.css'
import { display, mono, persian } from '@/lib/fonts'
import { getContent } from '@/data'

export const metadata: Metadata = {
  title: '404 | AmirHossein GholamPour',
  robots: { index: false, follow: false },
}

/** Shown for any URL that matches no route. Bilingual because the locale cannot be known here. */
export default function GlobalNotFound() {
  const fa = getContent('fa')
  const en = getContent('en')
  return (
    <html lang="fa" dir="rtl" className={`${display.variable} ${mono.variable} ${persian.variable}`}>
      <body>
        <div className="gridlines" aria-hidden="true" />
        <main
          style={{
            position: 'relative',
            zIndex: 1,
            minHeight: '100svh',
            display: 'grid',
            placeItems: 'center',
            padding: '40px var(--gutter)',
            textAlign: 'center',
          }}
        >
          <div>
            <p
              className="latin"
              style={{
                fontSize: 'clamp(7rem, 30vw, 20rem)',
                fontWeight: 800,
                lineHeight: 0.85,
                letterSpacing: '-0.06em',
                color: 'transparent',
                WebkitTextStroke: '1px var(--lime)',
              }}
            >
              404
            </p>
            <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', marginBlockStart: 24 }}>{fa.ui.notFoundTitle}</h1>
            <p style={{ color: 'var(--fg-1)', marginBlockStart: 8 }}>{fa.ui.notFoundText}</p>
            <p dir="ltr" lang="en" style={{ color: 'var(--fg-2)', marginBlockStart: 16 }}>
              {en.ui.notFoundTitle}. {en.ui.notFoundText}
            </p>
            <p style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBlockStart: 32 }}>
              {/* Plain anchors on purpose: this page has no router context and the two locales are separate root layouts. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a className="btn btn--solid" href="/">
                {fa.ui.notFoundCta}
              </a>
              <a className="btn" href="/en/" lang="en" dir="ltr">
                {en.ui.notFoundCta}
              </a>
            </p>
          </div>
        </main>
      </body>
    </html>
  )
}
