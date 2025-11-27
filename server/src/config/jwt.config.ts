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

export const jwtConfig = {
  accessTokenSecret: process.env['JWT_ACCESS_SECRET'] || 'access-secret-dev-only-change-in-production',
  refreshTokenSecret: process.env['JWT_REFRESH_SECRET'] || 'refresh-secret-dev-only-change-in-production',
  accessTokenExpiry: '15m' as StringValue,
  refreshTokenExpiry: '7d' as StringValue,
  cookieOptions: {
    httpOnly: true,
    secure: process.env['NODE_ENV'] === 'production',
    sameSite: 'strict' as const,
    path: '/',
  },
};

export const corsConfig = {
  origin: process.env['CORS_ORIGIN'] || 'http://localhost:4200',
  credentials: true,
};
