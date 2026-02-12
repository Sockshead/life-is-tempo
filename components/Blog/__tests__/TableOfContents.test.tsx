import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TableOfContents } from '../TableOfContents'
import type { TOCItem } from '../TableOfContents'

const mockItems: TOCItem[] = [
  { id: 'introduction', text: 'Introduction', level: 2 },
  { id: 'getting-started', text: 'Getting Started', level: 2 },
  { id: 'prerequisites', text: 'Prerequisites', level: 3 },
  { id: 'installation', text: 'Installation', level: 3 },
  { id: 'conclusion', text: 'Conclusion', level: 2 },
]

describe('TableOfContents', () => {
  describe('Rendering', () => {
    it('renders "Table of Contents" heading', () => {
      render(<TableOfContents items={mockItems} />)

      expect(screen.getByText('Table of Contents')).toBeInTheDocument()
    })

    it('renders nav with aria-label="Table of contents"', () => {
      render(<TableOfContents items={mockItems} />)

      const nav = screen.getByRole('navigation', { name: 'Table of contents' })
      expect(nav).toBeInTheDocument()
    })

    it('renders a button for each TOC item', () => {
      render(<TableOfContents items={mockItems} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(5)
    })

    it('renders item text content', () => {
      render(<TableOfContents items={mockItems} />)

      expect(screen.getByText('Introduction')).toBeInTheDocument()
      expect(screen.getByText('Getting Started')).toBeInTheDocument()
      expect(screen.getByText('Prerequisites')).toBeInTheDocument()
      expect(screen.getByText('Installation')).toBeInTheDocument()
      expect(screen.getByText('Conclusion')).toBeInTheDocument()
    })
  })

  describe('Indentation', () => {
    it('level 3 items have ml-4 class', () => {
      render(<TableOfContents items={mockItems} />)

      const prerequisitesButton = screen.getByText('Prerequisites')
      expect(prerequisitesButton).toHaveClass('ml-4')

      const installationButton = screen.getByText('Installation')
      expect(installationButton).toHaveClass('ml-4')
    })

    it('level 2 items do NOT have ml-4 class', () => {
      render(<TableOfContents items={mockItems} />)

      const introductionButton = screen.getByText('Introduction')
      expect(introductionButton).not.toHaveClass('ml-4')

      const gettingStartedButton = screen.getByText('Getting Started')
      expect(gettingStartedButton).not.toHaveClass('ml-4')

      const conclusionButton = screen.getByText('Conclusion')
      expect(conclusionButton).not.toHaveClass('ml-4')
    })
  })

  describe('Styling', () => {
    it('has sticky top-24 class', () => {
      render(<TableOfContents items={mockItems} />)

      const nav = screen.getByRole('navigation', { name: 'Table of contents' })
      expect(nav).toHaveClass('sticky')
      expect(nav).toHaveClass('top-24')
    })

    it('custom className is applied', () => {
      render(<TableOfContents items={mockItems} className="custom-class" />)

      const nav = screen.getByRole('navigation', { name: 'Table of contents' })
      expect(nav).toHaveClass('custom-class')
    })

    it('buttons have text-left and font-mono classes', () => {
      render(<TableOfContents items={mockItems} />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach((button) => {
        expect(button).toHaveClass('text-left')
        expect(button).toHaveClass('font-mono')
      })
    })

    it('default state items have text-gray-400 class', () => {
      render(<TableOfContents items={mockItems} />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach((button) => {
        expect(button).toHaveClass('text-gray-400')
      })
    })
  })

  describe('Interactions', () => {
    it('button click calls scrollIntoView', async () => {
      const user = userEvent.setup()
      const scrollIntoViewMock = jest.fn()

      const mockElement = document.createElement('div')
      mockElement.scrollIntoView = scrollIntoViewMock

      const getElementByIdSpy = jest.spyOn(document, 'getElementById')
      getElementByIdSpy.mockReturnValue(mockElement)

      render(<TableOfContents items={mockItems} />)

      await user.click(screen.getByText('Introduction'))

      expect(getElementByIdSpy).toHaveBeenCalledWith('introduction')
      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' })

      getElementByIdSpy.mockRestore()
    })

    it('clicking different items calls scrollIntoView with correct ids', async () => {
      const user = userEvent.setup()
      const scrollIntoViewMock = jest.fn()

      const mockElement = document.createElement('div')
      mockElement.scrollIntoView = scrollIntoViewMock

      const getElementByIdSpy = jest.spyOn(document, 'getElementById')
      getElementByIdSpy.mockReturnValue(mockElement)

      render(<TableOfContents items={mockItems} />)

      await user.click(screen.getByText('Prerequisites'))
      expect(getElementByIdSpy).toHaveBeenCalledWith('prerequisites')

      await user.click(screen.getByText('Conclusion'))
      expect(getElementByIdSpy).toHaveBeenCalledWith('conclusion')

      getElementByIdSpy.mockRestore()
    })
  })

  describe('Edge cases', () => {
    it('returns null for empty items array', () => {
      const { container } = render(<TableOfContents items={[]} />)

      expect(container.innerHTML).toBe('')
    })

    it('renders with a single item', () => {
      const singleItem: TOCItem[] = [
        { id: 'only-heading', text: 'Only Heading', level: 2 },
      ]

      render(<TableOfContents items={singleItem} />)

      expect(screen.getByText('Only Heading')).toBeInTheDocument()
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(1)
    })

    it('renders all level 3 items correctly', () => {
      const allLevel3: TOCItem[] = [
        { id: 'sub-a', text: 'Sub A', level: 3 },
        { id: 'sub-b', text: 'Sub B', level: 3 },
      ]

      render(<TableOfContents items={allLevel3} />)

      const subA = screen.getByText('Sub A')
      const subB = screen.getByText('Sub B')

      expect(subA).toHaveClass('ml-4')
      expect(subB).toHaveClass('ml-4')
    })

    it('preserves sticky class when custom className is added', () => {
      render(<TableOfContents items={mockItems} className="extra-style" />)

      const nav = screen.getByRole('navigation', { name: 'Table of contents' })
      expect(nav).toHaveClass('sticky')
      expect(nav).toHaveClass('top-24')
      expect(nav).toHaveClass('extra-style')
    })
  })
})
