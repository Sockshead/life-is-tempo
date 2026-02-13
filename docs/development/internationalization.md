# Internationalization Guide

**Last Updated**: 2026-02-11

---

## Overview

Life Is Tempo supports multiple languages using **next-intl**, providing seamless internationalization (i18n) for both English and Spanish audiences.

**Key Features**:
- Automatic locale detection from browser
- Type-safe translations with TypeScript
- Localized routing (`/en/about` vs `/es/acerca`)
- Server and client component support
- SEO-friendly (separate URLs per language)

---

## Current Configuration

### Supported Locales

| Locale Code | Language | Region | Default |
|-------------|----------|--------|---------|
| `en` | English | International | ✅ Yes |
| `es` | Spanish | Latin America | No |

**Default Locale**: `en` (used when no locale preference detected)

---

## Architecture

### Routing Structure

```
/                         → Redirects to /en or /es (locale detection)
/en                       → English homepage
/en/about                 → English about page
/en/posts                 → English blog index
/en/posts/[slug]          → English blog post

/es                       → Spanish homepage
/es/acerca                → Spanish about page (localized path)
/es/posts                 → Spanish blog index
/es/posts/[slug]          → Spanish blog post
```

**Key Files**:
- `i18n/routing.ts` - Locale configuration and path mappings
- `i18n/request.ts` - Server-side locale detection
- `app/[locale]/` - Dynamic locale routing
- `middleware.ts` - Automatic locale redirection

---

## Adding Translations

### Translation File Structure

```
messages/
├── en.json      # English translations
└── es.json      # Spanish translations
```

### Translation Format

**Flat structure** (simple):
```json
{
  "homepage_title": "Welcome to Life Is Tempo",
  "homepage_subtitle": "Training for Berlin 70.3"
}
```

**Nested structure** (recommended):
```json
{
  "homepage": {
    "title": "Welcome to Life Is Tempo",
    "subtitle": "Training for Berlin 70.3",
    "cta": {
      "button": "Read More",
      "link": "/about"
    }
  }
}
```

### Example: English Translations

**`messages/en.json`**:
```json
{
  "homepage": {
    "hero": {
      "title": "Life Is Tempo",
      "subtitle": "Training for Berlin 70.3 from Colombia",
      "description": "Following the journey of an aspiring triathlete navigating endurance training and underground techno culture."
    },
    "cta": {
      "newsletter": "Join Newsletter",
      "readStories": "Read Training Chronicles"
    }
  },
  "navigation": {
    "home": "Home",
    "about": "About",
    "blog": "Blog",
    "contact": "Contact"
  }
}
```

### Example: Spanish Translations

**`messages/es.json`**:
```json
{
  "homepage": {
    "hero": {
      "title": "Life Is Tempo",
      "subtitle": "Entrenando para Berlin 70.3 desde Colombia",
      "description": "Siguiendo el viaje de un aspirante a triatleta navegando el entrenamiento de resistencia y la cultura techno underground."
    },
    "cta": {
      "newsletter": "Unirse al Newsletter",
      "readStories": "Leer Crónicas de Entrenamiento"
    }
  },
  "navigation": {
    "home": "Inicio",
    "about": "Acerca",
    "blog": "Blog",
    "contact": "Contacto"
  }
}
```

---

## Using Translations in Components

### Server Components (App Router)

**Import and use translations**:
```typescript
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('homepage.hero');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
      <p>{t('description')}</p>
    </div>
  );
}
```

**Nested access**:
```typescript
const t = useTranslations('homepage');

<button>{t('cta.newsletter')}</button>
```

**Multiple namespaces**:
```typescript
export default function Page() {
  const tHero = useTranslations('homepage.hero');
  const tNav = useTranslations('navigation');

  return (
    <>
      <nav>
        <a href="#">{tNav('home')}</a>
        <a href="#">{tNav('about')}</a>
      </nav>
      <main>
        <h1>{tHero('title')}</h1>
      </main>
    </>
  );
}
```

### Client Components

**Same API as server components**:
```typescript
'use client';

import { useTranslations } from 'next-intl';

export function NewsletterForm() {
  const t = useTranslations('newsletter');

  return (
    <form>
      <h2>{t('title')}</h2>
      <input placeholder={t('emailPlaceholder')} />
      <button>{t('submit')}</button>
    </form>
  );
}
```

### Dynamic Translations

**With variables**:
```json
{
  "greeting": "Hello, {name}!"
}
```

```typescript
const t = useTranslations();

<p>{t('greeting', { name: 'Juan' })}</p>
// Output: Hello, Juan!
```

**Plural forms**:
```json
{
  "items": {
    "zero": "No items",
    "one": "One item",
    "other": "{count} items"
  }
}
```

```typescript
const t = useTranslations();

<p>{t('items', { count: 0 })}</p>  // No items
<p>{t('items', { count: 1 })}</p>  // One item
<p>{t('items', { count: 5 })}</p>  // 5 items
```

---

## Localized Routing

### Path Configuration

**File**: `i18n/routing.ts`

```typescript
export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',

  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      es: '/acerca',  // Localized path
    },
    '/blog': '/blog',  // Same path both languages
    '/contact': {
      en: '/contact',
      es: '/contacto',
    },
  },
});
```

**Result**:
- English: `/en/about`
- Spanish: `/es/acerca`

### Adding New Localized Routes

**1. Add path to routing config**:
```typescript
pathnames: {
  '/training': {
    en: '/training',
    es: '/entrenamiento',
  },
}
```

**2. Create page component**:
```typescript
// app/[locale]/training/page.tsx
import { useTranslations } from 'next-intl';

export default function TrainingPage() {
  const t = useTranslations('training');
  return <h1>{t('title')}</h1>;
}
```

**3. Add translations**:
```json
// messages/en.json
{
  "training": {
    "title": "Training Logs"
  }
}

// messages/es.json
{
  "training": {
    "title": "Registros de Entrenamiento"
  }
}
```

### Navigation with Locales

**Using next-intl Link component**:
```typescript
import { Link } from '@/i18n/routing';

export function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog">Blog</Link>
    </nav>
  );
}
```

**Benefits**:
- Automatically uses correct locale (`/en/...` or `/es/...`)
- Handles localized paths (`/about` → `/acerca` in Spanish)
- Type-safe (TypeScript knows available paths)

---

## Locale Detection

### How It Works

1. **User visits root `/`**
2. **Middleware checks**:
   - URL locale parameter (e.g., `/en`, `/es`)
   - Cookie (if previously selected)
   - `Accept-Language` header from browser
3. **Redirects to appropriate locale**:
   - `/` → `/en` (English browser)
   - `/` → `/es` (Spanish browser)

### Middleware Configuration

**File**: `middleware.ts` (to be created)

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except static files and API routes
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
```

### Manual Locale Selection

**Language Switcher Component** (implemented in `components/Layout/LanguageSwitcher.tsx`):
```typescript
'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: 'en' | 'es') => {
    router.push(pathname, { locale: newLocale });
  };

  return (
    <div>
      <button
        onClick={() => switchLocale('en')}
        disabled={locale === 'en'}
      >
        English
      </button>
      <button
        onClick={() => switchLocale('es')}
        disabled={locale === 'es'}
      >
        Español
      </button>
    </div>
  );
}
```

---

## Adding a New Locale

### Step 1: Create Translation File

```bash
# Create new translation file
touch messages/pt.json  # Portuguese example
```

**Add translations** (can start with English and translate later):
```json
{
  "homepage": {
    "hero": {
      "title": "Life Is Tempo",
      "subtitle": "Treinando para Berlin 70.3 da Colômbia"
    }
  }
}
```

### Step 2: Update Routing Configuration

**File**: `i18n/routing.ts`

```typescript
export const routing = defineRouting({
  locales: ['en', 'es', 'pt'],  // Add new locale
  defaultLocale: 'en',

  pathnames: {
    '/about': {
      en: '/about',
      es: '/acerca',
      pt: '/sobre',  // Add localized path
    },
  },
});
```

### Step 3: Update Middleware

No changes needed - middleware reads from `routing` config.

### Step 4: Verify Type Safety

```bash
# TypeScript should recognize new locale
pnpm tsc --noEmit
```

**Usage**:
```typescript
import { Link } from '@/i18n/routing';

// TypeScript knows 'pt' is valid locale
<Link href="/about" locale="pt">Sobre</Link>
```

---

## SEO Considerations

### Language Meta Tags

**Automatically handled by next-intl**, but verify in production:

```html
<!-- English page -->
<html lang="en">
<link rel="alternate" hreflang="en" href="https://lifeistempo.com/en" />
<link rel="alternate" hreflang="es" href="https://lifeistempo.com/es" />
<link rel="alternate" hreflang="x-default" href="https://lifeistempo.com/en" />
```

### Metadata Configuration

**File**: `app/[locale]/layout.tsx`

```typescript
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale,
      alternateLocale: locale === 'en' ? 'es' : 'en',
    },
  };
}
```

**Translations**:
```json
// messages/en.json
{
  "metadata": {
    "title": "Life Is Tempo - Training for Berlin 70.3",
    "description": "Personal blog documenting triathlon training and techno culture from Colombia to Berlin."
  }
}
```

### Sitemap with Locales

**File**: `app/sitemap.ts` (to be created)

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://lifeistempo.com',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://lifeistempo.com/en',
          es: 'https://lifeistempo.com/es',
        },
      },
    },
    {
      url: 'https://lifeistempo.com/en/about',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://lifeistempo.com/en/about',
          es: 'https://lifeistempo.com/es/acerca',
        },
      },
    },
  ];
}
```

---

## Translation Workflow

### For Developers

**1. Identify translatable content**:
```typescript
// ❌ Hardcoded string
<h1>Welcome to Life Is Tempo</h1>

// ✅ Translatable
const t = useTranslations('homepage');
<h1>{t('title')}</h1>
```

**2. Add to both translation files**:
```json
// messages/en.json
{ "homepage": { "title": "Welcome to Life Is Tempo" } }

// messages/es.json
{ "homepage": { "title": "Bienvenido a Life Is Tempo" } }
```

**3. Test both locales**:
```bash
# Visit both URLs
# http://localhost:3000/en
# http://localhost:3000/es
```

### For Content Authors

**Write content in both languages** (or translate after):

**English** (`content/en/posts/my-post.mdx`):
```markdown
---
title: "Training Week 1"
---

First week of training...
```

**Spanish** (`content/es/posts/my-post.mdx`):
```markdown
---
title: "Semana de Entrenamiento 1"
---

Primera semana de entrenamiento...
```

### Translation Tools

**AI-Assisted Translation** (recommended):
```
Prompt: "Translate this JSON object to Spanish for a Latin American audience.
Maintain the same JSON structure. Use informal 'tú' form."

{ "homepage": { "title": "Welcome" } }
```

**Manual Translation**:
- Use native speakers when possible
- Consider regional variations (Latin America vs Spain Spanish)
- Maintain tone and voice

---

## Common Patterns

### Conditional Content by Locale

```typescript
import { useLocale } from 'next-intl';

export function LocaleSpecificContent() {
  const locale = useLocale();

  return (
    <div>
      {locale === 'en' && <p>English-specific content</p>}
      {locale === 'es' && <p>Contenido específico en español</p>}
    </div>
  );
}
```

### Date Formatting

```typescript
import { useFormatter } from 'next-intl';

export function FormattedDate() {
  const format = useFormatter();
  const date = new Date('2026-02-11');

  return (
    <time>
      {format.dateTime(date, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
      {/* English: February 11, 2026 */}
      {/* Spanish: 11 de febrero de 2026 */}
    </time>
  );
}
```

### Number Formatting

```typescript
const format = useFormatter();

// Distance
format.number(42.195, { style: 'unit', unit: 'kilometer' });
// English: 42.195 km
// Spanish: 42,195 km

// Currency (if needed)
format.number(1999, { style: 'currency', currency: 'USD' });
// English: $1,999.00
// Spanish: US$ 1.999,00
```

---

## Troubleshooting

### Translation Key Not Found

**Error**: `Translation key "homepage.title" not found`

**Solutions**:
1. Check spelling in translation file
2. Verify JSON is valid (no trailing commas)
3. Restart dev server (`Ctrl+C`, then `pnpm dev`)
4. Check namespace matches: `useTranslations('homepage')` → `messages.homepage.title`

### Wrong Locale Displayed

**Issue**: Always shows English, never Spanish

**Check**:
1. Middleware configured correctly (`middleware.ts`)
2. Browser language settings (Chrome → Settings → Languages)
3. Clear cookies and cache
4. Manually visit `/es` URL

### Localized Path Not Working

**Issue**: `/es/acerca` returns 404

**Check**:
1. Path defined in `i18n/routing.ts` → `pathnames`
2. Page component exists at `app/[locale]/about/page.tsx`
3. Rebuild app (`pnpm build`)

### Translation Shows Key Instead of Value

**Issue**: Page shows `homepage.title` instead of "Welcome to Life Is Tempo"

**Check**:
1. Translation key exists in JSON file
2. JSON syntax is valid (use JSONLint.com)
3. `useTranslations()` namespace correct
4. Component wrapped in locale provider (should be automatic in App Router)

---

## Best Practices

### Translation Keys

**Do**:
- ✅ Use descriptive, hierarchical keys: `homepage.hero.title`
- ✅ Group related translations: `navigation.*`, `forms.*`
- ✅ Use camelCase: `emailPlaceholder`, not `email_placeholder`

**Don't**:
- ❌ Use generic keys: `title`, `text1`, `label2`
- ❌ Duplicate keys across namespaces
- ❌ Mix languages in same file

### Translation Content

**Do**:
- ✅ Translate meaning, not words literally
- ✅ Adapt cultural references
- ✅ Use appropriate formality (tú vs usted in Spanish)
- ✅ Keep consistent tone across languages

**Don't**:
- ❌ Use machine translation without review
- ❌ Include HTML tags in translations (use components instead)
- ❌ Make assumptions about text length (translations may be longer/shorter)

### Component Design

**Do**:
- ✅ Design for text expansion (some languages 30% longer)
- ✅ Use flexible layouts (flexbox, grid)
- ✅ Test with both languages

**Don't**:
- ❌ Hard-code widths based on English text length
- ❌ Assume word order will be same in all languages
- ❌ Use text as images (non-translatable)

---

## Related Documentation

- [Content Authoring Guide](./content-authoring.md) - Writing multi-language blog posts
- [Getting Started Guide](./getting-started.md) - Development setup
- [System Architecture](../architecture/system-overview.md) - Locale routing flow

---

## External Resources

- next-intl Documentation: https://next-intl-docs.vercel.app
- Next.js Internationalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization
- MDN Web Docs - Intl: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

---

**Last Updated**: 2026-02-11

**Need Help?**
- Project Issues: https://github.com/Sockshead/life-is-tempo/issues
- next-intl Discord: https://discord.com/invite/PQdpCr5
