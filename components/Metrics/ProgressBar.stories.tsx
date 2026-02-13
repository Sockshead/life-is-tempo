import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProgressBar } from './ProgressBar'

const meta = {
  title: 'Metrics/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
    },
    variant: {
      control: 'select',
      options: ['linear', 'circular'],
      description: 'Display variant',
    },
    color: {
      control: 'select',
      options: ['purple', 'blue', 'cyan'],
      description: 'Color theme',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the progress indicator',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show percentage label',
    },
    glow: {
      control: 'boolean',
      description: 'Enable glow effect',
    },
  },
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const LinearDefault: Story = {
  args: {
    value: 65,
    variant: 'linear',
    color: 'cyan',
    size: 'md',
    showLabel: false,
    glow: false,
  },
}

export const LinearWithLabel: Story = {
  args: {
    value: 75,
    variant: 'linear',
    color: 'purple',
    size: 'md',
    showLabel: true,
    glow: false,
  },
}

export const LinearWithGlow: Story = {
  args: {
    value: 85,
    variant: 'linear',
    color: 'cyan',
    size: 'md',
    showLabel: true,
    glow: true,
  },
}

export const LinearSmall: Story = {
  args: {
    value: 50,
    variant: 'linear',
    color: 'blue',
    size: 'sm',
    showLabel: false,
    glow: false,
  },
}

export const LinearLarge: Story = {
  args: {
    value: 90,
    variant: 'linear',
    color: 'purple',
    size: 'lg',
    showLabel: true,
    glow: true,
  },
}

export const CircularDefault: Story = {
  args: {
    value: 60,
    variant: 'circular',
    color: 'cyan',
    size: 'md',
    showLabel: true,
  },
}

export const CircularSmall: Story = {
  args: {
    value: 45,
    variant: 'circular',
    color: 'blue',
    size: 'sm',
    showLabel: true,
  },
}

export const CircularLarge: Story = {
  args: {
    value: 80,
    variant: 'circular',
    color: 'purple',
    size: 'lg',
    showLabel: true,
  },
}

export const PurpleLinear: Story = {
  args: {
    value: 70,
    variant: 'linear',
    color: 'purple',
    size: 'md',
    showLabel: true,
    glow: false,
  },
}

export const BlueLinear: Story = {
  args: {
    value: 55,
    variant: 'linear',
    color: 'blue',
    size: 'md',
    showLabel: true,
    glow: false,
  },
}

export const CyanCircular: Story = {
  args: {
    value: 92,
    variant: 'circular',
    color: 'cyan',
    size: 'lg',
    showLabel: true,
  },
}

export const EmptyProgress: Story = {
  args: {
    value: 0,
    variant: 'linear',
    color: 'cyan',
    size: 'md',
    showLabel: true,
    glow: false,
  },
}

export const FullProgress: Story = {
  args: {
    value: 100,
    variant: 'linear',
    color: 'purple',
    size: 'md',
    showLabel: true,
    glow: true,
  },
}
