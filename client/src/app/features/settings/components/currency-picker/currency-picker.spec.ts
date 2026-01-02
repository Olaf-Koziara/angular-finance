import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { CurrencyPicker } from './currency-picker';

describe('CurrencyPicker', () => {
  let component: CurrencyPicker;
  let fixture: ComponentFixture<CurrencyPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyPicker, TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyPicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
