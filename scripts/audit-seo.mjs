/**
 * Post-build SEO audit of the static export in ./out
 *   npm run build && node scripts/audit-seo.mjs
 * Checks every HTML page for: single <h1>, title/description length, canonical, hreflang,
 * Open Graph/Twitter tags, valid JSON-LD, noindex leaks, and broken internal links/images.
 */
import fs from 'node:fs'
import path from 'node:path'

const out = path.resolve('out')
const pages = []
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === '_next' || entry.name.startsWith('__next') || entry.name === '_not-found' || entry.name === '404') continue
      walk(full)
    } else if (entry.name === 'index.html') pages.push(full)
  }
}
walk(out)

let problems = 0
const fail = (page, msg) => {
  problems++
  console.log(`  ✗ ${msg}`)
}
const exists = (href) => {
  const clean = href.split('#')[0].split('?')[0]
  if (!clean) return true
  const p = path.join(out, clean)
  return fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, 'index.html')))
}

for (const file of pages.sort()) {
  const rel = path.relative(out, file) || 'index.html'
  const html = fs.readFileSync(file, 'utf8')
  console.log(`\n${rel}`)
  const get = (re) => html.match(re)?.[1]

  const title = get(/<title>([^<]*)<\/title>/)
  const desc = get(/<meta name="description" content="([^"]*)"/)
  const h1s = (html.match(/<h1[\s>]/g) || []).length
  const canonical = get(/<link rel="canonical" href="([^"]*)"/)
  const hreflangs = [...html.matchAll(/<link rel="alternate" hrefLang="([^"]*)" href="([^"]*)"/g)].map((m) => m[1])
  const lang = get(/<html lang="([^"]*)"/)

  if (!title) fail(rel, 'missing <title>')
  else if (title.length > 75) fail(rel, `title is long (${title.length} chars)`)
  if (!desc) fail(rel, 'missing meta description')
  else if (desc.length < 70 || desc.length > 175) fail(rel, `description length ${desc.length}`)
  if (h1s !== 1) fail(rel, `expected exactly one <h1>, found ${h1s}`)
  if (!canonical) fail(rel, 'missing canonical')
  for (const need of ['fa', 'en', 'x-default']) if (!hreflangs.includes(need)) fail(rel, `missing hreflang ${need}`)
  if (!/property="og:image"/.test(html)) fail(rel, 'missing og:image')
  if (!/name="twitter:card"/.test(html)) fail(rel, 'missing twitter:card')
  if (/noindex/.test(html)) fail(rel, 'contains noindex')
  if (!lang) fail(rel, 'missing <html lang>')

  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  if (!ld.length) fail(rel, 'no JSON-LD')
  for (const m of ld) {
    try {
      const data = JSON.parse(m[1])
      const types = (data['@graph'] ?? [data]).map((n) => n['@type']).join(', ')
      console.log(`  JSON-LD: ${types}`)
    } catch (e) {
      fail(rel, `invalid JSON-LD: ${e.message}`)
    }
  }

  for (const m of html.matchAll(/(?:href|src)="(\/[^"#]*)[^"]*"/g)) {
    const link = m[1]
    if (link.startsWith('//') || link.startsWith('/_next/')) continue
    if (!exists(link)) fail(rel, `broken internal reference ${link}`)
  }
  console.log(`  title(${title?.length}) desc(${desc?.length}) h1(${h1s}) lang(${lang}) canonical(${canonical})`)
}

for (const f of ['sitemap.xml', 'robots.txt', 'llms.txt', 'llms-full.txt', 'manifest.webmanifest', '404.html']) {
  if (!fs.existsSync(path.join(out, f))) {
    problems++
    console.log(`\n✗ missing ${f}`)
  }
}
const sitemap = fs.existsSync(path.join(out, 'sitemap.xml')) ? fs.readFileSync(path.join(out, 'sitemap.xml'), 'utf8') : ''
const urls = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1])
console.log(`\nsitemap: ${urls.length} URLs (expected ${pages.length})`)
if (urls.length !== pages.length) problems++
console.log(problems ? `\n${problems} problem(s)` : '\nAll checks passed ✓')
process.exit(problems ? 1 : 0)
