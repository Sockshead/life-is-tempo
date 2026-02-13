import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const getBasePath = () => {
  if (process.env.NEXT_PUBLIC_BASE_PATH !== undefined) {
    return process.env.NEXT_PUBLIC_BASE_PATH;
  }
  return '';
};

const nextConfig: NextConfig = {
  output: process.env.NEXT_OUTPUT_EXPORT === 'true' ? 'export' : undefined,
  basePath: getBasePath(),
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
