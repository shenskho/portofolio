export const locales = ['fa', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'fa'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '')

export const serviceSlugs = ['web-design', 'web-development', 'react-nextjs', 'seo-performance'] as const
export type ServiceSlug = (typeof serviceSlugs)[number]

/** Bump when page content changes materially — used for sitemap <lastmod> and JSON-LD dateModified. */
export const CONTENT_UPDATED = '2026-10-06'

export const dirOf: Record<Locale, 'rtl' | 'ltr'> = { fa: 'rtl', en: 'ltr' }
export const ogLocaleOf: Record<Locale, string> = { fa: 'fa_IR', en: 'en_US' }

export const person = {
  givenName: { fa: 'امیرحسین', en: 'AmirHossein' },
  familyName: { fa: 'غلام‌پور', en: 'GholamPour' },
  email: 'amir.pampay@gmail.com',
  phone: '+98 938 638 6407',
  phoneHref: '+989386386407',
  github: 'https://github.com/shenskho',
  linkedin: 'https://www.linkedin.com/in/amirhossein-gholampour-b6024533b/',
} as const

/**
 * Builds a site-relative path for a locale.
 *   fa (default, no prefix): '/', '/services/web-design/'
 *   en:                      '/en/', '/en/services/web-design/'
 */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path.replace(/^\/+|\/+$/g, '')
  const parts = [locale === 'en' ? 'en' : '', clean].filter(Boolean)
  return parts.length ? `/${parts.join('/')}/` : '/'
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'fa' ? 'en' : 'fa'
}

/** All routes of the site, as locale-agnostic paths ('/' = home). */
export function allPaths(): string[] {
  return ['/', ...serviceSlugs.map((slug) => `/services/${slug}`)]
}
