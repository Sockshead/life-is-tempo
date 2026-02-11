import type { DesignTokens, ColorPalette, AnimationConfig, AnimationVariant } from '@/types/design-system'

export const colors: ColorPalette = {
  brand: {
    purple: '#8B5CF6',
    blue: '#3B82F6',
    cyan: '#06B6D4',
    dark: '#0a0a0a',
  },
  gray: {
    950: '#0a0a0a',
    900: '#171717',
    800: '#262626',
    600: '#525252',
    400: '#a3a3a3',
  },
}

export const spacing = {
  4: '4px',
  8: '8px',
  12: '12px',
  16: '16px',
  24: '24px',
  32: '32px',
  48: '48px',
  64: '64px',
  96: '96px',
  128: '128px',
} as const

export const animations: Record<AnimationVariant, AnimationConfig> = {
  scanline: {
    name: 'scanline',
    duration: '8s',
    timingFunction: 'linear',
    iterationCount: 'infinite',
  },
  glitch: {
    name: 'glitch',
    duration: '0.5s',
    timingFunction: 'ease-out',
    iterationCount: 1,
  },
  shine: {
    name: 'shine',
    duration: '3s',
    timingFunction: 'linear',
    iterationCount: 'infinite',
  },
  pulse: {
    name: 'pulse',
    duration: '2s',
    timingFunction: 'ease-in-out',
    iterationCount: 'infinite',
  },
  'gradient-rotate': {
    name: 'gradient-rotate',
    duration: '10s',
    timingFunction: 'linear',
    iterationCount: 'infinite',
  },
}

export const fonts = {
  display: 'var(--font-bebas-neue)',
  mono: 'var(--font-jetbrains-mono)',
}

export const designTokens: DesignTokens = {
  colors,
  spacing,
  animations,
  fonts,
}

// Helper functions for programmatic access
export const getColor = (path: string): string => {
  const keys = path.split('.')
  let value: unknown = colors
  for (const key of keys) {
    if (typeof value === 'object' && value !== null && key in value) {
      value = (value as Record<string, unknown>)[key]
    }
  }
  return value as string
}

export const getSpacing = (size: keyof typeof spacing): string => {
  return spacing[size]
}

export const getAnimation = (variant: AnimationVariant): AnimationConfig => {
  return animations[variant]
}
