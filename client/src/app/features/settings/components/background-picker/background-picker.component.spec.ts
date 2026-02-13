import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackgroundPicker } from './background-picker.component';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';

describe('BackgroundPicker', () => {
  let component: BackgroundPicker;
  let fixture: ComponentFixture<BackgroundPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BackgroundPicker,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
        MatMenuModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BackgroundPicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render trigger button with label', () => {
    const trigger = fixture.debugElement.query(By.css('.background-picker'));
    expect(trigger).toBeTruthy();
    const label = trigger.query(By.css('.label'));
    expect(label.nativeElement.textContent).toContain('SETTINGS.VISUAL.BACKGROUND_SELECT');
  });

  it('should open menu when trigger is clicked', async () => {
    const trigger = fixture.debugElement.query(By.css('.background-picker'));
    trigger.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const menuContent = document.querySelector('.mat-mdc-menu-content');
    expect(menuContent).toBeTruthy();
  });

  it('should render background options in menu', async () => {
    // Open menu first
    const trigger = fixture.debugElement.query(By.css('.background-picker'));
    trigger.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const options = document.querySelectorAll('button[mat-menu-item]');
    expect(options.length).toBeGreaterThan(0);

    // Check accessibility label
    const firstOption = options[0];
    expect(firstOption.getAttribute('aria-label')).toBeTruthy();
  });

  it('should update selected background when option is clicked', async () => {
    // Open menu
    const trigger = fixture.debugElement.query(By.css('.background-picker'));
    trigger.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    // Spy on update method or check signal
    const firstBackground = component.backgrounds[0];

    const options = document.querySelectorAll('button[mat-menu-item]');
    const firstOption = options[0] as HTMLElement;

    firstOption.click();
    fixture.detectChanges();

    expect(component.selectedBackground()).toBe(firstBackground);
  });
});
