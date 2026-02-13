import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Button } from './Button'

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: 'Start Training', variant: 'primary' },
}

export const Secondary: Story = {
  args: { children: 'Learn More', variant: 'secondary' },
}

export const Ghost: Story = {
  args: { children: 'Cancel', variant: 'ghost' },
}

export const Loading: Story = {
  args: { children: 'Submitting...', loading: true },
}

export const AsLink: Story = {
  args: { children: 'Go to Blog', href: '/blog' },
}

export const Small: Story = {
  args: { children: 'Small', size: 'sm' },
}

export const Large: Story = {
  args: { children: 'Large Button', size: 'lg' },
}

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
}
