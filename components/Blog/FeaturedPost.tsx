'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Badge, categoryBadgeVariant } from '@/components/UI/Badge'
import type { Post } from '@/lib/blog-utils'
import { formatDate } from '@/lib/blog-utils'

export interface FeaturedPostProps {
  post: Post
  className?: string
}

const coverGradients: Record<string, string> = {
  training: 'from-brand-purple/20 via-gray-950/80 to-gray-950',
  'dual-life': 'from-brand-blue/20 via-gray-950/80 to-gray-950',
  underground: 'from-brand-cyan/20 via-gray-950/80 to-gray-950',
}

/**
 * Large hero-style featured post card.
 * Displays a gradient cover placeholder with content overlay at the bottom.
 * Used as the primary visual anchor on the blog index page.
 */
export function FeaturedPost({ post, className }: FeaturedPostProps) {
  const badgeVariant = categoryBadgeVariant[post.category] ?? 'cyan'
  const gradient = coverGradients[post.category] ?? 'from-brand-cyan/20 via-gray-950/80 to-gray-950'

  return (
    <Link
      href={`/${post.locale}/blog/${post.slug}`}
      className={cn('block group', className)}
    >
      <article className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
        {/* Cover image placeholder */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br',
            gradient,
            'transition-transform duration-500 group-hover:scale-105',
          )}
          aria-hidden="true"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <Badge variant={badgeVariant} size="md" className="mb-4">
            {post.category}
          </Badge>

          <h2 className="font-display text-4xl md:text-6xl uppercase group-hover:text-brand-cyan transition-colors">
            {post.title}
          </h2>

          <p className="font-mono text-sm text-gray-400 line-clamp-2 mt-3 max-w-2xl">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 mt-4 font-mono text-xs text-gray-600">
            {post.readTime && (
              <span>{post.readTime} min read</span>
            )}
            {post.bpm && (
              <span className="text-brand-purple">{post.bpm} BPM</span>
            )}
            <span>{formatDate(post.publishedAt, post.locale)}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
