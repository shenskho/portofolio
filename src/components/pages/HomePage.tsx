import Frame from '@/components/shell/Frame'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Faq from '@/components/sections/Faq'
import Contact from '@/components/sections/Contact'
import Marquee from '@/components/ui/Marquee'
import JsonLd, { homeGraph } from '@/lib/jsonld'
import { findPortrait } from '@/lib/portrait'
import { getContent, marqueeTech } from '@/data'
import type { Locale } from '@/lib/site'

export default function HomePage({ locale }: { locale: Locale }) {
  const content = getContent(locale)
  const portrait = findPortrait()

  return (
    <Frame locale={locale} path="/">
      <JsonLd data={homeGraph(locale, portrait?.src)} />
      <Hero locale={locale} content={content} />
      <Marquee items={marqueeTech} duration={46} label={marqueeTech.join(', ')} />
      <About content={content} portraitSrc={portrait?.src ?? null} />
      <Services locale={locale} content={content} />
      <Marquee items={[...marqueeTech].reverse()} reverse outline duration={58} decorative />
      <Skills locale={locale} content={content} />
      <Projects content={content} />
      <Experience content={content} />
      <Faq kicker={content.faq.kicker} title={content.faq.title} items={content.faq.items} />
      <Contact content={content} />
    </Frame>
  )
}
