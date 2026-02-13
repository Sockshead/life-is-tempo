import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RelatedPosts } from './RelatedPosts'
import { mockPosts } from '../../.storybook/mock-data'

const meta = {
  title: 'Blog/RelatedPosts',
  component: RelatedPosts,
  tags: ['autodocs'],
} satisfies Meta<typeof RelatedPosts>

export default meta
type Story = StoryObj<typeof meta>

export const TrainingCategory: Story = {
  args: {
    currentPostSlug: 'race-week-nutrition',
    category: 'training',
    posts: mockPosts,
    locale: 'en',
  },
}

export const DualLifeCategory: Story = {
  args: {
    currentPostSlug: 'vinyl-and-vo2max',
    category: 'dual-life',
    posts: mockPosts,
    locale: 'en',
  },
}

export const UndergroundCategory: Story = {
  args: {
    currentPostSlug: 'the-warehouse-workout',
    category: 'underground',
    posts: mockPosts,
    locale: 'en',
  },
}

export const CustomLimit: Story = {
  args: {
    currentPostSlug: 'race-week-nutrition',
    category: 'training',
    posts: mockPosts,
    limit: 2,
    locale: 'en',
  },
}
