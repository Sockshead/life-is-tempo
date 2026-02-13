import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Input } from './Input'

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'textarea'] },
    error: { control: 'text' },
    success: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: { label: 'Name', placeholder: 'Enter your name' },
}

export const Email: Story = {
  args: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
}

export const WithError: Story = {
  args: { label: 'Email', type: 'email', value: 'invalid', error: 'Please enter a valid email address' },
}

export const WithSuccess: Story = {
  args: { label: 'Email', type: 'email', value: 'valid@email.com', success: true },
}

export const Textarea: Story = {
  args: { label: 'Message', type: 'textarea', placeholder: 'Write your message...', maxLength: 500 },
}

export const Required: Story = {
  args: { label: 'Required Field', required: true, placeholder: 'This field is required' },
}

export const WithHelper: Story = {
  args: { label: 'BPM', placeholder: '120', helperText: 'Enter beats per minute (60-200)' },
}
