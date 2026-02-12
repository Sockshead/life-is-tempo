import { render, screen } from '@testing-library/react'
import { RelatedPosts } from '../RelatedPosts'
import type { Post } from '@/lib/blog-utils'

// Mock next/link to render as a plain anchor
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>
  }
})

function createMockPost(overrides: Partial<Post> = {}): Post {
  return {
    slug: 'test-post',
    title: 'Test Post',
    excerpt: 'Test excerpt',
    category: 'training',
    publishedAt: '2026-02-10',
    readTime: 5,
    locale: 'en',
    featured: false,
    tags: [],
    ...overrides,
  }
}

describe('RelatedPosts', () => {
  describe('Rendering', () => {
    it('renders "Related Posts" heading', () => {
      const posts = [
        createMockPost({ slug: 'current-post' }),
        createMockPost({ slug: 'other-post', title: 'Other Post' }),
      ]

      render(
        <RelatedPosts
          currentPostSlug="current-post"
          category="training"
          posts={posts}
          locale="en"
        />
      )

      expect(screen.getByText('Related Posts')).toBeInTheDocument()
    })

    it('renders section with aria-label="Related posts"', () => {
      const posts = [
        createMockPost({ slug: 'current-post' }),
        createMockPost({ slug: 'other-post', title: 'Other Post' }),
      ]

      render(
        <RelatedPosts
          currentPostSlug="current-post"
          category="training"
          posts={posts}
          locale="en"
        />
      )

      const section = screen.getByRole('region', { name: 'Related posts' })
      expect(section).toBeInTheDocument()
    })

    it('renders PostCards in compact variant', () => {
      const posts = [
        createMockPost({ slug: 'current-post' }),
        createMockPost({ slug: 'other-post', title: 'Other Post' }),
      ]

      render(
        <RelatedPosts
          currentPostSlug="current-post"
          category="training"
          posts={posts}
          locale="en"
        />
      )

      // PostCard compact variant renders title and excerpt
      expect(screen.getByText('Other Post')).toBeInTheDocument()
    })
  })

  describe('Filtering', () => {
    it('excludes the current post by slug', () => {
      const posts = [
        createMockPost({ slug: 'current-post', title: 'Current Post' }),
        createMockPost({ slug: 'other-post', title: 'Other Post' }),
      ]

      render(
        <RelatedPosts
          currentPostSlug="current-post"
          category="training"
          posts={posts}
          locale="en"
        />
      )

      expect(screen.queryByText('Current Post')).not.toBeInTheDocument()
      expect(screen.getByText('Other Post')).toBeInTheDocument()
    })

    it('filters by locale', () => {
      const posts = [
        createMockPost({ slug: 'current-post', locale: 'en' }),
        createMockPost({ slug: 'en-post', title: 'English Post', locale: 'en' }),
        createMockPost({ slug: 'es-post', title: 'Spanish Post', locale: 'es' }),
      ]

      render(
        <RelatedPosts
          currentPostSlug="current-post"
          category="training"
          posts={posts}
          locale="en"
        />
      )

      expect(screen.getByText('English Post')).toBeInTheDocument()
      expect(screen.queryByText('Spanish Post')).not.toBeInTheDocument()
    })
  })

  describe('Category prioritization', () => {
    it('prioritizes same-category posts', () => {
      const posts = [
        createMockPost({ slug: 'current-post', category: 'training' }),
        createMockPost({ slug: 'training-post', title: 'Training Post', category: 'training', publishedAt: '2026-02-09' }),
        createMockPost({ slug: 'dual-life-post', title: 'Dual Life Post', category: 'dual-life', publishedAt: '2026-02-10' }),
      ]

      render(
        <RelatedPosts
          currentPostSlug="current-post"
          category="training"
          posts={posts}
          locale="en"
          limit={1}
        />
      )

      expect(screen.getByText('Training Post')).toBeInTheDocument()
      expect(screen.queryByText('Dual Life Post')).not.toBeInTheDocument()
    })

    it('fills remaining slots from other categories when same-category posts are fewer than limit', () => {
      const posts = [
        createMockPost({ slug: 'current-post', category: 'training' }),
        createMockPost({ slug: 'training-post', title: 'Training Post', category: 'training' }),
        createMockPost({ slug: 'dual-life-post', title: 'Dual Life Post', category: 'dual-life' }),
        createMockPost({ slug: 'underground-post', title: 'Underground Post', category: 'underground' }),
      ]

      render(
        <RelatedPosts
          currentPostSlug="current-post"
          category="training"
          posts={posts}
          locale="en"
          limit={3}
        />
      )

      expect(screen.getByText('Training Post')).toBeInTheDocument()
      expect(screen.getByText('Dual Life Post')).toBeInTheDocument()
      expect(screen.getByText('Underground Post')).toBeInTheDocument()
    })
  })

  describe('Sorting', () => {
    it('sorts by date newest first within same category', () => {
      const posts = [
        createMockPost({ slug: 'current-post', category: 'training' }),
        createMockPost({ slug: 'older-post', title: 'Older Post', category: 'training', publishedAt: '2026-01-01' }),
        createMockPost({ slug: 'newer-post', title: 'Newer Post', category: 'training', publishedAt: '2026-02-15' }),
        createMockPost({ slug: 'middle-post', title: 'Middle Post', category: 'training', publishedAt: '2026-02-05' }),
      ]

      render(
        <RelatedPosts
          currentPostSlug="current-post"
          category="training"
          posts={posts}
          locale="en"
          limit={3}
        />
      )

      const links = screen.getAllByRole('link')
      const linkTexts = links.map((link) => link.textContent)

      // Newer Post should appear before Middle Post which should appear before Older Post
      const newerIndex = linkTexts.findIndex((text) => text?.includes('Newer Post'))
      const middleIndex = linkTexts.findIndex((text) => text?.includes('Middle Post'))
      const olderIndex = linkTexts.findIndex((text) => text?.includes('Older Post'))

      expect(newerIndex).toBeLessThan(middleIndex)
      expect(middleIndex).toBeLessThan(olderIndex)
    })

    it('sorts by date newest first within other categories', () => {
      const posts = [
        createMockPost({ slug: 'current-post', category: 'training' }),
        createMockPost({ slug: 'older-dual', title: 'Older Dual', category: 'dual-life', publishedAt: '2026-01-01' }),
        createMockPost({ slug: 'newer-dual', title: 'Newer Dual', category: 'dual-life', publishedAt: '2026-02-15' }),
      ]

      render(
        <RelatedPosts
          currentPostSlug="current-post"
          category="training"
          posts={posts}
          locale="en"
          limit={2}
        />
      )

      const links = screen.getAllByRole('link')
      const linkTexts = links.map((link) => link.textContent)

      const newerIndex = linkTexts.findIndex((text) => text?.includes('Newer Dual'))
      const olderIndex = linkTexts.findIndex((text) => text?.includes('Older Dual'))

      expect(newerIndex).toBeLessThan(olderIndex)
    })
  })

  describe('Limit', () => {
    it('defaults to limit of 3', () => {
      const posts = [
        createMockPost({ slug: 'current-post' }),
        createMockPost({ slug: 'post-1', title: 'Post 1' }),
        createMockPost({ slug: 'post-2', title: 'Post 2' }),
        createMockPost({ slug: 'post-3', title: 'Post 3' }),
        createMockPost({ slug: 'post-4', title: 'Post 4' }),
      ]

      render(
        <RelatedPosts
          currentPostSlug="current-post"
          category="training"
          posts={posts}
          locale="en"
        />
      )

      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(3)
    })

    it('respects custom limit prop', () => {
      const posts = [
        createMockPost({ slug: 'current-post' }),
        createMockPost({ slug: 'post-1', title: 'Post 1' }),
        createMockPost({ slug: 'post-2', title: 'Post 2' }),
        createMockPost({ slug: 'post-3', title: 'Post 3' }),
      ]

      render(
        <RelatedPosts
          currentPostSlug="current-post"
          category="training"
          posts={posts}
          locale="en"
          limit={2}
        />
      )

      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(2)
    })
  })

  describe('Edge cases', () => {
    it('returns null when no related posts are available', () => {
      const { container } = render(
        <RelatedPosts
          currentPostSlug="current-post"
          category="training"
          posts={[]}
          locale="en"
        />
      )

      expect(container.innerHTML).toBe('')
    })

    it('returns null when only the current post exists', () => {
      const posts = [
        createMockPost({ slug: 'current-post' }),
      ]

      const { container } = render(
        <RelatedPosts
          currentPostSlug="current-post"
          category="training"
          posts={posts}
          locale="en"
        />
      )

      expect(container.innerHTML).toBe('')
    })

    it('returns null when all other posts are in a different locale', () => {
      const posts = [
        createMockPost({ slug: 'current-post', locale: 'en' }),
        createMockPost({ slug: 'spanish-post', locale: 'es' }),
      ]

      const { container } = render(
        <RelatedPosts
          currentPostSlug="current-post"
          category="training"
          posts={posts}
          locale="en"
        />
      )

      expect(container.innerHTML).toBe('')
    })

    it('renders fewer than limit when not enough posts available', () => {
      const posts = [
        createMockPost({ slug: 'current-post' }),
        createMockPost({ slug: 'only-post', title: 'Only Post' }),
      ]

      render(
        <RelatedPosts
          currentPostSlug="current-post"
          category="training"
          posts={posts}
          locale="en"
          limit={3}
        />
      )

      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(1)
    })
  })
})
