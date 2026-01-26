import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { BackgroundPicker } from './background-picker.component';

describe('BackgroundPicker', () => {
  let component: BackgroundPicker;
  let fixture: ComponentFixture<BackgroundPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundPicker, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(BackgroundPicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
