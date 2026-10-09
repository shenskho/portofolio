import '@/styles/globals.css'
import { display, mono, persian, persianLazy } from '@/lib/fonts'
import { dirOf, type Locale } from '@/lib/site'
import { getContent } from '@/data'
import Effects from '@/components/fx/Effects'
import Cursor from '@/components/fx/Cursor'
import Hud from '@/components/fx/Hud'
import BugHunt from '@/components/game/BugHunt'

/** The <html>/<body> shell for one locale. Each locale has its own root layout. */
export default function Shell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const content = getContent(locale)
  // The English pages only need Persian glyphs for the one-word language switch, so that font loads lazily there.
  const fontClasses = [display.variable, mono.variable, locale === 'fa' ? persian.variable : persianLazy.variable].join(' ')

  return (
    <html lang={locale} dir={dirOf[locale]} className={fontClasses} data-scroll-behavior="smooth" suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router root layouts render <head> directly */}
      <head>
        {/* Before first paint: mark the page script-enabled (progressive reveal) and restore the visitor's "pause motion" choice. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var r=document.documentElement;r.classList.add('js');try{if(localStorage.getItem('motion')==='calm')r.setAttribute('data-calm','')}catch(e){}",
          }}
        />
      </head>
      <body id="top">
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
