import { PageLayout } from '@/components/Layout/PageLayout'
import { HomeContent } from './HomeContent'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <PageLayout locale={locale}>
      <HomeContent locale={locale} />
    </PageLayout>
  )
}
