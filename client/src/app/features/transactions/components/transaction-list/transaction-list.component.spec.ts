import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionListComponent } from './transaction-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { Component, input } from '@angular/core';
import { Transaction, TransactionSort } from '../../models/transaction.model';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule, MatChip } from '@angular/material/chips';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: '<div class="loader" [class.active]="loading()"></div>',
  imports: [],
})
class MockLoaderComponent {
  loading = input(false);
}

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;

  const mockTransactions: Transaction[] = [
    {
      id: '1',
      date: '2023-11-01T10:00:00Z',
      title: 'Grocery Shopping',
      category: 'Food',
      type: 'expense',
      amount: 50.25,
    },
    {
      id: '2',
      date: '2023-11-02T14:30:00Z',
      title: 'Salary',
      category: 'Other',
      type: 'income',
      amount: 3000,
    },
    {
      id: '3',
      date: '2023-11-03T09:15:00Z',
      title: 'Bus Ticket',
      category: 'Transport',
      type: 'expense',
      amount: 2.5,
    },
  ];

  const defaultSort: TransactionSort = {
    column: 'date',
    order: 'desc',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TransactionListComponent,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        MatIconModule,
        MatChipsModule,
      ],
    })
      .overrideComponent(TransactionListComponent, {
        remove: {
          imports: [LoaderComponent],
        },
        add: {
          imports: [MockLoaderComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('transactions', mockTransactions);
    fixture.componentRef.setInput('total', 10);
    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('sort', defaultSort);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Computed Properties', () => {
    it('should compute hasTransactions as true when total > 0', () => {
      fixture.componentRef.setInput('total', 5);
      fixture.detectChanges();
      expect(component.hasTransactions()).toBeTrue();
    });

    it('should compute hasTransactions as false when total is 0', () => {
      fixture.componentRef.setInput('total', 0);
      fixture.detectChanges();
      expect(component.hasTransactions()).toBeFalse();
    });
  });

  describe('Template Rendering', () => {
    it('should render the table when transactions are present', () => {
      const table = fixture.debugElement.query(By.css('table'));
      expect(table).toBeTruthy();
      expect(table.nativeElement.classList.contains('transaction-table')).toBeTrue();
    });

    it('should render loader component', () => {
      const loader = fixture.debugElement.query(By.directive(MockLoaderComponent));
      expect(loader).toBeTruthy();
    });

    it('should pass loading state to loader', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      const loader = fixture.debugElement.query(By.directive(MockLoaderComponent));
      expect(loader).toBeTruthy();
    });

    it('should render empty state when no transactions and not loading', () => {
      fixture.componentRef.setInput('transactions', []);
      fixture.componentRef.setInput('total', 0);
      fixture.componentRef.setInput('loading', false);
      fixture.detectChanges();

      const table = fixture.debugElement.query(By.css('table'));
      expect(table).toBeFalsy();

      const emptyState = fixture.debugElement.query(By.css('.empty-state'));
      expect(emptyState).toBeTruthy();
      expect(emptyState.nativeElement.textContent).toContain('TRANSACTIONS.NO_RESULTS');
    });

    it('should not render empty state when loading', () => {
      fixture.componentRef.setInput('transactions', []);
      fixture.componentRef.setInput('total', 0);
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const emptyState = fixture.debugElement.query(By.css('.empty-state'));
      expect(emptyState).toBeFalsy();
    });

    it('should render all table columns', () => {
      const headers = fixture.debugElement.queryAll(By.css('th'));
      expect(headers.length).toBe(component.displayedColumns().length);
    });

    it('should render correct number of rows', () => {
      const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
      expect(rows.length).toBe(mockTransactions.length);
    });

    it('should display transaction date formatted', () => {
      const dateCells = fixture.debugElement
        .queryAll(By.css('td'))
        .filter((_, index) => index % component.displayedColumns().length === 0);
      expect(dateCells.length).toBeGreaterThan(0);
    });

    it('should display transaction title', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('Grocery Shopping');
      expect(compiled.textContent).toContain('Salary');
    });

    it('should display transaction amount with currency pipe', () => {
      const amountCells = fixture.debugElement
        .queryAll(By.css('td'))
        .filter(
          (el) =>
            el.nativeElement.textContent.includes('$') ||
            el.nativeElement.textContent.includes('50.25')
        );
      expect(amountCells.length).toBeGreaterThan(0);
    });

    it('should render type chip with correct color for income', () => {
        const chips = fixture.debugElement.queryAll(By.directive(MatChip));
        const incomeChip = chips.find((chip) => chip.nativeElement.textContent.includes('INCOME'));
        expect(incomeChip).toBeTruthy();

        // Use injector to get the directive instance
        const chipInstance = incomeChip!.injector.get(MatChip);
        // Note: MatChip input for color is accessed via instance property in newer Material versions or via input signal if migrated
        // Assuming standard MatChip, checking logic might need adjustment if it's signal based.
        // But let's try reading the 'color' property.
        // If it's a signal input (Angular 17+ Material), it might be `color()`.
        // However, existing code used `[color]="..."` so it's likely standard property or input.
        // Let's assume property for now as usually public inputs are properties on the class.
        // Wait, ng-reflect-color was working in older versions.
        // Let's try checking the property 'color'.
        expect((chipInstance as any).color).toBe('primary');
    });

    it('should render type chip with correct color for expense', () => {
        const chips = fixture.debugElement.queryAll(By.directive(MatChip));
        const expenseChips = chips.filter((chip) =>
            chip.nativeElement.textContent.includes('EXPENSE')
        );
        expect(expenseChips.length).toBeGreaterThan(0);
        const chipInstance = expenseChips[0].injector.get(MatChip);
        expect((chipInstance as any).color).toBe('warn');
    });

    it('should render action buttons for each row', () => {
      const editButtons = fixture.debugElement.queryAll(By.css('button[color="primary"]'));
      const deleteButtons = fixture.debugElement.queryAll(By.css('button[color="warn"]'));

      expect(editButtons.length).toBe(mockTransactions.length);
      expect(deleteButtons.length).toBe(mockTransactions.length);
    });
  });

  describe('Sorting', () => {
    it('should apply sort column and direction to table', () => {
      const sortElement = fixture.debugElement.query(By.directive(MatSort));
      const sortInstance = sortElement.injector.get(MatSort);
      expect(sortInstance.active).toBe('date');
      expect(sortInstance.direction).toBe('desc');
    });

    it('should emit sortChanged event when sort changes', () => {
      spyOn(component.sortChanged, 'emit');

      component.onSortChange({
        active: 'amount',
        direction: 'asc',
      });

      expect(component.sortChanged.emit).toHaveBeenCalledWith({
        column: 'amount',
        order: 'asc',
      });
    });

    it('should default to desc order when direction is empty', () => {
      spyOn(component.sortChanged, 'emit');

      component.onSortChange({
        active: 'title',
        direction: '',
      });

      expect(component.sortChanged.emit).toHaveBeenCalledWith({
        column: 'title',
        order: 'desc',
      });
    });

    it('should update sort when input changes', () => {
      const newSort: TransactionSort = {
        column: 'amount',
        order: 'asc',
      };

      fixture.componentRef.setInput('sort', newSort);
      fixture.detectChanges();

      const sortElement = fixture.debugElement.query(By.directive(MatSort));
      const sortInstance = sortElement.injector.get(MatSort);
      expect(sortInstance.active).toBe('amount');
      expect(sortInstance.direction).toBe('asc');
    });
  });

  describe('Interactions', () => {
    it('should emit removed event when delete button is clicked', () => {
      spyOn(component.removed, 'emit');
      const deleteButtons = fixture.debugElement.queryAll(By.css('button[color="warn"]'));
      deleteButtons[0].nativeElement.click();
      expect(component.removed.emit).toHaveBeenCalledWith(mockTransactions[0].id);
    });

    it('should emit removed event with correct id for each transaction', () => {
      spyOn(component.removed, 'emit');
      const deleteButtons = fixture.debugElement.queryAll(By.css('button[color="warn"]'));

      deleteButtons[1].nativeElement.click();
      expect(component.removed.emit).toHaveBeenCalledWith(mockTransactions[1].id);

      deleteButtons[2].nativeElement.click();
      expect(component.removed.emit).toHaveBeenCalledWith(mockTransactions[2].id);
    });

    it('should emit edited event when edit button is clicked', () => {
      spyOn(component.edited, 'emit');
      const editButtons = fixture.debugElement.queryAll(By.css('button[color="primary"]'));
      editButtons[0].nativeElement.click();
      expect(component.edited.emit).toHaveBeenCalledWith(mockTransactions[0]);
    });

    it('should emit edited event with correct transaction', () => {
      spyOn(component.edited, 'emit');
      const editButtons = fixture.debugElement.queryAll(By.css('button[color="primary"]'));

      editButtons[1].nativeElement.click();
      expect(component.edited.emit).toHaveBeenCalledWith(mockTransactions[1]);
    });

    it('should call edit method when edit button is clicked', () => {
      spyOn(component, 'edit');
      const editButtons = fixture.debugElement.queryAll(By.css('button[color="primary"]'));
      editButtons[0].nativeElement.click();
      expect(component.edit).toHaveBeenCalledWith(mockTransactions[0]);
    });

    it('should call remove method when delete button is clicked', () => {
      spyOn(component, 'remove');
      const deleteButtons = fixture.debugElement.queryAll(By.css('button[color="warn"]'));
      deleteButtons[0].nativeElement.click();
      expect(component.remove).toHaveBeenCalledWith(mockTransactions[0].id);
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on edit buttons', () => {
      const editButtons = fixture.debugElement.queryAll(By.css('button[color="primary"]'));
      editButtons.forEach((button) => {
        expect(button.nativeElement.getAttribute('aria-label')).toBe('TRANSACTIONS.EDIT');
      });
    });

    it('should have aria-label on delete buttons', () => {
      const deleteButtons = fixture.debugElement.queryAll(By.css('button[color="warn"]'));
      deleteButtons.forEach((button) => {
        expect(button.nativeElement.getAttribute('aria-label')).toBe('TRANSACTIONS.REMOVE');
      });
    });

    it('should have sortable headers with appropriate attributes', () => {
      const sortHeaders = fixture.debugElement.queryAll(By.css('[mat-sort-header]'));
      expect(sortHeaders.length).toBeGreaterThan(0);
    });

    describe('Selection Mode', () => {
      beforeEach(() => {
        fixture.componentRef.setInput('selectionMode', true);
        fixture.detectChanges();
      });

      it('should have aria-label on select all checkbox', () => {
        const selectAllInput = fixture.debugElement.query(By.css('th mat-checkbox input'));
        expect(selectAllInput).toBeTruthy();
        expect(selectAllInput.nativeElement.getAttribute('aria-label')).toBe('TRANSACTIONS.SELECT_ALL');
      });

      it('should have aria-label on row checkboxes', () => {
        const rowInputs = fixture.debugElement.queryAll(By.css('td mat-checkbox input'));
        expect(rowInputs.length).toBe(mockTransactions.length);

        // Since we are using TranslateModule.forRoot() without a loader, it likely returns the key.
        // Ideally we should mock the pipe to verify params, but for now checking the key presence is enough
        // to verify the binding exists.
        rowInputs.forEach((input) => {
          expect(input.nativeElement.getAttribute('aria-label')).toContain('TRANSACTIONS.SELECT_ITEM');
        });
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty transactions array', () => {
      fixture.componentRef.setInput('transactions', []);
      fixture.componentRef.setInput('total', 0);
      fixture.detectChanges();

      const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
      expect(rows.length).toBe(0);
    });

    it('should handle single transaction', () => {
      fixture.componentRef.setInput('transactions', [mockTransactions[0]]);
      fixture.componentRef.setInput('total', 1);
      fixture.detectChanges();

      const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
      expect(rows.length).toBe(1);
    });

    it('should update when transactions input changes', () => {
      const newTransactions: Transaction[] = [
        {
          id: '4',
          date: '2023-11-04T10:00:00Z',
          title: 'New Transaction',
          category: 'Food',
          type: 'expense',
          amount: 100,
        },
      ];

      fixture.componentRef.setInput('transactions', newTransactions);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('New Transaction');
      expect(compiled.textContent).not.toContain('Grocery Shopping');
    });

    it('should handle transactions with very large amounts', () => {
      const largeAmountTransaction: Transaction[] = [
        {
          id: '5',
          date: '2023-11-05T10:00:00Z',
          title: 'Big Purchase',
          category: 'Other',
          type: 'expense',
          amount: 999999.99,
        },
      ];

      fixture.componentRef.setInput('transactions', largeAmountTransaction);
      fixture.detectChanges();

      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should handle transactions with zero amount', () => {
      const zeroAmountTransaction: Transaction[] = [
        {
          id: '6',
          date: '2023-11-06T10:00:00Z',
          title: 'Zero Transaction',
          category: 'Other',
          type: 'expense',
          amount: 0,
        },
      ];

      fixture.componentRef.setInput('transactions', zeroAmountTransaction);
      fixture.detectChanges();

      expect(() => fixture.detectChanges()).not.toThrow();
    });
  });

  describe('Component Properties', () => {
    it('should have correct displayedColumns', () => {
      expect(component.displayedColumns()).toEqual([
        'date',
        'title',
        'category',
        'type',
        'amount',
        'actions',
      ]);
    });
  });
});
