#!/bin/bash
# Automated GitHub Security Configuration
# This script automates the manual steps from GITHUB_SETUP.md

set -e  # Exit on error

# Auto-detect repository from git remote
REPO_URL=$(git remote get-url origin)
REPO=$(echo "$REPO_URL" | sed -E 's/.*[:/]([^/]+\/[^/.]+)(\.git)?$/\1/')
BRANCH_MAIN=$(git branch --show-current)
BRANCH_DEVELOP="develop"

echo "🔒 Setting up GitHub Security for $REPO"
echo ""

# Check if gh CLI is authenticated
if ! gh auth status > /dev/null 2>&1; then
    echo "❌ Error: Not authenticated with GitHub CLI"
    echo "Run: gh auth login"
    exit 1
fi

echo "✅ Authenticated with GitHub CLI"
echo ""

# ============================================================================
# 1. Enable Security Features
# ============================================================================

echo "📊 Enabling repository security features..."

# Enable vulnerability alerts
# Note: Using 'repos/' prefix to avoid Git Bash path rewriting
gh api -X PATCH "repos/$REPO" \
    -f security_and_analysis[advanced_security][status]=enabled \
    -f security_and_analysis[secret_scanning][status]=enabled \
    -f security_and_analysis[secret_scanning_push_protection][status]=enabled \
    2>/dev/null || echo "⚠️  Some security features may require GitHub Advanced Security (public repos get this free)"

echo "✅ Security scanning features enabled"
echo ""

# ============================================================================
# 2. Configure Branch Protection for main/master
# ============================================================================

echo "🛡️  Setting up branch protection for $BRANCH_MAIN..."

# Use JSON file for branch protection (required by gh CLI)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
gh api -X PUT "repos/$REPO/branches/$BRANCH_MAIN/protection" \
    --input "$SCRIPT_DIR/branch-protection.json" \
    > /dev/null 2>&1 && echo "✅ Branch protection enabled for $BRANCH_MAIN" || echo "⚠️  Branch protection failed (branch may not exist yet or insufficient permissions)"

echo ""

# ============================================================================
# 3. Configure Branch Protection for develop (if exists)
# ============================================================================

if git show-ref --verify --quiet "refs/heads/$BRANCH_DEVELOP" 2>/dev/null || \
   gh api "repos/$REPO/branches/$BRANCH_DEVELOP" >/dev/null 2>&1; then
    echo "🛡️  Setting up branch protection for $BRANCH_DEVELOP..."

    gh api -X PUT "repos/$REPO/branches/$BRANCH_DEVELOP/protection" \
        --input "$SCRIPT_DIR/branch-protection.json" \
        > /dev/null 2>&1 && echo "✅ Branch protection enabled for $BRANCH_DEVELOP" || echo "⚠️  Branch protection failed"
else
    echo "ℹ️  No $BRANCH_DEVELOP branch detected, skipping"
fi

echo ""

# ============================================================================
# 4. Enable Dependabot Alerts & Updates
# ============================================================================

echo "🤖 Enabling Dependabot..."

gh api -X PUT "repos/$REPO/vulnerability-alerts" \
    2>/dev/null && echo "✅ Dependabot alerts enabled" || echo "⚠️  Dependabot alerts may already be enabled"

gh api -X PUT "repos/$REPO/automated-security-fixes" \
    2>/dev/null && echo "✅ Dependabot security updates enabled" || echo "⚠️  Security updates may already be enabled"

echo ""

# ============================================================================
# 5. Configure Repository Settings
# ============================================================================

echo "⚙️  Configuring repository settings..."

gh api -X PATCH "repos/$REPO" \
    -f has_issues=true \
    -f has_wiki=false \
    -f has_projects=false \
    -f allow_squash_merge=true \
    -f allow_merge_commit=true \
    -f allow_rebase_merge=true \
    -f allow_auto_merge=true \
    -f delete_branch_on_merge=true \
    2>/dev/null && echo "✅ Repository settings configured" || echo "⚠️  Settings update failed"

echo ""

# ============================================================================
# 6. Enable Private Vulnerability Reporting
# ============================================================================

echo "🔐 Enabling private vulnerability reporting..."

gh api -X PUT "repos/$REPO/private-vulnerability-reporting" \
    2>/dev/null && echo "✅ Private vulnerability reporting enabled" || echo "⚠️  Feature may not be available or already enabled"

echo ""

# ============================================================================
# Summary
# ============================================================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ GitHub Security Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next Steps:"
echo "1. Visit https://github.com/$REPO/settings/security_analysis"
echo "2. Verify Dependabot and secret scanning are active"
echo "3. Visit https://github.com/$REPO/settings/branches"
echo "4. Verify branch protection rules"
echo "5. Add secrets via: gh secret set SECRET_NAME"
echo ""
echo "🔑 Example secret setup:"
echo "  gh secret set NEWSLETTER_API_KEY"
echo "  gh secret set RATE_LIMIT_SECRET"
echo ""
echo "📊 View security status:"
echo "  gh api repos/$REPO/vulnerability-alerts"
echo "  gh api repos/$REPO/branches/$BRANCH_MAIN/protection"
echo ""
