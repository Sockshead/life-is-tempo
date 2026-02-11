export type BrandColor = 'purple' | 'blue' | 'cyan' | 'dark'

export interface ColorPalette {
  brand: {
    purple: string
    blue: string
    cyan: string
    dark: string
  }
  gray: {
    950: string
    900: string
    800: string
    600: string
    400: string
  }
}

export type AnimationVariant =
  | 'scanline'
  | 'glitch'
  | 'shine'
  | 'pulse'
  | 'gradient-rotate'

export interface AnimationConfig {
  name: AnimationVariant
  duration: string
  timingFunction: string
  iterationCount: string | number
}

export type SpacingScale = 4 | 8 | 12 | 16 | 24 | 32 | 48 | 64 | 96 | 128

export interface DesignTokens {
  colors: ColorPalette
  spacing: Record<SpacingScale, string>
  animations: Record<AnimationVariant, AnimationConfig>
  fonts: {
    display: string
    mono: string
  }
}
