import { render, screen } from '@testing-library/react'
import { mdxComponents } from '../MDXComponents'

// Extract components for direct testing
const {
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  a: A,
  code: Code,
  pre: Pre,
  blockquote: Blockquote,
  ul: UL,
  ol: OL,
  li: LI,
} = mdxComponents

describe('MDXComponents', () => {
  describe('Headings', () => {
    describe('h1', () => {
      it('generates id from string children', () => {
        const { container } = render(<H1>My Title</H1>)

        const heading = container.querySelector('h1')
        expect(heading).toHaveAttribute('id', 'my-title')
      })

      it('has font-display and uppercase classes', () => {
        const { container } = render(<H1>Title</H1>)

        const heading = container.querySelector('h1')
        expect(heading).toHaveClass('font-display')
        expect(heading).toHaveClass('uppercase')
      })

      it('strips non-alphanumeric characters from id', () => {
        const { container } = render(<H1>Hello World! #1</H1>)

        const heading = container.querySelector('h1')
        expect(heading).toHaveAttribute('id', 'hello-world-1')
      })

      it('renders without id when children are not a string', () => {
        const { container } = render(
          <H1>
            <span>Complex Child</span>
          </H1>
        )

        const heading = container.querySelector('h1')
        expect(heading).not.toHaveAttribute('id')
      })
    })

    describe('h2', () => {
      it('generates id from string children', () => {
        const { container } = render(<H2>Section Title</H2>)

        const heading = container.querySelector('h2')
        expect(heading).toHaveAttribute('id', 'section-title')
      })

      it('has border-b and border-gray-800 classes', () => {
        const { container } = render(<H2>Title</H2>)

        const heading = container.querySelector('h2')
        expect(heading).toHaveClass('border-b')
        expect(heading).toHaveClass('border-gray-800')
      })

      it('renders without id when children are not a string', () => {
        const { container } = render(
          <H2>
            <em>Emphasis</em>
          </H2>
        )

        const heading = container.querySelector('h2')
        expect(heading).not.toHaveAttribute('id')
      })
    })

    describe('h3', () => {
      it('generates id from string children', () => {
        const { container } = render(<H3>Sub Section</H3>)

        const heading = container.querySelector('h3')
        expect(heading).toHaveAttribute('id', 'sub-section')
      })

      it('has font-display classes', () => {
        const { container } = render(<H3>Title</H3>)

        const heading = container.querySelector('h3')
        expect(heading).toHaveClass('font-display')
      })

      it('renders without id when children are not a string', () => {
        const { container } = render(
          <H3>
            <strong>Bold</strong>
          </H3>
        )

        const heading = container.querySelector('h3')
        expect(heading).not.toHaveAttribute('id')
      })
    })
  })

  describe('Paragraph', () => {
    it('has text-gray-300 and leading-relaxed classes', () => {
      const { container } = render(<P>Some text</P>)

      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('text-gray-300')
      expect(paragraph).toHaveClass('leading-relaxed')
    })

    it('renders children content', () => {
      render(<P>Paragraph content</P>)

      expect(screen.getByText('Paragraph content')).toBeInTheDocument()
    })
  })

  describe('Links', () => {
    it('adds target="_blank" and rel for external links', () => {
      render(<A href="https://example.com">External Link</A>)

      const link = screen.getByText('External Link')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('does not add target="_blank" for internal links', () => {
      render(<A href="/about">Internal Link</A>)

      const link = screen.getByText('Internal Link')
      expect(link).not.toHaveAttribute('target')
    })

    it('has text-brand-cyan class', () => {
      render(<A href="/page">Link</A>)

      const link = screen.getByText('Link')
      expect(link).toHaveClass('text-brand-cyan')
    })

    it('does not add target="_blank" when href is undefined', () => {
      render(<A>No Href Link</A>)

      const link = screen.getByText('No Href Link')
      expect(link).not.toHaveAttribute('target')
    })
  })

  describe('Code', () => {
    it('renders inline code with bg-gray-800 and font-mono classes', () => {
      const { container } = render(<Code>inline code</Code>)

      const code = container.querySelector('code')
      expect(code).toHaveClass('bg-gray-800')
      expect(code).toHaveClass('font-mono')
    })

    it('passes className through for block code without inline styling', () => {
      const { container } = render(
        <Code className="language-typescript">const x = 1</Code>
      )

      const code = container.querySelector('code')
      expect(code).toHaveClass('language-typescript')
      expect(code).not.toHaveClass('bg-gray-800')
      expect(code).not.toHaveClass('font-mono')
    })
  })

  describe('Pre', () => {
    it('has bg-gray-900 and rounded-lg classes', () => {
      const { container } = render(<Pre>code block</Pre>)

      const pre = container.querySelector('pre')
      expect(pre).toHaveClass('bg-gray-900')
      expect(pre).toHaveClass('rounded-lg')
    })
  })

  describe('Blockquote', () => {
    it('has border-l-4 and border-brand-purple classes', () => {
      const { container } = render(<Blockquote>A quote</Blockquote>)

      const blockquote = container.querySelector('blockquote')
      expect(blockquote).toHaveClass('border-l-4')
      expect(blockquote).toHaveClass('border-brand-purple')
    })
  })

  describe('Lists', () => {
    it('renders ul with list-none class', () => {
      const { container } = render(<UL><li>Item</li></UL>)

      const ul = container.querySelector('ul')
      expect(ul).toHaveClass('list-none')
    })

    it('renders ol with list-decimal class', () => {
      const { container } = render(<OL><li>Item</li></OL>)

      const ol = container.querySelector('ol')
      expect(ol).toHaveClass('list-decimal')
    })

    it('renders li with a decorative square span with aria-hidden', () => {
      const { container } = render(<LI>List item</LI>)

      const decorativeSpan = container.querySelector('[aria-hidden="true"]')
      expect(decorativeSpan).toBeInTheDocument()
      expect(decorativeSpan!.textContent).toContain('\u25A0')
    })
  })

  describe('Custom components', () => {
    it('registers MetricBox', () => {
      expect(mdxComponents.MetricBox).toBeDefined()
    })

    it('registers BPMIndicator', () => {
      expect(mdxComponents.BPMIndicator).toBeDefined()
    })

    it('registers AudioEmbed', () => {
      expect(mdxComponents.AudioEmbed).toBeDefined()
    })

    it('registers StravaEmbed', () => {
      expect(mdxComponents.StravaEmbed).toBeDefined()
    })

    it('registers ImageGrid', () => {
      expect(mdxComponents.ImageGrid).toBeDefined()
    })

    it('registers CalloutBox', () => {
      expect(mdxComponents.CalloutBox).toBeDefined()
    })
  })
})
