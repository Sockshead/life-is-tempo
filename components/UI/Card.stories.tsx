import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Card } from './Card'

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    glow: { control: 'boolean' },
    glass: { control: 'boolean' },
    hover: { control: 'boolean' },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="p-6">
        <h3 className="font-display text-xl uppercase">Default Card</h3>
        <p className="font-mono text-sm text-gray-400 mt-2">Basic card with border and background.</p>
      </div>
    ),
  },
}

export const Glass: Story = {
  args: {
    glass: true,
    children: (
      <div className="p-6">
        <h3 className="font-display text-xl uppercase">Glass Card</h3>
        <p className="font-mono text-sm text-gray-400 mt-2">Glass morphism with backdrop blur.</p>
      </div>
    ),
  },
}

export const Glow: Story = {
  args: {
    glow: true,
    children: (
      <div className="p-6">
        <h3 className="font-display text-xl uppercase">Glow Card</h3>
        <p className="font-mono text-sm text-gray-400 mt-2">Card with purple glow effect.</p>
      </div>
    ),
  },
}

export const NoHover: Story = {
  args: {
    hover: false,
    children: (
      <div className="p-6">
        <h3 className="font-display text-xl uppercase">Static Card</h3>
        <p className="font-mono text-sm text-gray-400 mt-2">No hover animation.</p>
      </div>
    ),
  },
}
