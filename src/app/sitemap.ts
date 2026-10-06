import type { MetadataRoute } from 'next'
import { CONTENT_UPDATED, absoluteUrl, allPaths, localePath, locales } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return allPaths().flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, path)),
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : 0.8,
      alternates: {
        languages: {
          fa: absoluteUrl(localePath('fa', path)),
          en: absoluteUrl(localePath('en', path)),
          'x-default': absoluteUrl(localePath('fa', path)),
        },
      },
    })),
  )
}
