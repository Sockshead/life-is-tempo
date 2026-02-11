# Life Is Tempo

A personal blog and newsletter platform focused on productivity, time management, and building a fulfilling life.

## Features

- 🌍 Multi-language support (English, Spanish)
- 📝 MDX-powered blog with rich content
- 📧 Newsletter integration
- 🎨 Modern, responsive design with Tailwind CSS
- 🔒 Security-first architecture
- ⚡ Built with Next.js 16 and React 19

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/juancmandev/life-is-tempo.git
cd life-is-tempo
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Environment Setup

This project uses environment variables for configuration. See `.env.example` for all available options.

**Required variables:**
- None for basic development

**Optional variables:**
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics tracking ID
- `NEWSLETTER_API_KEY` - Newsletter service API key
- `NEWSLETTER_AUDIENCE_ID` - Newsletter list ID

See [.env.example](./.env.example) for the complete list.

## Security

We take security seriously. This project implements:

- ✅ Comprehensive security headers (CSP, HSTS, X-Frame-Options)
- ✅ Environment variable validation at build time
- ✅ Automated dependency vulnerability scanning
- ✅ Input validation and sanitization
- ✅ Rate limiting on API routes

See [SECURITY.md](./SECURITY.md) for:
- How to report security vulnerabilities
- Security best practices
- Supported versions

## Development

### Project Structure

```
life-is-tempo/
├── app/                  # Next.js App Router pages
├── components/           # React components
├── lib/                  # Utilities and helpers
│   ├── env.ts           # Environment validation
│   └── security.ts      # Security utilities
├── messages/            # i18n translations
├── public/              # Static assets
└── content/             # MDX blog posts (future)
```

### Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm security-check` - Check for dependency vulnerabilities

### Code Style

This project uses:
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting (planned)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **Content**: MDX
- **Internationalization**: next-intl
- **Type Safety**: TypeScript, Zod
- **Security**: @t3-oss/env-nextjs

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy!

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for other platforms.

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please run `pnpm audit` before submitting PRs.

## License

This project is open source and available under the [MIT License](./LICENSE).

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js GitHub repository](https://github.com/vercel/next.js)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/)

## Contact

- Website: [lifeistempo.com](https://lifeistempo.com)
- Email: security@lifeistempo.com (for security concerns)
- GitHub: [@juancmandev](https://github.com/juancmandev)

---

Built with ❤️ by Juan Carlos Martínez
