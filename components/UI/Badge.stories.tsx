import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Badge } from './Badge'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['purple', 'blue', 'cyan'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    dot: { control: 'boolean' },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Purple: Story = {
  args: { children: 'Training', variant: 'purple' },
}

export const Blue: Story = {
  args: { children: 'Dual Life', variant: 'blue' },
}

export const Cyan: Story = {
  args: { children: 'Underground', variant: 'cyan' },
}

export const Small: Story = {
  args: { children: 'SM', variant: 'purple', size: 'sm' },
}

export const Large: Story = {
  args: { children: 'Large Badge', variant: 'cyan', size: 'lg' },
}

export const WithDot: Story = {
  args: { children: 'Live', variant: 'purple', dot: true },
}

export const WithRemove: Story = {
  args: { children: 'Removable', variant: 'blue', onRemove: () => {} },
}
