import { render, screen } from '@testing-library/react'
import { FeaturedPost } from '../FeaturedPost'
import type { Post } from '@/lib/blog-utils'

// Mock next/link to render as a plain anchor
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>
  }
})

const mockPost: Post = {
  slug: 'berlin-half-ironman-prep',
  title: 'Berlin 70.3 Preparation Begins',
  excerpt: 'The journey starts here. Training for Berlin half Ironman while exploring underground techno culture.',
  category: 'training',
  publishedAt: '2026-02-08',
  readTime: 8,
  bpm: 135,
  locale: 'en',
  featured: true,
  tags: ['ironman', 'berlin', 'training'],
}

describe('FeaturedPost', () => {
  describe('Rendering', () => {
    it('renders the post title', () => {
      render(<FeaturedPost post={mockPost} />)

      expect(screen.getByText('Berlin 70.3 Preparation Begins')).toBeInTheDocument()
    })

    it('renders the post excerpt', () => {
      render(<FeaturedPost post={mockPost} />)

      expect(screen.getByText(mockPost.excerpt)).toBeInTheDocument()
    })

    it('renders the category badge', () => {
      render(<FeaturedPost post={mockPost} />)

      expect(screen.getByText('training')).toBeInTheDocument()
    })

    it('renders as an article element', () => {
      render(<FeaturedPost post={mockPost} />)

      expect(screen.getByRole('article')).toBeInTheDocument()
    })

    it('renders formatted date', () => {
      render(<FeaturedPost post={mockPost} />)

      // Date formatting is timezone-dependent; match any February date
      expect(screen.getByText(/February \d+, 2026/)).toBeInTheDocument()
    })

    it('renders read time', () => {
      render(<FeaturedPost post={mockPost} />)

      expect(screen.getByText('8 min read')).toBeInTheDocument()
    })

    it('renders BPM tag', () => {
      render(<FeaturedPost post={mockPost} />)

      expect(screen.getByText('135 BPM')).toBeInTheDocument()
    })
  })

  describe('Link', () => {
    it('links to the correct blog post URL', () => {
      render(<FeaturedPost post={mockPost} />)

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/en/blog/berlin-half-ironman-prep')
    })

    it('links to Spanish locale when post locale is es', () => {
      const spanishPost = { ...mockPost, locale: 'es' }
      render(<FeaturedPost post={spanishPost} />)

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/es/blog/berlin-half-ironman-prep')
    })
  })

  describe('Category colors', () => {
    it('renders training badge with purple variant', () => {
      render(<FeaturedPost post={{ ...mockPost, category: 'training' }} />)

      const badge = screen.getByText('training')
      expect(badge).toHaveClass('text-brand-purple')
    })

    it('renders dual-life badge with blue variant', () => {
      render(<FeaturedPost post={{ ...mockPost, category: 'dual-life' }} />)

      const badge = screen.getByText('dual-life')
      expect(badge).toHaveClass('text-brand-blue')
    })

    it('renders underground badge with cyan variant', () => {
      render(<FeaturedPost post={{ ...mockPost, category: 'underground' }} />)

      const badge = screen.getByText('underground')
      expect(badge).toHaveClass('text-brand-cyan')
    })
  })

  describe('Typography', () => {
    it('applies font-display and uppercase to title', () => {
      render(<FeaturedPost post={mockPost} />)

      const title = screen.getByText('Berlin 70.3 Preparation Begins')
      expect(title).toHaveClass('font-display')
      expect(title).toHaveClass('uppercase')
    })

    it('applies large text size to title', () => {
      render(<FeaturedPost post={mockPost} />)

      const title = screen.getByText('Berlin 70.3 Preparation Begins')
      expect(title).toHaveClass('text-4xl')
      expect(title).toHaveClass('md:text-6xl')
    })

    it('applies font-mono to excerpt', () => {
      render(<FeaturedPost post={mockPost} />)

      const excerpt = screen.getByText(mockPost.excerpt)
      expect(excerpt).toHaveClass('font-mono')
      expect(excerpt).toHaveClass('text-sm')
      expect(excerpt).toHaveClass('text-gray-400')
    })
  })

  describe('Layout', () => {
    it('has aspect ratio container', () => {
      render(<FeaturedPost post={mockPost} />)

      const article = screen.getByRole('article')
      expect(article).toHaveClass('aspect-[16/9]')
    })

    it('has gradient overlay', () => {
      const { container } = render(<FeaturedPost post={mockPost} />)

      // Two aria-hidden divs: cover placeholder + gradient overlay
      const hiddenDivs = container.querySelectorAll('[aria-hidden="true"]')
      expect(hiddenDivs.length).toBe(2)
    })

    it('positions content at the bottom', () => {
      const { container } = render(<FeaturedPost post={mockPost} />)

      // Content container should be positioned at the bottom
      const contentDiv = container.querySelector('.absolute.bottom-0')
      expect(contentDiv).toBeInTheDocument()
    })
  })

  describe('Edge cases', () => {
    it('renders without optional readTime', () => {
      const postNoReadTime = { ...mockPost, readTime: undefined }
      render(<FeaturedPost post={postNoReadTime} />)

      expect(screen.queryByText(/min read/)).not.toBeInTheDocument()
    })

    it('renders without optional bpm', () => {
      const postNoBpm = { ...mockPost, bpm: undefined }
      render(<FeaturedPost post={postNoBpm} />)

      expect(screen.queryByText(/BPM/)).not.toBeInTheDocument()
    })

    it('applies custom className', () => {
      const { container } = render(
        <FeaturedPost post={mockPost} className="custom-class" />
      )

      const link = container.querySelector('.custom-class')
      expect(link).toBeInTheDocument()
    })
  })
})
