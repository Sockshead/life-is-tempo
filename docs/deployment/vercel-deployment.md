# Vercel Deployment Guide

**Last Updated**: 2026-02-11

---

## Overview

This guide walks through deploying Life Is Tempo to Vercel, from initial setup to production deployment and ongoing maintenance.

**Prerequisites**:
- GitHub account with repository access
- Vercel account (free tier sufficient to start)
- Domain name (optional, Vercel provides free subdomain)

---

## Initial Deployment

### Step 1: Prepare Repository

Ensure your repository is ready for deployment:

```bash
# Navigate to project directory
cd A:/repositories/life-is-tempo

# Verify build succeeds locally
pnpm install
pnpm build

# Check for security vulnerabilities
pnpm security-check

# Commit any pending changes
git add .
git commit -m "chore: prepare for deployment"
git push origin master
```

### Step 2: Connect to Vercel

**Option A: Vercel CLI** (Recommended)

```bash
# Install Vercel CLI globally
pnpm add -g vercel

# Login to Vercel
vercel login

# Deploy from project root
cd A:/repositories/life-is-tempo
vercel

# Follow prompts:
# - Link to existing project or create new one
# - Set up project settings (auto-detected from framework)
# - Deploy!
```

**Option B: Vercel Dashboard** (Web UI)

1. Visit https://vercel.com/new
2. Click "Import Git Repository"
3. Authorize Vercel to access your GitHub account
4. Select `Sockshead/life-is-tempo` repository
5. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `pnpm build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `pnpm install` (auto-detected)
6. Click "Deploy"

### Step 3: Configure Environment Variables (Optional)

All environment variables are optional for basic deployment. Configure only if you need specific features:

**In Vercel Dashboard**:
1. Go to project settings: https://vercel.com/[your-username]/life-is-tempo/settings
2. Navigate to "Environment Variables"
3. Add variables for each environment (Production, Preview, Development)

**Recommended Initial Setup**:
```
# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX       # Google Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=auto             # Vercel Analytics (auto-configured)

# Newsletter (Optional - add when ready)
# NEWSLETTER_API_KEY=loops_xxxxxxxxxxxx
# NEWSLETTER_AUDIENCE_ID=cm1abc123def
```

**Via Vercel CLI**:
```bash
# Add environment variables
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID preview

# List all variables
vercel env ls

# Pull environment variables to local .env file
vercel env pull .env.local
```

### Step 4: Verify Deployment

**Check Deployment Status**:
1. Vercel dashboard shows deployment progress
2. Wait for "Building" → "Ready" status (~1-2 minutes)
3. Click on deployment URL to view live site

**Verify Security Headers**:
```bash
# Test security headers (replace URL with your deployment)
curl -I https://life-is-tempo.vercel.app

# Or use online tool:
# https://securityheaders.com/?q=https://life-is-tempo.vercel.app
```

**Expected Headers**:
- `strict-transport-security`: max-age=63072000; includeSubDomains; preload
- `x-frame-options`: SAMEORIGIN
- `x-content-type-options`: nosniff
- `x-xss-protection`: 1; mode=block
- `referrer-policy`: origin-when-cross-origin
- `content-security-policy`: (in production only)

---

## Custom Domain Setup

### Step 1: Add Domain in Vercel

**Via Dashboard**:
1. Go to project settings → Domains
2. Click "Add Domain"
3. Enter your domain: `lifeistempo.com`
4. Vercel provides DNS configuration

**Via CLI**:
```bash
vercel domains add lifeistempo.com
```

### Step 2: Configure DNS

Vercel provides two options:

**Option A: Nameserver Configuration** (Recommended)

Point your domain's nameservers to Vercel:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Benefits**:
- Automatic SSL certificate management
- Easier DNS record management
- Built-in DDoS protection

**Option B: A/CNAME Records**

If you prefer keeping existing nameservers:

```
# Root domain (A record)
A    @    76.76.21.21

# www subdomain (CNAME record)
CNAME    www    cname.vercel-dns.com
```

**Benefits**:
- Keep existing DNS provider
- Control all DNS records directly

### Step 3: Verify Domain

```bash
# Check DNS propagation
nslookup lifeistempo.com

# Check SSL certificate
openssl s_client -connect lifeistempo.com:443 -servername lifeistempo.com

# Test HTTPS redirect
curl -I http://lifeistempo.com
# Should return 301/308 redirect to https://lifeistempo.com
```

### Step 4: Configure Redirects (Optional)

**Redirect www to non-www** (or vice versa):

Add to `vercel.json` in repository root:
```json
{
  "redirects": [
    {
      "source": "https://www.lifeistempo.com/:path*",
      "destination": "https://lifeistempo.com/:path*",
      "permanent": true
    }
  ]
}
```

Commit and push:
```bash
git add vercel.json
git commit -m "chore: configure domain redirects"
git push origin master
```

---

## Deployment Workflow

### Automatic Deployments

**Production Deployments**:
- **Trigger**: Push to `master` branch
- **URL**: https://lifeistempo.com (after custom domain setup)
- **Environment**: Production environment variables

**Preview Deployments**:
- **Trigger**: Push to any branch or open pull request
- **URL**: Unique URL per deployment (e.g., `life-is-tempo-git-feat-xyz.vercel.app`)
- **Environment**: Preview environment variables
- **Auto-cleanup**: Deleted after 30 days of inactivity

**Development Deployments**:
- **Trigger**: `vercel` command in CLI
- **URL**: Unique URL per deployment
- **Environment**: Development environment variables

### Manual Deployments

**Deploy via CLI**:
```bash
# Production deployment
vercel --prod

# Preview deployment
vercel

# Deploy specific branch
git checkout feat/new-feature
vercel
```

**Redeploy via Dashboard**:
1. Go to deployments page
2. Find deployment to redeploy
3. Click "..." menu → "Redeploy"
4. Choose "Use existing Build Cache" or rebuild

### Rollback Procedure

**Instant Rollback** (via Dashboard):
1. Go to project deployments
2. Find last known good deployment
3. Click "..." menu → "Promote to Production"
4. Confirm promotion

**Rollback via CLI**:
```bash
# List recent deployments
vercel ls

# Promote specific deployment to production
vercel promote <deployment-url>
```

**Git-based Rollback**:
```bash
# Find commit hash of last good deployment
git log --oneline

# Create rollback branch
git checkout -b rollback/revert-to-abc123
git revert <bad-commit-hash>
git push origin rollback/revert-to-abc123

# Merge to master (triggers automatic deployment)
git checkout master
git merge rollback/revert-to-abc123
git push origin master
```

---

## Environment Configuration

### Environment Tiers

| Tier | Trigger | Use Case | Environment Variables |
|------|---------|----------|----------------------|
| **Production** | Push to `master` | Live site | Production values |
| **Preview** | PR or branch push | Testing, review | Preview values (same as production usually) |
| **Development** | `vercel` CLI | Local testing | Development values |

### Managing Environment Variables

**Add Variable**:
```bash
# Production only
vercel env add MY_API_KEY production

# All environments
vercel env add MY_API_KEY
# Then select environments: Production, Preview, Development

# From file
vercel env add < .env.production
```

**Remove Variable**:
```bash
vercel env rm MY_API_KEY production
```

**Update Variable**:
```bash
# Remove old value
vercel env rm MY_API_KEY production

# Add new value
vercel env add MY_API_KEY production
```

**Best Practices**:
- Use Preview environment to test new API keys before production
- Keep Development variables separate (use test/sandbox APIs)
- Never commit `.env.local` to git
- Document required variables in `.env.example`

---

## Build Configuration

### Build Settings

Vercel auto-detects Next.js configuration. Override if needed:

**vercel.json** (optional):
```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

### Build Performance

**Current Build Times**:
- Clean build: ~60-90 seconds
- Cached build: ~30-45 seconds

**Optimization Tips**:
1. **Enable Build Cache**: Automatic in Vercel
2. **Use pnpm**: Faster than npm/yarn (already configured)
3. **Optimize Dependencies**: Regular cleanup (`pnpm prune`)
4. **Reduce Bundle Size**: Code splitting, tree shaking (automatic in Next.js)

### Build Logs

**View build logs**:
```bash
# Via CLI (shows latest deployment)
vercel logs

# Via Dashboard
# Go to Deployments → Click deployment → View "Building" logs
```

**Common Build Errors**:

| Error | Cause | Solution |
|-------|-------|----------|
| Environment validation failed | Missing required env var | Add variable in Vercel dashboard |
| Module not found | Dependency not installed | Check `package.json`, run `vercel --prod` to rebuild |
| TypeScript error | Type checking failed | Fix TypeScript errors locally, push again |
| Out of memory | Large build process | Contact Vercel support for memory increase |

---

## Monitoring & Alerts

### Vercel Analytics

**Enable Analytics**:
1. Go to project settings → Analytics
2. Enable "Vercel Analytics" (free tier)
3. No code changes needed (injected automatically)

**Metrics Available**:
- Real User Monitoring (RUM)
- Core Web Vitals (LCP, FID, CLS)
- Page load times
- Top pages and referrers
- Geographic distribution

### Deployment Notifications

**Configure Notifications**:
1. Project settings → Notifications
2. Choose notification channels:
   - Email
   - Slack (connect Slack workspace)
   - Discord
   - GitHub comments on PRs

**Notification Types**:
- Deployment started
- Deployment ready
- Deployment failed
- Deployment promoted to production

### Uptime Monitoring

**External Monitoring** (Recommended):

Use external service for uptime monitoring:
- **UptimeRobot** (free tier: 50 monitors, 5-min checks)
- **Pingdom** (paid, more features)
- **Better Uptime** (generous free tier)

**Setup**:
1. Create account on monitoring service
2. Add monitor for `https://lifeistempo.com`
3. Configure check interval (5 minutes recommended)
4. Set up alerts (email, SMS, Slack)

---

## Security Considerations

### HTTPS & SSL

**Automatic SSL**:
- Vercel provides free SSL certificates via Let's Encrypt
- Automatic renewal (no action needed)
- Supports custom domains

**Force HTTPS**:
- Automatic HTTP → HTTPS redirect (enabled by default)
- HSTS header enforces HTTPS for 2 years (configured in `next.config.ts`)

### Edge Network

**Global CDN**:
- 30+ edge locations worldwide
- Automatic routing to nearest edge
- DDoS protection included

**Caching**:
- Static assets: Cached at edge indefinitely (immutable)
- HTML pages: Cache-control headers from Next.js
- API routes: No caching by default (add headers if needed)

### Access Control

**Repository Access**:
- Only trusted collaborators should have write access
- Use branch protection on `master` (require PR reviews)
- Enable GitHub security features (Dependabot, secret scanning)

**Vercel Team Access**:
- Invite team members only with necessary permissions
- Use role-based access (Viewer, Developer, Owner)
- Enable 2FA for all team members

---

## Troubleshooting

### Deployment Failures

**Build Failed**:
```bash
# Check build logs
vercel logs

# Common fixes:
# 1. Verify build succeeds locally
pnpm build

# 2. Check environment variables
vercel env ls

# 3. Clear Vercel cache and redeploy
vercel --force
```

**Runtime Errors**:
```bash
# Check function logs
vercel logs --follow

# Enable verbose logging (add to package.json)
{
  "scripts": {
    "build": "next build --debug"
  }
}
```

**Environment Variable Issues**:
```bash
# Pull production environment to local for testing
vercel env pull .env.production

# Test build with production env
pnpm build
```

### Performance Issues

**Slow Page Loads**:
1. Check Vercel Analytics for Core Web Vitals
2. Run Lighthouse audit: Chrome DevTools → Lighthouse
3. Optimize images: Use Next.js `<Image>` component
4. Reduce bundle size: Analyze with `pnpm build` (shows bundle sizes)

**High Bandwidth Usage**:
1. Check Vercel dashboard → Usage
2. Optimize images: Convert to WebP, use responsive sizes
3. Enable aggressive caching for static assets

### Domain Issues

**Domain Not Resolving**:
```bash
# Check DNS propagation
nslookup lifeistempo.com 8.8.8.8

# Check Vercel DNS configuration
vercel domains inspect lifeistempo.com
```

**SSL Certificate Issues**:
```bash
# Verify certificate
openssl s_client -connect lifeistempo.com:443 -servername lifeistempo.com

# If invalid, remove and re-add domain in Vercel dashboard
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] Build succeeds locally (`pnpm build`)
- [ ] Security audit passes (`pnpm security-check`)
- [ ] Environment variables configured in Vercel
- [ ] `.env.local` not committed to git
- [ ] All tests passing (when implemented)

### Post-Deployment

- [ ] Deployment completed successfully (Vercel dashboard)
- [ ] Site accessible at production URL
- [ ] Security headers present (check with https://securityheaders.com)
- [ ] SSL certificate valid (HTTPS working)
- [ ] Analytics tracking working (if configured)
- [ ] Forms working (when implemented)

### Weekly Maintenance

- [ ] Review Vercel deployment logs for errors
- [ ] Check Vercel Analytics for performance issues
- [ ] Review Dependabot PRs (GitHub)
- [ ] Update dependencies (`pnpm update`)

### Monthly Maintenance

- [ ] Review bandwidth usage (Vercel dashboard)
- [ ] Check domain expiration date
- [ ] Review and rotate API keys (if applicable)
- [ ] Update documentation

---

## Cost Estimation

### Vercel Pricing (as of 2026)

**Hobby Plan** (Free):
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic SSL certificates
- Global CDN
- **Sufficient for**: Personal blogs, side projects (current use case)

**Pro Plan** ($20/month per user):
- 1 TB bandwidth/month
- Advanced analytics
- Password protection
- Function logs (48 hours retention)
- **Needed when**: Traffic exceeds 100 GB/month

**Traffic Estimates**:
- Average page size: ~500 KB (with images)
- 100 GB = ~200,000 page views/month
- Current blog: Expect < 10,000 views/month initially (well within free tier)

**Additional Costs** (if applicable):
- Custom domain: $10-15/year (from domain registrar, not Vercel)
- Newsletter service (Loops.so): $0-50/month depending on subscribers
- Monitoring services: $0-10/month (free tiers available)

---

## Advanced Topics

### Preview Comments

**Enable Preview Comments**:
1. Project settings → Git → Enable "Preview Comments"
2. Vercel will comment on PRs with preview deployment URLs
3. Automatic visual regression testing (Vercel Pro)

### Edge Functions

**Current Use**: Not used (static site generation only)

**Future Use Cases** (if needed):
- Personalized content based on geolocation
- A/B testing
- Edge-side rendering for dynamic content

### Incremental Static Regeneration (ISR)

**Current Use**: Not used (full static generation)

**Potential Use Case** (blog posts):
```typescript
// app/[locale]/posts/[slug]/page.tsx
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  // Generate paths for all blog posts
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

**Benefit**: Update blog content without full rebuild (post changes propagate within 1 hour)

---

## Related Documentation

- [Environment Variables](./environment-variables.md) - Complete variable reference
- [System Architecture](../architecture/system-overview.md) - Deployment architecture
- [Security Architecture](../architecture/security-architecture.md) - Security headers

---

**Last Updated**: 2026-02-11

**Need Help?**
- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Project Issues: https://github.com/Sockshead/life-is-tempo/issues
