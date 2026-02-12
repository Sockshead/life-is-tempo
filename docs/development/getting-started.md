# Getting Started Guide

**Last Updated**: 2026-02-11

---

## Prerequisites

Before starting development on Life Is Tempo, ensure you have the following installed:

### Required Software

| Tool | Minimum Version | Recommended Version | Download |
|------|----------------|---------------------|----------|
| **Node.js** | 18.17.0 | 20.x LTS | https://nodejs.org |
| **pnpm** | 8.0.0 | Latest | `npm install -g pnpm` |
| **Git** | 2.30.0 | Latest | https://git-scm.com |
| **VS Code** | Any | Latest | https://code.visualstudio.com |

### Recommended VS Code Extensions

- **ESLint**: `dbaeumer.vscode-eslint` - Linting
- **Tailwind CSS IntelliSense**: `bradlc.vscode-tailwindcss` - CSS autocomplete
- **MDX**: `unifiedjs.vscode-mdx` - MDX syntax highlighting
- **TypeScript**: Built-in (no extension needed)

### Optional Tools

- **Vercel CLI**: For deploying to Vercel from command line
  ```bash
  pnpm add -g vercel
  ```

---

## Initial Setup

### Step 1: Clone Repository

```bash
# Navigate to your projects directory
cd A:/repositories  # Or your preferred location

# Clone the repository
git clone https://github.com/juancmandev/life-is-tempo.git

# Enter project directory
cd life-is-tempo
```

### Step 2: Install Dependencies

```bash
# Install all dependencies using pnpm
pnpm install
```

**Expected Output**:
```
Progress: resolved 234, reused 234, downloaded 0, added 234, done
Dependencies installed successfully!
```

**Troubleshooting**:
- **pnpm not found**: Install globally with `npm install -g pnpm`
- **Network errors**: Check internet connection, try again
- **Permission errors** (macOS/Linux): Don't use `sudo`, fix npm permissions instead

### Step 3: Environment Setup

```bash
# Copy example environment file
cp .env.example .env.local
```

**Edit `.env.local`** (optional, all variables are optional):
```bash
# Analytics (optional for development)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Newsletter (optional until implementing feature)
# NEWSLETTER_API_KEY=your_test_api_key
# NEWSLETTER_AUDIENCE_ID=your_test_list_id
```

**Important**:
- `.env.local` is gitignored (never commit)
- All variables are optional for local development
- Leave empty if not using external services

### Step 4: Verify Installation

```bash
# Run TypeScript type checking
pnpm tsc --noEmit

# Run linting
pnpm lint

# Build project (verify no errors)
pnpm build
```

**Expected Output**:
```
✓ Type checking passed
✓ Linting passed
✓ Compiled successfully
```

---

## Development Workflow

### Starting Development Server

```bash
# Start Next.js development server
pnpm dev
```

**Expected Output**:
```
  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.100:3000

 ✓ Ready in 2.5s
```

**Open Browser**:
- Visit http://localhost:3000
- Should see Life Is Tempo homepage
- Hot reload enabled (changes auto-refresh)

### Development Server Features

**Hot Module Replacement (HMR)**:
- Edit files → Browser auto-refreshes
- TypeScript errors → Overlay in browser
- Console errors → Shown in terminal + browser

**Fast Refresh**:
- React component edits preserve state
- Instant feedback (< 1 second)
- No full page reload needed

### Project Structure

```
life-is-tempo/
├── app/                      # Next.js App Router
│   └── [locale]/             # Multi-language routes
│       ├── layout.tsx        # Root layout
│       └── page.tsx          # Homepage
├── components/               # React components (empty, to be added)
├── lib/                      # Utilities and helpers
│   ├── env.ts                # Environment variable validation
│   └── security.ts           # Security utilities
├── messages/                 # i18n translations
│   ├── en.json               # English translations
│   └── es.json               # Spanish translations
├── i18n/                     # Internationalization config
│   ├── routing.ts            # Locale routing config
│   └── request.ts            # Server-side locale detection
├── public/                   # Static assets (images, fonts)
├── docs/                     # Documentation
├── .env.local                # Local environment variables (not committed)
├── .env.example              # Example environment variables (committed)
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

---

## Common Development Tasks

### Adding a New Page

**1. Create page file** (App Router):
```bash
# English version
mkdir -p app/[locale]/contact
touch app/[locale]/contact/page.tsx
```

**2. Add page content**:
```typescript
// app/[locale]/contact/page.tsx
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </main>
  );
}
```

**3. Add translations**:
```json
// messages/en.json
{
  "contact": {
    "title": "Contact Us",
    "description": "Get in touch..."
  }
}
```

```json
// messages/es.json
{
  "contact": {
    "title": "Contáctanos",
    "description": "Ponte en contacto..."
  }
}
```

**4. Add route to i18n config** (if using localized paths):
```typescript
// i18n/routing.ts
pathnames: {
  '/contact': {
    en: '/contact',
    es: '/contacto',  // Localized path
  },
}
```

**5. Test**:
- Visit http://localhost:3000/en/contact
- Visit http://localhost:3000/es/contacto

### Creating a Component

**1. Create component file**:
```bash
mkdir -p components/ui
touch components/ui/Button.tsx
```

**2. Write component**:
```typescript
// components/ui/Button.tsx
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({
  children,
  onClick,
  variant = 'primary'
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg font-medium
        ${variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}
      `}
    >
      {children}
    </button>
  );
}
```

**3. Use component**:
```typescript
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return <Button onClick={() => alert('Clicked!')}>Click me</Button>;
}
```

### Adding Translations

**1. Identify translation key structure**:
```typescript
// Nested structure recommended
{
  "homepage": {
    "hero": {
      "title": "Welcome to Life Is Tempo",
      "subtitle": "Training for Berlin 70.3 from Colombia"
    }
  }
}
```

**2. Add to English** (`messages/en.json`):
```json
{
  "homepage": {
    "hero": {
      "title": "Welcome to Life Is Tempo",
      "subtitle": "Training for Berlin 70.3 from Colombia"
    }
  }
}
```

**3. Add to Spanish** (`messages/es.json`):
```json
{
  "homepage": {
    "hero": {
      "title": "Bienvenido a Life Is Tempo",
      "subtitle": "Entrenando para Berlin 70.3 desde Colombia"
    }
  }
}
```

**4. Use in component**:
```typescript
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('homepage.hero');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </div>
  );
}
```

### Styling with Tailwind CSS

**Utility-first approach**:
```typescript
export function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="text-gray-600">{children}</div>
    </div>
  );
}
```

**Responsive design**:
```typescript
<div className="
  grid
  grid-cols-1        /* Mobile: 1 column */
  md:grid-cols-2     /* Tablet: 2 columns */
  lg:grid-cols-3     /* Desktop: 3 columns */
  gap-6
">
  {/* Card components */}
</div>
```

**Custom CSS** (only if necessary):
```typescript
// components/CustomComponent.module.css
.customStyle {
  /* Use only for complex animations or browser-specific hacks */
}
```

---

## Building for Production

### Local Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

**Expected Output**:
```
  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000

  ✓ Ready in 300ms
```

**Differences from Development**:
- Optimized bundle (minified, tree-shaken)
- Security headers enforced (CSP enabled)
- No hot reload
- Faster page loads

### Build Analysis

```bash
# Build with bundle analysis
pnpm build

# Output shows bundle sizes:
# Route (app)                              Size     First Load JS
# ┌ ○ /                                   1.5 kB         95 kB
# ├ ○ /_not-found                         871 B          93 kB
# └ ○ /[locale]                           2 kB           96 kB
```

**Optimization Tips**:
- Keep bundle size < 200 KB (target)
- Use dynamic imports for large components
- Optimize images with Next.js `<Image>` component

---

## Testing

### Linting

```bash
# Run ESLint
pnpm lint

# Auto-fix linting issues
pnpm lint --fix
```

**Common Linting Rules**:
- No unused variables
- Consistent code style
- React hooks best practices
- Next.js specific rules

### Type Checking

```bash
# Run TypeScript type checker
pnpm tsc --noEmit
```

**Fix Type Errors**:
```typescript
// ❌ Bad: Implicit any
function greet(name) {
  return `Hello ${name}`;
}

// ✅ Good: Explicit types
function greet(name: string): string {
  return `Hello ${name}`;
}
```

### Security Audit

```bash
# Check for dependency vulnerabilities
pnpm security-check

# Or manually:
pnpm audit --audit-level=high
```

**Fix Vulnerabilities**:
```bash
# Update dependencies
pnpm update

# Check again
pnpm audit
```

---

## Troubleshooting

### Common Issues

#### Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Find process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <process-id> /F

# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Or use different port:
pnpm dev -- -p 3001
```

#### Module Not Found

**Error**: `Module not found: Can't resolve '@/components/Button'`

**Solution**:
1. Check file path is correct
2. Verify import syntax: `@/` points to root directory
3. Restart dev server: `Ctrl+C`, then `pnpm dev`

#### Hot Reload Not Working

**Solution**:
1. Restart dev server
2. Clear Next.js cache: `rm -rf .next`
3. Check file watcher limits (macOS/Linux): `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf`

#### Build Fails in Production (but not locally)

**Cause**: Environment variable validation

**Solution**:
1. Check Vercel environment variables are set
2. Verify `.env.example` matches `lib/env.ts` schema
3. Test build locally with production env: `NODE_ENV=production pnpm build`

#### TypeScript Errors After Dependency Update

**Solution**:
```bash
# Delete node_modules and lock file
rm -rf node_modules pnpm-lock.yaml

# Clean install
pnpm install

# If still errors, check @types/* versions
pnpm add -D @types/node@latest @types/react@latest
```

---

## Git Workflow

### Before Committing

```bash
# 1. Check status
git status

# 2. Run linting
pnpm lint

# 3. Run security check
pnpm security-check

# 4. Stage changes
git add .

# 5. Commit with message
git commit -m "feat: add contact page"

# 6. Push to GitHub
git push origin feat/contact-page
```

### Branch Naming Convention

- `feat/*` - New features (e.g., `feat/newsletter-signup`)
- `fix/*` - Bug fixes (e.g., `fix/broken-link`)
- `docs/*` - Documentation (e.g., `docs/update-readme`)
- `chore/*` - Maintenance (e.g., `chore/update-deps`)

### Creating Pull Request

```bash
# Push feature branch
git push origin feat/my-feature

# Create PR via GitHub CLI (if installed)
gh pr create --title "Add my feature" --body "Description..."

# Or create PR manually on GitHub.com
```

---

## Development Best Practices

### Code Style

**Do**:
- ✅ Use TypeScript for all new files
- ✅ Define prop interfaces for components
- ✅ Use `const` for variables that don't change
- ✅ Extract reusable logic into utilities

**Don't**:
- ❌ Use `any` type (use `unknown` if type is truly unknown)
- ❌ Disable ESLint rules without good reason
- ❌ Create deeply nested components (max 3 levels)
- ❌ Commit commented-out code (use git history)

### Performance

**Do**:
- ✅ Use Next.js `<Image>` component for images
- ✅ Lazy load large components with `dynamic()`
- ✅ Memoize expensive computations with `useMemo`
- ✅ Use Server Components by default (App Router)

**Don't**:
- ❌ Import entire icon libraries (use tree-shaking)
- ❌ Fetch data in client components if avoidable
- ❌ Create unnecessary re-renders

### Security

**Do**:
- ✅ Validate all user input (use Zod schemas)
- ✅ Sanitize MDX content before rendering
- ✅ Use environment variables for secrets
- ✅ Keep dependencies up to date

**Don't**:
- ❌ Trust user input without validation
- ❌ Commit `.env.local` to git
- ❌ Expose API keys in client code
- ❌ Disable security headers without reason

---

## VS Code Configuration

### Recommended Settings

**`.vscode/settings.json`** (project-local):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### Keyboard Shortcuts

| Action | Windows/Linux | macOS |
|--------|--------------|-------|
| Run dev server | (terminal) `pnpm dev` | (terminal) `pnpm dev` |
| Quick fix | `Ctrl+.` | `Cmd+.` |
| Go to definition | `F12` | `F12` |
| Find references | `Shift+F12` | `Shift+F12` |
| Format document | `Shift+Alt+F` | `Shift+Option+F` |
| Search files | `Ctrl+P` | `Cmd+P` |

---

## Learning Resources

### Next.js
- Official Docs: https://nextjs.org/docs
- App Router Guide: https://nextjs.org/docs/app
- Learn Next.js: https://nextjs.org/learn

### React
- Official Docs: https://react.dev
- React Server Components: https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components

### Tailwind CSS
- Official Docs: https://tailwindcss.com/docs
- Playground: https://play.tailwindcss.com

### TypeScript
- Official Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- React TypeScript Cheatsheet: https://react-typescript-cheatsheet.netlify.app

### Internationalization (next-intl)
- Official Docs: https://next-intl-docs.vercel.app

---

## Next Steps

After completing this guide:

1. **Read Related Documentation**:
   - [Content Authoring Guide](./content-authoring.md) - Writing blog posts with MDX
   - [Internationalization Guide](./internationalization.md) - Multi-language workflow
   - [Deployment Guide](../deployment/vercel-deployment.md) - Deploy to Vercel

2. **Explore Codebase**:
   - Read `app/[locale]/page.tsx` - Homepage component
   - Read `lib/env.ts` - Environment variable setup
   - Read `next.config.ts` - Security headers configuration

3. **Start Contributing**:
   - Check open issues on GitHub
   - Pick a "good first issue" label
   - Follow contribution guidelines in README

---

## Getting Help

**Documentation**:
- Project Docs: `/docs` folder
- Project CLAUDE.md: Development patterns

**Community**:
- GitHub Issues: https://github.com/juancmandev/life-is-tempo/issues
- Discussions: https://github.com/juancmandev/life-is-tempo/discussions

**Contact**:
- Email: security@lifeistempo.com (for security issues)
- GitHub: @juancmandev

---

**Last Updated**: 2026-02-11
