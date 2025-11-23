import dotenv from 'dotenv';

dotenv.config();

// Environment Constants
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = parseInt(process.env.PORT || '3000', 10);
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:4200';

// Validation
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

export const config = {
  NODE_ENV,
  PORT,
  DATABASE_URL: DATABASE_URL as string,
  JWT_SECRET: JWT_SECRET as string,
  JWT_EXPIRES_IN,
  CORS_ORIGIN,
  IS_PRODUCTION: NODE_ENV === 'production',
  IS_DEVELOPMENT: NODE_ENV === 'development',
};
