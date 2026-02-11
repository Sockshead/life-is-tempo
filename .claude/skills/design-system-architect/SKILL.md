---
skill: design-system-architect
description: Establishes the foundational design system in code for Life Is Tempo
version: 1.0.0
tags: [design-system, tailwind, css, frontend]
dependencies: []
---

# Design System Architect

Establishes the foundational design system in code for the Life Is Tempo platform.

## Context

Life Is Tempo has a distinctive "Underground Endurance Tech" aesthetic - cyberpunk meets athletic performance. The design system merges basement techno club vibes with altitude training data displays.

### Brand Identity
**Colors**:
- Purple (#8B5CF6) - Club Energy, Primary CTAs
- Blue (#3B82F6) - Performance, Secondary Elements
- Cyan (#06B6D4) - Metrics, Highlights, Active States
- Dark (#0a0a0a) - Background, Underground Base

**Typography**:
- Display: Bebas Neue (uppercase, tight tracking -0.05em)
- Body: JetBrains Mono (monospace for technical feel)

**Animations** (BPM-synced motion):
- scanline: CRT effect (8s duration)
- glitchReveal: Logo entrance
- shine: Button hover effect
- pulse: Heartbeat effect (2s = 120 BPM)
- gradientRotate: Background rotation (10s)

**Spacing**: 4px base unit (Tailwind default)

## Scope

Build the foundational design system that all other components will consume:

1. **Tailwind Configuration Extension**
   - Extend theme with brand colors
   - Add custom font families
   - Define animation keyframes
   - Configure animation utilities

2. **Global CSS**
   - Animation keyframes (@keyframes)
   - Reusable animation classes
   - Utility classes (hover-glow, text-gradient-animate, stagger-item)
   - Reduced motion support (@media prefers-reduced-motion)

3. **Design Tokens**
   - TypeScript constants for colors
   - Spacing scale
   - Typography scale
   - Animation durations

4. **Type Definitions**
   - Design token types
   - Theme types
   - Animation types

## Deliverables

### 1. Tailwind Config Extension
**File**: `tailwind.config.ts`

Add to theme.extend:
```typescript
{
  fontFamily: {
    bebas: ['var(--font-bebas)'],
    mono: ['var(--font-mono)'],
  },
  colors: {
    brand: {
      purple: '#8B5CF6',
      blue: '#3B82F6',
      cyan: '#06B6D4',
      dark: '#0a0a0a',
    },
  },
  animation: {
    'scanline': 'scanline 8s linear infinite',
    'glitchReveal': 'glitchReveal 0.5s ease-out',
    'shine': 'shine 1.5s ease-in-out infinite',
    'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    'gradient-rotate': 'gradientRotate 10s linear infinite',
  },
  keyframes: {
    scanline: {
      '0%': { transform: 'translateY(-100%)' },
      '100%': { transform: 'translateY(100%)' },
    },
    glitchReveal: {
      '0%': { transform: 'translateX(-100%)', opacity: '0' },
      '50%': { transform: 'translateX(10px)' },
      '100%': { transform: 'translateX(0)', opacity: '1' },
    },
    shine: {
      '0%': { transform: 'translateX(-200%)' },
      '100%': { transform: 'translateX(200%)' },
    },
    gradientRotate: {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  },
}
```

### 2. Global CSS Utilities
**File**: `app/globals.css`

Add after Tailwind directives:
```css
/* Stagger animations for lists */
.stagger-item {
  animation: fadeInUp 0.5s ease-out backwards;
}

.stagger-item:nth-child(1) { animation-delay: 0.1s; }
.stagger-item:nth-child(2) { animation-delay: 0.2s; }
.stagger-item:nth-child(3) { animation-delay: 0.3s; }
.stagger-item:nth-child(4) { animation-delay: 0.4s; }
.stagger-item:nth-child(5) { animation-delay: 0.5s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover glow effect */
.hover-glow {
  transition: all 0.3s ease;
}

.hover-glow:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
}

/* Text gradient animation */
.text-gradient-animate {
  background: linear-gradient(90deg, #8B5CF6, #3B82F6, #06B6D4, #3B82F6, #8B5CF6);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 3. Design Tokens
**File**: `lib/design-tokens.ts`

```typescript
export const colors = {
  brand: {
    purple: '#8B5CF6',
    blue: '#3B82F6',
    cyan: '#06B6D4',
    dark: '#0a0a0a',
  },
  text: {
    primary: '#E5E5E5',
    secondary: '#A3A3A3',
    muted: '#525252',
  },
} as const;

export const typography = {
  fontFamily: {
    display: 'var(--font-bebas)',
    body: 'var(--font-mono)',
  },
  fontSize: {
    hero: '8rem',        // 128px
    displayXl: '6rem',   // 96px
    displayLg: '4rem',   // 64px
    displayMd: '3rem',   // 48px
    xl: '1.25rem',       // 20px
    lg: '1.125rem',      // 18px
    base: '1rem',        // 16px
    sm: '0.875rem',      // 14px
    xs: '0.75rem',       // 12px
  },
  letterSpacing: {
    display: '-0.05em',
    body: '0',
  },
  lineHeight: {
    display: '1.1',
    body: '1.7',
  },
} as const;

export const spacing = {
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  4: '1rem',      // 16px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
} as const;

export const animation = {
  duration: {
    fast: '150ms',
    medium: '300ms',
    slow: '500ms',
    ambient: '2s',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
} as const;
```

### 4. Type Definitions
**File**: `types/design-system.ts`

```typescript
import { colors, typography, spacing, animation } from '@/lib/design-tokens';

export type BrandColor = keyof typeof colors.brand;
export type TextColor = keyof typeof colors.text;
export type FontSize = keyof typeof typography.fontSize;
export type SpacingScale = keyof typeof spacing;
export type AnimationDuration = keyof typeof animation.duration;

export interface DesignToken<T> {
  value: T;
  description?: string;
}

export type ColorScheme = 'light' | 'dark';
export type MotionPreference = 'no-preference' | 'reduce';

export interface ThemeConfig {
  colorScheme: ColorScheme;
  motionPreference: MotionPreference;
}
```

## Success Criteria

- [ ] Tailwind config extends theme with brand colors
- [ ] All animation keyframes defined and working
- [ ] Font families configured (`--font-bebas`, `--font-mono`)
- [ ] Global CSS utilities compiled without errors
- [ ] Design tokens exported as TypeScript constants
- [ ] Type-safe access to design tokens
- [ ] `prefers-reduced-motion` support active
- [ ] Run `pnpm build` successfully
- [ ] No TypeScript errors in design system files

## Verification

```bash
# Build succeeds
pnpm build

# Tailwind utilities available
# Test in any component:
<div className="bg-brand-purple text-brand-cyan animate-pulse-slow" />

# Type safety works
import { colors } from '@/lib/design-tokens';
const purple = colors.brand.purple; // ✅ TypeScript happy
```

## Dependencies

None - this is the foundation that other agents depend on.

## Next Agents

After completion, these agents can proceed:
- **core-ui-components** (Button, Input, Card)
- **metrics-display** (BPM Counter, Stat Cards)
- **layout-components** (Header, Footer)

## Notes

- Fonts (Bebas Neue, JetBrains Mono) are already loaded in `app/[locale]/layout.tsx` via `next/font/google`
- Some animations (scanline, pulse) already exist in current `globals.css` - merge carefully
- Color tokens should match existing brand preview in `public/brand-preview.html`
- Animation durations follow BPM concept (2s pulse = 120 BPM)