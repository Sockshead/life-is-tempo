import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ImageGrid } from './ImageGrid'

const meta = {
  title: 'MDX/ImageGrid',
  component: ImageGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    columns: {
      control: 'select',
      options: [2, 3],
      description: 'Number of grid columns',
    },
  },
} satisfies Meta<typeof ImageGrid>

export default meta
type Story = StoryObj<typeof meta>

export const TwoColumns: Story = {
  args: {
    columns: 2,
    images: [
      {
        src: 'https://via.placeholder.com/400x300/8B5CF6/ffffff?text=Training+Day',
        alt: 'Morning training session',
        caption: 'Early morning swim at Wannsee',
      },
      {
        src: 'https://via.placeholder.com/400x300/06B6D4/ffffff?text=Recovery+Run',
        alt: 'Recovery run through the park',
        caption: 'Easy recovery jog through Tiergarten',
      },
    ],
  },
}

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    images: [
      {
        src: 'https://via.placeholder.com/400x300/8B5CF6/ffffff?text=Swim',
        alt: 'Swim training',
        caption: 'Open water swim practice',
      },
      {
        src: 'https://via.placeholder.com/400x300/3B82F6/ffffff?text=Bike',
        alt: 'Bike training',
        caption: '90K bike ride in Brandenburg',
      },
      {
        src: 'https://via.placeholder.com/400x300/06B6D4/ffffff?text=Run',
        alt: 'Run training',
        caption: 'Half marathon tempo run',
      },
    ],
  },
}

export const TwoColumnsWithoutCaptions: Story = {
  args: {
    columns: 2,
    images: [
      {
        src: 'https://via.placeholder.com/400x300/8B5CF6/ffffff?text=Berlin+Warehouse',
        alt: 'Berlin warehouse venue',
      },
      {
        src: 'https://via.placeholder.com/400x300/06B6D4/ffffff?text=Bogota+Club',
        alt: 'Bogota underground club',
      },
    ],
  },
}

export const ThreeColumnsRaceDay: Story = {
  args: {
    columns: 3,
    images: [
      {
        src: 'https://via.placeholder.com/400x300/8B5CF6/ffffff?text=Pre+Race',
        alt: 'Pre-race preparation',
        caption: 'Transition area setup at 5 AM',
      },
      {
        src: 'https://via.placeholder.com/400x300/3B82F6/ffffff?text=Race+Action',
        alt: 'During the race',
        caption: 'Bike leg through Berlin streets',
      },
      {
        src: 'https://via.placeholder.com/400x300/06B6D4/ffffff?text=Finish+Line',
        alt: 'Crossing the finish line',
        caption: 'Finish line - 5:42:18',
      },
    ],
  },
}

export const FourImagesTwoColumns: Story = {
  args: {
    columns: 2,
    images: [
      {
        src: 'https://via.placeholder.com/400x300/8B5CF6/ffffff?text=Image+1',
        alt: 'Training image 1',
        caption: 'Monday swim session',
      },
      {
        src: 'https://via.placeholder.com/400x300/3B82F6/ffffff?text=Image+2',
        alt: 'Training image 2',
        caption: 'Tuesday bike intervals',
      },
      {
        src: 'https://via.placeholder.com/400x300/06B6D4/ffffff?text=Image+3',
        alt: 'Training image 3',
        caption: 'Wednesday recovery',
      },
      {
        src: 'https://via.placeholder.com/400x300/10B981/ffffff?text=Image+4',
        alt: 'Training image 4',
        caption: 'Thursday tempo run',
      },
    ],
  },
}
