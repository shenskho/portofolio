/**
 * Regenerates the static brand assets:
 *   src/app/icon.svg, src/app/apple-icon.png, src/app/favicon.ico (needs Python + Pillow for .ico)
 *   public/icons/*.png   (PWA icons)
 *   public/og/*.png      (Open Graph / Twitter cards, 1200x630, one per page and language)
 *
 * Persian text cannot be rendered by next/og (Satori has no Arabic shaping), so the cards are
 * rendered by a real browser instead and committed as plain PNGs.
 *
 * Usage:
 *   npm i -D playwright && npx playwright install chromium
 *   node scripts/generate-assets.mjs
 *
 * (In a sandbox that already has Playwright installed elsewhere, set PLAYWRIGHT_MODULE=/path/to/playwright.)
 */
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')

const font = (file) => fs.readFileSync(path.join(root, 'src/fonts', file)).toString('base64')
const fontCss = `
@font-face{font-family:'Brico';src:url(data:font/woff2;base64,${font('bricolage-latin.woff2')}) format('woff2');font-weight:200 800;font-stretch:75% 100%}
@font-face{font-family:'Mono';src:url(data:font/woff2;base64,${font('jetbrains-mono-latin.woff2')}) format('woff2');font-weight:100 800}
@font-face{font-family:'Vazir';src:url(data:font/woff2;base64,${font('vazirmatn-arabic.woff2')}) format('woff2');font-weight:100 900}
`

/* ───────────── icon ───────────── */
const logo = (scale = 1) => `
<g transform="translate(16 16) scale(${scale}) translate(-16 -16)">
  <path d="M2 2h21l7 7v21H2z" fill="none" stroke="#ecebe4" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M8.5 24.5 16 8l7.5 16.5M11.5 19.5h9" fill="none" stroke="#ecebe4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="24.5" cy="7.5" r="2" fill="#c8ff3d"/>
</g>`
const iconSvg = (scale = 0.78, rx = 7) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="${rx}" fill="#07070a"/>${logo(scale)}</svg>`

fs.writeFileSync(path.join(root, 'src/app/icon.svg'), iconSvg())

/* ───────────── OG cards ───────────── */
const cards = {
  fa: {
    home: ['برنامه‌نویس وب<br>و طراح سایت', 'امیرحسین غلام‌پور · تهران'],
    'web-design': ['طراحی سایت', 'ریسپانسیو، سریع و آمادهٔ سئو'],
    'web-development': ['برنامه‌نویسی وب', 'اپلیکیشن و پنل با React و Redux'],
    'react-nextjs': ['توسعه با<br>React و Next.js', 'رندر سمت سرور و استاتیک با TypeScript'],
    'seo-performance': ['سئو فنی و<br>سرعت سایت', 'Core Web Vitals، Schema و Search Console'],
  },
  en: {
    home: ['Web developer<br>& website designer', 'AmirHossein GholamPour · Tehran'],
    'web-design': ['Website<br>design', 'Responsive, fast and SEO-ready'],
    'web-development': ['Web<br>development', 'Apps and dashboards with React & Redux'],
    'react-nextjs': ['React &<br>Next.js', 'Static and server rendering with TypeScript'],
    'seo-performance': ['Technical SEO<br>& speed', 'Core Web Vitals, structured data, Search Console'],
  },
}

const ogHtml = (locale, title, sub) => `<!doctype html><html lang="${locale}" dir="${locale === 'fa' ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><style>
${fontCss}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#07070a;color:#ecebe4;position:relative;overflow:hidden;font-family:'Brico','Vazir',sans-serif}
canvas{position:absolute;inset:0}
.vig{position:absolute;inset:0;background:radial-gradient(ellipse 70% 90% at ${locale === 'fa' ? '75%' : '25%'} 55%,rgba(7,7,10,.92),transparent 75%)}
.frame{position:absolute;inset:34px;border:1px solid rgba(236,235,228,.14)}
.top{position:absolute;inset:64px 72px auto;display:flex;justify-content:space-between;align-items:center;font:500 22px 'Mono','Vazir',monospace;letter-spacing:.16em;color:#a9a8a2;direction:ltr}
.dot{display:inline-block;width:12px;height:12px;border-radius:50%;background:#c8ff3d;margin-inline-end:14px}
h1{position:absolute;inset-inline:72px;inset-block-end:150px;font-size:${locale === 'fa' ? 112 : 124}px;line-height:${locale === 'fa' ? 1.2 : .94};font-weight:${locale === 'fa' ? 850 : 700};font-stretch:84%;font-variation-settings:'wdth' 84;letter-spacing:${locale === 'fa' ? 0 : '-.04em'}}
.sub{position:absolute;inset-inline:72px;inset-block-end:72px;font-size:34px;color:#c8ff3d;font-weight:500}
.tags{position:absolute;inset-inline:72px;inset-block-start:64px}
</style></head><body>
<canvas id="c" width="1200" height="630"></canvas><div class="vig"></div><div class="frame"></div>
<div class="top"><span><i class="dot"></i>AMIRHOSSEIN GHOLAMPOUR</span><span>REACT · NEXT.JS · TYPESCRIPT</span></div>
<h1>${title}</h1><p class="sub">${sub}</p>
<script>
const c=document.getElementById('c'),x=c.getContext('2d');const fx=${locale === 'fa' ? 330 : 870},fy=300;
let seed=7;const rnd=()=>((seed=(seed*16807)%2147483647)/2147483647);
const dim=new Path2D(),hot=new Path2D();
for(let gy=0;gy<=630;gy+=30)for(let gx=0;gx<=1200;gx+=30){
  const dx=fx-gx,dy=fy-gy,d=Math.hypot(dx,dy),k=Math.max(0,1-d/420);
  const a=Math.atan2(dy,dx)*(0.35+k*.65)+Math.sin(gx*.02+gy*.017)*(1-k)*1.4,len=7+k*16,p=k>.28?hot:dim;
  p.moveTo(gx-Math.cos(a)*len/2,gy-Math.sin(a)*len/2);p.lineTo(gx+Math.cos(a)*len/2,gy+Math.sin(a)*len/2)}
x.lineCap='round';x.lineWidth=1.4;x.strokeStyle='rgba(236,235,228,.22)';x.stroke(dim);x.lineWidth=2;x.strokeStyle='#c8ff3d';x.stroke(hot);
</script></body></html>`

const browser = await chromium.launch({ args: ['--no-sandbox'] })

async function shot(html, file, w, h, transparent = false) {
  const page = await browser.newPage({ viewport: { width: w, height: h } })
  await page.setContent(html, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: file, omitBackground: transparent })
  await page.close()
}

const iconHtml = (svg, size) => `<!doctype html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body>`
fs.mkdirSync(path.join(root, 'public/icons'), { recursive: true })
fs.mkdirSync(path.join(root, 'public/og'), { recursive: true })

await shot(iconHtml(iconSvg(0.78, 7), 180), path.join(root, 'src/app/apple-icon.png'), 180, 180)
await shot(iconHtml(iconSvg(0.78, 7), 192), path.join(root, 'public/icons/icon-192.png'), 192, 192)
await shot(iconHtml(iconSvg(0.78, 7), 512), path.join(root, 'public/icons/icon-512.png'), 512, 512)
// Maskable icons must keep the artwork inside the central 80% and fill the whole square.
await shot(iconHtml(iconSvg(0.56, 0), 512), path.join(root, 'public/icons/icon-maskable-512.png'), 512, 512)
await shot(iconHtml(iconSvg(0.78, 7), 96), path.join(root, 'public/icons/icon-96.png'), 96, 96)

for (const [locale, pages] of Object.entries(cards)) {
  for (const [slug, [title, sub]] of Object.entries(pages)) {
    const name = slug === 'home' ? `home-${locale}.png` : `${slug}-${locale}.png`
    await shot(ogHtml(locale, title, sub), path.join(root, 'public/og', name), 1200, 630)
    console.log('og', name)
  }
}
await browser.close()

// favicon.ico (16/32/48) from the 96px PNG — Google asks for a favicon in multiples of 48px.
try {
  execFileSync('python3', [
    '-c',
    `from PIL import Image; im=Image.open(r'${path.join(root, 'public/icons/icon-96.png')}').convert('RGBA'); im.save(r'${path.join(root, 'src/app/favicon.ico')}', sizes=[(16,16),(32,32),(48,48)])`,
  ])
} catch {
  console.warn('Skipped favicon.ico (Python/Pillow not available).')
}
fs.rmSync(path.join(root, 'public/icons/icon-96.png'), { force: true })
console.log('done')
