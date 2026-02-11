---
skill: metrics-display
description: Build data visualization components (BPM counters, stat cards, progress bars) for Life Is Tempo
version: 1.0.0
tags: [metrics, data-viz, animation, react]
dependencies: [design-system-architect]
---

# Metrics & Data Display

Build data visualization components that display training metrics, BPM indicators, and performance statistics.

## Context

Life Is Tempo blends training data with techno culture - metrics are displayed like fitness tracker data and DJ deck displays. Key features:
- **BPM-synced animations**: Pulse effects match 120 BPM (2s interval)
- **Count-up animations**: Numbers animate on viewport entry
- **Large typography**: Bebas Neue for numbers, Mono for labels
- **Cyan accent color**: All metrics use cyan (#06B6D4)

### Metric Examples
- **70.3** MI (Race Distance)
- **214** DAYS (Countdown to Berlin)
- **2600**M (Altitude in Bogotá)
- **165** BPM (Heart Rate during training)
- **140** BPM (Techno tempo)

## Scope

Build 5 metric display components with animations and variants.

## Deliverables

### 1. Metric Display Component
**File**: `components/Metrics/MetricDisplay.tsx`

**Variants**:
- **Static**: No animation
- **Counter**: Count-up animation on view
- **Pulse**: BPM-synced pulse effect
- **Progress**: Circular progress bar

**Props**:
```typescript
interface MetricDisplayProps {
  value: string | number;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: 'static' | 'counter' | 'pulse' | 'progress';
  bpm?: number; // For pulse variant (default 120)
  progress?: number; // 0-100 for progress variant
  className?: string;
}
```

**Implementation**:
```tsx
export function MetricDisplay({
  value,
  label,
  description,
  icon,
  variant = 'static',
  bpm = 120,
  progress,
  className
}: MetricDisplayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center text-center',
        variant === 'pulse' && 'animate-pulse-slow',
        className
      )}
    >
      {icon && (
        <div className="text-purple-500 mb-2">
          {icon}
        </div>
      )}

      {/* Value */}
      {variant === 'counter' ? (
        <CountUp
          end={typeof value === 'number' ? value : parseInt(value)}
          start={inView}
          className="font-bebas text-6xl text-white tracking-tight"
        />
      ) : variant === 'progress' && progress !== undefined ? (
        <CircularProgress
          value={progress}
          size={120}
          className="mb-2"
        />
      ) : (
        <div className="font-bebas text-6xl text-white tracking-tight">
          {value}
        </div>
      )}

      {/* Label */}
      <div className="font-mono text-xs uppercase text-cyan-400 tracking-wide mt-2">
        {label}
      </div>

      {/* Description */}
      {description && (
        <div className="font-mono text-sm text-gray-400 mt-1">
          {description}
        </div>
      )}
    </div>
  );
}
```

**Tests**: `components/Metrics/MetricDisplay.test.tsx`
- Renders value and label
- Counter variant animates
- Pulse variant pulses
- Progress variant shows bar
- Icon displays when provided

---

### 2. Count-Up Hook
**File**: `components/Metrics/useCountUp.ts`

**Features**:
- Smooth animation from 0 to target
- Configurable duration
- Easing function
- Starts on trigger

**Implementation**:
```typescript
export function useCountUp(end: number, start: boolean = false, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(startValue + (end - startValue) * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, start, duration]);

  return count;
}
```

---

### 3. CountUp Component
**File**: `components/Metrics/CountUp.tsx`

**Implementation**:
```tsx
interface CountUpProps {
  end: number;
  start?: boolean;
  duration?: number;
  className?: string;
}

export function CountUp({ end, start = false, duration = 2000, className }: CountUpProps) {
  const count = useCountUp(end, start, duration);

  return (
    <span className={className}>
      {count.toLocaleString()}
    </span>
  );
}
```

---

### 4. BPM Counter
**File**: `components/Metrics/BPMCounter.tsx`

**Features**:
- Alternates between training/techno BPM
- Animated transition
- Pulse effect synced to BPM
- Label changes with mode

**Props**:
```typescript
interface BPMCounterProps {
  trainingBPM?: number; // Default 165
  technoBPM?: number;   // Default 140
  interval?: number;    // Switch interval in ms (default 5000)
  className?: string;
}
```

**Implementation**:
```tsx
export function BPMCounter({
  trainingBPM = 165,
  technoBPM = 140,
  interval = 5000,
  className
}: BPMCounterProps) {
  const [mode, setMode] = useState<'training' | 'techno'>('training');
  const currentBPM = mode === 'training' ? trainingBPM : technoBPM;
  const pulseDuration = (60 / currentBPM) * 1000; // Convert BPM to ms

  useEffect(() => {
    const timer = setInterval(() => {
      setMode(prev => prev === 'training' ? 'techno' : 'training');
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="font-mono text-xs uppercase text-cyan-400 mb-2">
        CURRENT BPM
      </div>
      <div
        className="font-bebas text-8xl text-gradient-animate transition-all duration-500"
        style={{
          animation: `pulse ${pulseDuration}ms ease-in-out infinite`
        }}
      >
        {currentBPM}
      </div>
      <div className="font-mono text-sm text-gray-400 mt-2">
        {mode === 'training' ? 'Training Zone' : 'Techno Tempo'}
      </div>
    </div>
  );
}
```

**Tests**: `components/Metrics/BPMCounter.test.tsx`
- Starts with training BPM
- Switches to techno BPM after interval
- Pulse animation duration matches BPM
- Label updates with mode

---

### 5. Circular Progress
**File**: `components/Metrics/CircularProgress.tsx`

**Features**:
- SVG-based circular progress bar
- Animated fill
- Percentage in center
- Cyan accent color

**Props**:
```typescript
interface CircularProgressProps {
  value: number; // 0-100
  size?: number; // Diameter in pixels
  strokeWidth?: number;
  className?: string;
}
```

**Implementation**:
```tsx
export function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  className
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn('relative inline-flex', className)}>
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(139, 92, 246, 0.2)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#06B6D4"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bebas text-2xl text-white">
          {Math.round(value)}%
        </span>
      </div>
    </div>
  );
}
```

**Tests**: `components/Metrics/CircularProgress.test.tsx`
- Renders with correct percentage
- SVG attributes correct
- Animation class present
- Different sizes work

---

### 6. Stat Card
**File**: `components/Metrics/StatCard.tsx`

**Features**:
- Card wrapper for metrics
- Optional icon
- Hover effects
- Dark background with glow

**Props**:
```typescript
interface StatCardProps {
  metric: React.ReactNode; // MetricDisplay component
  icon?: React.ReactNode;
  className?: string;
}
```

**Implementation**:
```tsx
export function StatCard({ metric, icon, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'bg-black/80 backdrop-blur-sm rounded-lg p-6',
        'border border-purple-500/30',
        'hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]',
        'transition-all duration-300',
        className
      )}
    >
      {icon && (
        <div className="flex justify-center mb-4 text-purple-500 text-4xl">
          {icon}
        </div>
      )}
      {metric}
    </div>
  );
}
```

---

### 7. Progress Bar (Linear)
**File**: `components/Metrics/ProgressBar.tsx`

**Features**:
- Horizontal progress bar
- Animated fill
- Optional label

**Props**:
```typescript
interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  height?: number; // pixels
  className?: string;
}
```

**Implementation**:
```tsx
export function ProgressBar({
  value,
  label,
  height = 8,
  className
}: ProgressBarProps) {
  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between font-mono text-sm text-gray-400 mb-2">
          <span>{label}</span>
          <span className="text-cyan-400">{Math.round(value)}%</span>
        </div>
      )}
      <div
        className="w-full bg-purple-500/20 rounded-full overflow-hidden"
        style={{ height }}
      >
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-1000 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
```

---

### 8. Index Exports
**File**: `components/Metrics/index.ts`

```typescript
export { MetricDisplay } from './MetricDisplay';
export type { MetricDisplayProps } from './MetricDisplay';

export { BPMCounter } from './BPMCounter';
export type { BPMCounterProps } from './BPMCounter';

export { CountUp, useCountUp } from './CountUp';

export { CircularProgress } from './CircularProgress';
export type { CircularProgressProps } from './CircularProgress';

export { ProgressBar } from './ProgressBar';
export type { ProgressBarProps } from './ProgressBar';

export { StatCard } from './StatCard';
export type { StatCardProps } from './StatCard';
```

## Success Criteria

- [ ] All metrics display correctly
- [ ] Count-up animation smooth (60fps)
- [ ] BPM counter alternates modes
- [ ] Pulse animation syncs to BPM
- [ ] Circular progress fills correctly
- [ ] Progress bar animates smoothly
- [ ] Intersection Observer works (counter starts on view)
- [ ] Respects `prefers-reduced-motion`
- [ ] Accessible (screen readers announce final values)
- [ ] Tests passing (>80% coverage)
- [ ] Build succeeds (`pnpm build`)

## Verification

```bash
# Run tests
pnpm test components/Metrics

# Build succeeds
pnpm build

# Usage example
import { MetricDisplay, BPMCounter, StatCard } from '@/components/Metrics';

<StatCard
  metric={
    <MetricDisplay
      value={214}
      label="DAYS"
      description="to Berlin"
      variant="counter"
    />
  }
  icon="🏃"
/>

<BPMCounter
  trainingBPM={165}
  technoBPM={140}
  interval={5000}
/>
```

## Dependencies

Requires **design-system-architect** (animations, colors, typography).

## Next Agents

After completion, these agents can use metrics:
- **content-pages** (About page uses metric grid)
- **mdx-content-system** (BPMIndicator for blog posts)

## Notes

- Use `Intersection Observer` for triggering count-up on viewport entry
- BPM pulse duration formula: `(60 / BPM) * 1000` milliseconds
- Circular progress: Use SVG `strokeDasharray` + `strokeDashoffset` for animation
- All animations should use `transition-all duration-1000 ease-out` for smooth 1s transitions
- Screen readers: Use `aria-live="polite"` on counter values
- Reduced motion: Disable count-up, show final value immediately