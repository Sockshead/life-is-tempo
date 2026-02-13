import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AudioEmbed } from './AudioEmbed'

const meta = {
  title: 'MDX/AudioEmbed',
  component: AudioEmbed,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    platform: {
      control: 'select',
      options: ['spotify', 'soundcloud'],
      description: 'Audio platform',
    },
    url: {
      control: 'text',
      description: 'Embed URL for the audio content',
    },
    title: {
      control: 'text',
      description: 'Optional title displayed above the embed',
    },
  },
} satisfies Meta<typeof AudioEmbed>

export default meta
type Story = StoryObj<typeof meta>

export const SpotifyTrack: Story = {
  args: {
    platform: 'spotify',
    url: 'https://open.spotify.com/track/5W3cjX2J3tjhG8zb6u0qHn',
    title: 'Training Playlist - Tempo Run',
  },
}

export const SpotifyPlaylist: Story = {
  args: {
    platform: 'spotify',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DX6J5NfMJS675',
    title: 'Techno Running Mix',
  },
}

export const SpotifyWithoutTitle: Story = {
  args: {
    platform: 'spotify',
    url: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT',
  },
}

export const SoundCloudTrack: Story = {
  args: {
    platform: 'soundcloud',
    url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1234567890&color=%238b5cf6&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false',
    title: 'Underground Techno Set - Berlin Warehouse',
  },
}

export const SoundCloudWithoutTitle: Story = {
  args: {
    platform: 'soundcloud',
    url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/9876543210&color=%2306b6d4&auto_play=false&hide_related=true&show_comments=false',
  },
}
