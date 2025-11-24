import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionListComponent } from './transaction-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transaction, TransactionFilters } from '../../models/transaction.model';
import { TransactionFiltersComponent } from '../transaction-filters/transaction-filters.component';
import { TransactionPaginationComponent } from '../transaction-pagination/transaction-pagination.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { PageEvent } from '@angular/material/paginator';

// Mock child components
@Component({
    selector: 'app-transaction-filters',
    standalone: true,
    template: ''
})
class MockTransactionFiltersComponent {
    @Input() filters!: TransactionFilters;
    @Output() changed = new EventEmitter<Partial<TransactionFilters>>();
}

@Component({
    selector: 'app-transaction-pagination',
    standalone: true,
    template: ''
})
class MockTransactionPaginationComponent {
    @Input() length!: number;
    @Input() pageSize!: number;
    @Input() pageIndex!: number;
    @Input() pageSizeOptions!: number[];
    @Output() pageChange = new EventEmitter<PageEvent>();
}

@Component({
    selector: 'app-loader',
    standalone: true,
    template: ''
})
class MockLoaderComponent {
    @Input() loading = false;
}

describe('TransactionListComponent', () => {
    let component: TransactionListComponent;
    let fixture: ComponentFixture<TransactionListComponent>;

    const mockTransactions: Transaction[] = [
        {
            id: '1',
            date: '2023-11-01T10:00:00Z',
            category: 'Food',
            type: 'expense',
            amount: 50
        }
    ];

    const defaultFilters: TransactionFilters = {
        search: '',
        type: 'all',
        categories: []
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TransactionListComponent,
                NoopAnimationsModule,
                TranslateModule.forRoot()
            ]
        })
            .overrideComponent(TransactionListComponent, {
                remove: {
                    imports: [
                        TransactionFiltersComponent,
                        TransactionPaginationComponent,
                        LoaderComponent
                    ]
                },
                add: {
                    imports: [
                        MockTransactionFiltersComponent,
                        MockTransactionPaginationComponent,
                        MockLoaderComponent
                    ]
                }
            })
            .compileComponents();

        fixture = TestBed.createComponent(TransactionListComponent);
        component = fixture.componentInstance;

        // Set required inputs
        fixture.componentRef.setInput('transactions', mockTransactions);
        fixture.componentRef.setInput('total', 10);
        fixture.componentRef.setInput('loading', false);
        fixture.componentRef.setInput('pageIndex', 0);
        fixture.componentRef.setInput('pageSize', 10);
        fixture.componentRef.setInput('filters', defaultFilters);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Template Rendering', () => {
        it('should render the table when transactions are present', () => {
            const table = fixture.debugElement.query(By.css('table'));
            expect(table).toBeTruthy();
        });

        it('should render loader', () => {
            const loader = fixture.debugElement.query(By.directive(MockLoaderComponent));
            expect(loader).toBeTruthy();
        });

        it('should render pagination', () => {
            const pagination = fixture.debugElement.query(By.directive(MockTransactionPaginationComponent));
            expect(pagination).toBeTruthy();
        });

        it('should render empty state when no transactions and not loading', () => {
            fixture.componentRef.setInput('transactions', []);
            fixture.componentRef.setInput('total', 0);
            fixture.detectChanges();

            const table = fixture.debugElement.query(By.css('table'));
            expect(table).toBeFalsy();

            const emptyState = fixture.debugElement.query(By.css('.empty-state'));
            expect(emptyState).toBeTruthy();
        });
    });

    describe('Interactions', () => {
        it('should emit removed event', () => {
            spyOn(component.removed, 'emit');
            const deleteBtn = fixture.debugElement.query(By.css('button[color="warn"]'));
            deleteBtn.nativeElement.click();
            expect(component.removed.emit).toHaveBeenCalledWith(mockTransactions[0].id);
        });

        it('should handle filter changes', () => {
            spyOn(component.filterChange, 'emit');
            const filtersComponent = fixture.debugElement.query(By.directive(MockTransactionFiltersComponent)).componentInstance as MockTransactionFiltersComponent;

            const changes = { search: 'test' };
            filtersComponent.changed.emit(changes);

            expect(component.filterChange.emit).toHaveBeenCalledWith(changes);
        });

        it('should handle page changes', () => {
            spyOn(component.pageChange, 'emit');
            const paginationComponent = fixture.debugElement.query(By.directive(MockTransactionPaginationComponent)).componentInstance as MockTransactionPaginationComponent;

            const event: PageEvent = { pageIndex: 1, pageSize: 10, length: 20 };
            paginationComponent.pageChange.emit(event);

            expect(component.pageChange.emit).toHaveBeenCalledWith(event);
        });
    });
});
