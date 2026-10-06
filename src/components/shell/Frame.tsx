import { getContent } from '@/data'
import { localePath, otherLocale, type Locale } from '@/lib/site'
import Nav from './Nav'
import Footer from './Footer'

/** Navigation + <main> + footer, shared by every page. `path` is locale-agnostic ('/' for home). */
export default function Frame({ locale, path, children }: { locale: Locale; path: string; children: React.ReactNode }) {
  const content = getContent(locale)
  const altHref = localePath(otherLocale(locale), path)
  return (
    <>
      <Nav
        homeHref={localePath(locale)}
        altHref={altHref}
        isHome={path === '/'}
        name={content.site.name}
        links={content.nav}
        ui={content.ui}
        resumeUrl={content.site.resumeUrl}
      />
      <main id="main-content">{children}</main>
      <Footer content={content} altHref={altHref} />
    </>
  )
}
