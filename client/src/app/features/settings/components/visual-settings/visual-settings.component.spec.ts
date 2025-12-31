import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualSettings } from './visual-settings.component';

describe('VisualSettings', () => {
  let component: VisualSettings;
  let fixture: ComponentFixture<VisualSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualSettings],
    }).compileComponents();

    fixture = TestBed.createComponent(VisualSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
