import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
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

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should not add Authorization header when no token is present', () => {
    httpClient.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('should add Authorization header when token is present', () => {
    // First login to get a token
    authService.login({ email: 'test@example.com', password: 'password' }).subscribe();
    const loginReq = httpMock.expectOne('/api/auth/login');
    loginReq.flush({
      accessToken: 'test-token',
      user: { id: '1', roles: ['user'] },
    });

    // Now make a request that should have the token
    httpClient.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush({});
  });

  it('should set withCredentials to true for API requests', () => {
    httpClient.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    expect(req.request.withCredentials).toBe(true);
    req.flush({});
  });

  it('should not intercept non-API requests', () => {
    httpClient.get('/assets/data.json').subscribe();

    const req = httpMock.expectOne('/assets/data.json');
    expect(req.request.withCredentials).toBe(false);
    req.flush({});
  });

  it('should redirect to unauthorized on 403 error', () => {
    const navigateSpy = spyOn(router, 'navigate');

    httpClient.get('/api/admin').subscribe({
      error: () => {},
    });

    const req = httpMock.expectOne('/api/admin');
    req.flush({ message: 'Forbidden' }, { status: 403, statusText: 'Forbidden' });

    expect(navigateSpy).toHaveBeenCalledWith(['/unauthorized']);
  });

  it('should attempt token refresh on 401 error', () => {
    // First login to get a token
    authService.login({ email: 'test@example.com', password: 'password' }).subscribe();
    const loginReq = httpMock.expectOne('/api/auth/login');
    loginReq.flush({
      accessToken: 'test-token',
      user: { id: '1', roles: ['user'] },
    });

    // Make a request that will fail with 401
    httpClient.get('/api/protected').subscribe();

    // First request fails with 401
    const protectedReq = httpMock.expectOne('/api/protected');
    protectedReq.flush({ message: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });

    // Should trigger a refresh attempt
    const refreshReq = httpMock.expectOne('/api/auth/refresh');
    expect(refreshReq.request.method).toBe('POST');
    refreshReq.flush({
      accessToken: 'new-token',
      user: { id: '1', roles: ['user'] },
    });

    // Should retry the original request with new token
    const retryReq = httpMock.expectOne('/api/protected');
    expect(retryReq.request.headers.get('Authorization')).toBe('Bearer new-token');
    retryReq.flush({ data: 'success' });
  });
});
