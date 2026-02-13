import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CategoryFilter } from './CategoryFilter'

const defaultCategories = [
  { id: 'training', label: 'Training Chronicles', color: 'purple' as const },
  { id: 'dual-life', label: 'Dual Life Tactics', color: 'blue' as const },
  { id: 'underground', label: 'Underground Endurance', color: 'cyan' as const },
]

const meta = {
  title: 'Blog/CategoryFilter',
  component: CategoryFilter,
  tags: ['autodocs'],
  args: {
    categories: defaultCategories,
    onCategoryChange: () => {},
  },
} satisfies Meta<typeof CategoryFilter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    activeCategory: null,
  },
}

export const TrainingActive: Story = {
  args: {
    activeCategory: 'training',
  },
}

export const DualLifeActive: Story = {
  args: {
    activeCategory: 'dual-life',
  },
}

export const UndergroundActive: Story = {
  args: {
    activeCategory: 'underground',
  },
}
