import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MobileMenu } from './MobileMenu'

const meta = {
  title: 'Layout/MobileMenu',
  component: MobileMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MobileMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: { isOpen: true, onClose: () => {}, locale: 'en' },
}

export const Closed: Story = {
  args: { isOpen: false, onClose: () => {}, locale: 'en' },
}
