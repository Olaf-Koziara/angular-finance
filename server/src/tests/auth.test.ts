import request from 'supertest';
import { createApp } from '../app';
import { prisma } from '../config/database';

const app = createApp();

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    // Clean up test database before tests
    await prisma.refreshToken.deleteMany({});
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    // Clean up test database after tests
    await prisma.refreshToken.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'Test1234',
        name: 'Test User',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('accessToken');
      expect(response.body.data.user.email).toBe(userData.email);
      expect(response.body.data.user.name).toBe(userData.name);
      expect(response.body.data.user).not.toHaveProperty('password');
      // Refresh token should be in HttpOnly cookie, not in response body
      expect(response.body.data).not.toHaveProperty('refreshToken');
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should fail with invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'Test1234',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toHaveProperty('email');
    });

    it('should fail with weak password', async () => {
      const userData = {
        email: 'test2@example.com',
        password: 'weak',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toHaveProperty('password');
    });

    it('should fail with duplicate email', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'Test1234',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'Test1234',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('accessToken');
      expect(response.body.data.user.email).toBe(credentials.email);
      // Refresh token should be in HttpOnly cookie
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should fail with invalid email', async () => {
      const credentials = {
        email: 'nonexistent@example.com',
        password: 'Test1234',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Invalid');
    });

    it('should fail with invalid password', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'WrongPassword123',
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Invalid');
    });
  });

  describe('GET /api/auth/profile', () => {
    let authToken: string;

    beforeAll(async () => {
      // Login to get token
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Test1234',
        });

      authToken = response.body.data.accessToken;
    });

    it('should get profile with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('email');
      expect(response.body.data.email).toBe('test@example.com');
    });

    it('should fail without token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should fail with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/refresh', () => {
    let refreshTokenCookie: string;

    beforeAll(async () => {
      // Login to get refresh token cookie
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Test1234',
        });

      const rawCookies = response.headers["set-cookie"];
      const cookies = Array.isArray(rawCookies)
        ? rawCookies
        : rawCookies
          ? [rawCookies]
          : [];
      refreshTokenCookie = cookies.find((cookie: string) =>
        cookie.startsWith("refresh_token=")
      ) || "";
    });

    it('should refresh tokens with valid refresh token cookie', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', refreshTokenCookie)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Token refreshed successfully');
      expect(response.body.data).toHaveProperty('accessToken');
      // New refresh token should be set in cookie
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should fail without refresh token cookie', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Refresh token not provided');
    });
  });

  describe('POST /api/auth/logout', () => {
    let refreshTokenCookie: string;

    beforeAll(async () => {
      // Login to get refresh token cookie
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Test1234',
        });

      const rawCookies = response.headers["set-cookie"];
      const cookies = Array.isArray(rawCookies)
        ? rawCookies
        : rawCookies
          ? [rawCookies]
          : [];
      refreshTokenCookie = cookies.find((cookie: string) =>
        cookie.startsWith("refresh_token=")
      ) || "";
    });

    it('should logout successfully', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .set('Cookie', refreshTokenCookie)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Logged out successfully');
      // Cookie should be cleared
      const rawCookies = response.headers["set-cookie"];
      const cookies = Array.isArray(rawCookies)
        ? rawCookies
        : rawCookies
          ? [rawCookies]
          : [];
      expect(cookies.some((c: string) => c.includes("refresh_token=;"))).toBe(true);
    });

    it('should succeed even without refresh token cookie', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe('GET /api/health', () => {
    it('should return health check', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Server is running');
    });
  });
});
