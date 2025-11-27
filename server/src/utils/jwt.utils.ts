import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.config.js';

export interface TokenPayload {
  userId: string;
  email: string;
  roles: string[];
}

export interface DecodedToken extends JwtPayload, TokenPayload {}

/**
 * Generates an access token with short expiry for API requests.
 * Access tokens are meant to be used for authenticating API calls.
 */
export function generateAccessToken(payload: TokenPayload): string {
  const options: SignOptions = {
    expiresIn: jwtConfig.accessTokenExpiry,
    algorithm: 'HS256',
  };
  return jwt.sign(payload, jwtConfig.accessTokenSecret, options);
}

/**
 * Generates a refresh token with longer expiry for token rotation.
 * Refresh tokens are stored in HttpOnly cookies and used to obtain new access tokens.
 */
export function generateRefreshToken(payload: TokenPayload): string {
  const options: SignOptions = {
    expiresIn: jwtConfig.refreshTokenExpiry,
    algorithm: 'HS256',
  };
  return jwt.sign(payload, jwtConfig.refreshTokenSecret, options);
}

/**
 * Verifies and decodes an access token.
 * Returns null if token is invalid or expired.
 */
export function verifyAccessToken(token: string): DecodedToken | null {
  try {
    return jwt.verify(token, jwtConfig.accessTokenSecret) as DecodedToken;
  } catch {
    return null;
  }
}

/**
 * Verifies and decodes a refresh token.
 * Returns null if token is invalid or expired.
 */
export function verifyRefreshToken(token: string): DecodedToken | null {
  try {
    return jwt.verify(token, jwtConfig.refreshTokenSecret) as DecodedToken;
  } catch {
    return null;
  }
}

/**
 * Generates a new token pair (access + refresh).
 * Used during login and token refresh operations.
 */
export function generateTokenPair(payload: TokenPayload): { accessToken: string; refreshToken: string } {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
}
