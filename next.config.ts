import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/**
 * Content Security Policy
 * Defines trusted sources for content loaded by the application
 */
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' *.googletagmanager.com;
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  font-src 'self' fonts.gstatic.com;
  img-src 'self' data: blob: *.googletagmanager.com *.google-analytics.com;
  connect-src 'self' *.googletagmanager.com *.google-analytics.com *.vercel-insights.com;
  frame-ancestors 'self';
  base-uri 'self';
  form-action 'self';
`;

/**
 * Security headers configuration
 * Applied to all routes in the application
 */
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

// Add CSP in production only (development needs relaxed CSP for hot reload)
if (process.env.NODE_ENV === "production") {
  securityHeaders.push({
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  });
}

const nextConfig: NextConfig = {
  output: "export", // Enable static HTML export for GitHub Pages
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Note: headers() is not supported with static export
  // Security headers should be configured at the hosting level (e.g., GitHub Pages custom domain)
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withNextIntl(withMDX(nextConfig));
