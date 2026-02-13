import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['text', 'card', 'image', 'custom'] },
    rounded: { control: 'boolean' },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const TextLine: Story = {
  args: { variant: 'text' },
}

export const CardPlaceholder: Story = {
  args: { variant: 'card' },
}

export const ImagePlaceholder: Story = {
  args: { variant: 'image' },
}

export const Custom: Story = {
  args: { variant: 'custom', width: 200, height: 200, rounded: true },
}

export const TextGroup: Story = {
  render: () => (
    <div className="space-y-3 max-w-md">
      <Skeleton variant="text" style={{ width: '75%' }} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" style={{ width: '50%' }} />
    </div>
  ),
}
