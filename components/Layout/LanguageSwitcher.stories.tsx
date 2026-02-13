import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LanguageSwitcher } from './LanguageSwitcher'

const meta = {
  title: 'Layout/LanguageSwitcher',
  component: LanguageSwitcher,
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const English: Story = {
  args: { currentLocale: 'en' },
}

export const Spanish: Story = {
  args: { currentLocale: 'es' },
}
