import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Section } from './Section'

const meta = {
  title: 'Layout/Section',
  component: Section,
  tags: ['autodocs'],
  argTypes: {
    py: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'xl'] },
  },
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div>
        <h2 className="font-display text-3xl uppercase">Section Title</h2>
        <p className="font-mono text-gray-400 mt-2">Content within a section container.</p>
      </div>
    ),
  },
}

export const Small: Story = {
  args: {
    py: 'sm',
    children: <p className="font-mono text-gray-400">Small padding section.</p>,
  },
}

export const Large: Story = {
  args: {
    py: 'xl',
    children: <p className="font-mono text-gray-400">Extra large padding section.</p>,
  },
}
