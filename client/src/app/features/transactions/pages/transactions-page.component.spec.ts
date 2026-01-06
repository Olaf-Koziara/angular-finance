import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsPageComponent } from './transactions-page.component';
import { TransactionService } from '../services/transaction.service';
import { signal, WritableSignal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import {
  CreateTransaction,
  Transaction,
  TransactionFilters,
  TransactionSort,
} from '../models/transaction.model';
import { PageEvent } from '@angular/material/paginator';
import { TransactionPagination } from '../services/transaction.service';

class MockTransactionService {
  transactions: WritableSignal<Transaction[]> = signal([]);
  total: WritableSignal<number> = signal(0);
  loading: WritableSignal<boolean> = signal(false);
  filters: WritableSignal<TransactionFilters> = signal({
    search: '',
    type: 'all',
    categories: null,
  });
  pagination: WritableSignal<TransactionPagination> = signal({
    pageIndex: 0,
    pageSize: 10,
  });
  sort: WritableSignal<TransactionSort> = signal({
    column: 'date',
    order: 'desc',
  });

  create = jasmine.createSpy('create').and.returnValue(Promise.resolve());
  remove = jasmine.createSpy('remove').and.returnValue(Promise.resolve());
  update = jasmine.createSpy('update').and.returnValue(Promise.resolve());
  updateFilters = jasmine.createSpy('updateFilters');
  updatePagination = jasmine.createSpy('updatePagination');
  updateSort = jasmine.createSpy('updateSort');
}

describe('TransactionsPageComponent', () => {
  let component: TransactionsPageComponent;
  let fixture: ComponentFixture<TransactionsPageComponent>;
  let mockTransactionService: MockTransactionService;

  const mockTransactions: Transaction[] = [
    {
      id: '1',
      title: 'Grocery Shopping',
      amount: 50.25,
      category: 'Food',
      date: '2023-11-01T10:00:00Z',
      type: 'expense',
    },
    {
      id: '2',
      title: 'Salary',
      amount: 3000,
      category: 'Other',
      date: '2023-11-02T14:30:00Z',
      type: 'income',
    },
  ];

  beforeEach(async () => {
    mockTransactionService = new MockTransactionService();

    await TestBed.configureTestingModule({
      imports: [TransactionsPageComponent, NoopAnimationsModule, TranslateModule.forRoot()],
      providers: [{ provide: TransactionService, useValue: mockTransactionService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Service Integration', () => {
    it('should inject TransactionService', () => {
      expect((component as any).transactionService).toBeDefined();
    });

    it('should expose transactions from service', () => {
      mockTransactionService.transactions.set(mockTransactions);
      expect(component.transactions()).toEqual(mockTransactions);
    });

    it('should expose total from service', () => {
      mockTransactionService.total.set(100);
      expect(component.total()).toBe(100);
    });

    it('should expose loading from service', () => {
      mockTransactionService.loading.set(true);
      expect(component.loading()).toBe(true);
    });

    it('should expose filters from service', () => {
      const filters: TransactionFilters = {
        search: 'test',
        type: 'income',
        categories: ['Food'],
      };
      mockTransactionService.filters.set(filters);
      expect(component.filters()).toEqual(filters);
    });

    it('should expose pagination from service', () => {
      const pagination: TransactionPagination = {
        pageIndex: 2,
        pageSize: 25,
      };
      mockTransactionService.pagination.set(pagination);
      expect(component.pagination()).toEqual(pagination);
    });

    it('should expose sort from service', () => {
      const sort: TransactionSort = {
        column: 'amount',
        order: 'asc',
      };
      mockTransactionService.sort.set(sort);
      expect(component.sort()).toEqual(sort);
    });

    it('should have pageSizeOptions defined', () => {
      expect(component.pageSizeOptions).toEqual([5, 10, 25, 50]);
    });
  });

  describe('Create Transaction', () => {
    it('should call service create method', () => {
      const newTransaction: CreateTransaction = {
        title: 'New Transaction',
        amount: 100,
        category: 'Food',
        date: '2023-11-05T00:00:00Z',
        type: 'expense',
      };

      component.createTransaction(newTransaction);

      expect(mockTransactionService.create).toHaveBeenCalledWith(newTransaction);
    });

    it('should handle form submission', () => {
      const formComponent = fixture.debugElement.query(By.css('app-transaction-form'));
      expect(formComponent).toBeTruthy();

      spyOn(component, 'createTransaction');

      const newTransaction: CreateTransaction = {
        title: 'Test',
        amount: 100,
        category: 'Food',
        date: '2023-11-05T00:00:00Z',
        type: 'expense',
      };

      formComponent.componentInstance.submitted.emit(newTransaction);

      expect(component.createTransaction).toHaveBeenCalledWith(newTransaction);
    });
  });

  describe('Remove Transaction', () => {
    it('should call service remove method', () => {
      component.removeTransaction('123');

      expect(mockTransactionService.remove).toHaveBeenCalledWith('123');
    });

    it('should handle list item removal', () => {
      mockTransactionService.transactions.set(mockTransactions);
      fixture.detectChanges();

      const listComponent = fixture.debugElement.query(By.css('app-transaction-list'));
      expect(listComponent).toBeTruthy();

      spyOn(component, 'removeTransaction');

      listComponent.componentInstance.removed.emit('1');

      expect(component.removeTransaction).toHaveBeenCalledWith('1');
    });
  });

  describe('Filter Changes', () => {
    it('should call service updateFilters method', () => {
      const filterChanges: Partial<TransactionFilters> = {
        search: 'test',
        type: 'income',
      };

      component.handleFilterChange(filterChanges);

      expect(mockTransactionService.updateFilters).toHaveBeenCalledWith(filterChanges);
    });

    it('should handle filter component changes', () => {
      const filtersComponent = fixture.debugElement.query(By.css('app-transaction-filters'));
      expect(filtersComponent).toBeTruthy();

      spyOn(component, 'handleFilterChange');

      const filterChanges: Partial<TransactionFilters> = {
        search: 'test',
      };

      filtersComponent.componentInstance.changed.emit(filterChanges);

      expect(component.handleFilterChange).toHaveBeenCalledWith(filterChanges);
    });
  });

  describe('Pagination Changes', () => {
    it('should call service updatePagination method', () => {
      const pageEvent: PageEvent = {
        pageIndex: 2,
        pageSize: 25,
        length: 100,
      };

      component.handlePageChange(pageEvent);

      expect(mockTransactionService.updatePagination).toHaveBeenCalledWith({
        pageIndex: 2,
        pageSize: 25,
      });
    });

    it('should handle pagination component changes', () => {
      mockTransactionService.transactions.set(mockTransactions);
      mockTransactionService.total.set(100);
      fixture.detectChanges();

      const paginationComponent = fixture.debugElement.query(By.css('app-transaction-pagination'));
      expect(paginationComponent).toBeTruthy();

      spyOn(component, 'handlePageChange');

      const pageEvent: PageEvent = {
        pageIndex: 1,
        pageSize: 10,
        length: 100,
      };

      paginationComponent.componentInstance.pageChange.emit(pageEvent);

      expect(component.handlePageChange).toHaveBeenCalledWith(pageEvent);
    });
  });

  describe('Sort Changes', () => {
    it('should call service updateSort method', () => {
      const sortChange: TransactionSort = {
        column: 'amount',
        order: 'asc',
      };

      component.handleSortChange(sortChange);

      expect(mockTransactionService.updateSort).toHaveBeenCalledWith(sortChange);
    });

    it('should handle list sort changes', () => {
      mockTransactionService.transactions.set(mockTransactions);
      fixture.detectChanges();

      const listComponent = fixture.debugElement.query(By.css('app-transaction-list'));
      expect(listComponent).toBeTruthy();

      spyOn(component, 'handleSortChange');

      const sortChange: TransactionSort = {
        column: 'title',
        order: 'asc',
      };

      listComponent.componentInstance.sortChanged.emit(sortChange);

      expect(component.handleSortChange).toHaveBeenCalledWith(sortChange);
    });
  });

  describe('Edit Transaction', () => {
    it('should set editingTransaction signal when starting edit', () => {
      expect(component.editingTransaction()).toBeNull();

      component.startEditing(mockTransactions[0]);

      expect(component.editingTransaction()).toEqual(mockTransactions[0]);
    });

    it('should clear editingTransaction signal when canceling edit', () => {
      component.editingTransaction.set(mockTransactions[0]);

      component.cancelEditing();

      expect(component.editingTransaction()).toBeNull();
    });

    it('should call service update method when updating transaction', async () => {
      const updates: CreateTransaction = {
        title: 'Updated Title',
        amount: 200,
        category: 'Transport',
        date: '2023-11-05T00:00:00Z',
        type: 'expense',
      };

      await component.updateTransaction({
        id: '123',
        changes: updates,
      });

      expect(mockTransactionService.update).toHaveBeenCalledWith('123', updates);
    });

    it('should clear editingTransaction after successful update', async () => {
      component.editingTransaction.set(mockTransactions[0]);

      const updates: CreateTransaction = {
        title: 'Updated',
        amount: 200,
        category: 'Food',
        date: '2023-11-05T00:00:00Z',
        type: 'expense',
      };

      await component.updateTransaction({
        id: '1',
        changes: updates,
      });

      expect(component.editingTransaction()).toBeNull();
    });

    it('should not clear editingTransaction if update fails', async () => {
      component.editingTransaction.set(mockTransactions[0]);
      mockTransactionService.update.and.returnValue(Promise.reject(new Error('Update failed')));

      const updates: CreateTransaction = {
        title: 'Updated',
        amount: 200,
        category: 'Food',
        date: '2023-11-05T00:00:00Z',
        type: 'expense',
      };

      await component.updateTransaction({
        id: '1',
        changes: updates,
      });

      expect(component.editingTransaction()).toEqual(mockTransactions[0]);
    });

    it('should handle list edit event', () => {
      mockTransactionService.transactions.set(mockTransactions);
      fixture.detectChanges();

      const listComponent = fixture.debugElement.query(By.css('app-transaction-list'));
      expect(listComponent).toBeTruthy();

      spyOn(component, 'startEditing');

      listComponent.componentInstance.edited.emit(mockTransactions[0]);

      expect(component.startEditing).toHaveBeenCalledWith(mockTransactions[0]);
    });

    it('should pass editingTransaction to form', () => {
      component.editingTransaction.set(mockTransactions[0]);
      fixture.detectChanges();

      const formComponent = fixture.debugElement.query(By.css('app-transaction-form'));
      expect(formComponent.componentInstance.transaction()).toEqual(mockTransactions[0]);
    });

    it('should handle form update event', async () => {
      component.editingTransaction.set(mockTransactions[0]);
      fixture.detectChanges();

      const formComponent = fixture.debugElement.query(By.css('app-transaction-form'));

      spyOn(component, 'updateTransaction').and.returnValue(Promise.resolve());

      const updates: CreateTransaction = {
        title: 'Updated',
        amount: 200,
        category: 'Food',
        date: '2023-11-05T00:00:00Z',
        type: 'expense',
      };

      formComponent.componentInstance.updated.emit({
        id: '1',
        changes: updates,
      });

      expect(component.updateTransaction).toHaveBeenCalledWith({
        id: '1',
        changes: updates,
      });
    });

    it('should handle form cancel event', () => {
      component.editingTransaction.set(mockTransactions[0]);
      fixture.detectChanges();

      const formComponent = fixture.debugElement.query(By.css('app-transaction-form'));

      spyOn(component, 'cancelEditing');

      formComponent.componentInstance.cancelled.emit();

      expect(component.cancelEditing).toHaveBeenCalled();
    });
  });

  describe('Template Rendering', () => {
    it('should render transaction form', () => {
      const form = fixture.debugElement.query(By.css('app-transaction-form'));
      expect(form).toBeTruthy();
    });

    it('should render transaction filters', () => {
      const filters = fixture.debugElement.query(By.css('app-transaction-filters'));
      expect(filters).toBeTruthy();
    });

    it('should render transaction list', () => {
      mockTransactionService.transactions.set(mockTransactions);
      fixture.detectChanges();

      const list = fixture.debugElement.query(By.css('app-transaction-list'));
      expect(list).toBeTruthy();
    });

    it('should render transaction pagination', () => {
      mockTransactionService.transactions.set(mockTransactions);
      mockTransactionService.total.set(100);
      fixture.detectChanges();

      const pagination = fixture.debugElement.query(By.css('app-transaction-pagination'));
      expect(pagination).toBeTruthy();
    });

    it('should pass correct props to transaction list', () => {
      mockTransactionService.transactions.set(mockTransactions);
      mockTransactionService.total.set(100);
      mockTransactionService.loading.set(true);
      mockTransactionService.sort.set({ column: 'amount', order: 'asc' });
      fixture.detectChanges();

      const list = fixture.debugElement.query(By.css('app-transaction-list'));
      expect(list.componentInstance.transactions()).toEqual(mockTransactions);
      expect(list.componentInstance.total()).toBe(100);
      expect(list.componentInstance.loading()).toBe(true);
      expect(list.componentInstance.sort()).toEqual({ column: 'amount', order: 'asc' });
    });

    it('should pass correct props to transaction filters', () => {
      const filters: TransactionFilters = {
        search: 'test',
        type: 'income',
        categories: ['Food'],
      };
      mockTransactionService.filters.set(filters);
      fixture.detectChanges();

      const filtersComponent = fixture.debugElement.query(By.css('app-transaction-filters'));
      expect(filtersComponent.componentInstance.filters()).toEqual(filters);
    });

    it('should pass correct props to transaction pagination', () => {
      mockTransactionService.total.set(100);
      mockTransactionService.pagination.set({ pageIndex: 2, pageSize: 25 });
      fixture.detectChanges();

      const paginationComponent = fixture.debugElement.query(By.css('app-transaction-pagination'));
      expect(paginationComponent.componentInstance.length()).toBe(100);
      expect(paginationComponent.componentInstance.pageSize()).toBe(25);
      expect(paginationComponent.componentInstance.pageIndex()).toBe(2);
      expect(paginationComponent.componentInstance.pageSizeOptions()).toEqual([5, 10, 25, 50]);
    });
  });

  describe('Integration Flow', () => {
    it('should complete full create flow', () => {
      const newTransaction: CreateTransaction = {
        title: 'New Transaction',
        amount: 100,
        category: 'Food',
        date: '2023-11-05T00:00:00Z',
        type: 'expense',
      };

      const formComponent = fixture.debugElement.query(By.css('app-transaction-form'));
      formComponent.componentInstance.submitted.emit(newTransaction);

      expect(mockTransactionService.create).toHaveBeenCalledWith(newTransaction);
    });

    it('should complete full edit flow', async () => {
      mockTransactionService.transactions.set(mockTransactions);
      fixture.detectChanges();

      const listComponent = fixture.debugElement.query(By.css('app-transaction-list'));
      listComponent.componentInstance.edited.emit(mockTransactions[0]);

      expect(component.editingTransaction()).toEqual(mockTransactions[0]);
      fixture.detectChanges();

      const formComponent = fixture.debugElement.query(By.css('app-transaction-form'));
      const updates: CreateTransaction = {
        title: 'Updated Title',
        amount: 200,
        category: 'Transport',
        date: '2023-11-05T00:00:00Z',
        type: 'expense',
      };

      formComponent.componentInstance.updated.emit({
        id: mockTransactions[0].id,
        changes: updates,
      });

      await fixture.whenStable();

      expect(mockTransactionService.update).toHaveBeenCalledWith(mockTransactions[0].id, updates);
      expect(component.editingTransaction()).toBeNull();
    });

    it('should complete full delete flow', () => {
      mockTransactionService.transactions.set(mockTransactions);
      fixture.detectChanges();

      const listComponent = fixture.debugElement.query(By.css('app-transaction-list'));
      listComponent.componentInstance.removed.emit(mockTransactions[0].id);

      expect(mockTransactionService.remove).toHaveBeenCalledWith(mockTransactions[0].id);
    });

    it('should complete full filter flow', () => {
      const filtersComponent = fixture.debugElement.query(By.css('app-transaction-filters'));
      const filterChanges: Partial<TransactionFilters> = {
        search: 'test',
        type: 'income',
      };

      filtersComponent.componentInstance.changed.emit(filterChanges);

      expect(mockTransactionService.updateFilters).toHaveBeenCalledWith(filterChanges);
    });

    it('should complete full pagination flow', () => {
      mockTransactionService.transactions.set(mockTransactions);
      mockTransactionService.total.set(100);
      fixture.detectChanges();

      const paginationComponent = fixture.debugElement.query(By.css('app-transaction-pagination'));
      const pageEvent: PageEvent = {
        pageIndex: 2,
        pageSize: 25,
        length: 100,
      };

      paginationComponent.componentInstance.pageChange.emit(pageEvent);

      expect(mockTransactionService.updatePagination).toHaveBeenCalledWith({
        pageIndex: 2,
        pageSize: 25,
      });
    });

    it('should complete full sort flow', () => {
      mockTransactionService.transactions.set(mockTransactions);
      fixture.detectChanges();

      const listComponent = fixture.debugElement.query(By.css('app-transaction-list'));
      const sortChange: TransactionSort = {
        column: 'amount',
        order: 'asc',
      };

      listComponent.componentInstance.sortChanged.emit(sortChange);

      expect(mockTransactionService.updateSort).toHaveBeenCalledWith(sortChange);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty transaction list', () => {
      mockTransactionService.transactions.set([]);
      mockTransactionService.total.set(0);
      fixture.detectChanges();

      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should handle null editingTransaction', () => {
      component.editingTransaction.set(null);
      fixture.detectChanges();

      const formComponent = fixture.debugElement.query(By.css('app-transaction-form'));
      expect(formComponent.componentInstance.transaction()).toBeNull();
    });

    it('should handle rapid edit-cancel cycles', () => {
      for (let i = 0; i < 10; i++) {
        component.startEditing(mockTransactions[0]);
        expect(component.editingTransaction()).toEqual(mockTransactions[0]);

        component.cancelEditing();
        expect(component.editingTransaction()).toBeNull();
      }
    });

    it('should handle update with same transaction being edited', async () => {
      const transaction = mockTransactions[0];
      component.editingTransaction.set(transaction);

      const updates: CreateTransaction = {
        title: 'Updated',
        amount: 200,
        category: 'Food',
        date: '2023-11-05T00:00:00Z',
        type: 'expense',
      };

      await component.updateTransaction({
        id: transaction.id,
        changes: updates,
      });

      expect(mockTransactionService.update).toHaveBeenCalledWith(transaction.id, updates);
      expect(component.editingTransaction()).toBeNull();
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

    it('should have editingTransaction signal', () => {
      expect(component.editingTransaction).toBeDefined();
      expect(typeof component.editingTransaction).toBe('function');
    });

    it('should have all required methods', () => {
      expect(component.createTransaction).toBeDefined();
      expect(component.removeTransaction).toBeDefined();
      expect(component.handleFilterChange).toBeDefined();
      expect(component.handlePageChange).toBeDefined();
      expect(component.handleSortChange).toBeDefined();
      expect(component.startEditing).toBeDefined();
      expect(component.cancelEditing).toBeDefined();
      expect(component.updateTransaction).toBeDefined();
    });
  });
});
