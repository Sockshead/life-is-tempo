import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Environment variable validation and type safety
 *
 * This file validates environment variables at build time and provides
 * type-safe access throughout the application.
 *
 * @see https://env.t3.gg/docs/nextjs
 */
export const env = createEnv({
  /**
   * Server-side environment variables
   * Never exposed to the client
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

    // Newsletter
    NEWSLETTER_API_KEY: z.string().optional(),
    NEWSLETTER_AUDIENCE_ID: z.string().optional(),

    // Security
    RATE_LIMIT_SECRET: z.string().optional(),

    // AI Services (Future)
    OPENAI_API_KEY: z.string().optional(),
    ANTHROPIC_API_KEY: z.string().optional(),

    // Affiliate (Future)
    AMAZON_ASSOCIATE_ID: z.string().optional(),
    AFFILIATE_TRACKING_SECRET: z.string().optional(),
  },

  /**
   * Client-side environment variables
   * Must be prefixed with NEXT_PUBLIC_
   */
  client: {
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
    NEXT_PUBLIC_VERCEL_ANALYTICS_ID: z.string().optional(),
  },

  /**
   * Runtime environment variables
   * Used for validation
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    // Server
    NEWSLETTER_API_KEY: process.env.NEWSLETTER_API_KEY,
    NEWSLETTER_AUDIENCE_ID: process.env.NEWSLETTER_AUDIENCE_ID,
    RATE_LIMIT_SECRET: process.env.RATE_LIMIT_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    AMAZON_ASSOCIATE_ID: process.env.AMAZON_ASSOCIATE_ID,
    AFFILIATE_TRACKING_SECRET: process.env.AFFILIATE_TRACKING_SECRET,

    // Client
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_VERCEL_ANALYTICS_ID: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID,
  },

  /**
   * Skip validation in certain environments
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Makes it so empty strings are treated as undefined
   */
  emptyStringAsUndefined: true,
});
