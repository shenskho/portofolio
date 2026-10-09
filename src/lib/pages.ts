import type { Metadata } from 'next'
import { getContent, getService } from '@/data'
import { buildMetadata } from './seo'
import type { Locale, ServiceSlug } from './site'

export function homeMetadata(locale: Locale): Metadata {
  const c = getContent(locale)
  return buildMetadata({
    locale,
    path: '/',
    title: c.meta.title,
    description: c.meta.description,
    ogImage: `/og/home-${locale}.png`,
    ogAlt: c.meta.title,
  })
}

export function serviceMetadata(locale: Locale, slug: ServiceSlug): Metadata {
  const s = getService(locale, slug)
  return buildMetadata({
    locale,
    path: `/services/${slug}`,
    title: s.metaTitle,
    description: s.metaDescription,
    ogImage: `/og/${slug}-${locale}.png`,
    ogAlt: s.h1,
  })
}
