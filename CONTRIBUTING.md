# Contributing to Life Is Tempo

## CI/CD Workflow

This project uses a promotion pipeline with validation gates at each stage.

### Branch Strategy

```
Feature Branch (feature/*)
    ↓ merge
Test Branch (test) → Deploy to /test
    ↓ PR + approval
Develop Branch (develop) → Deploy to /staging
    ↓ PR + 2 approvals
Master Branch (master) → Deploy to Production (/)
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

#### 2. Test Environment Validation

Merge your feature to the `test` branch for validation:

```bash
git checkout test
git pull origin test
git merge feature/my-feature
git push origin test
```

Wait for deployment to complete, then verify:
- Test URL: https://sockshead.github.io/life-is-tempo/test
- Check all functionality works
- Verify no console errors

#### 3. Create PR to Develop (Staging)

Once test environment is validated, create a PR:

```bash
git checkout feature/my-feature
git push origin feature/my-feature

gh pr create \
  --base develop \
  --head feature/my-feature \
  --title "feat: your feature title" \
  --body "Description of changes"
```

**What happens:**
- GitHub Actions runs validation checks (lint, test, security, build)
- Staging environment deploys: https://sockshead.github.io/life-is-tempo/staging
- Bot comments on PR with deployment URL and check status
- Requires 1 approval before merge

**Review staging preview and merge when approved.**

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
- Requires 2 approvals (not 1)
- All status checks must pass
- When merged, production deploys automatically
- Production URL: https://sockshead.github.io/life-is-tempo

### Branch Protection Rules

| Branch | Approvals Required | Status Checks | Direct Push |
|--------|-------------------|---------------|-------------|
| `test` | 1 | validate | ❌ Blocked |
| `develop` | 1 | validate, build-and-deploy | ❌ Blocked |
| `master` | 2 | validate | ❌ Blocked (PR only) |

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
# 5. Merge to master (triggers production deployment)

# 6. Backport to develop
git checkout develop
git merge master
git push origin develop
```

### Environment URLs

- **Production**: https://sockshead.github.io/life-is-tempo (master branch)
- **Staging**: https://sockshead.github.io/life-is-tempo/staging (develop branch)
- **Test**: https://sockshead.github.io/life-is-tempo/test (test branch)

### Questions?

- GitHub Actions workflows: `.github/workflows/`
- Issues with CI/CD: Check workflow runs at https://github.com/Sockshead/life-is-tempo/actions
- Need help? Create an issue or ask the team
