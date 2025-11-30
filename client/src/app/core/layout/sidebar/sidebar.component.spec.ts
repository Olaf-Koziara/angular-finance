import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from '../../../features/auth/services/auth.service';
import { SidebarComponent } from './sidebar.component';
import { ActivatedRoute, provideRouter } from '@angular/router';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  const breakpointObserverMock = {
    observe: jasmine.createSpy('observe').and.returnValue(of({ matches: false })),
  };
  const authServiceMock = {
    logout: jasmine.createSpy('logout'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        { provide: BreakpointObserver, useValue: breakpointObserverMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();
  });

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authServiceMock.logout.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delegate logout to authService', () => {
    component.logout();
    expect(authServiceMock.logout).toHaveBeenCalled();
  });
});
