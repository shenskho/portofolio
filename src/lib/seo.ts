import type { Metadata } from 'next'
import { SITE_URL, absoluteUrl, localePath, ogLocaleOf, otherLocale, type Locale } from './site'

interface BuildArgs {
  locale: Locale
  /** locale-agnostic path, '/' for home, '/services/web-design' for a service */
  path: string
  title: string
  description: string
  ogImage: string
  ogAlt: string
}

const verification = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  yandex: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION || undefined,
  other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
    ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
    : undefined,
}

export function buildMetadata({ locale, path, title, description, ogImage, ogAlt }: BuildArgs): Metadata {
  const canonical = localePath(locale, path)
  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: {
        fa: localePath('fa', path),
        en: localePath('en', path),
        'x-default': localePath('fa', path),
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      siteName: locale === 'fa' ? 'امیرحسین غلام‌پور' : 'AmirHossein GholamPour',
      locale: ogLocaleOf[locale],
      alternateLocale: ogLocaleOf[otherLocale(locale)],
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    },
    authors: [{ name: 'AmirHossein GholamPour', url: SITE_URL }],
    creator: 'AmirHossein GholamPour',
    applicationName: 'AmirHossein GholamPour',
    category: 'technology',
    verification,
    other: { 'geo.region': 'IR-07', 'geo.placename': locale === 'fa' ? 'تهران' : 'Tehran' },
  }
}

export { absoluteUrl }
