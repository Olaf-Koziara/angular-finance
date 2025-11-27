import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { AuthService, AuthResponse } from './auth.service';
import { authInterceptor } from './auth.interceptor';
import { provideZonelessChangeDetection } from '@angular/core';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockAuthResponse: AuthResponse = {
    accessToken: 'mock-access-token',
    user: {
      id: '1',
      email: 'test@example.com',
      roles: ['user'],
      displayName: 'Test User',
    },
  };

  beforeEach(() => {
    // Clear sessionStorage before each test
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear();
    }

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        provideRouter([
          { path: 'login', component: {} as any },
          { path: 'unauthorized', component: {} as any },
        ]),
        AuthService,
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('login', () => {
    it('should send login request and store session data', () => {
      const credentials = { email: 'test@example.com', password: 'password123' };
      let result: AuthResponse | undefined;

      service.login(credentials).subscribe((response) => {
        result = response;
      });

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(credentials);
      expect(req.request.withCredentials).toBe(true);
      req.flush(mockAuthResponse);

      expect(result).toEqual(mockAuthResponse);
      expect(service.getToken()).toBe('mock-access-token');
      expect(service.getUserSnapshot()).toEqual(mockAuthResponse.user);
      expect(service.isAuthenticated()).toBe(true);
    });

    it('should clear session on login error', () => {
      const credentials = { email: 'test@example.com', password: 'wrong' };
      let error: any;

      service.login(credentials).subscribe({
        error: (err) => {
          error = err;
        },
      });

      const req = httpMock.expectOne('/api/auth/login');
      req.flush({ message: 'Invalid credentials' }, { status: 401, statusText: 'Unauthorized' });

      expect(error).toBeDefined();
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('refreshToken', () => {
    it('should refresh token and update session', () => {
      let result: AuthResponse | undefined;

      service.refreshToken().subscribe((response) => {
        result = response;
      });

      const req = httpMock.expectOne('/api/auth/refresh');
      expect(req.request.method).toBe('POST');
      expect(req.request.withCredentials).toBe(true);
      req.flush(mockAuthResponse);

      expect(result).toEqual(mockAuthResponse);
      expect(service.getToken()).toBe('mock-access-token');
    });
  });

  describe('hasRole', () => {
    it('should return true if user has the role', () => {
      service.login({ email: 'test@example.com', password: 'password' }).subscribe();

      const req = httpMock.expectOne('/api/auth/login');
      req.flush({
        accessToken: 'token',
        user: { id: '1', roles: ['admin', 'user'] },
      });

      expect(service.hasRole('admin')).toBe(true);
      expect(service.hasRole('user')).toBe(true);
    });

    it('should return false if user does not have the role', () => {
      service.login({ email: 'test@example.com', password: 'password' }).subscribe();

      const req = httpMock.expectOne('/api/auth/login');
      req.flush({
        accessToken: 'token',
        user: { id: '1', roles: ['user'] },
      });

      expect(service.hasRole('admin')).toBe(false);
    });

    it('should return false when not authenticated', () => {
      expect(service.hasRole('admin')).toBe(false);
    });
  });

  describe('user$', () => {
    it('should emit null initially when not authenticated', (done) => {
      service.user$.subscribe((user) => {
        expect(user).toBeNull();
        done();
      });
    });

    it('should emit user after login', () => {
      const users: any[] = [];

      service.user$.subscribe((user) => {
        users.push(user);
      });

      service.login({ email: 'test@example.com', password: 'password' }).subscribe();

      const req = httpMock.expectOne('/api/auth/login');
      req.flush(mockAuthResponse);

      expect(users.length).toBe(2);
      expect(users[0]).toBeNull();
      expect(users[1]).toEqual(mockAuthResponse.user);
    });
  });
});
