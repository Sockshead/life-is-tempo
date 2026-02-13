import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PostCard } from './PostCard'
import { mockPost, mockPostDualLife, mockPostUnderground } from '../../.storybook/mock-data'

const meta = {
  title: 'Blog/PostCard',
  component: PostCard,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'featured', 'compact'] },
  },
} satisfies Meta<typeof PostCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { post: mockPost },
}

export const Featured: Story = {
  args: { post: mockPost, variant: 'featured' },
}

export const Compact: Story = {
  args: { post: mockPost, variant: 'compact' },
}

export const DualLife: Story = {
  args: { post: mockPostDualLife },
}

export const Underground: Story = {
  args: { post: mockPostUnderground },
}
