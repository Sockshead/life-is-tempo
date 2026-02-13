import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CalloutBox } from './CalloutBox'

const meta = {
  title: 'MDX/CalloutBox',
  component: CalloutBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'warning', 'tip', 'note'],
      description: 'Callout type determines border color and icon',
    },
    title: {
      control: 'text',
      description: 'Optional title displayed above the content',
    },
  },
} satisfies Meta<typeof CalloutBox>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Training Zone Guide',
    children:
      'Zone 2 training should make up 80% of your weekly volume. Keep your heart rate between 120-140 BPM for optimal aerobic development.',
  },
}

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Overtraining Alert',
    children:
      'If your resting heart rate is elevated by more than 5 BPM for consecutive days, consider taking a rest day. Recovery is where adaptation happens.',
  },
}

export const Tip: Story = {
  args: {
    type: 'tip',
    title: 'Pro Tip',
    children:
      'Match your running cadence to the BPM of your techno playlist. A 170-180 BPM track naturally guides you to an optimal stride rate.',
  },
}

export const Note: Story = {
  args: {
    type: 'note',
    title: 'Training Note',
    children:
      'Berlin 70.3 swim leg is in Wannsee lake. Practice open water swimming with sighting every 6-8 strokes to prepare for race conditions.',
  },
}

export const InfoWithoutTitle: Story = {
  args: {
    type: 'info',
    children:
      'Ironman 70.3 consists of a 1.9km swim, 90km bike, and 21.1km run. Total distance is approximately 113km or 70.3 miles.',
  },
}

export const WarningWithoutTitle: Story = {
  args: {
    type: 'warning',
    children:
      'Never increase weekly training volume by more than 10% to avoid injury. Consistency beats intensity in endurance sports.',
  },
}

export const TipWithoutTitle: Story = {
  args: {
    type: 'tip',
    children:
      'Use a foam roller for 10 minutes post-training while listening to ambient techno. Recovery and decompression in one session.',
  },
}

export const NoteWithoutTitle: Story = {
  args: {
    type: 'note',
    children:
      'This post was written at 3 AM after a warehouse set in Bogota. The parallels between endurance in sport and on the dance floor are real.',
  },
}
