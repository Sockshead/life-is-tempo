import { render, screen } from '@testing-library/react'
import { PostCard } from '../PostCard'
import type { Post } from '@/lib/blog-utils'

// Mock next/link to render as a plain anchor
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>
  }
})

const mockPost: Post = {
  slug: 'first-training-log',
  title: 'My First Training Log',
  excerpt: 'This is a short excerpt about the training session that happened today in the mountains.',
  category: 'training',
  publishedAt: '2026-02-10',
  readTime: 5,
  bpm: 145,
  locale: 'en',
  featured: false,
  tags: ['running', 'berlin'],
}

describe('PostCard', () => {
  describe('Default variant', () => {
    it('renders title and excerpt', () => {
      render(<PostCard post={mockPost} />)

      expect(screen.getByText('My First Training Log')).toBeInTheDocument()
      expect(screen.getByText(mockPost.excerpt)).toBeInTheDocument()
    })

    it('renders category badge', () => {
      render(<PostCard post={mockPost} />)

      expect(screen.getByText('training')).toBeInTheDocument()
    })

    it('renders read time', () => {
      render(<PostCard post={mockPost} />)

      expect(screen.getByText('5 min read')).toBeInTheDocument()
    })

    it('renders BPM tag', () => {
      render(<PostCard post={mockPost} />)

      const bpmElements = screen.getAllByText('145 BPM')
      expect(bpmElements.length).toBeGreaterThan(0)
    })

    it('renders formatted date', () => {
      render(<PostCard post={mockPost} />)

      // Date formatting is timezone-dependent; match any February date
      expect(screen.getByText(/February \d+, 2026/)).toBeInTheDocument()
    })

    it('links to the correct blog post URL', () => {
      render(<PostCard post={mockPost} />)

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/en/blog/first-training-log')
    })

    it('renders cover image placeholder', () => {
      const { container } = render(<PostCard post={mockPost} />)

      const placeholder = container.querySelector('[aria-hidden="true"]')
      expect(placeholder).toBeInTheDocument()
    })

    it('applies custom className', () => {
      const { container } = render(<PostCard post={mockPost} className="custom-class" />)

      // The Card element inside the link should have the custom class
      const card = container.querySelector('.custom-class')
      expect(card).toBeInTheDocument()
    })
  })

  describe('Featured variant', () => {
    it('renders with featured styling', () => {
      const { container } = render(<PostCard post={mockPost} variant="featured" />)

      // Featured variant wrapping link should span 2 columns
      const link = container.querySelector('.md\\:col-span-2')
      expect(link).toBeInTheDocument()
    })

    it('renders title and excerpt', () => {
      render(<PostCard post={mockPost} variant="featured" />)

      expect(screen.getByText('My First Training Log')).toBeInTheDocument()
      expect(screen.getByText(mockPost.excerpt)).toBeInTheDocument()
    })

    it('applies glow effect on Card', () => {
      const { container } = render(<PostCard post={mockPost} variant="featured" />)

      // Card with glow has hover:box-glow class
      const card = container.querySelector('.hover\\:box-glow')
      expect(card).toBeInTheDocument()
    })

    it('uses larger cover image height', () => {
      const { container } = render(<PostCard post={mockPost} variant="featured" />)

      const cover = container.querySelector('.h-64')
      expect(cover).toBeInTheDocument()
    })
  })

  describe('Compact variant', () => {
    it('renders title and excerpt', () => {
      render(<PostCard post={mockPost} variant="compact" />)

      expect(screen.getByText('My First Training Log')).toBeInTheDocument()
      expect(screen.getByText(mockPost.excerpt)).toBeInTheDocument()
    })

    it('does not render cover image placeholder', () => {
      const { container } = render(<PostCard post={mockPost} variant="compact" />)

      // Compact variant has no aria-hidden cover div
      const placeholder = container.querySelector('[aria-hidden="true"]')
      expect(placeholder).not.toBeInTheDocument()
    })

    it('renders category badge', () => {
      render(<PostCard post={mockPost} variant="compact" />)

      expect(screen.getByText('training')).toBeInTheDocument()
    })

    it('links to the correct blog post URL', () => {
      render(<PostCard post={mockPost} variant="compact" />)

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/en/blog/first-training-log')
    })

    it('renders metadata', () => {
      render(<PostCard post={mockPost} variant="compact" />)

      expect(screen.getByText('5 min read')).toBeInTheDocument()
      expect(screen.getByText(/February \d+, 2026/)).toBeInTheDocument()
    })
  })

  describe('Category colors', () => {
    it('renders training category with purple badge', () => {
      render(<PostCard post={{ ...mockPost, category: 'training' }} />)

      const badge = screen.getByText('training')
      // Badge with purple variant uses brand-purple styles
      expect(badge).toHaveClass('text-brand-purple')
    })

    it('renders dual-life category with blue badge', () => {
      render(<PostCard post={{ ...mockPost, category: 'dual-life' }} />)

      const badge = screen.getByText('dual-life')
      expect(badge).toHaveClass('text-brand-blue')
    })

    it('renders underground category with cyan badge', () => {
      render(<PostCard post={{ ...mockPost, category: 'underground' }} />)

      const badge = screen.getByText('underground')
      expect(badge).toHaveClass('text-brand-cyan')
    })
  })

  describe('Edge cases', () => {
    it('renders without optional readTime', () => {
      const postNoReadTime = { ...mockPost, readTime: undefined }
      render(<PostCard post={postNoReadTime} />)

      expect(screen.queryByText(/min read/)).not.toBeInTheDocument()
    })

    it('renders without optional bpm', () => {
      const postNoBpm = { ...mockPost, bpm: undefined }
      render(<PostCard post={postNoBpm} />)

      expect(screen.queryByText(/BPM/)).not.toBeInTheDocument()
    })

    it('renders Spanish locale post with correct link', () => {
      const spanishPost = { ...mockPost, locale: 'es' }
      render(<PostCard post={spanishPost} />)

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/es/blog/first-training-log')
    })

    it('renders Spanish locale with Spanish date format', () => {
      const spanishPost = { ...mockPost, locale: 'es' }
      render(<PostCard post={spanishPost} />)

      // Date formatting is timezone-dependent; match any February date in Spanish
      expect(screen.getByText(/\d+ de febrero de 2026/)).toBeInTheDocument()
    })
  })
})
