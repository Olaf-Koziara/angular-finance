import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { AuthService, AuthenticatedUser } from '../../auth/services/auth.service';
import { Settings, SettingsResponse } from '../models/settings.model';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userSubject: BehaviorSubject<AuthenticatedUser | null>;

  const DEFAULT_SETTINGS: Settings = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    theme: 'light',
    currency: 'USD',
  };

  const mockUser: AuthenticatedUser = {
    id: 'user-1',
    email: 'test@example.com',
    name: 'Test User',
  };

  const mockUser2: AuthenticatedUser = {
    id: 'user-2',
    email: 'test2@example.com',
    name: 'Test User 2',
  };

  beforeEach(() => {
    userSubject = new BehaviorSubject<AuthenticatedUser | null>(null);

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'patch']);
    authServiceSpy = jasmine.createSpyObj(
      'AuthService',
      ['getUserSnapshot', 'isAuthenticated'],
      {
        user$: userSubject.asObservable(),
      }
    );

    TestBed.configureTestingModule({
      providers: [
        SettingsService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    authServiceSpy.getUserSnapshot.and.returnValue(null);
    authServiceSpy.isAuthenticated.and.returnValue(false);
  });

  it('should be created', () => {
    service = TestBed.inject(SettingsService);
    expect(service).toBeTruthy();
  });

  describe('Initial State', () => {
    beforeEach(() => {
      service = TestBed.inject(SettingsService);
    });

    it('should initialize with default settings', () => {
      expect(service.settings()).toEqual(DEFAULT_SETTINGS);
    });

    it('should have computed background signal', () => {
      expect(service.background()).toBe(DEFAULT_SETTINGS.background);
    });

    it('should have computed theme signal', () => {
      expect(service.theme()).toBe(DEFAULT_SETTINGS.theme);
    });

    it('should have computed currency signal', () => {
      expect(service.currency()).toBe(DEFAULT_SETTINGS.currency);
    });

    it('should update computed signals when settings change', () => {
      const newBackground = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      service.settings.update((s) => ({ ...s, background: newBackground }));

      expect(service.background()).toBe(newBackground);
      expect(service.theme()).toBe(DEFAULT_SETTINGS.theme);
      expect(service.currency()).toBe(DEFAULT_SETTINGS.currency);
    });
  });

  describe('Effect - User Changes', () => {
    beforeEach(() => {
      authServiceSpy.getUserSnapshot.and.returnValue(null);
      service = TestBed.inject(SettingsService);
    });

    it('should reset to default settings when user becomes null', (done) => {
      // Set initial user
      authServiceSpy.getUserSnapshot.and.returnValue(mockUser);
      authServiceSpy.isAuthenticated.and.returnValue(true);
      httpClientSpy.get.and.returnValue(
        of<SettingsResponse>({
          success: true,
          data: { background: 'custom-bg', theme: 'dark', currency: 'EUR' },
          message: 'Success',
        })
      );

      // Create new service instance with user
      const newService = TestBed.inject(SettingsService);
      userSubject.next(mockUser);

      setTimeout(() => {
        expect(newService.settings().background).toBe('custom-bg');

        // User becomes null
        userSubject.next(null);

        setTimeout(() => {
          expect(newService.settings()).toEqual(DEFAULT_SETTINGS);
          done();
        }, 100);
      }, 100);
    });

    it('should fetch settings when user changes', (done) => {
      const mockSettings: SettingsResponse = {
        success: true,
        data: { background: 'new-bg', theme: 'dark', currency: 'GBP' },
        message: 'Success',
      };

      authServiceSpy.getUserSnapshot.and.returnValue(mockUser);
      authServiceSpy.isAuthenticated.and.returnValue(true);
      httpClientSpy.get.and.returnValue(of(mockSettings));

      const newService = TestBed.inject(SettingsService);
      userSubject.next(mockUser);

      setTimeout(() => {
        expect(httpClientSpy.get).toHaveBeenCalledWith('/settings');
        expect(newService.settings().background).toBe('new-bg');
        expect(newService.settings().theme).toBe('dark');
        expect(newService.settings().currency).toBe('GBP');
        done();
      }, 100);
    });

    it('should not fetch settings when same user is set again', (done) => {
      const mockSettings: SettingsResponse = {
        success: true,
        data: { background: 'initial-bg' },
        message: 'Success',
      };

      authServiceSpy.getUserSnapshot.and.returnValue(mockUser);
      authServiceSpy.isAuthenticated.and.returnValue(true);
      httpClientSpy.get.and.returnValue(of(mockSettings));

      const newService = TestBed.inject(SettingsService);
      userSubject.next(mockUser);

      setTimeout(() => {
        const callCount = httpClientSpy.get.calls.count();
        expect(callCount).toBe(1);

        // Set same user again
        userSubject.next(mockUser);

        setTimeout(() => {
          expect(httpClientSpy.get.calls.count()).toBe(1);
          done();
        }, 100);
      }, 100);
    });

    it('should fetch settings when different user is set', (done) => {
      const mockSettings1: SettingsResponse = {
        success: true,
        data: { background: 'user1-bg' },
        message: 'Success',
      };

      const mockSettings2: SettingsResponse = {
        success: true,
        data: { background: 'user2-bg' },
        message: 'Success',
      };

      authServiceSpy.getUserSnapshot.and.returnValue(mockUser);
      authServiceSpy.isAuthenticated.and.returnValue(true);
      httpClientSpy.get.and.returnValues(of(mockSettings1), of(mockSettings2));

      const newService = TestBed.inject(SettingsService);
      userSubject.next(mockUser);

      setTimeout(() => {
        expect(newService.settings().background).toBe('user1-bg');

        // Set different user
        userSubject.next(mockUser2);

        setTimeout(() => {
          expect(httpClientSpy.get.calls.count()).toBe(2);
          expect(newService.settings().background).toBe('user2-bg');
          done();
        }, 100);
      }, 100);
    });
  });

  describe('fetchSettings', () => {
    beforeEach(() => {
      service = TestBed.inject(SettingsService);
    });

    it('should set default settings when not authenticated', () => {
      authServiceSpy.isAuthenticated.and.returnValue(false);
      // Access private method through effect or test indirectly
      userSubject.next(mockUser);

      // Since not authenticated, should use defaults
      expect(service.settings()).toEqual(DEFAULT_SETTINGS);
    });

    it('should fetch and set settings successfully', (done) => {
      const mockSettings: SettingsResponse = {
        success: true,
        data: {
          background: 'fetched-bg',
          theme: 'dark',
          currency: 'EUR',
        },
        message: 'Success',
      };

      authServiceSpy.getUserSnapshot.and.returnValue(mockUser);
      authServiceSpy.isAuthenticated.and.returnValue(true);
      httpClientSpy.get.and.returnValue(of(mockSettings));

      userSubject.next(mockUser);

      setTimeout(() => {
        expect(httpClientSpy.get).toHaveBeenCalledWith('/settings');
        expect(service.settings().background).toBe('fetched-bg');
        expect(service.settings().theme).toBe('dark');
        expect(service.settings().currency).toBe('EUR');
        done();
      }, 100);
    });

    it('should handle partial settings and normalize with defaults', (done) => {
      const mockSettings: SettingsResponse = {
        success: true,
        data: {
          background: 'partial-bg',
          // theme and currency missing
        },
        message: 'Success',
      };

      authServiceSpy.getUserSnapshot.and.returnValue(mockUser);
      authServiceSpy.isAuthenticated.and.returnValue(true);
      httpClientSpy.get.and.returnValue(of(mockSettings));

      userSubject.next(mockUser);

      setTimeout(() => {
        expect(service.settings().background).toBe('partial-bg');
        expect(service.settings().theme).toBe(DEFAULT_SETTINGS.theme);
        expect(service.settings().currency).toBe(DEFAULT_SETTINGS.currency);
        done();
      }, 100);
    });

    it('should handle null/undefined settings response', (done) => {
      const mockSettings: SettingsResponse = {
        success: true,
        data: null as any,
        message: 'Success',
      };

      authServiceSpy.getUserSnapshot.and.returnValue(mockUser);
      authServiceSpy.isAuthenticated.and.returnValue(true);
      httpClientSpy.get.and.returnValue(of(mockSettings));

      userSubject.next(mockUser);

      setTimeout(() => {
        expect(service.settings()).toEqual(DEFAULT_SETTINGS);
        done();
      }, 100);
    });

    it('should fallback to defaults on HTTP error', (done) => {
      authServiceSpy.getUserSnapshot.and.returnValue(mockUser);
      authServiceSpy.isAuthenticated.and.returnValue(true);
      httpClientSpy.get.and.returnValue(throwError(() => new Error('Network error')));

      userSubject.next(mockUser);

      setTimeout(() => {
        expect(service.settings()).toEqual(DEFAULT_SETTINGS);
        done();
      }, 100);
    });
  });

  describe('updateSetting', () => {
    beforeEach(() => {
      service = TestBed.inject(SettingsService);
    });

    it('should update local signal immediately', () => {
      const newBackground = 'updated-bg';
      service.updateSetting('background', newBackground);

      expect(service.settings().background).toBe(newBackground);
      expect(service.background()).toBe(newBackground);
    });

    it('should update theme setting', () => {
      service.updateSetting('theme', 'dark');
      expect(service.settings().theme).toBe('dark');
      expect(service.theme()).toBe('dark');
    });

    it('should update currency setting', () => {
      service.updateSetting('currency', 'EUR');
      expect(service.settings().currency).toBe('EUR');
      expect(service.currency()).toBe('EUR');
    });

    it('should preserve other settings when updating one', () => {
      const originalTheme = service.settings().theme;
      const originalCurrency = service.settings().currency;

      service.updateSetting('background', 'new-bg');

      expect(service.settings().background).toBe('new-bg');
      expect(service.settings().theme).toBe(originalTheme);
      expect(service.settings().currency).toBe(originalCurrency);
    });

    it('should not make HTTP call when not authenticated', () => {
      authServiceSpy.isAuthenticated.and.returnValue(false);

      service.updateSetting('background', 'new-bg');

      expect(httpClientSpy.patch).not.toHaveBeenCalled();
      expect(service.settings().background).toBe('new-bg');
    });

    it('should make HTTP call when authenticated', () => {
      authServiceSpy.isAuthenticated.and.returnValue(true);
      httpClientSpy.patch.and.returnValue(of({}));

      service.updateSetting('background', 'new-bg');

      expect(httpClientSpy.patch).toHaveBeenCalledWith('/settings/background', {
        value: 'new-bg',
      });
    });

    it('should make HTTP call for theme update', () => {
      authServiceSpy.isAuthenticated.and.returnValue(true);
      httpClientSpy.patch.and.returnValue(of({}));

      service.updateSetting('theme', 'dark');

      expect(httpClientSpy.patch).toHaveBeenCalledWith('/settings/theme', {
        value: 'dark',
      });
    });

    it('should make HTTP call for currency update', () => {
      authServiceSpy.isAuthenticated.and.returnValue(true);
      httpClientSpy.patch.and.returnValue(of({}));

      service.updateSetting('currency', 'GBP');

      expect(httpClientSpy.patch).toHaveBeenCalledWith('/settings/currency', {
        value: 'GBP',
      });
    });

    it('should handle HTTP error gracefully', () => {
      authServiceSpy.isAuthenticated.and.returnValue(true);
      httpClientSpy.patch.and.returnValue(throwError(() => new Error('Network error')));

      service.updateSetting('background', 'new-bg');

      // Should not throw, local signal should still be updated
      expect(service.settings().background).toBe('new-bg');
      expect(httpClientSpy.patch).toHaveBeenCalled();
    });
  });

  describe('normalizeSettings', () => {
    beforeEach(() => {
      service = TestBed.inject(SettingsService);
    });

    it('should normalize partial settings with defaults', (done) => {
      const mockSettings: SettingsResponse = {
        success: true,
        data: { background: 'custom' },
        message: 'Success',
      };

      authServiceSpy.getUserSnapshot.and.returnValue(mockUser);
      authServiceSpy.isAuthenticated.and.returnValue(true);
      httpClientSpy.get.and.returnValue(of(mockSettings));

      userSubject.next(mockUser);

      setTimeout(() => {
        const settings = service.settings();
        expect(settings.background).toBe('custom');
        expect(settings.theme).toBe(DEFAULT_SETTINGS.theme);
        expect(settings.currency).toBe(DEFAULT_SETTINGS.currency);
        done();
      }, 100);
    });

    it('should normalize empty settings object', (done) => {
      const mockSettings: SettingsResponse = {
        success: true,
        data: {},
        message: 'Success',
      };

      authServiceSpy.getUserSnapshot.and.returnValue(mockUser);
      authServiceSpy.isAuthenticated.and.returnValue(true);
      httpClientSpy.get.and.returnValue(of(mockSettings));

      userSubject.next(mockUser);

      setTimeout(() => {
        expect(service.settings()).toEqual(DEFAULT_SETTINGS);
        done();
      }, 100);
    });

    it('should normalize null values', (done) => {
      const mockSettings: SettingsResponse = {
        success: true,
        data: {
          background: null as any,
          theme: null as any,
          currency: null as any,
        },
        message: 'Success',
      };

      authServiceSpy.getUserSnapshot.and.returnValue(mockUser);
      authServiceSpy.isAuthenticated.and.returnValue(true);
      httpClientSpy.get.and.returnValue(of(mockSettings));

      userSubject.next(mockUser);

      setTimeout(() => {
        expect(service.settings()).toEqual(DEFAULT_SETTINGS);
        done();
      }, 100);
    });
  });

  describe('Signal Reactivity', () => {
    beforeEach(() => {
      service = TestBed.inject(SettingsService);
    });

    it('should update computed signals reactively', () => {
      const initialBackground = service.background();
      const initialTheme = service.theme();
      const initialCurrency = service.currency();

      service.updateSetting('background', 'bg1');
      expect(service.background()).toBe('bg1');
      expect(service.theme()).toBe(initialTheme);
      expect(service.currency()).toBe(initialCurrency);

      service.updateSetting('theme', 'dark');
      expect(service.background()).toBe('bg1');
      expect(service.theme()).toBe('dark');
      expect(service.currency()).toBe(initialCurrency);

      service.updateSetting('currency', 'EUR');
      expect(service.background()).toBe('bg1');
      expect(service.theme()).toBe('dark');
      expect(service.currency()).toBe('EUR');
    });

    it('should maintain signal consistency', () => {
      const newSettings: Settings = {
        background: 'test-bg',
        theme: 'dark',
        currency: 'GBP',
      };

      service.settings.set(newSettings);

      expect(service.background()).toBe('test-bg');
      expect(service.theme()).toBe('dark');
      expect(service.currency()).toBe('GBP');
    });
  });
});
