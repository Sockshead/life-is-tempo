# Contributing to Life Is Tempo

## CI/CD Workflow

This project uses Vercel for deployments with a promotion pipeline and GitHub Actions for CI validation.

### Branch Strategy

```
Feature Branch (feature/*)
    ↓ Create PR to develop (triggers Vercel preview deployment)
    ↓ Review preview URL, validate tests pass & site works
    ↓ Merge PR to develop
Develop Branch (develop)
    ↓ Vercel auto-deploys (staging environment)
    ↓ Manual confirmation that deploy is stable
    ↓ Create PR from develop → master
Master Branch (master)
    ↓ Merge triggers Vercel production deployment
    → Production live
```

### Development Workflow

#### 1. Feature Development

Create a feature branch from `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/my-feature
```

Develop and commit your changes:

```bash
git add .
git commit -m "feat: add new feature"
```

#### 2. Create PR to Develop

Push your feature branch and create a PR targeting `develop`:

```bash
git push origin feature/my-feature

gh pr create \
  --base develop \
  --head feature/my-feature \
  --title "feat: your feature title" \
  --body "Description of changes"
```

**What happens:**
- Vercel creates an automatic preview deployment with a unique URL
- GitHub Actions runs validation checks (lint, test, security, build)
- Bot comments on PR with check status
- Review the Vercel preview URL to validate your changes
- Requires approval before merge

#### 3. Staging Validation (Develop Branch)

Once merged to `develop`, Vercel auto-deploys to the staging environment.

- Verify the staging deployment is stable
- Confirm no regressions from merged features

#### 4. Production Deployment (Develop → Master)

When develop is stable and ready for production, create a PR to master:

```bash
gh pr create \
  --base master \
  --head develop \
  --title "release: production deployment YYYY-MM-DD" \
  --body "Release notes..."
```

**What happens:**
- GitHub Actions runs full validation
- All status checks must pass
- When merged, Vercel triggers production deployment automatically
- Production URL: https://lifeistempo.com

### Branch Protection Rules

| Branch | Approvals Required | Status Checks | Direct Push |
|--------|-------------------|---------------|-------------|
| `develop` | 1 | validate | Blocked |
| `master` | 2 | validate | Blocked (PR only) |

### Emergency Hotfix Process

For critical production bugs:

```bash
# 1. Create hotfix from master
git checkout master
git pull origin master
git checkout -b hotfix/critical-bug

# 2. Fix and commit
git add .
git commit -m "fix: critical bug description"

# 3. Push and create PR to master
git push origin hotfix/critical-bug
gh pr create --base master --head hotfix/critical-bug \
  --title "HOTFIX: Critical bug fix" \
  --label hotfix

# 4. Get expedited reviews (still require 2 approvals)
# 5. Merge to master (triggers Vercel production deployment)

# 6. Backport to develop
git checkout develop
git merge master
git push origin develop
```

### Environment URLs

- **Production**: https://lifeistempo.com (master branch, auto-deployed via Vercel)
- **Staging**: develop branch (auto-deployed via Vercel)
- **Preview**: Automatic per-PR preview deployments on Vercel

### Questions?

- GitHub Actions workflows: `.github/workflows/`
- Issues with CI/CD: Check workflow runs at https://github.com/Sockshead/life-is-tempo/actions
- Vercel deployments: https://vercel.com/socksheads-projects/life-is-tempo
- Need help? Create an issue or ask the team
