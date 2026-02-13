import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BPMIndicator } from './BPMIndicator'

const meta = {
  title: 'MDX/BPMIndicator',
  component: BPMIndicator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    bpm: {
      control: { type: 'number', min: 40, max: 220 },
      description: 'Beats per minute value',
    },
    label: {
      control: 'text',
      description: 'Optional label displayed below in block mode',
    },
    inline: {
      control: 'boolean',
      description: 'Render as inline badge (true) or block display (false)',
    },
  },
} satisfies Meta<typeof BPMIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const BlockDefault: Story = {
  args: {
    bpm: 138,
    inline: false,
  },
}

export const BlockWithLabel: Story = {
  args: {
    bpm: 142,
    label: 'Average tempo during the Berlin half marathon',
    inline: false,
  },
}

export const InlineDefault: Story = {
  args: {
    bpm: 128,
    inline: true,
  },
}

export const InlineInText: Story = {
  args: {
    bpm: 140,
    inline: true,
  },
  decorators: [
    (Story) => (
      <p style={{ color: '#d1d5db', maxWidth: '500px', lineHeight: 1.8 }}>
        The track was running at <Story /> which perfectly matched my cadence
        during the tempo intervals. Finding that sweet spot between music BPM
        and running cadence is the key to the dual-life approach.
      </p>
    ),
  ],
}

export const HighBPMBlock: Story = {
  args: {
    bpm: 175,
    label: 'Peak heart rate during VO2max intervals',
    inline: false,
  },
}

export const LowBPMInline: Story = {
  args: {
    bpm: 95,
    inline: true,
  },
}

export const TechnoBPMBlock: Story = {
  args: {
    bpm: 136,
    label: 'Classic techno tempo - perfect for long runs',
    inline: false,
  },
}
