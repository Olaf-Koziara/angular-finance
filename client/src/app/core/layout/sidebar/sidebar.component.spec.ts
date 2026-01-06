import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AuthService } from '../../../features/auth/services/auth.service';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  const breakpointObserverMock = {
    observe: jasmine.createSpy('observe').and.returnValue(of({ matches: false })),
  };
  const authServiceMock = {
    logout: jasmine.createSpy('logout'),
  };
  const routerMock = {
    navigate: jasmine.createSpy('navigate'),
    events: of(),
    createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue({}),
  } as any;
  const activatedRouteMock = {
    root: {
      firstChild: null,
      snapshot: { data: {} },
    },
    snapshot: { data: {} },
  } as any;
  const matDialogMock = {
    open: jasmine.createSpy('open'),
  } as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, TranslateModule.forRoot()],
      providers: [
        { provide: BreakpointObserver, useValue: breakpointObserverMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: MatDialog, useValue: matDialogMock },
      ],
    }).compileComponents();

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
