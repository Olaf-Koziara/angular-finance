import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { config } from '../config';
import { AuthenticationError } from './errors';
import { logger } from './logger';

export interface JwtPayload {
  userId: string;
  type?: 'access' | 'refresh';
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * Generate an access token (short-lived, used for API requests)
 */
export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId, type: 'access' }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  } as jwt.SignOptions);
};

/**
 * Generate a refresh token (long-lived, used to obtain new access tokens)
 * Returns both the JWT and a unique token ID for database storage
 */
export const generateRefreshToken = (userId: string): { token: string; tokenId: string } => {
  const tokenId = crypto.randomUUID();
  const token = jwt.sign(
    { userId, type: 'refresh', jti: tokenId },
    config.JWT_REFRESH_SECRET,
    {
      expiresIn: config.JWT_REFRESH_EXPIRES_IN,
    } as jwt.SignOptions
  );
  return { token, tokenId };
};

/**
 * Generate both access and refresh tokens
 */
export const generateTokenPair = (userId: string): { accessToken: string; refreshToken: string; refreshTokenId: string } => {
  const accessToken = generateAccessToken(userId);
  const { token: refreshToken, tokenId: refreshTokenId } = generateRefreshToken(userId);
  return { accessToken, refreshToken, refreshTokenId };
};

/**
 * Verify an access token
 */
export const verifyAccessToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AuthenticationError('Access token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthenticationError('Invalid access token');
    }
    throw new AuthenticationError('Token verification failed');
  }
};

/**
 * Verify a refresh token
 */
export const verifyRefreshToken = (token: string): JwtPayload & { jti: string } => {
  try {
    const decoded = jwt.verify(token, config.JWT_REFRESH_SECRET) as JwtPayload & { jti: string };
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AuthenticationError('Refresh token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthenticationError('Invalid refresh token');
    }
    throw new AuthenticationError('Refresh token verification failed');
  }
};

/**
 * Get refresh token expiration date
 */
export const getRefreshTokenExpirationDate = (): Date => {
  const expiresIn = config.JWT_REFRESH_EXPIRES_IN;
  const ms = parseExpiration(expiresIn);
  return new Date(Date.now() + ms);
};

/**
 * Parse expiration string to milliseconds
 */
function parseExpiration(exp: string): number {
  const match = exp.match(/^(\d+)([smhd])$/);
  if (!match) {
    // Log warning about invalid format and use default
    logger.warn(`Invalid expiration format "${exp}", using default of 7 days`);
    return 7 * 24 * 60 * 60 * 1000;
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 's':
      return value * 1000;
    case 'm':
      return value * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    case 'd':
      return value * 24 * 60 * 60 * 1000;
    default:
      return 7 * 24 * 60 * 60 * 1000;
  }
}

// Legacy function for backward compatibility with existing code
export const generateToken = generateAccessToken;
export const verifyToken = verifyAccessToken;
