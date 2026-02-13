import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ToastProvider, useToast } from './Toast'

function ToastDemo({ type, message, duration }: { type: 'success' | 'error' | 'info' | 'warning'; message: string; duration?: number }) {
  const { showToast } = useToast()
  return (
    <button
      onClick={() => showToast({ type, message, duration })}
      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white font-mono text-sm hover:bg-gray-700"
    >
      Show {type} toast
    </button>
  )
}

const meta = {
  title: 'UI/Toast',
  component: ToastDemo,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof ToastDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: { type: 'success', message: 'Training session saved!' },
}

export const Error: Story = {
  args: { type: 'error', message: 'Failed to load post data.' },
}

export const Info: Story = {
  args: { type: 'info', message: 'New post published.' },
}

export const Warning: Story = {
  args: { type: 'warning', message: 'You are approaching your rate limit.' },
}
