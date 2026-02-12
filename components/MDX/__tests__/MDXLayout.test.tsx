import { render, screen } from '@testing-library/react'
import { MDXLayout } from '../MDXLayout'
import type { PostFrontmatter } from '@/lib/schemas/post'

// Mock dependencies
jest.mock('@/components/Blog/ReadingProgress', () => ({
  ReadingProgress: ({ category }: { category?: string }) => (
    <div data-testid="reading-progress" data-category={category} />
  ),
}))

jest.mock('@/components/Metrics/BPMCounter', () => ({
  BPMCounter: ({ bpm }: { bpm: number }) => (
    <div data-testid="bpm-counter">{bpm}</div>
  ),
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) => <a href={href}>{children}</a>,
}))

const baseFrontmatter: PostFrontmatter = {
  title: 'Test Post Title',
  slug: 'test-post-title',
  date: '2026-02-11',
  category: 'training',
  locale: 'en',
  published: true,
  tags: ['running', 'techno'],
  featured: false,
  readTime: 5,
}

describe('MDXLayout', () => {
  describe('Rendering', () => {
    it('renders the post title as a heading', () => {
      render(
        <MDXLayout frontmatter={baseFrontmatter} locale="en">
          <p>Post content here</p>
        </MDXLayout>
      )

      const heading = screen.getByRole('heading', { level: 1, name: 'Test Post Title' })
      expect(heading).toBeInTheDocument()
    })

    it('renders the formatted date', () => {
      render(
        <MDXLayout frontmatter={baseFrontmatter} locale="en">
          <p>Content</p>
        </MDXLayout>
      )

      // formatDate produces a locale-formatted date string
      const timeEl = screen.getByRole('article').querySelector('time')
      expect(timeEl).toBeInTheDocument()
      expect(timeEl).toHaveAttribute('datetime', '2026-02-11')
    })

    it('renders the category badge', () => {
      render(
        <MDXLayout frontmatter={baseFrontmatter} locale="en">
          <p>Content</p>
        </MDXLayout>
      )

      expect(screen.getByText('Training Chronicles')).toBeInTheDocument()
    })

    it('renders children content', () => {
      render(
        <MDXLayout frontmatter={baseFrontmatter} locale="en">
          <p>This is the MDX body content</p>
        </MDXLayout>
      )

      expect(
        screen.getByText('This is the MDX body content')
      ).toBeInTheDocument()
    })

    it('renders read time when provided', () => {
      const { container } = render(
        <MDXLayout frontmatter={baseFrontmatter} locale="en">
          <p>Content</p>
        </MDXLayout>
      )

      expect(container).toHaveTextContent('5 min read')
    })

    it('renders tags when provided', () => {
      const { container } = render(
        <MDXLayout frontmatter={baseFrontmatter} locale="en">
          <p>Content</p>
        </MDXLayout>
      )

      expect(container).toHaveTextContent('#running')
      expect(container).toHaveTextContent('#techno')
    })
  })

  describe('ReadingProgress', () => {
    it('renders the ReadingProgress component', () => {
      render(
        <MDXLayout frontmatter={baseFrontmatter} locale="en">
          <p>Content</p>
        </MDXLayout>
      )

      const progress = screen.getByTestId('reading-progress')
      expect(progress).toBeInTheDocument()
    })

    it('passes the category to ReadingProgress', () => {
      render(
        <MDXLayout frontmatter={baseFrontmatter} locale="en">
          <p>Content</p>
        </MDXLayout>
      )

      const progress = screen.getByTestId('reading-progress')
      expect(progress).toHaveAttribute('data-category', 'training')
    })
  })

  describe('Breadcrumbs', () => {
    it('renders breadcrumb navigation', () => {
      render(
        <MDXLayout frontmatter={baseFrontmatter} locale="en">
          <p>Content</p>
        </MDXLayout>
      )

      expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument()
    })

    it('renders a Blog link in breadcrumbs', () => {
      render(
        <MDXLayout frontmatter={baseFrontmatter} locale="en">
          <p>Content</p>
        </MDXLayout>
      )

      const blogLink = screen.getByText('Blog')
      expect(blogLink).toBeInTheDocument()
      expect(blogLink.closest('a')).toHaveAttribute('href', '/en/blog')
    })

    it('renders post title in breadcrumbs', () => {
      render(
        <MDXLayout frontmatter={baseFrontmatter} locale="en">
          <p>Content</p>
        </MDXLayout>
      )

      const breadcrumb = screen.getByLabelText('Breadcrumb')
      expect(breadcrumb).toHaveTextContent('Test Post Title')
    })
  })

  describe('Cover image', () => {
    it('renders cover image placeholder when coverImage is provided', () => {
      const frontmatter: PostFrontmatter = {
        ...baseFrontmatter,
        coverImage: '/images/test-cover.jpg',
      }

      render(
        <MDXLayout frontmatter={frontmatter} locale="en">
          <p>Content</p>
        </MDXLayout>
      )

      const coverImage = screen.getByRole('img', {
        name: /cover image for test post title/i,
      })
      expect(coverImage).toBeInTheDocument()
    })

    it('does not render cover image placeholder when coverImage is not provided', () => {
      render(
        <MDXLayout frontmatter={baseFrontmatter} locale="en">
          <p>Content</p>
        </MDXLayout>
      )

      const coverImage = screen.queryByRole('img', {
        name: /cover image/i,
      })
      expect(coverImage).not.toBeInTheDocument()
    })
  })

  describe('BPM display', () => {
    it('renders BPMCounter when bpm is provided', () => {
      const frontmatter: PostFrontmatter = {
        ...baseFrontmatter,
        bpm: 128,
      }

      render(
        <MDXLayout frontmatter={frontmatter} locale="en">
          <p>Content</p>
        </MDXLayout>
      )

      const bpmCounter = screen.getByTestId('bpm-counter')
      expect(bpmCounter).toBeInTheDocument()
      expect(bpmCounter).toHaveTextContent('128')
    })

    it('does not render BPMCounter when bpm is not provided', () => {
      render(
        <MDXLayout frontmatter={baseFrontmatter} locale="en">
          <p>Content</p>
        </MDXLayout>
      )

      expect(screen.queryByTestId('bpm-counter')).not.toBeInTheDocument()
    })

    it('shows BPM in the meta row when bpm is provided', () => {
      const frontmatter: PostFrontmatter = {
        ...baseFrontmatter,
        bpm: 128,
      }

      render(
        <MDXLayout frontmatter={frontmatter} locale="en">
          <p>Content</p>
        </MDXLayout>
      )

      expect(screen.getByText('128 BPM')).toBeInTheDocument()
    })
  })

  describe('Newsletter CTA', () => {
    it('renders the newsletter call-to-action section', () => {
      render(
        <MDXLayout frontmatter={baseFrontmatter} locale="en">
          <p>Content</p>
        </MDXLayout>
      )

      expect(screen.getByText('Stay in the Loop')).toBeInTheDocument()
      expect(screen.getByText('Subscribe')).toBeInTheDocument()
    })

    it('links subscribe button to locale-aware newsletter page', () => {
      render(
        <MDXLayout frontmatter={baseFrontmatter} locale="es">
          <p>Content</p>
        </MDXLayout>
      )

      const subscribeLink = screen.getByText('Subscribe').closest('a')
      expect(subscribeLink).toHaveAttribute('href', '/es/newsletter')
    })
  })

  describe('Locale support', () => {
    it('renders a time element with correct datetime for Spanish locale', () => {
      render(
        <MDXLayout frontmatter={{ ...baseFrontmatter, locale: 'es' }} locale="es">
          <p>Content</p>
        </MDXLayout>
      )

      const timeEl = screen.getByRole('article').querySelector('time')
      expect(timeEl).toBeInTheDocument()
      expect(timeEl).toHaveAttribute('datetime', '2026-02-11')
      // The formatted text depends on the locale
      expect(timeEl!.textContent).toBeTruthy()
    })
  })
})
