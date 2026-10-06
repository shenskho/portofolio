import type { ServiceSlug } from '@/lib/site'

export interface QA {
  q: string
  a: string
}

export type IconName =
  | 'landmark'
  | 'blocks'
  | 'refresh'
  | 'plug'
  | 'layout'
  | 'code'
  | 'react'
  | 'gauge'

export type SkillKind = 'core' | 'tools' | 'learning' | 'practice'

export interface Skill {
  name: string
  level: number
  learning?: boolean
}

export interface Project {
  id: number
  year: string
  title: string
  description: string
  tags: string[]
  featured: boolean
  cover: 'graph' | 'ledger' | 'shield'
}

export interface TimelineItem {
  role: string
  company: string
  location: string
  period: string
  description: string
  tags: string[]
}

export interface ServiceSummary {
  slug: ServiceSlug
  title: string
  description: string
  tags: string[]
}

export interface Content {
  meta: { title: string; description: string }
  site: {
    name: string
    altName: string
    jobTitle: string
    tagline: string
    availability: string
    location: string
    city: string
    resumeUrl: string
    phone: string
  }
  nav: { label: string; href: string }[]
  ui: Record<
    | 'skipToContent'
    | 'primaryNavigation'
    | 'resume'
    | 'openMenu'
    | 'closeMenu'
    | 'switchLanguage'
    | 'switchLanguageLabel'
    | 'languageShort'
    | 'play'
    | 'stopPlay'
    | 'email'
    | 'phone'
    | 'location'
    | 'status'
    | 'featured'
    | 'codeSamples'
    | 'viewRepository'
    | 'scrollDown'
    | 'learning'
    | 'copyEmail'
    | 'copied'
    | 'backToTop'
    | 'readMore'
    | 'allServices'
    | 'breadcrumbHome'
    | 'home'
    | 'notFoundTitle'
    | 'notFoundText'
    | 'notFoundCta',
    string
  >
  hero: {
    eyebrow: string
    lines: string[]
    markedLine: number
    stack: string
    lead: string
    roles: string[]
    rolesLabel: string
    ctaPrimary: { label: string; href: string }
    ctaSecondary: { label: string; href: string }
    stats: { value: number; decimals: number; suffix: string; label: string }[]
  }
  about: {
    kicker: string
    title: string
    paragraphs: string[]
    highlights: { icon: IconName; title: string; desc: string }[]
    factsTitle: string
    facts: { label: string; value: string }[]
    portrait: {
      alt: string
      dropTitle: string
      dropHint: string
      dropDragging: string
      dropError: string
      previewNote: string
      download: string
      reset: string
      scanLabel: string
      orbit: string[]
      backWord: string
    }
  }
  services: {
    kicker: string
    title: string
    intro: string
    cta: string
    items: ServiceSummary[]
  }
  skills: {
    kicker: string
    title: string
    intro: string
    playHint: string
    shake: string
    sheetTitle: string
    legend: Record<SkillKind, string>
    groups: { name: string; skills: Skill[] }[]
    pills: { name: string; kind: SkillKind }[]
  }
  projects: {
    kicker: string
    title: string
    subtitle: string
    items: Project[]
    samplesTitle: string
    samples: { label: string; url: string }[]
  }
  experience: { kicker: string; title: string; subtitle: string; items: TimelineItem[] }
  education: {
    kicker: string
    title: string
    subtitle: string
    items: { type: string; title: string; institution: string; period: string; description: string }[]
  }
  faq: { kicker: string; title: string; items: QA[] }
  contact: {
    kicker: string
    title: string
    description: string
    marquee: string
    form: {
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
  footer: { copyright: string; built: string }
  game: {
    title: string
    start: string
    score: string
    time: string
    best: string
    again: string
    close: string
    resultGood: string
    resultOk: string
    hint: string
  }
}

export interface ServicePageContent {
  slug: ServiceSlug
  navTitle: string
  metaTitle: string
  metaDescription: string
  kicker: string
  h1: string
  lead: string
  includesTitle: string
  includes: { title: string; desc: string }[]
  forTitle: string
  forWho: string[]
  processTitle: string
  process: { title: string; desc: string }[]
  faqTitle: string
  faq: QA[]
  ctaTitle: string
  ctaText: string
  ctaButton: string
  relatedTitle: string
}
