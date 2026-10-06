import { CONTENT_UPDATED, SITE_URL, absoluteUrl, localePath, person, serviceSlugs, type Locale, type ServiceSlug } from './site'
import { getContent, getService } from '@/data'

type Json = Record<string, unknown>

const ID = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
}

const knowsAbout = [
  'Web development',
  'Web design',
  'Responsive web design',
  'Frontend development',
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Redux',
  'REST API integration',
  'Technical SEO',
  'Core Web Vitals',
  'برنامه‌نویسی وب',
  'طراحی سایت',
  'توسعه فرانت‌اند',
]

function personNode(locale: Locale, portraitSrc?: string): Json {
  const c = getContent(locale)
  return {
    '@type': 'Person',
    '@id': ID.person,
    name: c.site.name,
    alternateName: [c.site.altName],
    givenName: locale === 'fa' ? person.givenName.fa : person.givenName.en,
    familyName: locale === 'fa' ? person.familyName.fa : person.familyName.en,
    jobTitle: c.site.jobTitle,
    description: c.meta.description,
    url: absoluteUrl(localePath(locale)),
    ...(portraitSrc ? { image: absoluteUrl(portraitSrc) } : {}),
    email: `mailto:${person.email}`,
    sameAs: [person.github, person.linkedin],
    knowsAbout,
    knowsLanguage: ['fa', 'en'],
    address: { '@type': 'PostalAddress', addressLocality: locale === 'fa' ? 'تهران' : 'Tehran', addressCountry: 'IR' },
    homeLocation: { '@type': 'Place', name: locale === 'fa' ? 'تهران، ایران' : 'Tehran, Iran' },
    worksFor: {
      '@type': 'Organization',
      name: locale === 'fa' ? 'شرکت تعاونی پژوهشگران رایانگان فردیس' : 'Faradis Computer Researchers Cooperative Co.',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: locale === 'fa' ? 'دانشگاه آزاد اسلامی واحد شهریار' : 'Islamic Azad University, Shahriar',
    },
  }
}

function websiteNode(locale: Locale): Json {
  const c = getContent(locale)
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: absoluteUrl('/'),
    name: c.site.name,
    alternateName: c.site.altName,
    inLanguage: ['fa', 'en'],
    publisher: { '@id': ID.person },
  }
}

function serviceNode(locale: Locale, slug: ServiceSlug): Json {
  const s = getService(locale, slug)
  const url = absoluteUrl(localePath(locale, `/services/${slug}`))
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: s.navTitle,
    serviceType: s.navTitle,
    description: s.metaDescription,
    url,
    provider: { '@id': ID.person },
    areaServed: [
      { '@type': 'Country', name: 'Iran' },
      { '@type': 'City', name: 'Tehran' },
    ],
    availableLanguage: ['fa', 'en'],
  }
}

function faqNode(qa: { q: string; a: string }[]): Json {
  return {
    '@type': 'FAQPage',
    mainEntity: qa.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

export function homeGraph(locale: Locale, portraitSrc?: string): Json {
  const c = getContent(locale)
  const url = absoluteUrl(localePath(locale))
  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(locale),
      personNode(locale, portraitSrc),
      {
        '@type': 'ProfilePage',
        '@id': `${url}#webpage`,
        url,
        name: c.meta.title,
        description: c.meta.description,
        inLanguage: locale,
        isPartOf: { '@id': ID.website },
        mainEntity: { '@id': ID.person },
        dateModified: CONTENT_UPDATED,
        ...(portraitSrc ? { primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(portraitSrc) } } : {}),
      },
      ...serviceSlugs.map((slug) => serviceNode(locale, slug)),
      { ...faqNode(c.faq.items), '@id': `${url}#faq` },
    ],
  }
}

export function serviceGraph(locale: Locale, slug: ServiceSlug, portraitSrc?: string): Json {
  const c = getContent(locale)
  const s = getService(locale, slug)
  const url = absoluteUrl(localePath(locale, `/services/${slug}`))
  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(locale),
      personNode(locale, portraitSrc),
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: s.metaTitle,
        description: s.metaDescription,
        inLanguage: locale,
        isPartOf: { '@id': ID.website },
        about: { '@id': `${url}#service` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        dateModified: CONTENT_UPDATED,
      },
      serviceNode(locale, slug),
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: c.ui.breadcrumbHome, item: absoluteUrl(localePath(locale)) },
          { '@type': 'ListItem', position: 2, name: s.navTitle, item: url },
        ],
      },
      { ...faqNode(s.faq), '@id': `${url}#faq` },
    ],
  }
}

export default function JsonLd({ data }: { data: Json }) {
  // `<` is escaped so a stray "</script>" in content can never break out of the tag.
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
