import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthlyTrendChartComponent } from './monthly-trend-chart.component';
import { TranslateModule } from '@ngx-translate/core';
import { MonthlyData } from '../../models/dashboard.model';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MonthlyTrendChartComponent', () => {
  let component: MonthlyTrendChartComponent;
  let fixture: ComponentFixture<MonthlyTrendChartComponent>;

  const mockData: MonthlyData[] = [
    { month: 'Jan', income: 5000, expenses: 3000 },
    { month: 'Feb', income: 6000, expenses: 4000 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MonthlyTrendChartComponent,
        TranslateModule.forRoot(),
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MonthlyTrendChartComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('monthlyData', mockData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have accessibility attributes on month groups', () => {
    const monthGroups = fixture.debugElement.queryAll(By.css('.month-group'));
    expect(monthGroups.length).toBe(2);

    const firstGroup = monthGroups[0].nativeElement;
    expect(firstGroup.getAttribute('role')).toBe('button');
    expect(firstGroup.getAttribute('tabindex')).toBe('0');
    // We check for some part of the label since translation might return key
    expect(firstGroup.getAttribute('aria-label')).toBeTruthy();
  });

  it('should update selection on click', () => {
    const monthGroups = fixture.debugElement.queryAll(By.css('.month-group'));
    monthGroups[1].nativeElement.click();
    fixture.detectChanges();
    expect(component.selectedMonth()).toBe(1);
  });

  it('should support keyboard selection (Enter)', () => {
    const monthGroups = fixture.debugElement.queryAll(By.css('.month-group'));
    const firstGroup = monthGroups[0];

    // Simulate Enter key
    firstGroup.triggerEventHandler('keydown.enter', {});
    fixture.detectChanges();
    expect(component.selectedMonth()).toBe(0);
  });

  it('should support keyboard selection (Space)', () => {
    const monthGroups = fixture.debugElement.queryAll(By.css('.month-group'));
    const firstGroup = monthGroups[0];

    // Simulate Space key
    const preventDefaultSpy = jasmine.createSpy('preventDefault');
    firstGroup.triggerEventHandler('keydown.space', { preventDefault: preventDefaultSpy });
    fixture.detectChanges();
    expect(component.selectedMonth()).toBe(0);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
