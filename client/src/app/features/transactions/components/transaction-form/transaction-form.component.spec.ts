import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionFormComponent } from './transaction-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { CreateTransaction } from '../../models/transaction.model';

describe('TransactionFormComponent', () => {
    let component: TransactionFormComponent;
    let fixture: ComponentFixture<TransactionFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TransactionFormComponent,
                NoopAnimationsModule,
                TranslateModule.forRoot()
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TransactionFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be invalid when empty', () => {
        expect(component.form.valid).toBeFalse();
    });

    it('should validate amount is positive', () => {
        const amountControl = component.form.controls.amount;
        amountControl.setValue(0);
        expect(amountControl.hasError('min')).toBeTrue();

        amountControl.setValue(-10);
        expect(amountControl.hasError('min')).toBeTrue();

        amountControl.setValue(10);
        expect(amountControl.hasError('min')).toBeFalse();
    });

    it('should emit submitted event with valid data', () => {
        spyOn(component.submitted, 'emit');

        const validData = {
            amount: 100,
            category: 'Food',
            date: new Date('2023-01-01'),
            type: 'expense'
        };

        component.form.patchValue(validData as any);
        component.submit();

        expect(component.submitted.emit).toHaveBeenCalledWith(jasmine.objectContaining({
            amount: 100,
            category: 'Food',
            type: 'expense'
        }));
    });

    it('should not emit if form is invalid', () => {
        spyOn(component.submitted, 'emit');
        component.submit();
        expect(component.submitted.emit).not.toHaveBeenCalled();
    });

    it('should reset form after successful submission', () => {
        const validData = {
            amount: 100,
            category: 'Food',
            date: new Date(),
            type: 'expense'
        };

        component.form.patchValue(validData as any);
        component.submit();

        expect(component.form.controls.amount.value).toBeNull();
        expect(component.form.controls.category.value).toBe('');
    });
});
