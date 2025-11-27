import { User } from '@prisma/client';
import { prisma } from '../config/database';
import { hashPassword, comparePassword } from '../utils/password';
import { generateTokenPair, verifyRefreshToken, getRefreshTokenExpirationDate } from '../utils/jwt';
import { ConflictError, AuthenticationError } from '../utils/errors';
import { RegisterInput, LoginInput } from '../validators/auth.validator';
import { AuthResponse, UserDto } from '../types';
import { logger } from '../utils/logger';

// Convert User to UserDto (exclude password)
const toUserDto = (user: User): UserDto => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResult extends AuthResponse {
  refreshToken: string;
}

export class AuthService {
  async register(data: RegisterInput): Promise<AuthResult> {
    logger.info('Registration attempt', { email: data.email });

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
    });

    logger.info('User registered successfully', { userId: user.id });

    // Generate token pair
    const { accessToken, refreshToken, refreshTokenId } = generateTokenPair(user.id);

    // Store refresh token in database
    await this.storeRefreshToken(user.id, refreshTokenId);

    return {
      user: toUserDto(user),
      accessToken,
      refreshToken,
    };
  }

  async login(data: LoginInput): Promise<AuthResult> {
    logger.info('Login attempt', { email: data.email });

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid email or password');
    }

    logger.info('User logged in successfully', { userId: user.id });

    // Generate token pair
    const { accessToken, refreshToken, refreshTokenId } = generateTokenPair(user.id);

    // Store refresh token in database
    await this.storeRefreshToken(user.id, refreshTokenId);

    return {
      user: toUserDto(user),
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<AuthTokens> {
    // Verify the refresh token
    const payload = verifyRefreshToken(refreshToken);
    const { userId, jti: tokenId } = payload;

    // Check if token exists in database and is not revoked
    const storedToken = await prisma.refreshToken.findUnique({
      where: { id: tokenId },
    });

    if (!storedToken) {
      throw new AuthenticationError('Invalid refresh token');
    }

    if (storedToken.revokedAt) {
      // Token reuse detected - revoke all tokens for this user for security
      logger.warn('Refresh token reuse detected', { userId, tokenId });
      await this.revokeAllUserTokens(userId);
      throw new AuthenticationError('Refresh token has been revoked');
    }

    if (storedToken.expiresAt < new Date()) {
      throw new AuthenticationError('Refresh token has expired');
    }

    // Revoke the old refresh token (token rotation)
    await prisma.refreshToken.update({
      where: { id: tokenId },
      data: { revokedAt: new Date() },
    });

    // Generate new token pair
    const { accessToken, refreshToken: newRefreshToken, refreshTokenId } = generateTokenPair(userId);

    // Store the new refresh token
    await this.storeRefreshToken(userId, refreshTokenId);

    logger.info('Tokens refreshed successfully', { userId });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(refreshToken: string): Promise<void> {
    try {
      const payload = verifyRefreshToken(refreshToken);
      const { jti: tokenId, userId } = payload;

      // Revoke the refresh token
      await prisma.refreshToken.updateMany({
        where: { id: tokenId, revokedAt: null },
        data: { revokedAt: new Date() },
      });

      logger.info('User logged out successfully', { userId });
    } catch {
      // Token may be invalid or expired, but logout should still succeed
      logger.info('Logout with invalid/expired token - ignoring');
    }
  }

  async logoutAll(userId: string): Promise<void> {
    await this.revokeAllUserTokens(userId);
    logger.info('All sessions logged out', { userId });
  }

  async getUserById(userId: string): Promise<UserDto | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user ? toUserDto(user) : null;
  }

  private async storeRefreshToken(userId: string, tokenId: string): Promise<void> {
    await prisma.refreshToken.create({
      data: {
        id: tokenId,
        token: tokenId, // Using tokenId as the token value for lookup
        userId,
        expiresAt: getRefreshTokenExpirationDate(),
      },
    });
  }

  private async revokeAllUserTokens(userId: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  // Clean up expired tokens (can be called periodically)
  async cleanupExpiredTokens(): Promise<number> {
    const result = await prisma.refreshToken.deleteMany({
      where: {
        OR: [
          { expiresAt: { lt: new Date() } },
          { revokedAt: { not: null } },
        ],
      },
    });

    logger.info('Cleaned up expired tokens', { count: result.count });
    return result.count;
  }
}

export const authService = new AuthService();
