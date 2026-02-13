/**
 * Blog utility functions for content processing and post management.
 * Pure functions with no client-side dependencies.
 */

import type { PostFrontmatter } from './schemas/post'

export interface Post {
  slug: string
  title: string
  excerpt: string
  category: 'training' | 'dual-life' | 'underground'
  publishedAt: string
  coverImage?: string
  readTime?: number
  bpm?: number
  locale: string
  featured?: boolean
  tags?: string[]
}

/**
 * Map PostFrontmatter (from MDX/Zod) to Post (used by Blog components).
 * Bridges the `date` → `publishedAt` field difference.
 */
export function toPost(frontmatter: PostFrontmatter): Post {
  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt ?? '',
    category: frontmatter.category,
    publishedAt: frontmatter.date,
    coverImage: frontmatter.coverImage,
    readTime: frontmatter.readTime,
    bpm: frontmatter.bpm,
    locale: frontmatter.locale,
    featured: frontmatter.featured,
    tags: frontmatter.tags,
  }
}

export interface HeadingItem {
  id: string
  text: string
  level: 2 | 3
}

/**
 * Extract h2/h3 headings from raw MDX content for table of contents.
 * Slugify logic mirrors MDXComponents.tsx heading ID generation.
 */
export function extractHeadings(content: string): HeadingItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: HeadingItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    headings.push({ id, text, level })
  }

  return headings
}

/**
 * Calculate estimated read time based on word count.
 * Uses average reading speed of 250 words per minute.
 * Returns minimum 1 minute.
 */
export function calculateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.ceil(words / 250)
  return Math.max(1, minutes)
}

/**
 * Generate an excerpt from raw content.
 * Strips markdown syntax, cuts at word boundary, appends ellipsis.
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
  // Strip common markdown syntax
  const stripped = content
    .replace(/#{1,6}\s+/g, '')           // headings
    .replace(/\*\*(.+?)\*\*/g, '$1')     // bold
    .replace(/\*(.+?)\*/g, '$1')         // italic
    .replace(/`(.+?)`/g, '$1')           // inline code
    .replace(/```[\s\S]*?```/g, '')       // code blocks
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')  // links
    .replace(/!\[.*?\]\(.+?\)/g, '')      // images
    .replace(/>\s+/g, '')                 // blockquotes
    .replace(/-{3,}/g, '')                // horizontal rules
    .replace(/\n+/g, ' ')                // newlines to spaces
    .trim()

  if (stripped.length <= maxLength) {
    return stripped
  }

  // Cut at word boundary
  const truncated = stripped.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  if (lastSpace === -1) {
    return truncated + '...'
  }

  return truncated.slice(0, lastSpace) + '...'
}

/**
 * Format a date string using Intl.DateTimeFormat.
 * Locale-aware formatting for English and Spanish.
 */
export function formatDate(dateString: string, locale: string = 'en'): string {
  const date = new Date(dateString)

  return new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/**
 * Sort posts by publishedAt date, newest first.
 * Returns a new array without mutating the original.
 */
export function sortPostsByDate(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

/**
 * Filter posts by category.
 * Returns all posts when category is null.
 */
export function filterPostsByCategory(posts: Post[], category: string | null): Post[] {
  if (!category) {
    return posts
  }

  return posts.filter((post) => post.category === category)
}

/**
 * Get the featured post from a list.
 * Returns the first post with featured=true, or the most recent post.
 * Returns null if array is empty.
 */
export function getFeaturedPost(posts: Post[]): Post | null {
  if (posts.length === 0) {
    return null
  }

  const featured = posts.find((post) => post.featured)

  if (featured) {
    return featured
  }

  const sorted = sortPostsByDate(posts)
  return sorted[0]
}
