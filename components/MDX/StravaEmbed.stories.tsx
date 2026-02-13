import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { StravaEmbed } from './StravaEmbed'

const meta = {
  title: 'MDX/StravaEmbed',
  component: StravaEmbed,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    activityId: {
      control: 'text',
      description: 'Strava activity ID',
    },
    title: {
      control: 'text',
      description: 'Optional title displayed above the embed',
    },
  },
} satisfies Meta<typeof StravaEmbed>

export default meta
type Story = StoryObj<typeof meta>

export const WithTitle: Story = {
  args: {
    activityId: '1234567890',
    title: 'Sunday Long Run - Tiergarten Loop',
  },
}

export const WithoutTitle: Story = {
  args: {
    activityId: '9876543210',
  },
}

export const TempoRun: Story = {
  args: {
    activityId: '1122334455',
    title: 'Tempo Run at 138 BPM - Techno Intervals',
  },
}

export const BrickWorkout: Story = {
  args: {
    activityId: '5566778899',
    title: 'Brick Workout - 60K Bike + 10K Run',
  },
}

export const OpenWaterSwim: Story = {
  args: {
    activityId: '2233445566',
    title: 'Open Water Swim - Wannsee Practice',
  },
}
