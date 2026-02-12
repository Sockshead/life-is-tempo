'use client'

import Link from 'next/link'
import type { PostFrontmatter } from '@/lib/schemas/post'
import { ReadingProgress } from '@/components/Blog/ReadingProgress'
import { Badge, categoryBadgeVariant } from '@/components/UI/Badge'
import { BPMCounter } from '@/components/Metrics/BPMCounter'
import { Button } from '@/components/UI/Button'
import { formatDate } from '@/lib/blog-utils'
import { cn } from '@/lib/utils'

interface MDXLayoutProps {
  children: React.ReactNode
  frontmatter: PostFrontmatter
  locale: string
}

const categoryLabels: Record<string, string> = {
  training: 'Training Chronicles',
  'dual-life': 'Dual Life Tactics',
  underground: 'Underground Endurance',
}

const coverGradientClasses: Record<string, string> = {
  training: 'from-brand-purple/30 to-gray-950',
  'dual-life': 'from-brand-blue/30 to-gray-950',
  underground: 'from-brand-cyan/30 to-gray-950',
}

/**
 * Full post layout wrapper for MDX blog posts.
 * Renders the reading progress bar, breadcrumbs, post header with metadata,
 * optional cover image placeholder, MDX content, and a newsletter CTA.
 */
export function MDXLayout({ children, frontmatter, locale }: MDXLayoutProps) {
  const categoryLabel = categoryLabels[frontmatter.category] || frontmatter.category
  const badgeVariant = categoryBadgeVariant[frontmatter.category] || 'purple'
  const gradientClass = coverGradientClasses[frontmatter.category] || 'from-brand-purple/30 to-gray-950'

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgress category={frontmatter.category} />

      <article className="min-h-screen bg-gray-950 pt-20 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 font-mono text-sm text-gray-500"
          >
            <ol className="flex items-center gap-2">
              <li>
                <Link
                  href={`/${locale}/blog`}
                  className="hover:text-brand-cyan transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-400 truncate">{frontmatter.title}</li>
            </ol>
          </nav>

          {/* Post Header */}
          <header className="mb-10">
            {/* Category Badge */}
            <div className="mb-4">
              <Badge variant={badgeVariant} size="sm">
                {categoryLabel}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide gradient-text mb-6">
              {frontmatter.title}
            </h1>

            {/* Meta row: date, read time, BPM */}
            <div className="flex flex-wrap items-center gap-4 text-gray-400 font-mono text-sm">
              <time dateTime={frontmatter.date}>
                {formatDate(frontmatter.date, locale)}
              </time>

              {frontmatter.readTime && (
                <>
                  <span aria-hidden="true" className="text-gray-600">
                    |
                  </span>
                  <span>{frontmatter.readTime} min read</span>
                </>
              )}

              {frontmatter.bpm && (
                <>
                  <span aria-hidden="true" className="text-gray-600">
                    |
                  </span>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5',
                      'text-brand-purple'
                    )}
                  >
                    {frontmatter.bpm} BPM
                  </span>
                </>
              )}
            </div>

            {/* Tags */}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Cover Image Placeholder */}
          {frontmatter.coverImage && (
            <div
              className={cn(
                'mb-10 rounded-lg overflow-hidden',
                'aspect-video bg-gradient-to-b',
                gradientClass
              )}
              role="img"
              aria-label={`Cover image for ${frontmatter.title}`}
            />
          )}

          {/* BPM Display (block) */}
          {frontmatter.bpm && (
            <div className="mb-10 p-6 glass rounded-lg text-center">
              <BPMCounter bpm={frontmatter.bpm} size="sm" showZone={false} />
            </div>
          )}

          {/* MDX Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {children}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 p-8 glass rounded-lg text-center border border-gray-800">
            <h3 className="font-display text-2xl uppercase tracking-wide text-white mb-2">
              Stay in the Loop
            </h3>
            <p className="text-gray-400 font-mono text-sm mb-6 max-w-md mx-auto">
              Get training updates, techno discoveries, and dual-life tactics
              delivered to your inbox.
            </p>
            <Button variant="primary" href={`/${locale}/newsletter`}>
              Subscribe
            </Button>
          </div>
        </div>
      </article>
    </>
  )
}
