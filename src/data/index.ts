import type { Locale, ServiceSlug } from '@/lib/site'
import { fa } from './fa'
import { en } from './en'
import { servicesFa } from './services-fa'
import { servicesEn } from './services-en'
import type { Content, ServicePageContent } from './types'

export function getContent(locale: Locale): Content {
  return locale === 'fa' ? fa : en
}

export function getService(locale: Locale, slug: ServiceSlug): ServicePageContent {
  return (locale === 'fa' ? servicesFa : servicesEn)[slug]
}

export { socialLinks, marqueeTech } from './shared'
export type { Content, ServicePageContent } from './types'
