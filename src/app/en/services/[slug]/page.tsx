import { notFound } from 'next/navigation'
import ServicePage from '@/components/pages/ServicePage'
import { serviceMetadata } from '@/lib/pages'
import { serviceSlugs, type ServiceSlug } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }))
}

function parse(slug: string): ServiceSlug {
  if (!(serviceSlugs as readonly string[]).includes(slug)) notFound()
  return slug as ServiceSlug
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return serviceMetadata('en', parse(slug))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ServicePage locale="en" slug={parse(slug)} />
}
