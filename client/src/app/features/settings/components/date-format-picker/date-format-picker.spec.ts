import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFormatPicker } from './date-format-picker';

describe('DateFormatPicker', () => {
  let component: DateFormatPicker;
  let fixture: ComponentFixture<DateFormatPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateFormatPicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateFormatPicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
