import { headers } from "next/headers";

/**
 * Security utilities for input validation, rate limiting, and protection
 * against common web vulnerabilities
 */

/**
 * Email validation using RFC 5322 compliant regex (simplified)
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Sanitize user input to prevent XSS attacks
 * Removes potentially dangerous HTML/script tags
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove < and >
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers like onclick=
    .trim();
}

/**
 * Sanitize email input specifically
 */
export function sanitizeEmail(email: string): string {
  return email
    .toLowerCase()
    .trim()
    .replace(/[^\w.@+-]/g, ""); // Only allow valid email characters
}

/**
 * Simple rate limiting using in-memory storage
 * For production, consider Redis or a dedicated service
 */
class RateLimiter {
  private requests: Map<string, { count: number; resetTime: number }> = new Map();

  /**
   * Check if request is allowed based on IP and limit
   * @param identifier - Usually IP address
   * @param maxRequests - Maximum requests allowed
   * @param windowMs - Time window in milliseconds
   */
  check(identifier: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const record = this.requests.get(identifier);

    // Clean up old records periodically
    if (this.requests.size > 10000) {
      this.cleanup();
    }

    if (!record || now > record.resetTime) {
      // First request or window expired
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + windowMs,
      });
      return true;
    }

    if (record.count >= maxRequests) {
      // Rate limit exceeded
      return false;
    }

    // Increment count
    record.count++;
    return true;
  }

  /**
   * Clean up expired records
   */
  private cleanup() {
    const now = Date.now();
    for (const [key, value] of this.requests.entries()) {
      if (now > value.resetTime) {
        this.requests.delete(key);
      }
    }
  }

  /**
   * Get remaining requests for identifier
   */
  getRemaining(identifier: string, maxRequests: number): number {
    const record = this.requests.get(identifier);
    if (!record || Date.now() > record.resetTime) {
      return maxRequests;
    }
    return Math.max(0, maxRequests - record.count);
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter();

/**
 * Get client IP address from request headers
 * Handles various proxy headers
 */
export async function getClientIp(): Promise<string> {
  const headersList = await headers();

  // Check common proxy headers
  const forwarded = headersList.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = headersList.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Fallback to remote address
  return headersList.get("x-vercel-forwarded-for") || "unknown";
}

/**
 * Rate limit configuration presets
 */
export const RateLimitPresets = {
  // Newsletter signup: 3 requests per hour per IP
  NEWSLETTER_SIGNUP: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  // API routes: 100 requests per minute
  API_GENERAL: {
    maxRequests: 100,
    windowMs: 60 * 1000, // 1 minute
  },
  // Contact form: 5 requests per hour
  CONTACT_FORM: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
} as const;

/**
 * Honeypot field validation
 * Add a hidden field to forms that bots will fill but humans won't see
 */
export function isHoneypotFilled(honeypotValue: string | undefined): boolean {
  return !!honeypotValue && honeypotValue.length > 0;
}

/**
 * Check if origin matches allowed domains
 * Useful for CORS validation
 */
export function isAllowedOrigin(origin: string | null, allowedOrigins: string[]): boolean {
  if (!origin) return false;
  return allowedOrigins.some((allowed) => {
    if (allowed === "*") return true;
    if (allowed.includes("*")) {
      const regex = new RegExp("^" + allowed.replace("*", ".*") + "$");
      return regex.test(origin);
    }
    return origin === allowed;
  });
}

/**
 * Generate CORS headers for API routes
 */
export function getCorsHeaders(origin: string | null, allowedOrigins: string[]): HeadersInit {
  if (!origin || !isAllowedOrigin(origin, allowedOrigins)) {
    return {};
  }

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400", // 24 hours
  };
}

/**
 * Validate URL to prevent open redirect vulnerabilities
 */
export function isValidRedirectUrl(url: string, allowedDomains: string[]): boolean {
  try {
    const parsed = new URL(url);

    // Only allow http/https
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return false;
    }

    // Check if domain is in allowed list
    return allowedDomains.some((domain) => {
      if (domain.startsWith("*.")) {
        const baseDomain = domain.slice(2);
        return parsed.hostname.endsWith(baseDomain);
      }
      return parsed.hostname === domain;
    });
  } catch {
    return false;
  }
}

/**
 * Generate a simple CSRF token (for demonstration)
 * For production, use a proper CSRF protection library
 */
export function generateCsrfToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
