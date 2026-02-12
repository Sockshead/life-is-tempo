'use client'

import type { Post } from '@/lib/blog-utils'
import type { HeadingItem } from '@/lib/blog-utils'
import { TableOfContents } from '@/components/Blog/TableOfContents'
import { RelatedPosts } from '@/components/Blog/RelatedPosts'
import { Section } from '@/components/Layout/Section'

interface BlogPostClientShellProps {
  children: React.ReactNode
  headings: HeadingItem[]
  allPosts: Post[]
  currentSlug: string
  category: string
  locale: string
}

export function BlogPostClientShell({
  children,
  headings,
  allPosts,
  currentSlug,
  category,
  locale,
}: BlogPostClientShellProps) {
  return (
    <>
      {/* Two-column layout: content + TOC sidebar */}
      <div className="flex gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">{children}</div>

        {/* TOC sidebar - visible on large screens */}
        {headings.length > 0 && (
          <aside className="hidden lg:block w-64 flex-shrink-0 pt-20">
            <TableOfContents
              items={headings.map((h) => ({
                id: h.id,
                text: h.text,
                level: h.level,
              }))}
            />
          </aside>
        )}
      </div>

      {/* Related Posts */}
      <Section py="lg">
        <RelatedPosts
          currentPostSlug={currentSlug}
          category={category}
          posts={allPosts}
          locale={locale}
        />
      </Section>
    </>
  )
}
