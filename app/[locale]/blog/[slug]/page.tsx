import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPosts, getPostSlugs } from '@/lib/mdx'
import { toPost, extractHeadings } from '@/lib/blog-utils'
import { mdxComponents } from '@/components/MDX/MDXComponents'
import { MDXLayout } from '@/components/MDX/MDXLayout'
import { PageLayout } from '@/components/Layout/PageLayout'
import { BlogPostClientShell } from './BlogPostClientShell'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = []

  for (const locale of routing.locales) {
    const slugs = getPostSlugs(locale)
    for (const slug of slugs) {
      params.push({ locale, slug })
    }
  }

  return params
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const { frontmatter, content } = getPostBySlug(slug, locale)
  const headings = extractHeadings(content)
  const allPosts = getAllPosts(locale).map(({ frontmatter: fm }) => toPost(fm))

  return (
    <PageLayout locale={locale}>
      <BlogPostClientShell
        headings={headings}
        allPosts={allPosts}
        currentSlug={slug}
        category={frontmatter.category}
        locale={locale}
      >
        <MDXLayout frontmatter={frontmatter} locale={locale}>
          <MDXRemote source={content} components={mdxComponents} />
        </MDXLayout>
      </BlogPostClientShell>
    </PageLayout>
  )
}
