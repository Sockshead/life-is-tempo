'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { PostCard } from './PostCard'
import type { Post } from '@/lib/blog-utils'

export interface RelatedPostsProps {
  currentPostSlug: string
  category: string
  posts: Post[]
  limit?: number
  locale: string
}

/**
 * Related posts section displayed at the bottom of blog post pages.
 * Algorithm: same category first (excluding current post), sorted by date descending.
 * If fewer than limit posts in the same category, fills with recent posts from other categories.
 * Returns null when no related posts are available.
 */
export function RelatedPosts({
  currentPostSlug,
  category,
  posts,
  limit = 3,
  locale,
}: RelatedPostsProps) {
  const relatedPosts = useMemo(() => {
    // Exclude current post and filter to same locale
    const candidates = posts.filter(
      (post) => post.slug !== currentPostSlug && post.locale === locale
    )

    // Same category posts sorted by date (newest first)
    const sameCategory = candidates
      .filter((post) => post.category === category)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    if (sameCategory.length >= limit) {
      return sameCategory.slice(0, limit)
    }

    // Fill remaining slots with posts from other categories
    const otherCategory = candidates
      .filter((post) => post.category !== category)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    return [...sameCategory, ...otherCategory].slice(0, limit)
  }, [currentPostSlug, category, posts, limit, locale])

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section aria-label="Related posts">
      <h2 className="font-display text-3xl uppercase mb-6">
        Related Posts
      </h2>

      <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-6')}>
        {relatedPosts.map((post) => (
          <PostCard key={post.slug} post={post} variant="compact" />
        ))}
      </div>
    </section>
  )
}
