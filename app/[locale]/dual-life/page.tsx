import { getPostsByCategory } from '@/lib/mdx'
import { toPost } from '@/lib/blog-utils'
import { PageLayout } from '@/components/Layout/PageLayout'
import { Section } from '@/components/Layout/Section'
import { CategoryPageContent } from '@/components/Blog/CategoryPageContent'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function DualLifePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const rawPosts = getPostsByCategory('dual-life', locale)
  const posts = rawPosts.map(({ frontmatter }) => toPost(frontmatter))

  return (
    <PageLayout locale={locale}>
      <Section py="lg">
        <CategoryPageContent
          posts={posts}
          categoryKey="dual-life"
          locale={locale}
        />
      </Section>
    </PageLayout>
  )
}
