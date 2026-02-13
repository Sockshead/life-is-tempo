import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MetricDisplay } from './MetricDisplay'

const meta = {
  title: 'Metrics/MetricDisplay',
  component: MetricDisplay,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'Numeric value to display',
    },
    label: {
      control: 'text',
      description: 'Label text shown above the value',
    },
    description: {
      control: 'text',
      description: 'Optional description shown below the value',
    },
    unit: {
      control: 'text',
      description: 'Optional unit suffix (e.g., "MI", "BPM", "K")',
    },
    variant: {
      control: 'select',
      options: ['static', 'counter', 'pulse', 'progress'],
      description: 'Display variant',
    },
    color: {
      control: 'select',
      options: ['purple', 'blue', 'cyan', 'white'],
      description: 'Color theme for the value',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the value display',
    },
    maxValue: {
      control: { type: 'number' },
      description: 'Maximum value for progress variant',
    },
  },
} satisfies Meta<typeof MetricDisplay>

export default meta
type Story = StoryObj<typeof meta>

export const Static: Story = {
  args: {
    value: 70.3,
    label: 'RACE DISTANCE',
    unit: 'MI',
    variant: 'static',
    color: 'white',
    size: 'md',
  },
}

export const Counter: Story = {
  args: {
    value: 214,
    label: 'DAYS REMAINING',
    variant: 'counter',
    color: 'cyan',
    size: 'md',
  },
}

export const Pulse: Story = {
  args: {
    value: 165,
    label: 'MAX HR',
    unit: 'BPM',
    variant: 'pulse',
    color: 'purple',
    size: 'md',
  },
}

export const Progress: Story = {
  args: {
    value: 45,
    maxValue: 70,
    label: 'TRAINING PROGRESS',
    variant: 'progress',
    color: 'cyan',
    size: 'md',
  },
}

export const WithDescription: Story = {
  args: {
    value: 1.9,
    label: 'SWIM DISTANCE',
    unit: 'K',
    description: 'Open water swim leg of Ironman 70.3',
    variant: 'static',
    color: 'blue',
    size: 'md',
  },
}

export const PurpleLarge: Story = {
  args: {
    value: 42,
    label: 'WEEKLY HOURS',
    unit: 'HR',
    variant: 'static',
    color: 'purple',
    size: 'lg',
  },
}

export const CyanSmall: Story = {
  args: {
    value: 128,
    label: 'AVG BPM',
    unit: 'BPM',
    variant: 'counter',
    color: 'cyan',
    size: 'sm',
  },
}

export const BlueCounter: Story = {
  args: {
    value: 90,
    label: 'BIKE DISTANCE',
    unit: 'K',
    variant: 'counter',
    color: 'blue',
    size: 'md',
  },
}

export const ProgressHighCompletion: Story = {
  args: {
    value: 85,
    maxValue: 100,
    label: 'SEASON PROGRESS',
    variant: 'progress',
    color: 'purple',
    size: 'md',
    description: 'Training plan completion rate',
  },
}
