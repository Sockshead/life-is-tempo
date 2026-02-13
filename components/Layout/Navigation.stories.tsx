import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Navigation } from './Navigation'

const meta = {
  title: 'Layout/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  argTypes: {
    mobile: { control: 'boolean' },
  },
} satisfies Meta<typeof Navigation>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {
  args: { locale: 'en', mobile: false },
}

export const Mobile: Story = {
  args: { locale: 'en', mobile: true },
}
