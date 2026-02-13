import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ReadingProgress } from './ReadingProgress'

const meta = {
  title: 'Blog/ReadingProgress',
  component: ReadingProgress,
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'select',
      options: [undefined, 'training', 'dual-life', 'underground'],
    },
  },
} satisfies Meta<typeof ReadingProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Training: Story = {
  args: {
    category: 'training',
  },
}

export const DualLife: Story = {
  args: {
    category: 'dual-life',
  },
}

export const Underground: Story = {
  args: {
    category: 'underground',
  },
}
