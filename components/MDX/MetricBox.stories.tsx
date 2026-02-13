import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MetricBox } from './MetricBox'

const meta = {
  title: 'MDX/MetricBox',
  component: MetricBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
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
      description: 'Optional unit suffix',
    },
    color: {
      control: 'select',
      options: ['purple', 'blue', 'cyan'],
      description: 'Color theme',
    },
    variant: {
      control: 'select',
      options: ['static', 'counter', 'pulse'],
      description: 'Display variant',
    },
  },
} satisfies Meta<typeof MetricBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 70.3,
    label: 'RACE DISTANCE',
    unit: 'MI',
    color: 'cyan',
    variant: 'static',
  },
}

export const CyanCounter: Story = {
  args: {
    value: 214,
    label: 'DAYS TO RACE',
    color: 'cyan',
    variant: 'counter',
    description: 'Countdown to Berlin 70.3',
  },
}

export const PurplePulse: Story = {
  args: {
    value: 165,
    label: 'MAX HEART RATE',
    unit: 'BPM',
    color: 'purple',
    variant: 'pulse',
  },
}

export const BlueStatic: Story = {
  args: {
    value: 1.9,
    label: 'SWIM DISTANCE',
    unit: 'K',
    color: 'blue',
    variant: 'static',
    description: 'Open water swim leg',
  },
}

export const WithDescription: Story = {
  args: {
    value: 138,
    label: 'TRACK BPM',
    unit: 'BPM',
    color: 'purple',
    variant: 'pulse',
    description: 'The sweet spot where techno meets tempo running cadence',
  },
}

export const PurpleCounter: Story = {
  args: {
    value: 48,
    label: 'SESSIONS COMPLETED',
    color: 'purple',
    variant: 'counter',
  },
}

export const BlueCounter: Story = {
  args: {
    value: 90,
    label: 'BIKE DISTANCE',
    unit: 'KM',
    color: 'blue',
    variant: 'counter',
    description: 'Bike leg distance for Ironman 70.3',
  },
}
