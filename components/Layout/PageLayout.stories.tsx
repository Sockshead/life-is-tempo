import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PageLayout } from './PageLayout'

const meta = {
  title: 'Layout/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PageLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    locale: 'en',
    children: (
      <div className="p-8">
        <h1 className="font-display text-4xl uppercase">Page Content</h1>
        <p className="font-mono text-gray-400 mt-4">This is the main content area within the PageLayout.</p>
      </div>
    ),
  },
}
