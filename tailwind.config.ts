import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          purple: '#8B5CF6',
          blue: '#3B82F6',
          cyan: '#06B6D4',
          dark: '#0a0a0a',
        },
        // Extended gray scale
        gray: {
          950: '#0a0a0a',
          900: '#171717',
          800: '#262626',
          600: '#525252',
          400: '#a3a3a3',
        }
      },
      fontFamily: {
        display: ['var(--font-bebas-neue)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      animation: {
        scanline: 'scanline 8s linear infinite',
        glitch: 'glitchReveal 0.5s ease-out',
        shine: 'shine 3s linear infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        'gradient-rotate': 'gradientRotate 10s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitchReveal: {
          '0%': {
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            transform: 'translate(0)',
          },
          '20%': {
            clipPath: 'polygon(0 15%, 100% 15%, 100% 15%, 0 15%)',
            transform: 'translate(-2px)',
          },
          '40%': {
            clipPath: 'polygon(0 10%, 100% 10%, 100% 20%, 0 20%)',
            transform: 'translate(2px)',
          },
          '60%': {
            clipPath: 'polygon(0 50%, 100% 50%, 100% 60%, 0 60%)',
            transform: 'translate(-1px)',
          },
          '80%': {
            clipPath: 'polygon(0 70%, 100% 70%, 100% 80%, 0 80%)',
            transform: 'translate(1px)',
          },
          '100%': {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            transform: 'translate(0)',
          },
        },
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        gradientRotate: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}

export default config
