import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FeaturedPost } from './FeaturedPost'
import { mockPost, mockPostDualLife, mockPostUnderground } from '../../.storybook/mock-data'

const meta = {
  title: 'Blog/FeaturedPost',
  component: FeaturedPost,
  tags: ['autodocs'],
} satisfies Meta<typeof FeaturedPost>

export default meta
type Story = StoryObj<typeof meta>

export const Training: Story = {
  args: { post: mockPost },
}

export const DualLife: Story = {
  args: { post: mockPostDualLife },
}

export const Underground: Story = {
  args: { post: mockPostUnderground },
}
