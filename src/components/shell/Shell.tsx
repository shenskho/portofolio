import '@/styles/globals.css'
import { display, mono, persian } from '@/lib/fonts'
import { dirOf, type Locale } from '@/lib/site'
import { getContent } from '@/data'
import Effects from '@/components/fx/Effects'
import Cursor from '@/components/fx/Cursor'
import Hud from '@/components/fx/Hud'
import BugHunt from '@/components/game/BugHunt'

/** The <html>/<body> shell for one locale. Each locale has its own root layout. */
export default function Shell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const content = getContent(locale)
  const fontClasses = [display.variable, mono.variable, locale === 'fa' ? persian.variable : ''].filter(Boolean).join(' ')

  return (
    <html lang={locale} dir={dirOf[locale]} className={fontClasses} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router root layouts render <head> directly */}
      <head>
        {/* Marks the page as script-enabled before first paint so reveal animations can be progressive. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip" href="#main-content">
          {content.ui.skipToContent}
        </a>
        <div className="gridlines" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <Effects />
        <Cursor />
        <Hud />
        <BugHunt g={content.game} />
        {children}
      </body>
    </html>
  )
}
