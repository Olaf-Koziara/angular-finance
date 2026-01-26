import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertsListComponent } from './alerts-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatTooltip } from '@angular/material/tooltip';

describe('AlertsListComponent', () => {
  let component: AlertsListComponent;
  let fixture: ComponentFixture<AlertsListComponent>;

  const mockAlerts = [
    { type: 'warning', message: 'Test Alert 1', icon: 'warning' } as const,
    { type: 'error', message: 'Test Alert 2', icon: 'error' } as const
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AlertsListComponent,
        TranslateModule.forRoot(),
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertsListComponent);
    component = fixture.componentInstance;

    // Set input
    fixture.componentRef.setInput('alerts', mockAlerts);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display alerts', () => {
    const alertItems = fixture.debugElement.queryAll(By.css('.alert-item'));
    expect(alertItems.length).toBe(2);
  });

  it('should have view details button with correct aria-label and tooltip', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.alert-action'));
    const firstButton = buttons[0];

    // Check aria-label (assuming translation returns key if not found, or empty string if mocked differently)
    // Since we used TranslateModule.forRoot(), it usually just returns the key if no loader is provided.
    // The aria-label binding is: ('DASHBOARD.VIEW_DETAILS' | translate) + ': ' + (alert.message | translate)

    const ariaLabel = firstButton.attributes['aria-label'];
    expect(ariaLabel).toContain('DASHBOARD.VIEW_DETAILS');
    expect(ariaLabel).toContain('Test Alert 1');

    // Check matTooltip
    const tooltipDirective = firstButton.injector.get(MatTooltip);
    expect(tooltipDirective.message).toBe('DASHBOARD.VIEW_DETAILS');
  });
});
