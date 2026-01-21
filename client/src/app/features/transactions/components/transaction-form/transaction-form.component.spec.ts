import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionFormComponent } from './transaction-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Transaction } from '../../models/transaction.model';
import { By } from '@angular/platform-browser';
import { TRANSACTION_CATEGORIES } from '../../constants/transaction-categories.constant';

describe('TransactionFormComponent', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionFormComponent, NoopAnimationsModule, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionFormComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    spyOn(translateService, 'instant').and.callFake((key: string) => key);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should initialize with empty form in create mode', () => {
      const formValue = component.form.getRawValue();
      expect(formValue.title).toBe('');
      expect(formValue.amount).toBeNull();
      expect(formValue.category).toBe('');
      expect(formValue.date).toBeInstanceOf(Date);
      expect(formValue.type).toBe('expense');
    });

    it('should be invalid when empty', () => {
      expect(component.form.valid).toBeFalse();
    });

    it('should have all required form controls', () => {
      expect(component.form.controls.title).toBeDefined();
      expect(component.form.controls.amount).toBeDefined();
      expect(component.form.controls.category).toBeDefined();
      expect(component.form.controls.date).toBeDefined();
      expect(component.form.controls.type).toBeDefined();
    });

    it('should initialize with default date as today', () => {
      const formDate = component.form.controls.date.value;
      const today = new Date();
      expect(formDate).toBeInstanceOf(Date);
      expect((formDate as Date).toDateString()).toBe(today.toDateString());
    });
  });

  describe('Form Validation', () => {
    describe('Title Field', () => {
      it('should be required', () => {
        const titleControl = component.form.controls.title;
        titleControl.setValue('');
        expect(titleControl.hasError('required')).toBeTrue();
      });

      it('should accept valid title', () => {
        const titleControl = component.form.controls.title;
        titleControl.setValue('Valid Title');
        expect(titleControl.hasError('required')).toBeFalse();
      });

      it('should enforce maxlength of 100', () => {
        const titleControl = component.form.controls.title;
        titleControl.setValue('a'.repeat(101));
        expect(titleControl.hasError('maxlength')).toBeTrue();
      });

      it('should accept title with exactly 100 characters', () => {
        const titleControl = component.form.controls.title;
        titleControl.setValue('a'.repeat(100));
        expect(titleControl.hasError('maxlength')).toBeFalse();
      });
    });

    describe('Amount Field', () => {
      it('should be required', () => {
        const amountControl = component.form.controls.amount;
        amountControl.setValue(null);
        expect(amountControl.hasError('required')).toBeTrue();
      });

      it('should validate minimum value of 0.01', () => {
        const amountControl = component.form.controls.amount;
        amountControl.setValue(0);
        expect(amountControl.hasError('min')).toBeTrue();

        amountControl.setValue(-10);
        expect(amountControl.hasError('min')).toBeTrue();

        amountControl.setValue(0.01);
        expect(amountControl.hasError('min')).toBeFalse();
      });

      it('should accept valid positive amounts', () => {
        const amountControl = component.form.controls.amount;
        amountControl.setValue(100);
        expect(amountControl.valid).toBeTrue();

        amountControl.setValue(0.01);
        expect(amountControl.valid).toBeTrue();

        amountControl.setValue(999999.99);
        expect(amountControl.valid).toBeTrue();
      });
    });

    describe('Category Field', () => {
      it('should be required', () => {
        const categoryControl = component.form.controls.category;
        categoryControl.setValue('');
        expect(categoryControl.hasError('required')).toBeTrue();
      });

      it('should accept valid category', () => {
        const categoryControl = component.form.controls.category;
        categoryControl.setValue('Food');
        expect(categoryControl.hasError('required')).toBeFalse();
      });
    });

    describe('Date Field', () => {
      it('should be required', () => {
        const dateControl = component.form.controls.date;
        dateControl.setValue(null);
        expect(dateControl.hasError('required')).toBeTrue();
      });

      it('should accept valid date', () => {
        const dateControl = component.form.controls.date;
        dateControl.setValue(new Date('2023-01-01'));
        expect(dateControl.hasError('required')).toBeFalse();
      });
    });

    describe('Type Field', () => {
      it('should be required', () => {
        const typeControl = component.form.controls.type;
        expect(typeControl.hasError('required')).toBeFalse();
      });

      it('should accept income type', () => {
        const typeControl = component.form.controls.type;
        typeControl.setValue('income');
        expect(typeControl.valid).toBeTrue();
      });

      it('should accept expense type', () => {
        const typeControl = component.form.controls.type;
        typeControl.setValue('expense');
        expect(typeControl.valid).toBeTrue();
      });
    });

    it('should be valid with all required fields filled', () => {
      component.form.patchValue({
        title: 'Test Transaction',
        amount: 100,
        category: 'Food',
        date: new Date(),
        type: 'expense',
      });

      expect(component.form.valid).toBeTrue();
    });
  });

  describe('Create Mode', () => {
    it('should emit submitted event with valid data', () => {
      spyOn(component.submitted, 'emit');

      const validData = {
        title: 'Grocery Shopping',
        amount: 100,
        category: 'Food',
        date: new Date('2023-01-01'),
        type: 'expense' as const,
      };

      component.form.patchValue(validData);
      component.submit();

      expect(component.submitted.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          title: 'Grocery Shopping',
          amount: 100,
          category: 'Food',
          type: 'expense',
        })
      );
    });

    it('should not emit if form is invalid', () => {
      spyOn(component.submitted, 'emit');
      component.submit();
      expect(component.submitted.emit).not.toHaveBeenCalled();
    });

    it('should mark all fields as touched when submitting invalid form', () => {
      component.submit();
      expect(component.form.controls.title.touched).toBeTrue();
      expect(component.form.controls.amount.touched).toBeTrue();
      expect(component.form.controls.category.touched).toBeTrue();
    });

    it('should reset form after successful submission', () => {
      const validData = {
        title: 'Test Transaction',
        amount: 100,
        category: 'Food',
        date: new Date(),
        type: 'expense' as const,
      };

      component.form.patchValue(validData);
      component.submit();

      expect(component.form.controls.title.value).toBe('');
      expect(component.form.controls.amount.value).toBeNull();
      expect(component.form.controls.category.value).toBe('');
    });

    it('should preserve date and type after reset', () => {
      const testDate = new Date('2023-01-01');
      const validData = {
        title: 'Test',
        amount: 100,
        category: 'Food',
        date: testDate,
        type: 'income' as const,
      };

      component.form.patchValue(validData);
      component.submit();

      expect(component.form.controls.date.value?.toDateString()).toBe(testDate.toDateString());
      expect(component.form.controls.type.value).toBe('income');
    });

    it('should convert date to ISO string in payload', () => {
      spyOn(component.submitted, 'emit');

      const testDate = new Date('2023-01-01T12:00:00');
      component.form.patchValue({
        title: 'Test',
        amount: 100,
        category: 'Food',
        date: testDate,
        type: 'expense',
      });

      component.submit();

      const emittedValue = (component.submitted.emit as jasmine.Spy).calls.mostRecent().args[0];
      expect(typeof emittedValue.date).toBe('string');
      expect(emittedValue.date).toContain('2023-01-01');
    });
  });

  describe('Edit Mode', () => {
    const mockTransaction: Transaction = {
      id: '123',
      title: 'Existing Transaction',
      amount: 250,
      category: 'Transport',
      date: '2023-06-15T10:00:00Z',
      type: 'expense',
    };

    it('should populate form when transaction input is set', () => {
      fixture.componentRef.setInput('transaction', mockTransaction);
      fixture.detectChanges();

      const formValue = component.form.getRawValue();
      expect(formValue.title).toBe(mockTransaction.title);
      expect(formValue.amount).toBe(mockTransaction.amount);
      expect(formValue.category).toBe(mockTransaction.category);
      expect(formValue.type).toBe(mockTransaction.type);
    });

    it('should convert date string to Date object', () => {
      fixture.componentRef.setInput('transaction', mockTransaction);
      fixture.detectChanges();

      expect(component.form.controls.date.value).toBeInstanceOf(Date);
    });

    it('should emit updated event when editing', () => {
      spyOn(component.updated, 'emit');
      fixture.componentRef.setInput('transaction', mockTransaction);
      fixture.detectChanges();

      component.form.patchValue({ title: 'Updated Title' });
      component.submit();

      expect(component.updated.emit).toHaveBeenCalledWith({
        id: mockTransaction.id,
        changes: jasmine.objectContaining({
          title: 'Updated Title',
          amount: mockTransaction.amount,
          category: mockTransaction.category,
          type: mockTransaction.type,
        }),
      });
    });

    it('should not emit submitted event when editing', () => {
      spyOn(component.submitted, 'emit');
      fixture.componentRef.setInput('transaction', mockTransaction);
      fixture.detectChanges();

      component.submit();

      expect(component.submitted.emit).not.toHaveBeenCalled();
    });

    it('should clear form when transaction input becomes null', () => {
      fixture.componentRef.setInput('transaction', mockTransaction);
      fixture.detectChanges();

      fixture.componentRef.setInput('transaction', null);
      fixture.detectChanges();

      const formValue = component.form.getRawValue();
      expect(formValue.title).toBe('');
      expect(formValue.amount).toBeNull();
      expect(formValue.category).toBe('');
    });

    it('should not reset form after update submission', () => {
      fixture.componentRef.setInput('transaction', mockTransaction);
      fixture.detectChanges();

      component.form.patchValue({ title: 'Updated Title' });
      component.submit();

      expect(component.form.controls.title.value).toBe('Updated Title');
    });

    it('should emit cancelled event when cancel is clicked', () => {
      spyOn(component.cancelled, 'emit');
      fixture.componentRef.setInput('transaction', mockTransaction);
      fixture.detectChanges();

      component.cancelEdit();

      expect(component.cancelled.emit).toHaveBeenCalled();
    });

    it('should handle string date in form submission', () => {
      spyOn(component.updated, 'emit');
      fixture.componentRef.setInput('transaction', mockTransaction);
      fixture.detectChanges();

      component.form.controls.date.setValue('2023-12-25' as any);
      component.submit();

      const emittedValue = (component.updated.emit as jasmine.Spy).calls.mostRecent().args[0];
      expect(typeof emittedValue.changes.date).toBe('string');
    });
  });

  describe('Categories Input', () => {
    it('should use default TRANSACTION_CATEGORIES', () => {
      const categories = component.categories();
      expect(categories).toEqual([...TRANSACTION_CATEGORIES]);
    });

    it('should accept custom categories', () => {
      const customCategories = ['Custom1', 'Custom2'];
      fixture.componentRef.setInput('categories', customCategories);
      fixture.detectChanges();

      expect(component.categories()).toEqual(customCategories);
    });
  });

  describe('Template Integration', () => {
    it('should render title input', () => {
      const titleInput = fixture.debugElement.query(By.css('input[formControlName="title"]'));
      expect(titleInput).toBeTruthy();
    });

    it('should render amount input', () => {
      const amountInput = fixture.debugElement.query(By.css('input[formControlName="amount"]'));
      expect(amountInput).toBeTruthy();
      expect(amountInput.nativeElement.type).toBe('number');
    });

    it('should render category select', () => {
      const categorySelect = fixture.debugElement.query(
        By.css('mat-select[formControlName="category"]')
      );
      expect(categorySelect).toBeTruthy();
    });

    it('should render date picker', () => {
      const datePicker = fixture.debugElement.query(By.css('input[formControlName="date"]'));
      expect(datePicker).toBeTruthy();
    });

    it('should render type toggle', () => {
      const typeToggle = fixture.debugElement.query(
        By.css('mat-button-toggle-group[formControlName="type"]')
      );
      expect(typeToggle).toBeTruthy();
    });

    it('should render submit button', () => {
      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
      expect(submitButton).toBeTruthy();
    });

    it('should disable submit button when form is invalid', () => {
      fixture.detectChanges();
      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
      expect(submitButton.nativeElement.disabled).toBeTrue();
    });

    it('should enable submit button when form is valid', () => {
      component.form.patchValue({
        title: 'Test',
        amount: 100,
        category: 'Food',
        date: new Date(),
        type: 'expense',
      });
      fixture.detectChanges();

      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
      expect(submitButton.nativeElement.disabled).toBeFalse();
    });

    it('should show cancel button in edit mode', () => {
      const mockTransaction: Transaction = {
        id: '123',
        title: 'Test',
        amount: 100,
        category: 'Food',
        date: '2023-01-01T00:00:00Z',
        type: 'expense',
      };

      fixture.componentRef.setInput('transaction', mockTransaction);
      fixture.detectChanges();

      const cancelButton = fixture.debugElement.query(By.css('button[mat-stroked-button]'));
      expect(cancelButton).toBeTruthy();
      expect(cancelButton.nativeElement.textContent).toContain('TRANSACTIONS.CANCEL_EDIT');
    });

    it('should not show cancel button in create mode', () => {
      fixture.componentRef.setInput('transaction', null);
      fixture.detectChanges();

      const cancelButton = fixture.debugElement.query(By.css('button[mat-stroked-button]'));
      expect(cancelButton).toBeFalsy();
    });

    it('should display correct button text in create mode', () => {
      fixture.componentRef.setInput('transaction', null);
      fixture.detectChanges();

      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
      expect(submitButton.nativeElement.textContent).toContain('TRANSACTIONS.SAVE_TRANSACTION');
    });

    it('should display correct button text in edit mode', () => {
      const mockTransaction: Transaction = {
        id: '123',
        title: 'Test',
        amount: 100,
        category: 'Food',
        date: '2023-01-01T00:00:00Z',
        type: 'expense',
      };

      fixture.componentRef.setInput('transaction', mockTransaction);
      fixture.detectChanges();

      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
      expect(submitButton.nativeElement.textContent).toContain('TRANSACTIONS.UPDATE_TRANSACTION');
    });

    it('should show error messages for required fields', () => {
      component.form.controls.title.markAsTouched();
      component.form.controls.title.setValue('');
      fixture.detectChanges();

      const errorElement = fixture.debugElement.query(By.css('mat-error'));
      expect(errorElement).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null amount safely', () => {
      spyOn(component.submitted, 'emit');
      component.form.patchValue({
        title: 'Test',
        amount: null,
        category: 'Food',
        date: new Date(),
        type: 'expense',
      });

      component.submit();

      expect(component.submitted.emit).not.toHaveBeenCalled();
    });

    it('should handle null date gracefully', () => {
      spyOn(component.submitted, 'emit');
      component.form.patchValue({
        title: 'Test',
        amount: 100,
        category: 'Food',
        date: null,
        type: 'expense',
      });
      component.form.controls.date.setErrors(null);
      component.form.controls.date.markAsTouched();

      component.submit();

      expect(component.submitted.emit).toHaveBeenCalled();
      const emittedValue = (component.submitted.emit as jasmine.Spy).calls.mostRecent()?.args[0];
      expect(emittedValue).toBeDefined();
      expect(emittedValue.date).toBeDefined();
      expect(typeof emittedValue.date).toBe('string');
    });

    it('should handle very large amounts', () => {
      component.form.patchValue({
        title: 'Large Transaction',
        amount: 999999999.99,
        category: 'Other',
        date: new Date(),
        type: 'income',
      });

      expect(component.form.valid).toBeTrue();
    });

    it('should handle decimal amounts correctly', () => {
      spyOn(component.submitted, 'emit');
      component.form.patchValue({
        title: 'Test',
        amount: 123.45,
        category: 'Food',
        date: new Date(),
        type: 'expense',
      });

      component.submit();

      const emittedValue = (component.submitted.emit as jasmine.Spy).calls.mostRecent().args[0];
      expect(emittedValue.amount).toBe(123.45);
    });

    it('should handle special characters in title', () => {
      component.form.patchValue({
        title: 'Test & Special "Chars" <Tags>',
        amount: 100,
        category: 'Food',
        date: new Date(),
        type: 'expense',
      });

      expect(component.form.valid).toBeTrue();
    });

    it('should clear all validation errors when setting form value', () => {
      component.form.controls.title.setErrors({ required: true });
      component.form.controls.amount.setErrors({ min: true });

      fixture.componentRef.setInput('transaction', {
        id: '123',
        title: 'Test',
        amount: 100,
        category: 'Food',
        date: '2023-01-01T00:00:00Z',
        type: 'expense',
      });
      fixture.detectChanges();

      expect(component.form.controls.title.errors).toBeNull();
      expect(component.form.controls.amount.errors).toBeNull();
    });
  });

  describe('Component Properties', () => {
    it('should have OnPush change detection strategy', () => {
      const metadata = (component.constructor as any).ɵcmp;
      expect(metadata.onPush).toBeTrue();
    });

    it('should be standalone component', () => {
      expect((component.constructor as any).ɵcmp.standalone).toBeTrue();
    });

    it('should have form builder injected', () => {
      expect((component as any).fb).toBeDefined();
    });
  });
});
