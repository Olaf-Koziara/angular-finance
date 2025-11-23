import { User } from '@prisma/client';
import { prisma } from '../config/database';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
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

export class AuthService {
  async register(data: RegisterInput): Promise<AuthResponse> {
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

    // Generate token
    const token = generateToken(user.id);

    return {
      user: toUserDto(user),
      token,
    };
  }

  async login(data: LoginInput): Promise<AuthResponse> {
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

    // Generate token
    const token = generateToken(user.id);

    return {
      user: toUserDto(user),
      token,
    };
  }

  async getUserById(userId: string): Promise<UserDto | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user ? toUserDto(user) : null;
  }
}

export const authService = new AuthService();
