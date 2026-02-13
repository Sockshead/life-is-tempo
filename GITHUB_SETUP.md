# GitHub Repository Configuration Guide

This guide covers manual configuration steps that must be completed via the GitHub web interface.

## 🔒 Security Settings

### 1. Branch Protection Rules

Navigate to: **Settings → Branches → Add rule**

#### For `main` branch:
1. Branch name pattern: `main`
2. Enable these settings:
   - ✅ Require a pull request before merging
     - Required approvals: **1**
     - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
     - ✅ Require branches to be up to date before merging
   - ✅ Require conversation resolution before merging
   - ✅ Do not allow bypassing the above settings
   - ✅ Include administrators

3. Click **Create** or **Save changes**

#### For `develop` branch (if using):
Repeat the same settings as `main` branch.

### 2. Code Security and Analysis

Navigate to: **Settings → Code security and analysis**

Enable the following features:

#### Dependency Graph
- ✅ **Enabled** (should be on by default for public repos)

#### Dependabot
- ✅ **Dependabot alerts** - Receive alerts for vulnerable dependencies
- ✅ **Dependabot security updates** - Automatic pull requests for security updates
- ℹ️ Dependabot version updates - Already configured via `.github/dependabot.yml`

#### Secret Scanning
- ✅ **Secret scanning** - Scan for accidentally committed secrets
- ✅ **Push protection** - Prevent secrets from being pushed

#### Private Vulnerability Reporting
- ✅ **Allow users to privately report security vulnerabilities**
  - This enables the "Report a vulnerability" button in the Security tab

### 3. GitHub Actions Permissions

Navigate to: **Settings → Actions → General**

#### Workflow permissions:
- Select: **Read and write permissions**
- ✅ Enable: **Allow GitHub Actions to create and approve pull requests**

This allows Dependabot and other automated tools to create PRs.

### 4. Pages

GitHub Pages is **not used** for site deployment. The site is deployed via Vercel (auto-deploys on push to `master` and `develop`). No Pages configuration is needed.

## 🔑 Secrets Configuration

Navigate to: **Settings → Secrets and variables → Actions**

Add the following secrets when you're ready to use these services:

### Newsletter Integration
```
Name: NEWSLETTER_API_KEY
Value: [Your Loops.so or Resend API key]
```

```
Name: NEWSLETTER_AUDIENCE_ID
Value: [Your newsletter list/audience ID]
```

### AI Services (Future)
```
Name: OPENAI_API_KEY
Value: [Your OpenAI API key]
```

```
Name: ANTHROPIC_API_KEY
Value: [Your Anthropic API key]
```

### Deployment (if using GitHub Actions for Vercel)
```
Name: VERCEL_TOKEN
Value: [Your Vercel API token]
```

```
Name: VERCEL_ORG_ID
Value: [Your Vercel organization ID]
```

```
Name: VERCEL_PROJECT_ID
Value: [Your Vercel project ID]
```

### Security
```
Name: RATE_LIMIT_SECRET
Value: [Generate a random string: openssl rand -hex 32]
```

## 📊 Repository Settings

### General Settings

Navigate to: **Settings → General**

#### Features
- ✅ Issues - For bug reports and feature requests
- ✅ Discussions - For community discussions (optional)
- ❌ Wiki - Not needed (using docs/ folder instead)
- ❌ Projects - Not needed initially

#### Pull Requests
- ✅ Allow squash merging
- ✅ Allow auto-merge
- ✅ Automatically delete head branches

### Manage Access (if private repo)

Navigate to: **Settings → Manage access**

Add collaborators as needed with appropriate permissions:
- **Admin** - Full access
- **Maintain** - Manage repository without access to sensitive settings
- **Write** - Push to repository
- **Triage** - Manage issues and pull requests
- **Read** - View and clone repository

## 🏷️ Labels Configuration

Navigate to: **Issues → Labels**

Consider adding these custom labels (Dependabot labels are auto-created):

Security-related:
- `security` - Security-related issues (🔒 red)
- `vulnerability` - Security vulnerabilities (🚨 red)

Development:
- `enhancement` - New features (✨ blue)
- `bug` - Bug reports (🐛 red)
- `documentation` - Documentation improvements (📝 blue)
- `performance` - Performance improvements (⚡ yellow)

Workflow:
- `needs-review` - Needs code review (👀 yellow)
- `work-in-progress` - Work in progress (🚧 yellow)
- `ready-to-merge` - Ready to merge (✅ green)

## 🔔 Notifications

### Watch Settings

Click **Watch** (top right) and configure:
- **Participating and @mentions** - For pull request reviews and mentions
- **All activity** - If you want to monitor everything
- **Custom** - Select specific event types

### Dependabot Alerts

Navigate to: **Your profile → Settings → Notifications**

Under "Dependabot alerts":
- ✅ Enable email notifications for security vulnerabilities

## ✅ Verification Checklist

After completing the above steps:

- [ ] Branch protection enabled for `main` and `develop`
- [ ] Dependabot alerts enabled
- [ ] Secret scanning enabled
- [ ] Push protection enabled
- [ ] Private vulnerability reporting enabled
- [ ] GitHub Actions has write permissions
- [ ] Secrets configured (when services are ready)
- [ ] Repository features configured (Issues, etc.)
- [ ] Labels created
- [ ] Notifications configured

## 🔗 Quick Links

After setup, these links will be useful:

- **Security Overview**: `https://github.com/[username]/life-is-tempo/security`
- **Dependabot Alerts**: `https://github.com/[username]/life-is-tempo/security/dependabot`
- **Secret Scanning**: `https://github.com/[username]/life-is-tempo/security/secret-scanning`
- **Actions**: `https://github.com/[username]/life-is-tempo/actions`
- **Settings**: `https://github.com/[username]/life-is-tempo/settings`

## 📝 Notes

- Some features (like secret scanning) may only be available for public repositories or with GitHub Advanced Security
- Branch protection rules can be adjusted as the team grows
- Consider enabling 2FA (Two-Factor Authentication) for all contributors
- Review security settings quarterly

---

**Created**: 2026-02-11
**Owner**: [@juancmandev](https://github.com/juancmandev)
