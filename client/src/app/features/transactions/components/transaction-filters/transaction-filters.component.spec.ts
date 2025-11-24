import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TransactionFiltersComponent } from './transaction-filters.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { TransactionFilters } from '../../models/transaction.model';

describe('TransactionFiltersComponent', () => {
    let component: TransactionFiltersComponent;
    let fixture: ComponentFixture<TransactionFiltersComponent>;

    const defaultFilters: TransactionFilters = {
        search: 'initial',
        type: 'income',
        categories: []
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TransactionFiltersComponent,
                NoopAnimationsModule,
                TranslateModule.forRoot()
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TransactionFiltersComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('filters', defaultFilters);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form with input values', () => {
        const formValue = component.formGroup.getRawValue();
        expect(formValue.search).toBe('initial');
        expect(formValue.type).toBe('income');
    });

    it('should emit changes when form value changes', fakeAsync(() => {
        spyOn(component.changed, 'emit');

        component.formGroup.patchValue({ search: 'new search' });
        tick(); // Wait for valueChanges subscription

        expect(component.changed.emit).toHaveBeenCalledWith(jasmine.objectContaining({
            search: 'new search'
        }));
    }));

    it('should clear search when clearSearch is called', () => {
        component.clearSearch();
        expect(component.formGroup.controls.search.value).toBe('');
    });

    it('should update form when input signal changes', () => {
        const newFilters: TransactionFilters = {
            search: 'updated',
            type: 'expense',
            categories: ['Food']
        };

        fixture.componentRef.setInput('filters', newFilters);
        fixture.detectChanges();

        const formValue = component.formGroup.getRawValue();
        expect(formValue.search).toBe('updated');
        expect(formValue.type).toBe('expense');
        expect(formValue.categories).toEqual(['Food']);
    });
});
