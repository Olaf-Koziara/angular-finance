import type { StringValue } from 'ms';

/**
 * JWT Configuration
 *
 * Security best practices:
 * - Use environment variables for secrets in production
 * - Use separate secrets for access and refresh tokens
 * - Keep access tokens short-lived (15 minutes)
 * - Keep refresh tokens longer but still limited (7 days)
 */

const isProduction = process.env['NODE_ENV'] === 'production';
const DEFAULT_ACCESS_SECRET = 'access-secret-dev-only-change-in-production';
const DEFAULT_REFRESH_SECRET = 'refresh-secret-dev-only-change-in-production';

// Validate that production secrets are set
const accessSecret = process.env['JWT_ACCESS_SECRET'] || DEFAULT_ACCESS_SECRET;
const refreshSecret = process.env['JWT_REFRESH_SECRET'] || DEFAULT_REFRESH_SECRET;

if (isProduction) {
  if (accessSecret === DEFAULT_ACCESS_SECRET || refreshSecret === DEFAULT_REFRESH_SECRET) {
    throw new Error(
      'JWT_ACCESS_SECRET and JWT_REFRESH_SECRET environment variables must be set in production'
    );
  }
}

// Token expiry times in milliseconds for cookie maxAge
export const ACCESS_TOKEN_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes
export const REFRESH_TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export const jwtConfig = {
  accessTokenSecret: accessSecret,
  refreshTokenSecret: refreshSecret,
  accessTokenExpiry: '15m' as StringValue,
  refreshTokenExpiry: '7d' as StringValue,
  cookieOptions: {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict' as const,
    path: '/',
  },
};

export const corsConfig = {
  origin: process.env['CORS_ORIGIN'] || 'http://localhost:4200',
  credentials: true,
};
