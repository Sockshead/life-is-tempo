# Security Policy

## Supported Versions

We take security seriously and actively maintain the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in Life Is Tempo, please report it responsibly:

### Where to Report

1. **Preferred**: Use GitHub's private security advisory feature
   - Navigate to the [Security tab](https://github.com/juancmandev/life-is-tempo/security)
   - Click "Report a vulnerability"
   - Fill in the details of the vulnerability

2. **Alternative**: Email security concerns to `security@lifeistempo.com`
   - Include "SECURITY" in the subject line
   - Provide detailed information about the vulnerability

### What to Include

When reporting a vulnerability, please include:

- **Description**: Clear explanation of the vulnerability
- **Impact**: Potential security implications
- **Steps to Reproduce**: Detailed reproduction steps
- **Affected Versions**: Which versions are impacted
- **Suggested Fix**: If you have recommendations (optional)
- **Proof of Concept**: Code or screenshots (if applicable)

### Response Timeline

- **Initial Response**: Within 48 hours of report
- **Status Update**: Within 7 days with assessment
- **Fix Timeline**: Critical issues within 14 days, others within 30 days
- **Disclosure**: After fix is deployed and users have time to update

## Security Best Practices

### For Contributors

- Never commit secrets, API keys, or credentials to the repository
- Use `.env.local` for local development (never commit this file)
- Run `pnpm audit` before submitting pull requests
- Follow secure coding practices (input validation, sanitization, etc.)
- Keep dependencies up to date

### For Users

- Always use the latest stable version
- Keep your dependencies updated (`pnpm update`)
- Use strong, unique API keys for production deployments
- Enable security features in your hosting environment (HTTPS, security headers)
- Monitor Dependabot alerts in the repository

## Security Features

This project implements the following security measures:

### Infrastructure
- Comprehensive security headers (CSP, HSTS, X-Frame-Options, etc.)
- Environment variable validation at build time
- Automated dependency vulnerability scanning via Dependabot

### Application Security
- Input validation and sanitization
- Email validation for newsletter signups
- Rate limiting on API routes
- Double opt-in for newsletter subscriptions
- Protection against common web vulnerabilities (XSS, CSRF, SQL injection)

### Development Security
- Secrets excluded from version control
- Pre-commit hooks (planned)
- Automated security audits in CI/CD (planned)

## Known Security Considerations

### Third-Party Integrations
- Google Analytics: Only used for anonymous analytics
- Newsletter Service: Email addresses stored securely with service provider
- Affiliate Links: No user data shared with affiliate programs

### Data Handling
- Minimal user data collection (email for newsletter only)
- No authentication or user accounts
- No payment processing (affiliate income only)
- No sensitive personal information stored

## Security Updates

Security updates are released as needed and announced via:
- GitHub Security Advisories
- Release notes
- Project README

## Acknowledgments

We appreciate the security research community and will acknowledge responsible disclosure in our release notes (with permission).

## Contact

For security concerns: `security@lifeistempo.com`
For general questions: [GitHub Issues](https://github.com/juancmandev/life-is-tempo/issues)

---

**Last Updated**: 2026-02-11
