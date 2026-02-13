import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { StatCard } from './StatCard'

const meta = {
  title: 'Metrics/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '700px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Optional card title',
    },
    description: {
      control: 'text',
      description: 'Optional card description',
    },
    columns: {
      control: 'select',
      options: [2, 3, 4],
      description: 'Number of columns in grid layout',
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
    },
    glow: {
      control: 'boolean',
      description: 'Enable glow effect',
    },
  },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const RaceStats: Story = {
  args: {
    title: 'Race Stats',
    description: '2026 Ironman 70.3 Berlin Training Metrics',
    columns: 3,
    glass: true,
    glow: true,
    metrics: [
      { value: 70.3, label: 'DISTANCE', unit: 'MI', variant: 'counter', color: 'purple' },
      { value: 1.9, label: 'SWIM', unit: 'K', variant: 'static', color: 'blue' },
      { value: 90, label: 'BIKE', unit: 'K', variant: 'static', color: 'cyan' },
    ],
  },
}

export const WeeklyTraining: Story = {
  args: {
    title: 'Weekly Training Summary',
    description: 'Week 12 of 24-week training block',
    columns: 4,
    glass: true,
    glow: false,
    metrics: [
      { value: 12, label: 'TOTAL HOURS', unit: 'HR', variant: 'counter', color: 'cyan' },
      { value: 45, label: 'SWIM VOLUME', unit: 'K', variant: 'static', color: 'blue' },
      { value: 180, label: 'BIKE DISTANCE', unit: 'KM', variant: 'counter', color: 'purple' },
      { value: 35, label: 'RUN DISTANCE', unit: 'KM', variant: 'counter', color: 'cyan' },
    ],
  },
}

export const HeartRateZones: Story = {
  args: {
    title: 'Heart Rate Zones',
    description: 'Distribution from last training session',
    columns: 3,
    glass: true,
    glow: true,
    metrics: [
      { value: 125, label: 'AVG HR', unit: 'BPM', variant: 'pulse', color: 'blue' },
      { value: 172, label: 'MAX HR', unit: 'BPM', variant: 'pulse', color: 'purple' },
      { value: 58, label: 'RESTING HR', unit: 'BPM', variant: 'static', color: 'cyan' },
    ],
  },
}

export const TwoColumns: Story = {
  args: {
    title: 'Season Overview',
    columns: 2,
    glass: false,
    glow: false,
    metrics: [
      { value: 214, label: 'DAYS REMAINING', variant: 'counter', color: 'cyan' },
      { value: 48, label: 'SESSIONS COMPLETED', variant: 'counter', color: 'purple' },
    ],
  },
}

export const MinimalNoTitle: Story = {
  args: {
    columns: 3,
    glass: true,
    glow: false,
    metrics: [
      { value: 6.2, label: 'PACE', unit: 'MIN/KM', variant: 'static', color: 'white' },
      { value: 142, label: 'AVG HR', unit: 'BPM', variant: 'static', color: 'cyan' },
      { value: 850, label: 'CALORIES', unit: 'KCAL', variant: 'counter', color: 'purple' },
    ],
  },
}

export const TechnoSessionMetrics: Story = {
  args: {
    title: 'Techno x Training',
    description: 'Metrics from a DJ set endurance run',
    columns: 3,
    glass: true,
    glow: true,
    metrics: [
      { value: 138, label: 'SET BPM', unit: 'BPM', variant: 'pulse', color: 'purple' },
      { value: 21.1, label: 'RUN DISTANCE', unit: 'KM', variant: 'counter', color: 'cyan' },
      { value: 145, label: 'AVG HR', unit: 'BPM', variant: 'pulse', color: 'blue' },
    ],
  },
}
