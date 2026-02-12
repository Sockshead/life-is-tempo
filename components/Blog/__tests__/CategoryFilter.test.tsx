import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CategoryFilter } from '../CategoryFilter'

const mockCategories = [
  { id: 'training', label: 'Training', color: 'purple' as const },
  { id: 'dual-life', label: 'Dual Life', color: 'blue' as const },
  { id: 'underground', label: 'Underground', color: 'cyan' as const },
]

describe('CategoryFilter', () => {
  describe('Rendering', () => {
    it('renders "All" button', () => {
      render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory={null}
          onCategoryChange={jest.fn()}
        />
      )

      expect(screen.getByText('All')).toBeInTheDocument()
    })

    it('renders all category buttons', () => {
      render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory={null}
          onCategoryChange={jest.fn()}
        />
      )

      expect(screen.getByText('Training')).toBeInTheDocument()
      expect(screen.getByText('Dual Life')).toBeInTheDocument()
      expect(screen.getByText('Underground')).toBeInTheDocument()
    })

    it('renders correct number of buttons (All + categories)', () => {
      render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory={null}
          onCategoryChange={jest.fn()}
        />
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(4) // All + 3 categories
    })

    it('renders within a nav element with aria-label', () => {
      render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory={null}
          onCategoryChange={jest.fn()}
        />
      )

      const nav = screen.getByRole('navigation', { name: 'Filter posts by category' })
      expect(nav).toBeInTheDocument()
    })
  })

  describe('Active state', () => {
    it('marks "All" as active when activeCategory is null', () => {
      render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory={null}
          onCategoryChange={jest.fn()}
        />
      )

      const allButton = screen.getByText('All')
      expect(allButton).toHaveAttribute('aria-pressed', 'true')
      expect(allButton).toHaveClass('bg-brand-cyan')
      expect(allButton).toHaveClass('text-gray-950')
    })

    it('marks category as active with correct color', () => {
      render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory="training"
          onCategoryChange={jest.fn()}
        />
      )

      const trainingButton = screen.getByText('Training')
      expect(trainingButton).toHaveAttribute('aria-pressed', 'true')
      expect(trainingButton).toHaveClass('bg-brand-purple')
      expect(trainingButton).toHaveClass('text-gray-950')
    })

    it('marks blue category as active with blue color', () => {
      render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory="dual-life"
          onCategoryChange={jest.fn()}
        />
      )

      const dualLifeButton = screen.getByText('Dual Life')
      expect(dualLifeButton).toHaveAttribute('aria-pressed', 'true')
      expect(dualLifeButton).toHaveClass('bg-brand-blue')
    })

    it('marks cyan category as active with cyan color', () => {
      render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory="underground"
          onCategoryChange={jest.fn()}
        />
      )

      const undergroundButton = screen.getByText('Underground')
      expect(undergroundButton).toHaveAttribute('aria-pressed', 'true')
      expect(undergroundButton).toHaveClass('bg-brand-cyan')
    })

    it('marks "All" as inactive when a category is selected', () => {
      render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory="training"
          onCategoryChange={jest.fn()}
        />
      )

      const allButton = screen.getByText('All')
      expect(allButton).toHaveAttribute('aria-pressed', 'false')
      expect(allButton).toHaveClass('bg-gray-800')
    })

    it('marks unselected categories as inactive', () => {
      render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory="training"
          onCategoryChange={jest.fn()}
        />
      )

      const dualLifeButton = screen.getByText('Dual Life')
      expect(dualLifeButton).toHaveAttribute('aria-pressed', 'false')
      expect(dualLifeButton).toHaveClass('bg-gray-800')
      expect(dualLifeButton).toHaveClass('text-gray-400')
    })
  })

  describe('Interactions', () => {
    it('calls onCategoryChange with null when "All" is clicked', async () => {
      const user = userEvent.setup()
      const onCategoryChange = jest.fn()

      render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory="training"
          onCategoryChange={onCategoryChange}
        />
      )

      await user.click(screen.getByText('All'))
      expect(onCategoryChange).toHaveBeenCalledWith(null)
    })

    it('calls onCategoryChange with category id when category is clicked', async () => {
      const user = userEvent.setup()
      const onCategoryChange = jest.fn()

      render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory={null}
          onCategoryChange={onCategoryChange}
        />
      )

      await user.click(screen.getByText('Training'))
      expect(onCategoryChange).toHaveBeenCalledWith('training')
    })

    it('calls onCategoryChange with correct id for each category', async () => {
      const user = userEvent.setup()
      const onCategoryChange = jest.fn()

      render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory={null}
          onCategoryChange={onCategoryChange}
        />
      )

      await user.click(screen.getByText('Underground'))
      expect(onCategoryChange).toHaveBeenCalledWith('underground')

      await user.click(screen.getByText('Dual Life'))
      expect(onCategoryChange).toHaveBeenCalledWith('dual-life')
    })
  })

  describe('Styling', () => {
    it('applies font-mono and uppercase to buttons', () => {
      render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory={null}
          onCategoryChange={jest.fn()}
        />
      )

      const allButton = screen.getByText('All')
      expect(allButton).toHaveClass('font-mono')
      expect(allButton).toHaveClass('uppercase')
      expect(allButton).toHaveClass('text-sm')
    })

    it('applies rounded-full to buttons', () => {
      render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory={null}
          onCategoryChange={jest.fn()}
        />
      )

      const buttons = screen.getAllByRole('button')
      buttons.forEach((button) => {
        expect(button).toHaveClass('rounded-full')
      })
    })

    it('applies custom className', () => {
      const { container } = render(
        <CategoryFilter
          categories={mockCategories}
          activeCategory={null}
          onCategoryChange={jest.fn()}
          className="custom-class"
        />
      )

      const nav = container.querySelector('nav')
      expect(nav).toHaveClass('custom-class')
    })
  })

  describe('Edge cases', () => {
    it('renders with empty categories array (only All button)', () => {
      render(
        <CategoryFilter
          categories={[]}
          activeCategory={null}
          onCategoryChange={jest.fn()}
        />
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(1)
      expect(screen.getByText('All')).toBeInTheDocument()
    })

    it('renders with single category', () => {
      render(
        <CategoryFilter
          categories={[{ id: 'training', label: 'Training', color: 'purple' }]}
          activeCategory={null}
          onCategoryChange={jest.fn()}
        />
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
    })
  })
})
