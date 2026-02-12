import { render, screen } from '@testing-library/react'
import { Section } from '../Section'

describe('Section', () => {
  describe('Rendering', () => {
    it('renders children', () => {
      render(
        <Section>
          <p>Test content</p>
        </Section>
      )

      expect(screen.getByText('Test content')).toBeInTheDocument()
    })

    it('renders a section element', () => {
      render(
        <Section>
          <p>Content</p>
        </Section>
      )

      const section = screen.getByText('Content').closest('section')
      expect(section).toBeInTheDocument()
    })

    it('renders multiple children', () => {
      render(
        <Section>
          <p>First</p>
          <p>Second</p>
          <p>Third</p>
        </Section>
      )

      expect(screen.getByText('First')).toBeInTheDocument()
      expect(screen.getByText('Second')).toBeInTheDocument()
      expect(screen.getByText('Third')).toBeInTheDocument()
    })
  })

  describe('Padding Sizes', () => {
    it('applies default md padding (py-16)', () => {
      render(
        <Section>
          <p>Content</p>
        </Section>
      )

      const section = screen.getByText('Content').closest('section')
      expect(section).toHaveClass('py-16')
    })

    it('applies py-0 for none padding', () => {
      render(
        <Section py="none">
          <p>Content</p>
        </Section>
      )

      const section = screen.getByText('Content').closest('section')
      expect(section).toHaveClass('py-0')
    })

    it('applies py-8 for sm padding', () => {
      render(
        <Section py="sm">
          <p>Content</p>
        </Section>
      )

      const section = screen.getByText('Content').closest('section')
      expect(section).toHaveClass('py-8')
    })

    it('applies py-16 for md padding', () => {
      render(
        <Section py="md">
          <p>Content</p>
        </Section>
      )

      const section = screen.getByText('Content').closest('section')
      expect(section).toHaveClass('py-16')
    })

    it('applies py-24 for lg padding', () => {
      render(
        <Section py="lg">
          <p>Content</p>
        </Section>
      )

      const section = screen.getByText('Content').closest('section')
      expect(section).toHaveClass('py-24')
    })

    it('applies py-32 for xl padding', () => {
      render(
        <Section py="xl">
          <p>Content</p>
        </Section>
      )

      const section = screen.getByText('Content').closest('section')
      expect(section).toHaveClass('py-32')
    })
  })

  describe('Base Classes', () => {
    it('always has max-w-7xl class', () => {
      render(
        <Section>
          <p>Content</p>
        </Section>
      )

      const section = screen.getByText('Content').closest('section')
      expect(section).toHaveClass('max-w-7xl')
    })

    it('always has mx-auto class', () => {
      render(
        <Section>
          <p>Content</p>
        </Section>
      )

      const section = screen.getByText('Content').closest('section')
      expect(section).toHaveClass('mx-auto')
    })

    it('always has px-6 class', () => {
      render(
        <Section>
          <p>Content</p>
        </Section>
      )

      const section = screen.getByText('Content').closest('section')
      expect(section).toHaveClass('px-6')
    })
  })

  describe('Custom Props', () => {
    it('applies custom className', () => {
      render(
        <Section className="bg-red-500 text-white">
          <p>Content</p>
        </Section>
      )

      const section = screen.getByText('Content').closest('section')
      expect(section).toHaveClass('bg-red-500')
      expect(section).toHaveClass('text-white')
    })

    it('merges custom className with base classes', () => {
      render(
        <Section className="custom-class">
          <p>Content</p>
        </Section>
      )

      const section = screen.getByText('Content').closest('section')
      expect(section).toHaveClass('max-w-7xl')
      expect(section).toHaveClass('mx-auto')
      expect(section).toHaveClass('px-6')
      expect(section).toHaveClass('custom-class')
    })

    it('sets id prop on section element', () => {
      render(
        <Section id="hero-section">
          <p>Content</p>
        </Section>
      )

      const section = screen.getByText('Content').closest('section')
      expect(section).toHaveAttribute('id', 'hero-section')
    })

    it('does not set id when not provided', () => {
      render(
        <Section>
          <p>Content</p>
        </Section>
      )

      const section = screen.getByText('Content').closest('section')
      expect(section).not.toHaveAttribute('id')
    })
  })
})
