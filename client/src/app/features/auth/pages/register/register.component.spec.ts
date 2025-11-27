import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RegisterComponent } from './register.component';

interface FormShape {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

describe('RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['register']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, RouterTestingModule],
      providers: [provideNoopAnimations(), { provide: AuthService, useValue: authService }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService.register.and.returnValue(of(void 0));
    fixture.detectChanges();
  });

  function fillValidForm(overrides: Partial<FormShape> = {}): void {
    component.form.setValue({
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      password: 'Secure123!',
      confirmPassword: 'Secure123!',
      terms: true,
      ...overrides,
    });
  }

  it('disables submission until the form is valid', () => {
    expect(component.submitDisabled()).toBeTrue();
    fillValidForm();
    fixture.detectChanges();
    expect(component.submitDisabled()).toBeFalse();
  });

  it('blocks submission when passwords do not match', () => {
    fillValidForm({ confirmPassword: 'Mismatch1!' });
    component.submit();
    expect(authService.register).not.toHaveBeenCalled();
    expect(component.passwordMismatch()).toBeTrue();
  });

  it('sends the register payload when the form is valid', () => {
    fillValidForm();
    component.submit();
    expect(authService.register).toHaveBeenCalledWith({
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      password: 'Secure123!',
      acceptTerms: true,
    });
  });

  it('surfaces backend errors', () => {
    fillValidForm();
    authService.register.and.returnValue(
      throwError(() => ({ error: { message: 'Email already used' } })),
    );
    component.submit();
    expect(component.error()).toBe('Email already used');
  });
});

