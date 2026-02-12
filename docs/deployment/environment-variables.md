# Environment Variables Reference

**Last Updated**: 2026-02-11

---

## Overview

This document provides a complete reference for all environment variables used in Life Is Tempo. The project uses `@t3-oss/env-nextjs` with Zod for type-safe validation at build time.

**Key Principles**:
- All variables are optional for basic deployment
- Server variables never exposed to client bundle
- Client variables must have `NEXT_PUBLIC_` prefix
- Empty strings treated as undefined (fail required validation)
- Build fails if validation errors occur

---

## Quick Reference

### Required Variables

**Currently**: None required for basic deployment

**Future**: Newsletter integration will require `NEWSLETTER_API_KEY`

### Optional Variables

| Variable | Type | Purpose | Required? |
|----------|------|---------|-----------|
| `NODE_ENV` | Server | Environment detection | Auto-set by platform |
| `NEWSLETTER_API_KEY` | Server | Newsletter service API key | Optional |
| `NEWSLETTER_AUDIENCE_ID` | Server | Newsletter list identifier | Optional |
| `RATE_LIMIT_SECRET` | Server | Rate limiting secret | Optional |
| `OPENAI_API_KEY` | Server | AI content generation | Optional |
| `ANTHROPIC_API_KEY` | Server | AI content generation (Claude) | Optional |
| `AMAZON_ASSOCIATE_ID` | Server | Amazon affiliate tracking | Optional |
| `AFFILIATE_TRACKING_SECRET` | Server | Affiliate link security | Optional |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Client | Google Analytics tracking | Optional |
| `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` | Client | Vercel Analytics tracking | Optional (auto-set) |

---

## Variable Details

### System Variables

#### `NODE_ENV`

**Type**: Server-side
**Validation**: `z.enum(["development", "test", "production"])`
**Default**: `"development"`
**Set by**: Platform (Vercel, Node.js)

**Purpose**: Determines application behavior and feature toggles

**Values**:
- `development`: Local development, hot reload enabled, CSP disabled
- `test`: Testing environment (not used currently)
- `production`: Production deployment, security headers enforced

**Example**:
```typescript
if (process.env.NODE_ENV === 'production') {
  // Apply strict CSP
  headers.push({
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  });
}
```

**Notes**:
- Automatically set by Vercel in production
- Set to `development` when running `pnpm dev`
- Should not be manually configured

---

### Newsletter Variables

#### `NEWSLETTER_API_KEY`

**Type**: Server-side
**Validation**: `z.string().optional()`
**Required**: No (until newsletter feature implemented)

**Purpose**: Authenticate with newsletter service (Loops.so or Resend)

**Where to get it**:
- **Loops.so**: Dashboard → API Keys → Create key
- **Resend**: Dashboard → API Keys → Create API key

**Security**:
- Never commit to git
- Store in Vercel environment variables (Production, Preview)
- Use separate keys for development/production

**Example usage** (planned):
```typescript
const response = await fetch('https://app.loops.so/api/v1/contacts/create', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${env.NEWSLETTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email: userEmail }),
});
```

#### `NEWSLETTER_AUDIENCE_ID`

**Type**: Server-side
**Validation**: `z.string().optional()`
**Required**: No (until newsletter feature implemented)

**Purpose**: Identify which newsletter list to add subscribers to

**Where to get it**:
- **Loops.so**: Dashboard → Lists → Copy List ID
- **Resend**: Dashboard → Audiences → Copy Audience ID

**Format**:
- Loops.so: `cm1abc123def` (alphanumeric)
- Resend: `uuid` format

**Example**:
```bash
# .env.local
NEWSLETTER_AUDIENCE_ID=cm1abc123def
```

---

### Security Variables

#### `RATE_LIMIT_SECRET`

**Type**: Server-side
**Validation**: `z.string().optional()`
**Required**: No (until API routes added)

**Purpose**: Secret key for rate limiting (used with Upstash Redis or similar)

**Where to get it**:
- Generate random string: `openssl rand -hex 32`
- Or use UUID: `uuidgen`

**Security**:
- Never share or commit
- Rotate regularly (every 90 days recommended)
- Use different secrets for dev/prod

**Example generation**:
```bash
# Generate secure random string
openssl rand -hex 32
# Output: a1b2c3d4e5f6789012345678901234567890abcdef...
```

**Usage** (planned):
```typescript
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  prefix: env.RATE_LIMIT_SECRET, // Used as cache key prefix
});
```

---

### AI Service Variables

#### `OPENAI_API_KEY`

**Type**: Server-side
**Validation**: `z.string().optional()`
**Required**: No (future feature)

**Purpose**: Authenticate with OpenAI API for content generation

**Where to get it**:
- Create account at https://platform.openai.com
- Go to API Keys → Create new secret key

**Format**: `sk-proj-abcd1234efgh5678...` (starts with `sk-`)

**Cost Considerations**:
- Pay-per-use pricing
- Set usage limits in OpenAI dashboard
- Monitor usage to avoid unexpected costs

**Potential Use Cases**:
- Draft blog post translations (English → Spanish)
- Generate meta descriptions
- Content summarization
- SEO keyword suggestions

**Example** (planned):
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Translate to Spanish: ...' }],
});
```

#### `ANTHROPIC_API_KEY`

**Type**: Server-side
**Validation**: `z.string().optional()`
**Required**: No (future feature)

**Purpose**: Authenticate with Anthropic API (Claude) for content generation

**Where to get it**:
- Create account at https://console.anthropic.com
- Go to API Keys → Create new key

**Format**: `sk-ant-api03-...`

**Use Cases** (similar to OpenAI):
- Long-form content generation
- Content analysis and editing
- Translation with context awareness

**Example** (planned):
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: env.ANTHROPIC_API_KEY,
});

const message = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Translate to Spanish: ...' }],
});
```

**Comparison with OpenAI**:
- Claude excels at long-form content (100K+ token context)
- OpenAI (GPT-4) faster for short completions
- Consider using both: Claude for drafting, GPT-4 for quick edits

---

### Affiliate Variables

#### `AMAZON_ASSOCIATE_ID`

**Type**: Server-side
**Validation**: `z.string().optional()`
**Required**: No (future monetization)

**Purpose**: Amazon Associates affiliate tracking

**Where to get it**:
- Sign up at https://affiliate-program.amazon.com
- Dashboard → Your Associate ID

**Format**: `yourname-20` (username + suffix)

**Usage** (planned):
```typescript
// Generate affiliate link
const affiliateLink = `https://www.amazon.com/dp/${productId}?tag=${env.AMAZON_ASSOCIATE_ID}`;
```

**Legal Requirements**:
- Disclose affiliate relationships on site
- Comply with Amazon Associates Operating Agreement
- Include disclaimer: "As an Amazon Associate I earn from qualifying purchases"

#### `AFFILIATE_TRACKING_SECRET`

**Type**: Server-side
**Validation**: `z.string().optional()`
**Required**: No (future monetization)

**Purpose**: Sign affiliate links to prevent manipulation

**Where to get it**: Generate random string (like `RATE_LIMIT_SECRET`)

**Usage** (planned):
```typescript
import crypto from 'crypto';

function signAffiliateLink(url: string): string {
  const signature = crypto
    .createHmac('sha256', env.AFFILIATE_TRACKING_SECRET)
    .update(url)
    .digest('hex');

  return `${url}&sig=${signature}`;
}
```

---

### Analytics Variables

#### `NEXT_PUBLIC_GA_MEASUREMENT_ID`

**Type**: Client-side
**Validation**: `z.string().optional()`
**Required**: No

**Purpose**: Google Analytics 4 tracking

**Where to get it**:
- Create account at https://analytics.google.com
- Create GA4 property
- Admin → Data Streams → Copy Measurement ID

**Format**: `G-XXXXXXXXXX` (starts with `G-`)

**Privacy Considerations**:
- Inform users about tracking (privacy policy)
- Consider cookie-less tracking
- Comply with GDPR (EU visitors)

**Usage**:
```typescript
// lib/analytics.ts
export function initGA() {
  if (env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    // Load GA script
    window.gtag('config', env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
  }
}
```

**Alternative**: Consider privacy-friendly analytics (Plausible, Fathom, Simple Analytics)

#### `NEXT_PUBLIC_VERCEL_ANALYTICS_ID`

**Type**: Client-side
**Validation**: `z.string().optional()`
**Required**: No (auto-configured by Vercel)

**Purpose**: Vercel Analytics tracking (Web Vitals, page performance)

**Where to get it**:
- Automatically set by Vercel when Analytics enabled
- Project settings → Analytics → Enable

**Notes**:
- No manual configuration needed
- Privacy-friendly (no cookies, no personal data)
- Free tier available

**Usage**:
```typescript
// Automatically injected by Vercel, no code needed
```

---

## Configuration by Environment

### Local Development (`.env.local`)

**Minimal Setup** (no external services):
```bash
# .env.local
NODE_ENV=development
```

**Full Development Setup** (all features):
```bash
# .env.local
NODE_ENV=development

# Newsletter (use test API keys)
NEWSLETTER_API_KEY=loops_test_abc123
NEWSLETTER_AUDIENCE_ID=cm1test123

# Security
RATE_LIMIT_SECRET=dev-secret-not-for-production

# AI Services (use separate dev API keys)
OPENAI_API_KEY=sk-proj-dev-...
ANTHROPIC_API_KEY=sk-ant-dev-...

# Affiliate (use test associate ID)
AMAZON_ASSOCIATE_ID=test-20
AFFILIATE_TRACKING_SECRET=dev-tracking-secret

# Analytics (optional in development)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TESTID123
```

**Best Practices**:
- Use test/sandbox API keys
- Never use production keys locally
- Commit `.env.example`, never `.env.local`

### Production (Vercel Dashboard)

**Minimal Production** (no external services):
```bash
# Vercel auto-sets NODE_ENV=production
```

**Full Production** (all features):
```bash
# Newsletter
NEWSLETTER_API_KEY=loops_prod_xyz789
NEWSLETTER_AUDIENCE_ID=cm1prod456

# Security
RATE_LIMIT_SECRET=<generate-secure-random-string>

# AI Services
OPENAI_API_KEY=sk-proj-prod-...
ANTHROPIC_API_KEY=sk-ant-prod-...

# Affiliate
AMAZON_ASSOCIATE_ID=juancmandev-20
AFFILIATE_TRACKING_SECRET=<generate-secure-random-string>

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-PRODID789
# NEXT_PUBLIC_VERCEL_ANALYTICS_ID auto-set by Vercel
```

**Security Checklist**:
- [ ] All secrets use strong random strings (32+ characters)
- [ ] Production keys separate from development keys
- [ ] API keys have minimal permissions (principle of least privilege)
- [ ] Regular key rotation schedule (every 90 days recommended)

### Preview (Vercel Dashboard)

**Recommended Setup**: Same as production (safe testing)

**Alternative**: Use staging/test API keys if available

```bash
# Preview environment (same as production usually)
NEWSLETTER_API_KEY=loops_prod_xyz789
# ... rest same as production
```

**Use Cases**:
- Test new features with production-like configuration
- Verify API integrations before merging to master
- Share preview URLs with stakeholders

---

## Validation Schema

**Location**: `lib/env.ts`

**Current Schema**:
```typescript
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    NEWSLETTER_API_KEY: z.string().optional(),
    NEWSLETTER_AUDIENCE_ID: z.string().optional(),
    RATE_LIMIT_SECRET: z.string().optional(),
    OPENAI_API_KEY: z.string().optional(),
    ANTHROPIC_API_KEY: z.string().optional(),
    AMAZON_ASSOCIATE_ID: z.string().optional(),
    AFFILIATE_TRACKING_SECRET: z.string().optional(),
  },

  client: {
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
    NEXT_PUBLIC_VERCEL_ANALYTICS_ID: z.string().optional(),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEWSLETTER_API_KEY: process.env.NEWSLETTER_API_KEY,
    // ... all variables mapped
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
```

**Validation Behavior**:
- **Build time**: Validates all variables against schema
- **Empty strings**: Treated as undefined (fails required checks)
- **Missing optional**: Allowed, returns undefined
- **Invalid type**: Build fails with clear error message
- **Server→Client leak**: Compile-time error if accessed incorrectly

---

## Troubleshooting

### Build Fails: Environment Validation Error

**Error Message**:
```
❌ Invalid environment variables:
  NEWSLETTER_API_KEY: Required
```

**Solution**:
1. Check if variable is actually required (most are optional)
2. If required, add to Vercel environment variables
3. For local development, add to `.env.local`

### Variable Not Available in Browser

**Error**: `env.NEWSLETTER_API_KEY` is undefined in client component

**Cause**: Server-side variables not exposed to client bundle

**Solution**:
- Server variables: Only use in API routes, Server Components
- Need in client?: Must use `NEXT_PUBLIC_` prefix and add to `client` schema

### Empty String Treated as Missing

**Error**: Variable set but validation fails

**Cause**: `emptyStringAsUndefined: true` in env config

**Solution**:
```bash
# Wrong (treated as undefined)
NEWSLETTER_API_KEY=

# Correct
NEWSLETTER_API_KEY=actual_api_key_value

# Or remove line entirely if optional
```

### Vercel Deployment Fails but Local Build Works

**Cause**: Environment variables not configured in Vercel dashboard

**Solution**:
1. Go to Vercel project settings → Environment Variables
2. Add missing variables for Production/Preview
3. Redeploy

---

## Security Best Practices

### Secret Management

**Do**:
- ✅ Use separate keys for development, staging, production
- ✅ Store secrets in Vercel dashboard (encrypted)
- ✅ Rotate secrets regularly (every 90 days)
- ✅ Use strong random strings (32+ characters)
- ✅ Set API key permissions to minimum required

**Don't**:
- ❌ Commit `.env.local` or `.env.production` to git
- ❌ Share secrets via email, Slack, etc.
- ❌ Use production keys in development
- ❌ Hard-code secrets in source code
- ❌ Log secret values (even in development)

### Rotation Schedule

**Recommended Rotation**:
- Critical secrets (API keys): Every 90 days
- Rate limit secrets: Every 180 days
- Affiliate tracking: Annually

**Rotation Process**:
1. Generate new secret
2. Add as new environment variable in Vercel (e.g., `NEWSLETTER_API_KEY_NEW`)
3. Update code to try new key first, fall back to old
4. Deploy and verify
5. Remove old key after 24 hours

### Monitoring

**Alert on**:
- API key usage spikes (potential compromise)
- Failed authentication attempts
- Unusual geographic access patterns

**Tools**:
- Monitor service provider dashboards (OpenAI, Anthropic, etc.)
- Set up usage alerts
- Review access logs monthly

---

## Adding New Variables

### Process

1. **Add to Zod schema** (`lib/env.ts`):
   ```typescript
   server: {
     MY_NEW_API_KEY: z.string().optional(),
     // or required:
     MY_REQUIRED_KEY: z.string().min(1, "Required in production"),
   }
   ```

2. **Add to runtimeEnv mapping**:
   ```typescript
   runtimeEnv: {
     MY_NEW_API_KEY: process.env.MY_NEW_API_KEY,
   }
   ```

3. **Document in `.env.example`**:
   ```bash
   # My New Service
   # Get API key from: https://service.com/api-keys
   MY_NEW_API_KEY=your_api_key_here
   ```

4. **Update this documentation**:
   - Add to Quick Reference table
   - Create detailed section
   - Document where to get the key
   - Add usage examples

5. **Configure in Vercel**:
   ```bash
   vercel env add MY_NEW_API_KEY production
   vercel env add MY_NEW_API_KEY preview
   ```

### Checklist

- [ ] Zod schema updated
- [ ] runtimeEnv mapping added
- [ ] `.env.example` updated (commit this)
- [ ] This documentation updated
- [ ] Vercel environment variables configured
- [ ] Type safety verified (TypeScript compilation succeeds)

---

## Related Documentation

- [Vercel Deployment](./vercel-deployment.md) - Deployment process
- [System Architecture](../architecture/system-overview.md) - How variables are used
- [Security Architecture](../architecture/security-architecture.md) - Secret management

---

**Last Updated**: 2026-02-11

**Need Help?**
- @t3-oss/env-nextjs docs: https://env.t3.gg
- Vercel environment variables: https://vercel.com/docs/environment-variables
- Project issues: https://github.com/juancmandev/life-is-tempo/issues
