'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Card } from '@/components/UI/Card'
import { Badge, categoryBadgeVariant } from '@/components/UI/Badge'
import type { Post } from '@/lib/blog-utils'
import { formatDate } from '@/lib/blog-utils'
import { coverGradients } from './constants'

export interface PostCardProps {
  post: Post
  variant?: 'default' | 'featured' | 'compact'
  className?: string
}

/**
 * Blog post card with three display variants.
 *
 * - default: Full card with image placeholder, title, excerpt, metadata
 * - featured: Larger card with glow effect, spans 2 columns
 * - compact: No image, shorter excerpt, smaller text
 */
export function PostCard({ post, variant = 'default', className }: PostCardProps) {
  const badgeVariant = categoryBadgeVariant[post.category] ?? 'cyan'
  const gradient = coverGradients[post.category] ?? 'from-brand-cyan/30 to-gray-900'

  if (variant === 'compact') {
    return (
      <Link href={`/${post.locale}/blog/${post.slug}`} className="block group">
        <Card
          hover
          className={cn('p-4', className)}
        >
          <div className="flex items-start gap-3">
            <Badge variant={badgeVariant} size="sm">
              {post.category}
            </Badge>
            {post.bpm && (
              <span className="font-mono text-xs text-brand-purple">
                {post.bpm} BPM
              </span>
            )}
          </div>

          <h3 className="font-display text-lg uppercase mt-2 group-hover:text-brand-cyan transition-colors">
            {post.title}
          </h3>

          <p className="font-mono text-xs text-gray-400 line-clamp-2 mt-1">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 mt-3 font-mono text-xs text-gray-500">
            {post.readTime && (
              <span>{post.readTime} min read</span>
            )}
            <span>{formatDate(post.publishedAt, post.locale)}</span>
          </div>
        </Card>
      </Link>
    )
  }

  const isFeatured = variant === 'featured'

  return (
    <Link
      href={`/${post.locale}/blog/${post.slug}`}
      className={cn('block group', isFeatured && 'md:col-span-2')}
    >
      <Card
        hover
        glow={isFeatured}
        className={cn(
          'overflow-hidden p-0',
          className,
        )}
      >
        {/* Cover image placeholder */}
        <div
          className={cn(
            'w-full bg-gradient-to-br',
            gradient,
            isFeatured ? 'h-64 md:h-80' : 'h-48',
          )}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant={badgeVariant} size="sm">
              {post.category}
            </Badge>
            {post.bpm && (
              <span className="font-mono text-xs text-brand-purple">
                {post.bpm} BPM
              </span>
            )}
          </div>

          <h3
            className={cn(
              'font-display uppercase group-hover:text-brand-cyan transition-colors',
              isFeatured ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl',
            )}
          >
            {post.title}
          </h3>

          <p className="font-mono text-sm text-gray-400 line-clamp-3 mt-2">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 mt-4 font-mono text-xs text-gray-500">
            {post.readTime && (
              <span>{post.readTime} min read</span>
            )}
            {post.bpm && (
              <span className="text-brand-purple">{post.bpm} BPM</span>
            )}
            <span>{formatDate(post.publishedAt, post.locale)}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
