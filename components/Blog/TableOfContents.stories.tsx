import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TableOfContents } from './TableOfContents'
import type { TOCItem } from './TableOfContents'

const sampleItems: TOCItem[] = [
  { id: 'introduction', text: 'Introduction', level: 2 },
  { id: 'the-climb', text: 'The Climb', level: 2 },
  { id: 'pacing-strategy', text: 'Pacing Strategy', level: 3 },
  { id: 'altitude-effects', text: 'Altitude Effects', level: 3 },
  { id: 'lessons-learned', text: 'Lessons Learned', level: 2 },
  { id: 'recovery', text: 'Recovery Protocol', level: 3 },
  { id: 'conclusion', text: 'Conclusion', level: 2 },
]

const meta = {
  title: 'Blog/TableOfContents',
  component: TableOfContents,
  tags: ['autodocs'],
} satisfies Meta<typeof TableOfContents>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: sampleItems,
  },
}

export const ShortList: Story = {
  args: {
    items: [
      { id: 'overview', text: 'Overview', level: 2 },
      { id: 'details', text: 'Details', level: 2 },
      { id: 'summary', text: 'Summary', level: 2 },
    ],
  },
}

export const DeeplyNested: Story = {
  args: {
    items: [
      { id: 'training-plan', text: 'Training Plan', level: 2 },
      { id: 'swim', text: 'Swim Sessions', level: 3 },
      { id: 'bike', text: 'Bike Sessions', level: 3 },
      { id: 'run', text: 'Run Sessions', level: 3 },
      { id: 'nutrition', text: 'Nutrition', level: 2 },
      { id: 'pre-workout', text: 'Pre-Workout', level: 3 },
      { id: 'post-workout', text: 'Post-Workout', level: 3 },
    ],
  },
}

export const Empty: Story = {
  args: {
    items: [],
  },
}
