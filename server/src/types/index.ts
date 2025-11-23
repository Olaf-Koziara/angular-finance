// Standardized API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

// User Types
export interface UserDto {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterDto {
  email: string;
  password: string;
  name?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: UserDto;
  token: string;
}

// Express Request Extensions
export interface AuthRequest extends Express.Request {
  userId?: string;
}
