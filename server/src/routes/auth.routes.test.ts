import request from 'supertest';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from '../routes/auth.routes.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);

function getCookies(response: request.Response): string[] {
  const cookies = response.headers['set-cookie'];
  if (Array.isArray(cookies)) {
    return cookies;
  }
  if (typeof cookies === 'string') {
    return [cookies];
  }
  return [];
}

describe('Auth Routes', () => {
  describe('POST /api/auth/login', () => {
    it('should return 400 if email or password is missing', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email and password are required');
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'wrong@example.com', password: 'wrongpassword' });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid email or password');
    });

    it('should return tokens and user data for valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@example.com', password: 'admin123' });

      expect(response.status).toBe(200);
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe('admin@example.com');
      expect(response.body.user.roles).toContain('admin');

      // Check that refresh token is set in cookie
      const cookies = getCookies(response);
      expect(cookies.length).toBeGreaterThan(0);
      expect(cookies.some((c) => c.includes('refresh_token'))).toBe(true);
      expect(cookies.some((c) => c.includes('access_token'))).toBe(true);
    });
  });

  describe('POST /api/auth/refresh', () => {
    it('should return 401 if no refresh token is provided', async () => {
      const response = await request(app).post('/api/auth/refresh');

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Refresh token required');
    });

    it('should return new tokens when valid refresh token is provided', async () => {
      // First, login to get a valid refresh token
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({ email: 'user@example.com', password: 'user123' });

      const cookies = getCookies(loginResponse);
      const refreshTokenCookie = cookies.find((c) => c.includes('refresh_token')) || '';

      // Now refresh
      const refreshResponse = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', refreshTokenCookie);

      expect(refreshResponse.status).toBe(200);
      expect(refreshResponse.body.accessToken).toBeDefined();
      expect(refreshResponse.body.user).toBeDefined();
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should clear authentication cookies', async () => {
      const response = await request(app).post('/api/auth/logout');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Logged out successfully');

      // Check that cookies are cleared
      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();
    });
  });

  describe('GET /api/auth/me', () => {
    it('should return 401 if not authenticated', async () => {
      const response = await request(app).get('/api/auth/me');

      expect(response.status).toBe(401);
    });

    it('should return user data when authenticated', async () => {
      // First, login to get tokens
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@example.com', password: 'admin123' });

      const accessToken = loginResponse.body.accessToken;

      // Use access token to get user data
      const meResponse = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(meResponse.status).toBe(200);
      expect(meResponse.body.user).toBeDefined();
      expect(meResponse.body.user.email).toBe('admin@example.com');
    });
  });
});
