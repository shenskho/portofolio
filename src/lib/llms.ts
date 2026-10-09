import { getContent, getService } from '@/data'
import { absoluteUrl, localePath, person, serviceSlugs, type Locale } from './site'

const url = (locale: Locale, path = '/') => absoluteUrl(localePath(locale, path))

/** /llms.txt — concise, link-first summary for AI assistants (llmstxt.org format). */
export function buildLlmsTxt(): string {
  const en = getContent('en')
  const fa = getContent('fa')
  const lines: string[] = [
    `# ${en.site.name} (${fa.site.name}) — Web Developer & Website Designer in Tehran`,
    '',
    `> ${en.meta.description}`,
    '',
    `${en.site.name} is a frontend/web developer based in Tehran, Iran, with 2.5+ years of professional experience building React applications and government digital services. He designs and builds fast, responsive, SEO-ready websites with React, Next.js and TypeScript. His professional experience is mostly React applications (Redux, REST APIs); Next.js and TypeScript are skills he is actively deepening and used to build this site. Persian: ${fa.meta.description}`,
    '',
    '## Pages',
    `- [Home (فارسی)](${url('fa')}): ${fa.meta.title}`,
    `- [Home (English)](${url('en')}): ${en.meta.title}`,
    '',
    '## Services',
    ...serviceSlugs.flatMap((slug) => {
      const f = getService('fa', slug)
      const e = getService('en', slug)
      return [
        `- [${e.navTitle}](${url('en', `/services/${slug}`)}): ${e.metaDescription}`,
        `- [${f.navTitle}](${url('fa', `/services/${slug}`)}): ${f.metaDescription}`,
      ]
    }),
    '',
    '## Contact & profiles',
    `- Email: ${person.email}`,
    `- Phone: ${person.phone}`,
    `- GitHub: ${person.github}`,
    `- LinkedIn: ${person.linkedin}`,
    '',
    '## Optional',
    `- [Full text of this site](${absoluteUrl('/llms-full.txt')})`,
    `- [Sitemap](${absoluteUrl('/sitemap.xml')})`,
    '',
  ]
  return lines.join('\n')
}

/** /llms-full.txt — the site's substantive content as plain markdown, both languages. */
export function buildLlmsFullTxt(): string {
  const out: string[] = [`# AmirHossein GholamPour — full site content`, '']
  for (const locale of ['en', 'fa'] as const) {
    const c = getContent(locale)
    out.push(`## ${locale === 'en' ? 'English' : 'فارسی'}`, '', `### ${c.meta.title}`, '', c.meta.description, '')
    out.push(`#### ${c.about.title}`, '', ...c.about.paragraphs.flatMap((p) => [p, '']))
    out.push(`#### ${c.about.factsTitle}`, '', ...c.about.facts.map((f) => `- ${f.label}: ${f.value}`), '')
    out.push(`#### ${c.services.title}`, '', ...c.services.items.map((s) => `- **${s.title}** (${url(locale, `/services/${s.slug}`)}): ${s.description}`), '')
    out.push(`#### ${c.projects.title}`, '', ...c.projects.items.map((p) => `- **${p.title}** (${p.year}): ${p.description} [${p.tags.join(', ')}]`), '')
    out.push(`#### ${c.experience.title}`, '', ...c.experience.items.map((x) => `- **${x.role}**, ${x.company} (${x.location}), ${x.period}: ${x.description}`), '')
    out.push(`#### ${c.education.title}`, '', ...c.education.items.map((x) => `- **${x.title}**, ${x.institution}, ${x.period}`), '')
    out.push(`#### ${c.faq.title}`, '', ...c.faq.items.flatMap((q) => [`**${q.q}**`, q.a, '']))
    for (const slug of serviceSlugs) {
      const s = getService(locale, slug)
      out.push(`#### ${s.h1}`, '', s.lead, '', ...s.includes.map((i) => `- **${i.title}**: ${i.desc}`), '')
      out.push(...s.faq.flatMap((q) => [`**${q.q}**`, q.a, '']))
    }
  }
  return out.join('\n')
}
