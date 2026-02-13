import { render, screen } from '@testing-library/react'
import { CalloutBox } from '../CalloutBox'

describe('CalloutBox', () => {
  describe('Rendering', () => {
    it('renders children content', () => {
      render(
        <CalloutBox>
          <p>This is important information</p>
        </CalloutBox>
      )

      expect(
        screen.getByText('This is important information')
      ).toBeInTheDocument()
    })

    it('renders a title when provided', () => {
      render(
        <CalloutBox title="Important Note">
          <p>Content here</p>
        </CalloutBox>
      )

      expect(screen.getByText('Important Note')).toBeInTheDocument()
    })

    it('does not render a title element when title is not provided', () => {
      const { container } = render(
        <CalloutBox>
          <p>Content here</p>
        </CalloutBox>
      )

      const titleElements = container.querySelectorAll('.font-display.uppercase')
      expect(titleElements.length).toBe(0)
    })

    it('has role="note"', () => {
      render(
        <CalloutBox>
          <p>Content</p>
        </CalloutBox>
      )

      expect(screen.getByRole('note')).toBeInTheDocument()
    })
  })

  describe('Types', () => {
    it('defaults to info type', () => {
      const { container } = render(
        <CalloutBox>
          <p>Content</p>
        </CalloutBox>
      )

      const callout = container.firstElementChild
      expect(callout).toHaveClass('border-brand-cyan')
    })

    it('renders info type with cyan border', () => {
      const { container } = render(
        <CalloutBox type="info">
          <p>Content</p>
        </CalloutBox>
      )

      const callout = container.firstElementChild
      expect(callout).toHaveClass('border-brand-cyan')
    })

    it('renders warning type with yellow border', () => {
      const { container } = render(
        <CalloutBox type="warning">
          <p>Content</p>
        </CalloutBox>
      )

      const callout = container.firstElementChild
      expect(callout).toHaveClass('border-yellow-500')
    })

    it('renders tip type with green border', () => {
      const { container } = render(
        <CalloutBox type="tip">
          <p>Content</p>
        </CalloutBox>
      )

      const callout = container.firstElementChild
      expect(callout).toHaveClass('border-green-500')
    })

    it('renders note type with purple border', () => {
      const { container } = render(
        <CalloutBox type="note">
          <p>Content</p>
        </CalloutBox>
      )

      const callout = container.firstElementChild
      expect(callout).toHaveClass('border-brand-purple')
    })
  })

  describe('Icons', () => {
    it('renders "i" icon for info type', () => {
      const { container } = render(
        <CalloutBox type="info">
          <p>Content</p>
        </CalloutBox>
      )

      const icon = container.querySelector('[aria-hidden="true"]')
      expect(icon).toHaveTextContent('i')
    })

    it('renders "!" icon for warning type', () => {
      const { container } = render(
        <CalloutBox type="warning">
          <p>Content</p>
        </CalloutBox>
      )

      const icon = container.querySelector('[aria-hidden="true"]')
      expect(icon).toHaveTextContent('!')
    })

    it('renders "*" icon for tip type', () => {
      const { container } = render(
        <CalloutBox type="tip">
          <p>Content</p>
        </CalloutBox>
      )

      const icon = container.querySelector('[aria-hidden="true"]')
      expect(icon).toHaveTextContent('*')
    })

    it('renders "#" icon for note type', () => {
      const { container } = render(
        <CalloutBox type="note">
          <p>Content</p>
        </CalloutBox>
      )

      const icon = container.querySelector('[aria-hidden="true"]')
      expect(icon).toHaveTextContent('#')
    })
  })

  describe('Styling', () => {
    it('has glass styling', () => {
      const { container } = render(
        <CalloutBox>
          <p>Content</p>
        </CalloutBox>
      )

      const callout = container.firstElementChild
      expect(callout).toHaveClass('glass')
    })

    it('has left border accent', () => {
      const { container } = render(
        <CalloutBox>
          <p>Content</p>
        </CalloutBox>
      )

      const callout = container.firstElementChild
      expect(callout).toHaveClass('border-l-4')
    })

    it('has proper spacing', () => {
      const { container } = render(
        <CalloutBox>
          <p>Content</p>
        </CalloutBox>
      )

      const callout = container.firstElementChild
      expect(callout).toHaveClass('my-8')
      expect(callout).toHaveClass('p-6')
    })

    it('has rounded corners', () => {
      const { container } = render(
        <CalloutBox>
          <p>Content</p>
        </CalloutBox>
      )

      const callout = container.firstElementChild
      expect(callout).toHaveClass('rounded-lg')
    })

    it('applies correct title color for warning type', () => {
      render(
        <CalloutBox type="warning" title="Watch Out">
          <p>Content</p>
        </CalloutBox>
      )

      const title = screen.getByText('Watch Out')
      expect(title).toHaveClass('text-yellow-500')
    })

    it('applies correct title color for tip type', () => {
      render(
        <CalloutBox type="tip" title="Pro Tip">
          <p>Content</p>
        </CalloutBox>
      )

      const title = screen.getByText('Pro Tip')
      expect(title).toHaveClass('text-green-500')
    })
  })
})
