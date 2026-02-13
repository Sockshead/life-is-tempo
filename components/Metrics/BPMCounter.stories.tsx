import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BPMCounter } from './BPMCounter'

const meta = {
  title: 'Metrics/BPMCounter',
  component: BPMCounter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    bpm: {
      control: { type: 'number', min: 40, max: 220 },
      description: 'Beats per minute value',
    },
    zone: {
      control: 'select',
      options: ['low', 'moderate', 'high'],
      description: 'Heart rate zone classification',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    showZone: {
      control: 'boolean',
      description: 'Show zone badge',
    },
  },
} satisfies Meta<typeof BPMCounter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    bpm: 130,
    zone: 'moderate',
    size: 'md',
    showZone: true,
  },
}

export const LowZone: Story = {
  args: {
    bpm: 95,
    zone: 'low',
    size: 'md',
    showZone: true,
  },
}

export const ModerateZone: Story = {
  args: {
    bpm: 135,
    zone: 'moderate',
    size: 'md',
    showZone: true,
  },
}

export const HighZone: Story = {
  args: {
    bpm: 172,
    zone: 'high',
    size: 'md',
    showZone: true,
  },
}

export const Small: Story = {
  args: {
    bpm: 120,
    zone: 'moderate',
    size: 'sm',
    showZone: true,
  },
}

export const Large: Story = {
  args: {
    bpm: 155,
    zone: 'high',
    size: 'lg',
    showZone: true,
  },
}

export const WithoutZoneBadge: Story = {
  args: {
    bpm: 140,
    zone: 'moderate',
    size: 'md',
    showZone: false,
  },
}

export const RestingHeartRate: Story = {
  args: {
    bpm: 58,
    zone: 'low',
    size: 'lg',
    showZone: true,
  },
}

export const MaxEffort: Story = {
  args: {
    bpm: 195,
    zone: 'high',
    size: 'lg',
    showZone: true,
  },
}
