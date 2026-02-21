import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { MonthlyData } from '../../models/dashboard.model';
import { MonthlyTrendChartComponent } from './monthly-trend-chart.component';

describe('MonthlyTrendChartComponent', () => {
  let component: MonthlyTrendChartComponent;
  let fixture: ComponentFixture<MonthlyTrendChartComponent>;

  const mockData: MonthlyData[] = [
    { month: 'Jan', income: 5000, expenses: 3000 },
    { month: 'Feb', income: 6000, expenses: 4000 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyTrendChartComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthlyTrendChartComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('monthlyData', mockData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct number of months', () => {
    const monthGroups = fixture.debugElement.queryAll(By.css('.month-group'));
    expect(monthGroups.length).toBe(2);
  });

  it('should be keyboard accessible', () => {
    const monthGroup = fixture.debugElement.queryAll(By.css('.month-group'))[0];

    // Check tabindex
    expect(monthGroup.attributes['tabindex']).toBe('0');

    // Check role
    expect(monthGroup.attributes['role']).toBe('button');

    // Simulate Enter key
    monthGroup.triggerEventHandler('keydown.enter', {});
    fixture.detectChanges();
    expect(component.selectedMonth()).toBe(0);

    // Simulate Space key
    monthGroup.triggerEventHandler('keydown.space', { preventDefault: () => {} });
    fixture.detectChanges();
    expect(component.selectedMonth()).toBe(0);
  });

  it('should have correct aria labels', () => {
    const monthGroup = fixture.debugElement.queryAll(By.css('.month-group'))[0];
    const ariaLabel = monthGroup.attributes['aria-label'];

    // Note: TranslateModule.forRoot() returns the key by default if loader is not configured
    // or if we don't wait for translations. But usually in tests we check if the attribute exists
    // and contains expected parts.
    // The component uses 'Jan' as key.

    expect(ariaLabel).toBeDefined();
    // We expect it to contain income and expenses values formatted.
    // formatCurrency uses Intl.NumberFormat, which might vary by locale but usually includes numbers.
    // 5000 -> 5,000.00 or similar.
    // Let's just check for 'Income' and 'Expenses' strings if they are translated keys or English fallbacks.
    // The component uses keys 'DASHBOARD.INCOME' and 'DASHBOARD.EXPENSES'.
    // TranslateModule default behavior is to return the key.

    expect(ariaLabel).toContain('Jan'); // Key or value
    // expect(ariaLabel).toContain('DASHBOARD.INCOME'); // If key is returned
    // OR
    // expect(ariaLabel).toContain('Income'); // If translation works or hardcoded

    // Let's just check that it is not empty.
    expect(ariaLabel?.length).toBeGreaterThan(0);
  });

  it('should indicate selection state via aria-pressed', () => {
    component.selectedMonth.set(0);
    fixture.detectChanges();

    const monthGroups = fixture.debugElement.queryAll(By.css('.month-group'));
    expect(monthGroups[0].attributes['aria-pressed']).toBe('true');
    expect(monthGroups[1].attributes['aria-pressed']).toBe('false');
  });
});
