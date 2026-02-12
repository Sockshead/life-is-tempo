// Re-export for convenience
export type { Post } from '@/lib/blog-utils'

export interface PostWithContent {
  slug: string
  title: string
  excerpt: string
  content: string
  category: 'training' | 'dual-life' | 'underground'
  publishedAt: string
  coverImage?: string
  readTime?: number
  bpm?: number
  locale: string
  featured?: boolean
  tags?: string[]
}
