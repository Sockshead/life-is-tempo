import { getAllPosts } from '@/lib/mdx'
import { toPost } from '@/lib/blog-utils'
import { PageLayout } from '@/components/Layout/PageLayout'
import { Section } from '@/components/Layout/Section'
import { BlogListingContent } from './BlogListingContent'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const rawPosts = getAllPosts(locale)
  const posts = rawPosts.map(({ frontmatter }) => toPost(frontmatter))

  return (
    <PageLayout locale={locale}>
      <Section py="lg">
        <BlogListingContent posts={posts} locale={locale} />
      </Section>
    </PageLayout>
  )
}
