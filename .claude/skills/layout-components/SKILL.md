---
skill: layout-components
description: Build page layout infrastructure (Header, Footer, Navigation) for Life Is Tempo
version: 1.0.0
tags: [layout, navigation, react, i18n]
dependencies: [design-system-architect, core-ui-components]
---

# Layout Components

Build the page layout infrastructure that wraps all content - navigation header, footer, and layout wrappers.

## Context

These components appear on every page and establish the site structure. They must:
- **Be consistent**: Same header/footer across all pages
- **Be responsive**: Desktop → Mobile transformations
- **Support i18n**: Language switcher for EN/ES
- **Be accessible**: Keyboard navigation, skip links, landmarks

### Navigation Structure

**Desktop**:
```
[LOGO] ────────────── [TRAINING | DUAL LIFE | UNDERGROUND] ────── [EN | ES]
```

**Mobile**:
```
[LOGO] ──────────────────────────────────────────────────── [☰]
```

**Footer** (3-column → 1-column):
```
Logo + Tagline
Nav Links | Quick Links | Social
Copyright + Location
```

## Scope

Build navigation header, footer, language switcher, and layout wrappers.

## Deliverables

### 1. Navigation Header
**File**: `components/Layout/Header.tsx`

**Features**:
- Fixed position with backdrop blur
- Desktop: Horizontal menu
- Mobile: Hamburger → Slide-in drawer
- Active route highlighting (cyan underline)
- Smooth scroll behavior

**Implementation**:
```tsx
<header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/30">
  <div className="container mx-auto px-4 py-4">
    <div className="flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="font-bebas text-2xl text-gradient-animate">
        LIFE IS TEMPO
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8">
        <NavLink href="/blog/training-chronicles" label="TRAINING" />
        <NavLink href="/blog/dual-life-tactics" label="DUAL LIFE" />
        <NavLink href="/blog/underground-endurance" label="UNDERGROUND" />
      </nav>

      {/* Language Switcher */}
      <div className="hidden md:block">
        <LanguageSwitcher />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden text-white"
        aria-label="Open menu"
      >
        ☰
      </button>
    </div>
  </div>

  {/* Mobile Drawer */}
  <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
</header>
```

**Skip to Content Link**:
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-500 focus:text-white focus:rounded"
>
  Skip to content
</a>
```

**Tests**: `components/Layout/Header.test.tsx`
- Renders logo and nav links
- Mobile menu opens/closes
- Active route highlights
- Skip link works

---

### 2. NavLink Component
**File**: `components/Layout/NavLink.tsx`

**Features**:
- Active state detection (cyan underline)
- Hover effects
- i18n route support

**Implementation**:
```tsx
interface NavLinkProps {
  href: string;
  label: string;
}

export function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.includes(href);

  return (
    <Link
      href={href}
      className={cn(
        'font-mono text-sm uppercase transition-all duration-300',
        'hover:text-cyan-400',
        isActive
          ? 'text-cyan-400 border-b-2 border-cyan-400'
          : 'text-white'
      )}
    >
      {label}
    </Link>
  );
}
```

---

### 3. Mobile Navigation
**File**: `components/Layout/MobileNav.tsx`

**Features**:
- Slide-in drawer from right
- Backdrop overlay
- Close on route change
- Purple glow effect

**Implementation**:
```tsx
interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 w-80 bg-black border-l border-purple-500 z-50 md:hidden',
          'transform transition-transform duration-300',
          'shadow-[-10px_0_50px_rgba(139,92,246,0.5)]',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-2xl"
            aria-label="Close menu"
          >
            ✕
          </button>

          {/* Logo */}
          <div className="font-bebas text-2xl text-gradient-animate mb-8">
            LIFE IS TEMPO
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-4">
            <MobileNavLink href="/" label="Home" onClick={onClose} />
            <MobileNavLink href="/blog" label="Blog" onClick={onClose} />
            <MobileNavLink href="/about" label="About" onClick={onClose} />
            <MobileNavLink href="/contact" label="Contact" onClick={onClose} />
          </nav>

          {/* Language Switcher */}
          <div className="mt-8">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
```

---

### 4. Language Switcher
**File**: `components/Layout/LanguageSwitcher.tsx`

**Features**:
- Pill-shaped toggle [EN | ES]
- Active locale highlighted (purple bg)
- Preserves current route
- Uses next-intl routing

**Implementation**:
```tsx
'use client';

import { useRouter, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = (newLocale: 'en' | 'es') => {
    router.push(pathname, { locale: newLocale });
  };

  return (
    <div className="inline-flex items-center bg-black/50 border border-purple-500/50 rounded-full p-1">
      <button
        onClick={() => switchLocale('en')}
        className={cn(
          'px-3 py-1 rounded-full font-mono text-xs uppercase transition-all',
          locale === 'en'
            ? 'bg-purple-500 text-white'
            : 'text-gray-400 hover:text-cyan-400'
        )}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('es')}
        className={cn(
          'px-3 py-1 rounded-full font-mono text-xs uppercase transition-all',
          locale === 'es'
            ? 'bg-purple-500 text-white'
            : 'text-gray-400 hover:text-cyan-400'
        )}
      >
        ES
      </button>
    </div>
  );
}
```

**Tests**: `components/Layout/LanguageSwitcher.test.tsx`
- Renders both locales
- Active locale highlighted
- Switches locale on click
- Preserves pathname

---

### 5. Footer
**File**: `components/Layout/Footer.tsx`

**Features**:
- Dark gradient background
- 3-column layout (desktop)
- Social icons with hover effects
- Copyright + location info

**Implementation**:
```tsx
export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gradient-to-b from-black to-purple-900/20 border-t border-purple-500/30 mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo + Tagline */}
          <div>
            <h3 className="font-bebas text-2xl text-gradient-animate mb-2">
              LIFE IS TEMPO
            </h3>
            <p className="text-gray-400 font-mono text-sm">
              {t('tagline')}
            </p>
          </div>

          {/* Column 2: Nav Links */}
          <div>
            <h4 className="font-mono text-sm uppercase text-purple-400 mb-4">
              Explore
            </h4>
            <nav className="flex flex-col gap-2">
              <FooterLink href="/blog" label="Blog" />
              <FooterLink href="/about" label="About" />
              <FooterLink href="/contact" label="Contact" />
            </nav>
          </div>

          {/* Column 3: Social */}
          <div>
            <h4 className="font-mono text-sm uppercase text-purple-400 mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              <SocialIcon href="#" icon="instagram" label="Instagram" />
              <SocialIcon href="#" icon="strava" label="Strava" />
              <SocialIcon href="#" icon="spotify" label="Spotify" />
              <SocialIcon href="mailto:" icon="email" label="Email" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-purple-500/20 text-center">
          <p className="text-gray-500 font-mono text-sm">
            {t('copyright')} | {t('location')}
          </p>
        </div>
      </div>
    </footer>
  );
}
```

---

### 6. Footer Link
**File**: `components/Layout/FooterLink.tsx`

**Implementation**:
```tsx
interface FooterLinkProps {
  href: string;
  label: string;
}

export function FooterLink({ href, label }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="text-gray-400 font-mono text-sm hover:text-cyan-400 transition-colors"
    >
      {label}
    </Link>
  );
}
```

---

### 7. Social Icon
**File**: `components/Layout/SocialIcon.tsx`

**Implementation**:
```tsx
interface SocialIconProps {
  href: string;
  icon: 'instagram' | 'strava' | 'spotify' | 'email';
  label: string;
}

export function SocialIcon({ href, icon, label }: SocialIconProps) {
  const icons = {
    instagram: '📷',
    strava: '🏃',
    spotify: '🎵',
    email: '✉️',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 bg-purple-500/20 border border-purple-500/50 rounded-full hover:bg-cyan-500/20 hover:border-cyan-500 transition-all"
      aria-label={label}
    >
      <span className="text-lg">{icons[icon]}</span>
    </a>
  );
}
```

---

### 8. Page Layout Wrapper
**File**: `components/Layout/PageLayout.tsx`

**Features**:
- Main content wrapper
- Semantic HTML (main, landmarks)
- Min height for short pages
- Consistent spacing

**Implementation**:
```tsx
interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
```

---

### 9. Section Container
**File**: `components/Layout/Section.tsx`

**Features**:
- Container with max-width
- Consistent padding
- Optional background variants

**Implementation**:
```tsx
interface SectionProps {
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'dark';
  className?: string;
}

export function Section({ children, variant = 'default', className }: SectionProps) {
  return (
    <section
      className={cn(
        'py-24',
        variant === 'gradient' && 'bg-gradient-to-b from-black to-purple-900/10',
        variant === 'dark' && 'bg-black',
        className
      )}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}
```

---

### 10. Index Exports
**File**: `components/Layout/index.ts`

```typescript
export { Header } from './Header';
export { Footer } from './Footer';
export { NavLink } from './NavLink';
export { MobileNav } from './MobileNav';
export { LanguageSwitcher } from './LanguageSwitcher';
export { PageLayout } from './PageLayout';
export { Section } from './Section';
```

## Success Criteria

- [ ] Header fixed at top, doesn't scroll away
- [ ] Mobile menu opens/closes smoothly
- [ ] Language switcher preserves route
- [ ] Active nav link highlighted
- [ ] Skip to content link functional
- [ ] Footer responsive (3-col → 1-col)
- [ ] Social icons open in new tab
- [ ] All components keyboard accessible
- [ ] ARIA labels on icon-only buttons
- [ ] Tests passing (>80% coverage)
- [ ] Build succeeds (`pnpm build`)

## Verification

```bash
# Run tests
pnpm test components/Layout

# Build succeeds
pnpm build

# Usage example
import { PageLayout, Section } from '@/components/Layout';

<PageLayout>
  <Section>
    <h1>Page Content</h1>
  </Section>
</PageLayout>
```

## Dependencies

Requires:
- **design-system-architect** (animations, colors)
- **core-ui-components** (Button for mobile menu)

## Next Agents

After completion, these agents can use layout components:
- **blog-pages** (wraps blog pages in PageLayout)
- **content-pages** (wraps About/Contact in PageLayout)

## Notes

- Header should have `z-50` to stay above all content
- Mobile menu should trap focus when open
- Language switcher uses `@/i18n/routing` from next-intl
- Footer social icons placeholder - replace with actual URLs
- Section component provides consistent spacing (py-24 = 96px)