---
skill: core-ui-components
description: Build atomic, reusable UI components for Life Is Tempo
version: 1.0.0
tags: [components, ui, react, typescript]
dependencies: [design-system-architect]
---

# Core UI Component Library

Build atomic, reusable UI components that form the foundation of the Life Is Tempo interface.

## Context

These are the lowest-level building blocks - buttons, inputs, cards, badges. Every other component will use these primitives. They must be:
- **Accessible**: Keyboard navigation, ARIA labels, screen reader support
- **Responsive**: Mobile-first design
- **Type-safe**: Full TypeScript with strict mode
- **Tested**: Unit tests with >80% coverage

### Design Patterns

**Hover Effects**:
- Transform: `-translate-y-0.5` (lift 2px)
- Glow: Increase shadow intensity
- Color: Transition to cyan

**Focus States**:
- Outline: 2px solid cyan
- Offset: 2px
- Visible in high contrast mode

**Disabled States**:
- Opacity: 50%
- Cursor: not-allowed
- No hover effects

## Scope

Build 6 core UI components with variants and full test coverage.

## Deliverables

### 1. Button Component
**File**: `components/UI/Button.tsx`

**Variants**:
- **Primary**: Purple→Blue gradient, glow effect, shine animation on hover
- **Secondary**: Transparent background, purple border, cyan hover
- **Ghost**: Transparent, underline on hover

**Props**:
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'aria-label'?: string;
}
```

**Implementation**:
```tsx
<button className={cn(
  'font-mono uppercase transition-all duration-300',
  'focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2',
  variant === 'primary' && 'bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] hover:-translate-y-0.5 relative overflow-hidden',
  variant === 'secondary' && 'bg-transparent border border-purple-500 text-purple-500 px-8 py-3 rounded hover:bg-purple-500/10 hover:border-cyan-400 hover:text-cyan-400 hover:-translate-y-0.5',
  variant === 'ghost' && 'bg-transparent text-white px-4 py-2 hover:text-cyan-400 underline-offset-4 hover:underline',
  disabled && 'opacity-50 cursor-not-allowed hover:transform-none'
)}>
  {variant === 'primary' && (
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:animate-shine" />
  )}
  {children}
</button>
```

**Tests**: `components/UI/Button.test.tsx`
- Renders with correct text
- Calls onClick when clicked
- Applies variant styles
- Disabled state prevents clicks
- Keyboard accessible (focus, Enter, Space)

---

### 2. Input Component
**File**: `components/UI/Input.tsx`

**Features**:
- Label support
- Error states with messages
- Success states
- Icon support (prefix/suffix)
- Dark theme styling

**Props**:
```typescript
interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}
```

**Implementation**:
```tsx
<div className="w-full">
  {label && (
    <label className="block text-sm font-mono text-gray-400 mb-2">
      {label} {required && <span className="text-purple-500">*</span>}
    </label>
  )}
  <div className="relative">
    {icon && iconPosition === 'left' && (
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        {icon}
      </span>
    )}
    <input
      className={cn(
        'w-full bg-black/50 border text-white font-mono px-4 py-3 rounded',
        'focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400',
        'placeholder:text-gray-600 transition-all duration-300',
        error && 'border-red-500 focus:ring-red-500',
        success && 'border-green-500',
        !error && !success && 'border-purple-500/50',
        icon && iconPosition === 'left' && 'pl-10',
        icon && iconPosition === 'right' && 'pr-10',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      {...props}
    />
    {icon && iconPosition === 'right' && (
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
        {icon}
      </span>
    )}
  </div>
  {error && (
    <p className="mt-1 text-sm text-red-500 font-mono">{error}</p>
  )}
</div>
```

**Tests**: `components/UI/Input.test.tsx`
- Renders with label
- Calls onChange with value
- Shows error message
- Displays success state
- Disabled state works
- Required indicator shows

---

### 3. Card Component
**File**: `components/UI/Card.tsx`

**Features**:
- Dark background with subtle glow
- Hover effects (lift + glow increase)
- Optional gradient border
- Clickable variant (for links)

**Props**:
```typescript
interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  gradientBorder?: boolean;
  className?: string;
}
```

**Implementation**:
```tsx
const Component = href ? 'a' : onClick ? 'button' : 'div';

<Component
  href={href}
  onClick={onClick}
  className={cn(
    'bg-black/80 backdrop-blur-sm rounded-lg p-6',
    'transition-all duration-300',
    gradientBorder && 'border border-transparent bg-gradient-to-r from-purple-500/50 to-cyan-500/50 bg-clip-padding',
    (onClick || href) && 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]',
    !gradientBorder && 'border border-purple-500/30',
    className
  )}
>
  {children}
</Component>
```

**Tests**: `components/UI/Card.test.tsx`
- Renders children
- Clickable variant calls onClick
- Link variant has href
- Gradient border applies
- Hover effects work

---

### 4. Badge Component
**File**: `components/UI/Badge.tsx`

**Features**:
- Category color mapping
- Pill shape
- Two sizes (sm, md)

**Props**:
```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant: 'training' | 'dual-life' | 'underground' | 'default';
  size?: 'sm' | 'md';
  className?: string;
}
```

**Implementation**:
```tsx
const colorMap = {
  'training': 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  'dual-life': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  'underground': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50',
  'default': 'bg-gray-500/20 text-gray-400 border-gray-500/50',
};

<span className={cn(
  'inline-flex items-center font-mono uppercase border rounded-full',
  size === 'sm' && 'text-xs px-2 py-0.5',
  size === 'md' && 'text-sm px-3 py-1',
  colorMap[variant],
  className
)}>
  {children}
</span>
```

**Tests**: `components/UI/Badge.test.tsx`
- Renders text
- Applies variant colors
- Size variants work
- Custom className applies

---

### 5. Skeleton Loader
**File**: `components/UI/Skeleton.tsx`

**Features**:
- Animated shimmer effect
- Flexible sizing
- Various shapes (text, circle, rectangle)

**Props**:
```typescript
interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
}
```

**Implementation**:
```tsx
<div
  className={cn(
    'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800',
    'bg-[length:200%_100%] animate-shimmer',
    variant === 'text' && 'h-4 rounded',
    variant === 'circular' && 'rounded-full',
    variant === 'rectangular' && 'rounded',
    className
  )}
  style={{ width, height }}
/>

// Add to tailwind.config.ts keyframes:
shimmer: {
  '0%': { backgroundPosition: '200% 0' },
  '100%': { backgroundPosition: '-200% 0' },
}
```

**Tests**: `components/UI/Skeleton.test.tsx`
- Renders with correct variant
- Custom dimensions apply
- Animation class present

---

### 6. Toast Notification
**File**: `components/UI/Toast.tsx`

**Features**:
- Success, error, info variants
- Auto-dismiss (configurable duration)
- Close button
- Stacked notifications (queue)

**Props**:
```typescript
interface ToastProps {
  message: string;
  variant: 'success' | 'error' | 'info';
  duration?: number; // milliseconds, default 5000
  onClose: () => void;
}
```

**Implementation**:
```tsx
const variantStyles = {
  success: 'bg-green-500/10 border-green-500 text-green-400',
  error: 'bg-red-500/10 border-red-500 text-red-400',
  info: 'bg-cyan-500/10 border-cyan-500 text-cyan-400',
};

<div className={cn(
  'fixed bottom-4 right-4 z-50',
  'flex items-center gap-3 p-4 rounded-lg border',
  'font-mono text-sm backdrop-blur-sm',
  'animate-slideInRight',
  variantStyles[variant]
)}>
  <span>{message}</span>
  <button
    onClick={onClose}
    className="text-current hover:opacity-70"
    aria-label="Close"
  >
    ✕
  </button>
</div>

// Add to tailwind.config.ts keyframes:
slideInRight: {
  '0%': { transform: 'translateX(100%)', opacity: '0' },
  '100%': { transform: 'translateX(0)', opacity: '1' },
}
```

**Toast Provider**: `components/UI/ToastProvider.tsx`
- Context for global toast state
- Queue management
- Auto-dismiss timer

**Tests**: `components/UI/Toast.test.tsx`
- Renders message
- Auto-dismisses after duration
- Close button works
- Variant styles apply

---

### 7. Index Exports
**File**: `components/UI/index.ts`

```typescript
export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Input } from './Input';
export type { InputProps } from './Input';

export { Card } from './Card';
export type { CardProps } from './Card';

export { Badge } from './Badge';
export type { BadgeProps } from './Badge';

export { Skeleton } from './Skeleton';
export type { SkeletonProps } from './Skeleton';

export { Toast, ToastProvider, useToast } from './Toast';
export type { ToastProps } from './Toast';
```

## Success Criteria

- [ ] All 6 components implemented with TypeScript strict mode
- [ ] All components keyboard accessible (Tab, Enter, Space, Esc)
- [ ] All components have unit tests (>80% coverage)
- [ ] Focus indicators visible (cyan outline)
- [ ] Disabled states prevent interaction
- [ ] Hover effects smooth (300ms transition)
- [ ] Mobile-responsive (touch targets 44x44px minimum)
- [ ] Clean exports via index.ts
- [ ] No console errors or warnings
- [ ] Build succeeds (`pnpm build`)

## Verification

```bash
# Run tests
pnpm test components/UI

# Check coverage
pnpm test:coverage

# Build succeeds
pnpm build

# Usage example
import { Button, Input, Card } from '@/components/UI';

<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
```

## Dependencies

Requires **design-system-architect** to be completed first (Tailwind config, design tokens).

## Next Agents

After completion, these agents can use these components:
- **layout-components** (Header, Footer use Button)
- **blog-infrastructure** (Post cards use Card, Badge)
- **content-pages** (Forms use Input, Button)

## Notes

- Use `cn()` utility from `@/lib/utils` for className merging
- All animations should respect `prefers-reduced-motion`
- Toast should stack vertically if multiple shown
- Button shine effect only on primary variant
- Input validation styling (error/success) should be clear without color alone