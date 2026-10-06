import type { ServicePageContent } from './types'
import type { ServiceSlug } from '@/lib/site'

const common = {
  includesTitle: 'What you get',
  forTitle: 'Who it’s for',
  processTitle: 'How it works',
  faqTitle: 'Common questions',
  ctaButton: 'Start a conversation',
  relatedTitle: 'Related services',
}

export const servicesEn: Record<ServiceSlug, ServicePageContent> = {
  'web-design': {
    ...common,
    slug: 'web-design',
    navTitle: 'Website design',
    metaTitle: 'Responsive Website Design in Tehran | AmirHossein GholamPour',
    metaDescription:
      'Fast, responsive, SEO-ready website design in Tehran. Interface design and build for company sites, brochure sites and landing pages with React and Next.js.',
    kicker: 'Website design',
    h1: 'Website design that’s fast, responsive and easy to find on Google',
    lead: 'Want a site that’s more than good-looking: smooth on mobile, quick to load and visible on Google? I handle interface design and implementation together, so there’s no gap between the design and the code, and what you approve is what goes live.',
    includes: [
      { title: 'Responsive layout', desc: 'A layout that genuinely works on mobile, tablet and desktop, not one that is merely squeezed down.' },
      { title: 'SEO-friendly structure', desc: 'A clear heading hierarchy, semantic HTML and a content structure Google can read easily.' },
      { title: 'Consistent visual identity', desc: 'Typography, colour and spacing that hold together and match your brand.' },
      { title: 'Motion where it helps', desc: 'Animation that supports understanding without slowing the site down.' },
      { title: 'Accessibility', desc: 'Good contrast, keyboard navigation and alt text for images.' },
      { title: 'Persian & English', desc: 'Correct right-to-left support and bilingual sites with proper hreflang markup.' },
    ],
    forWho: [
      'Company and brochure websites',
      'Landing pages for ads and campaigns',
      'Portfolios and online résumés',
      'Product and service pages',
    ],
    process: [
      { title: 'Talk & set goals', desc: 'I ask who the site is for, what it should do and how you’ll measure success.' },
      { title: 'Structure & interface', desc: 'I map the pages and the main layout and send them over for approval.' },
      { title: 'Build & test', desc: 'Implementation in React/Next.js, tested across screen sizes and browsers.' },
      { title: 'Launch', desc: 'Publishing, Search Console setup and a walkthrough of how to manage the site.' },
    ],
    faq: [
      {
        q: 'What’s the difference between a responsive site and a regular one?',
        a: 'A responsive site adapts its layout to the screen so it stays readable and usable on phones, tablets and computers. Google also indexes the mobile version of a site first, so responsiveness matters for SEO too.',
      },
      {
        q: 'Do you do both the design and the build?',
        a: 'Yes. I design and implement the interface myself. If you already have a design, for example in Figma, I translate it into code faithfully.',
      },
      {
        q: 'Will the site be SEO-optimised when you hand it over?',
        a: 'Technical SEO is built into every project: metadata, canonical URLs, sitemap, structured data and speed. Content and ranking for competitive keywords take ongoing work and time.',
      },
    ],
    ctaTitle: 'Let’s build your next website together',
    ctaText: 'Write a little about your business and goals, and I’ll reply as soon as I can.',
  },

  'web-development': {
    ...common,
    slug: 'web-development',
    navTitle: 'Web development',
    metaTitle: 'Web Developer | React Apps & Websites | AmirHossein GholamPour',
    metaDescription:
      'Web developer in Tehran building web apps and dashboards with React and Redux, REST API integration and modular architecture, with national-scale project experience.',
    kicker: 'Web development',
    h1: 'A web developer for websites and web applications',
    lead: 'From an admin panel to a system with thousands of users, I build the interface in React, keep application state predictable and connect it to your API. Having worked on national employment and government digital platforms means I know code has to be maintained for years.',
    includes: [
      { title: 'Single-page applications', desc: 'SPA development with React, Hooks and client-side routing.' },
      { title: 'State management', desc: 'Redux and Redux-Thunk for asynchronous, traceable data flows.' },
      { title: 'API integration', desc: 'REST API integration with Axios and Fetch, including error and loading states.' },
      { title: 'Dashboards & panels', desc: 'Tables, forms, filters and validation for everyday user work.' },
      { title: 'Modular architecture', desc: 'Reusable components so each new feature lands faster.' },
      { title: 'Clean code', desc: 'Clear naming and tidy structure, for the team that continues after me.' },
    ],
    forWho: [
      'Startups and businesses that need a web application',
      'Teams looking for frontend capacity',
      'Organisations building internal systems or admin panels',
      'Projects whose current version needs a rewrite',
    ],
    process: [
      { title: 'Requirements', desc: 'We review the user flow, the data and the existing APIs together.' },
      { title: 'Architecture', desc: 'I define component structure and state management before writing code.' },
      { title: 'Incremental delivery', desc: 'Features ship in small steps so feedback arrives early.' },
      { title: 'Test & hand-over', desc: 'Bug fixing, short documentation and maintainable code.' },
    ],
    faq: [
      {
        q: 'What does a frontend web developer do?',
        a: 'Frontend is everything a user sees and interacts with in the browser: layout, forms, tables, animation and the connection to the server through APIs. That’s the area I specialise in.',
      },
      {
        q: 'Do you work with backends?',
        a: 'I don’t write backends myself, but I work with APIs from a backend team or ready-made services, and I handle the full connection to the interface.',
      },
      {
        q: 'Can you work on an existing project?',
        a: 'Yes. I can work in an existing React codebase, add new modules, or rewrite and optimise older parts.',
      },
    ],
    ctaTitle: 'Tell me about your project',
    ctaText: 'Describe what you need in a few lines and we’ll talk scope and timing.',
  },

  'react-nextjs': {
    ...common,
    slug: 'react-nextjs',
    navTitle: 'React & Next.js',
    metaTitle: 'React & Next.js Development | AmirHossein GholamPour',
    metaDescription:
      'Websites and apps with React, Next.js and TypeScript: static and server rendering, App Router, high speed and an SEO-friendly structure.',
    kicker: 'React & Next.js',
    h1: 'React & Next.js development for sites search engines can fully read',
    lead: 'React is great for interactive interfaces, and Next.js makes it ready for the public web: pages are built ahead of time, load quickly and search engines read the full content. The site you’re on right now is built with Next.js, TypeScript and the App Router.',
    includes: [
      { title: 'Static & server rendering', desc: 'Choosing between SSG and SSR based on the content and your SEO needs.' },
      { title: 'App Router', desc: 'Modern routing, nested layouts and Server Components to cut JavaScript.' },
      { title: 'TypeScript', desc: 'Type safety so errors are caught before users meet them.' },
      { title: 'Image & font optimisation', desc: 'Self-hosted fonts and lightweight images with no layout jumps.' },
      { title: 'Metadata & structured data', desc: 'Title, description, Open Graph and JSON-LD for every page.' },
      { title: 'Flexible deployment', desc: 'Static output for any host, or run on Node and cloud platforms.' },
    ],
    forWho: [
      'Sites where being found on Google matters',
      'Bilingual and multi-page websites',
      'Products with both public pages and interactive areas',
      'Projects migrating from plain React to Next.js',
    ],
    process: [
      { title: 'Choose a rendering strategy', desc: 'I decide which pages are static and which are rendered on the server.' },
      { title: 'Skeleton & design', desc: 'Routes, layouts and the design system get set up.' },
      { title: 'Build & optimise', desc: 'Pages are built while speed and Core Web Vitals are measured.' },
      { title: 'Deploy', desc: 'Launch on your chosen host and register with Search Console.' },
    ],
    faq: [
      {
        q: 'What’s the difference between React and Next.js?',
        a: 'React is a library for building user interfaces. Next.js is a framework built on React that adds routing, static and server rendering, optimisation and SEO tooling.',
      },
      {
        q: 'Is a Next.js site better for SEO?',
        a: 'Usually yes, because the content is in the HTML from the start and crawlers don’t need to run JavaScript to read the text. Rankings don’t depend on technology alone, though.',
      },
      {
        q: 'Can it run on ordinary hosting?',
        a: 'Yes. A static export can be uploaded to any host. Server-side features need Node or a cloud platform.',
      },
    ],
    ctaTitle: 'Need a Next.js site or app?',
    ctaText: 'Tell me what you want to build and I’ll suggest the best rendering and deployment approach.',
  },

  'seo-performance': {
    ...common,
    slug: 'seo-performance',
    navTitle: 'Technical SEO',
    metaTitle: 'Technical SEO & Speed Optimisation | AmirHossein GholamPour',
    metaDescription:
      'Technical SEO and speed optimisation: Core Web Vitals, structured data, sitemaps, metadata and Search Console setup for React and Next.js websites.',
    kicker: 'Technical SEO',
    h1: 'Technical SEO & website speed optimisation',
    lead: 'Before link building and content, a site has to be technically healthy: fast, crawlable, clearly structured, with data search engines can understand. This is that foundation: no big promises, just measurable work.',
    includes: [
      { title: 'Core Web Vitals', desc: 'Measuring and improving LCP, INP and CLS for a faster experience.' },
      { title: 'Semantic structure', desc: 'Orderly headings, semantic HTML and sensible internal linking.' },
      { title: 'Metadata & canonical', desc: 'Unique titles and descriptions, canonical URLs and hreflang for bilingual sites.' },
      { title: 'Structured data', desc: 'JSON-LD for person, organisation, services, FAQ and breadcrumbs.' },
      { title: 'Sitemap & robots', desc: 'sitemap.xml, robots.txt and registration in Google Search Console.' },
      { title: 'Images, fonts & JavaScript', desc: 'Smaller payloads, smarter loading and removal of unnecessary code.' },
    ],
    forWho: [
      'New sites that need to be indexed properly',
      'Slow sites that are losing visitors',
      'Bilingual sites that need correct hreflang',
      'Teams that want a technical base before producing content',
    ],
    process: [
      { title: 'Technical audit', desc: 'Checking speed, structure, metadata and crawl errors with standard tools.' },
      { title: 'Prioritise', desc: 'A list of issues ranked by impact and cost to fix.' },
      { title: 'Implement', desc: 'Code fixes, structured data, sitemap and configuration.' },
      { title: 'Register & monitor', desc: 'Search Console setup and a look at the results in the following weeks.' },
    ],
    faq: [
      {
        q: 'What exactly is technical SEO?',
        a: 'It’s the work that helps a search engine find, read and understand your site: speed, HTML structure, sitemap, canonical URLs and structured data. Content and link building are separate parts of SEO.',
      },
      {
        q: 'Will I rank first after technical SEO?',
        a: 'Technical SEO is necessary but not sufficient. Ranking also depends on useful content, competition for the topic and the authority of the site. I don’t guarantee a specific position; I get the technical foundation right.',
      },
      {
        q: 'Do you also set up Search Console?',
        a: 'Yes. I handle ownership verification, sitemap submission and an initial indexing check as part of the project, and I explain how to read the reports.',
      },
    ],
    ctaTitle: 'Want me to look at your site?',
    ctaText: 'Send the address and we’ll go through the key technical points together.',
  },
}
