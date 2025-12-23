import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick, flush } from '@angular/core/testing';
import { TransactionService } from './transaction.service';
import {
  CreateTransaction,
  Transaction,
} from '../models/transaction.model';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionService],
    });

    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should initialize with empty transactions', () => {
      expect(service.transactions()).toEqual([]);
    });

    it('should initialize with zero total', () => {
      expect(service.total()).toBe(0);
    });

    it('should initialize with loading false', () => {
      expect(service.loading()).toBe(false);
    });

    it('should initialize with no error', () => {
      expect(service.error()).toBeNull();
    });

    it('should initialize with default filters', () => {
      const filters = service.filters();
      expect(filters.search).toBe('');
      expect(filters.type).toBe('all');
      expect(filters.categories).toEqual([]);
    });

    it('should initialize with default pagination', () => {
      const pagination = service.pagination();
      expect(pagination.pageIndex).toBe(0);
      expect(pagination.pageSize).toBe(10);
    });

    it('should initialize with default sort', () => {
      const sort = service.sort();
      expect(sort.column).toBe('date');
      expect(sort.order).toBe('desc');
    });
  });

  describe('Fetch Effect', () => {
    it('should fetch transactions on initialization', fakeAsync(() => {
      tick(100);

      const req = httpMock.expectOne((request) => request.url === '/api/transactions');
      expect(req.request.method).toBe('GET');

      req.flush({ items: mockTransactions, total: 2 });
      tick();

      expect(service.transactions()).toEqual(mockTransactions);
      expect(service.total()).toBe(2);
      expect(service.loading()).toBe(false);
    }));

    it('should set loading to true while fetching', fakeAsync(() => {
      tick(100);
      expect(service.loading()).toBe(true);

      const req = httpMock.expectOne((request) => request.url === '/api/transactions');
      req.flush({ items: [], total: 0 });
      tick();

      expect(service.loading()).toBe(false);
    }));

    it('should include search param when filter is set', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.updateFilters({ search: 'grocery' });
      tick(100);

      const req = httpMock.expectOne((request) => request.url === '/api/transactions');
      expect(req.request.params.get('search')).toBe('grocery');
      req.flush({ items: [], total: 0 });
    }));

    it('should include type param when filter is set', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.updateFilters({ type: 'income' });
      tick(100);

      const req = httpMock.expectOne((request) => request.url === '/api/transactions');
      expect(req.request.params.get('type')).toBe('income');
      req.flush({ items: [], total: 0 });
    }));

    it('should not include type param when type is all', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.updateFilters({ type: 'all' });
      tick(100);

      const req = httpMock.expectOne((request) => request.url === '/api/transactions');
      expect(req.request.params.get('type')).toBeNull();
      req.flush({ items: [], total: 0 });
    }));

    it('should include categories params when filter is set', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.updateFilters({ categories: ['Food', 'Transport'] });
      tick(100);

      const req = httpMock.expectOne((request) => request.url === '/api/transactions');
      const categoriesParams = req.request.params.getAll('categories[]');
      expect(categoriesParams).toEqual(['Food', 'Transport']);
      req.flush({ items: [], total: 0 });
    }));

    it('should include pagination params', fakeAsync(() => {
      tick(100);

      const req = httpMock.expectOne((request) => request.url === '/api/transactions');
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('limit')).toBe('10');
      req.flush({ items: [], total: 0 });
    }));

    it('should include sort params', fakeAsync(() => {
      tick(100);

      const req = httpMock.expectOne((request) => request.url === '/api/transactions');
      expect(req.request.params.get('sortBy')).toBe('date');
      expect(req.request.params.get('sortOrder')).toBe('desc');
      req.flush({ items: [], total: 0 });
    }));

    it('should handle fetch errors', fakeAsync(() => {
      tick(100);

      const req = httpMock.expectOne((request) => request.url === '/api/transactions');
      req.flush('Error', { status: 500, statusText: 'Server Error' });
      tick();

      expect(service.error()).toBe('Nie udało się pobrać transakcji');
      expect(service.transactions()).toEqual([]);
      expect(service.total()).toBe(0);
      expect(service.loading()).toBe(false);
    }));

    it('should debounce fetch requests', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.updateFilters({ search: 'a' });
      tick(50);
      service.updateFilters({ search: 'ab' });
      tick(50);
      service.updateFilters({ search: 'abc' });
      tick(100);

      const requests = httpMock.match((request) => request.url === '/api/transactions');
      expect(requests.length).toBe(1);
      requests[0].flush({ items: [], total: 0 });
    }));
  });

  describe('Update Filters', () => {
    it('should update filters signal', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.updateFilters({ search: 'test' });

      expect(service.filters().search).toBe('test');
    }));

    it('should merge filter changes with existing filters', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.updateFilters({ search: 'test' });
      service.updateFilters({ type: 'income' });

      const filters = service.filters();
      expect(filters.search).toBe('test');
      expect(filters.type).toBe('income');
    }));

    it('should reset pageIndex to 0 when filters change', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.pagination.set({ pageIndex: 5, pageSize: 10 });
      service.updateFilters({ search: 'test' });

      expect(service.pagination().pageIndex).toBe(0);
    }));

    it('should preserve pageSize when filters change', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.pagination.set({ pageIndex: 5, pageSize: 25 });
      service.updateFilters({ search: 'test' });

      expect(service.pagination().pageSize).toBe(25);
    }));

    it('should trigger new fetch when filters change', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.updateFilters({ search: 'test' });
      tick(100);

      const req = httpMock.expectOne((request) => request.url === '/api/transactions');
      expect(req.request.params.get('search')).toBe('test');
      req.flush({ items: [], total: 0 });
    }));
  });

  describe('Update Pagination', () => {
    it('should update pagination signal', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.updatePagination({ pageIndex: 2 });

      expect(service.pagination().pageIndex).toBe(2);
    }));

    it('should merge pagination changes with existing pagination', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.updatePagination({ pageIndex: 2 });
      service.updatePagination({ pageSize: 25 });

      const pagination = service.pagination();
      expect(pagination.pageIndex).toBe(2);
      expect(pagination.pageSize).toBe(25);
    }));

    it('should trigger new fetch when pagination changes', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.updatePagination({ pageIndex: 2 });
      tick(100);

      const req = httpMock.expectOne((request) => request.url === '/api/transactions');
      expect(req.request.params.get('page')).toBe('2');
      req.flush({ items: [], total: 0 });
    }));
  });

  describe('Update Sort', () => {
    it('should update sort signal', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.updateSort({ column: 'amount', order: 'asc' });

      const sort = service.sort();
      expect(sort.column).toBe('amount');
      expect(sort.order).toBe('asc');
    }));

    it('should trigger new fetch when sort changes', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.updateSort({ column: 'amount', order: 'asc' });
      tick(100);

      const req = httpMock.expectOne((request) => request.url === '/api/transactions');
      expect(req.request.params.get('sortBy')).toBe('amount');
      expect(req.request.params.get('sortOrder')).toBe('asc');
      req.flush({ items: [], total: 0 });
    }));
  });

  describe('Create Transaction', () => {
    it('should create a new transaction', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      const newTransaction: CreateTransaction = {
        title: 'New Transaction',
        amount: 100,
        category: 'Food',
        date: '2023-11-05T00:00:00Z',
        type: 'expense',
      };

      service.create(newTransaction);

      const req = httpMock.expectOne(
        (request) => request.method === 'POST' && request.url === '/api/transactions'
      );
      expect(req.request.body).toEqual(newTransaction);

      const createdTransaction: Transaction = {
        id: '3',
        ...newTransaction,
      };
      req.flush(createdTransaction);
      tick();

      expect(service.transactions().some((t) => t.id === '3')).toBeTrue();
    }));

    it('should optimistically add transaction to list', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: mockTransactions, total: 2 });

      service.transactions.set([...mockTransactions]);

      const newTransaction: CreateTransaction = {
        title: 'New Transaction',
        amount: 100,
        category: 'Food',
        date: '2023-11-05T00:00:00Z',
        type: 'expense',
      };

      service.create(newTransaction);

      expect(service.transactions().length).toBe(3);
      expect(service.transactions()[2].id).toBe('');
    }));

    it('should update temporary transaction with real one after creation', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      const newTransaction: CreateTransaction = {
        title: 'New Transaction',
        amount: 100,
        category: 'Food',
        date: '2023-11-05T00:00:00Z',
        type: 'expense',
      };

      service.create(newTransaction);

      const req = httpMock.expectOne((request) => request.method === 'POST');
      const createdTransaction: Transaction = { id: '123', ...newTransaction };
      req.flush(createdTransaction);
      tick();

      expect(service.transactions().some((t) => t.id === '123')).toBeTrue();
      expect(service.transactions().some((t) => t.id === '')).toBeFalse();
    }));

    it('should rollback on create error', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: mockTransactions, total: 2 });

      service.transactions.set([...mockTransactions]);
      const originalLength = service.transactions().length;

      const newTransaction: CreateTransaction = {
        title: 'New Transaction',
        amount: 100,
        category: 'Food',
        date: '2023-11-05T00:00:00Z',
        type: 'expense',
      };

      service.create(newTransaction);

      const req = httpMock.expectOne((request) => request.method === 'POST');
      req.flush('Error', { status: 500, statusText: 'Server Error' });
      tick();

      expect(service.transactions().length).toBe(originalLength);
      expect(service.error()).toBe('Nie udało się utworzyć transakcji');
    }));

    it('should clear error before creating', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.error.set('Previous error');

      const newTransaction: CreateTransaction = {
        title: 'New Transaction',
        amount: 100,
        category: 'Food',
        date: '2023-11-05T00:00:00Z',
        type: 'expense',
      };

      service.create(newTransaction);

      expect(service.error()).toBeNull();
    }));
  });

  describe('Update Transaction', () => {
    it('should update an existing transaction', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: mockTransactions, total: 2 });

      service.transactions.set([...mockTransactions]);

      const updates: CreateTransaction = {
        title: 'Updated Title',
        amount: 200,
        category: 'Transport',
        date: '2023-11-05T00:00:00Z',
        type: 'expense',
      };

      service.update('1', updates);

      const putReq = httpMock.expectOne(
        (request) => request.method === 'PUT' && request.url === '/api/transactions/1'
      );
      expect(putReq.request.body).toEqual(updates);

      const updatedTransaction: Transaction = { id: '1', ...updates };
      putReq.flush(updatedTransaction);
      tick(100);

      const refreshReq = httpMock.expectOne((request) => request.method === 'GET');
      refreshReq.flush({ items: [updatedTransaction], total: 1 });
      tick();

      expect(service.transactions()[0].title).toBe('Updated Title');
    }));

    it('should refresh transaction list after update', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: mockTransactions, total: 2 });

      service.transactions.set([...mockTransactions]);

      const updates: CreateTransaction = {
        title: 'Updated',
        amount: 200,
        category: 'Food',
        date: '2023-11-05T00:00:00Z',
        type: 'expense',
      };

      service.update('1', updates);

      const putReq = httpMock.expectOne((request) => request.method === 'PUT');
      putReq.flush({ id: '1', ...updates });
      tick(100);

      const getReq = httpMock.expectOne((request) => request.method === 'GET');
      expect(getReq.request.url).toBe('/api/transactions');
      getReq.flush({ items: [], total: 0 });
    }));

    it('should rollback on update error', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: mockTransactions, total: 2 });

      service.transactions.set([...mockTransactions]);
      const originalTitle = service.transactions()[0].title;

      const updates: CreateTransaction = {
        title: 'Updated Title',
        amount: 200,
        category: 'Food',
        date: '2023-11-05T00:00:00Z',
        type: 'expense',
      };

      let errorThrown = false;
      service.update('1', updates).catch(() => {
        errorThrown = true;
      });

      const putReq = httpMock.expectOne((request) => request.method === 'PUT');
      putReq.flush('Error', { status: 500, statusText: 'Server Error' });
      tick();

      expect(errorThrown).toBeTrue();
      expect(service.transactions()[0].title).toBe(originalTitle);
      expect(service.error()).toBe('Nie udało się zaktualizować transakcji');
    }));

    it('should clear error before updating', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: mockTransactions, total: 2 });

      service.error.set('Previous error');
      service.transactions.set([...mockTransactions]);

      const updates: CreateTransaction = {
        title: 'Updated',
        amount: 200,
        category: 'Food',
        date: '2023-11-05T00:00:00Z',
        type: 'expense',
      };

      service.update('1', updates);

      expect(service.error()).toBeNull();
    }));
  });

  describe('Remove Transaction', () => {
    it('should delete a transaction', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: mockTransactions, total: 2 });

      service.remove('1');

      const deleteReq = httpMock.expectOne(
        (request) => request.method === 'DELETE' && request.url === '/api/transactions/1'
      );
      deleteReq.flush({});
      tick(100);

      const refreshReq = httpMock.expectOne((request) => request.method === 'GET');
      refreshReq.flush({ items: [mockTransactions[1]], total: 1 });
      tick();

      expect(service.transactions().some((t) => t.id === '1')).toBeFalse();
    }));

    it('should set loading to true while deleting', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.remove('1');

      expect(service.loading()).toBe(true);

      const deleteReq = httpMock.expectOne((request) => request.method === 'DELETE');
      deleteReq.flush({});
      tick(100);

      httpMock.expectOne((request) => request.method === 'GET').flush({ items: [], total: 0 });
      tick();

      expect(service.loading()).toBe(false);
    }));

    it('should refresh transaction list after delete', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: mockTransactions, total: 2 });

      service.remove('1');

      const deleteReq = httpMock.expectOne((request) => request.method === 'DELETE');
      deleteReq.flush({});
      tick(100);

      const getReq = httpMock.expectOne((request) => request.method === 'GET');
      expect(getReq.request.url).toBe('/api/transactions');
      getReq.flush({ items: [], total: 0 });
    }));

    it('should handle delete errors', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.remove('1');

      const deleteReq = httpMock.expectOne((request) => request.method === 'DELETE');
      deleteReq.flush('Error', { status: 500, statusText: 'Server Error' });
      tick();

      expect(service.error()).toBe('Nie udało się usunąć transakcji');
      expect(service.loading()).toBe(false);
    }));

    it('should clear error before removing', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.error.set('Previous error');
      service.remove('1');

      expect(service.error()).toBeNull();
    }));
  });

  describe('Edge Cases', () => {
    it('should handle empty response', fakeAsync(() => {
      tick(100);

      const req = httpMock.expectOne((request) => request.url === '/api/transactions');
      req.flush({ items: [], total: 0 });
      tick();

      expect(service.transactions()).toEqual([]);
      expect(service.total()).toBe(0);
    }));

    it('should handle null categories in filters', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.updateFilters({ categories: null });
      tick(100);

      const req = httpMock.expectOne((request) => request.url === '/api/transactions');
      const categoriesParams = req.request.params.getAll('categories[]');
      expect(categoriesParams).toEqual([]);
      req.flush({ items: [], total: 0 });
    }));

    it('should handle empty string search', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.updateFilters({ search: '' });
      tick(100);

      const req = httpMock.expectOne((request) => request.url === '/api/transactions');
      expect(req.request.params.has('search')).toBeFalse();
      req.flush({ items: [], total: 0 });
    }));

    it('should handle rapid state changes', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      for (let i = 0; i < 10; i++) {
        service.updatePagination({ pageIndex: i });
      }
      tick(100);

      const requests = httpMock.match((request) => request.url === '/api/transactions');
      requests.forEach((req) => req.flush({ items: [], total: 0 }));

      expect(() => flush()).not.toThrow();
    }));

    it('should handle very large datasets', fakeAsync(() => {
      tick(100);

      const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
        id: `${i}`,
        title: `Transaction ${i}`,
        amount: 100,
        category: 'Food' as const,
        date: '2023-11-01T00:00:00Z',
        type: 'expense' as const,
      }));

      const req = httpMock.expectOne((request) => request.url === '/api/transactions');
      req.flush({ items: largeDataset, total: 1000 });
      tick();

      expect(service.transactions().length).toBe(1000);
      expect(service.total()).toBe(1000);
    }));
  });

  describe('Signal Reactivity', () => {
    it('should update computed state when filters change', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.updateFilters({ search: 'test' });
      const state = (service as any).state();

      expect(state.filters.search).toBe('test');
    }));

    it('should update computed state when pagination changes', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.updatePagination({ pageIndex: 5 });
      const state = (service as any).state();

      expect(state.pagination.pageIndex).toBe(5);
    }));

    it('should update computed state when sort changes', fakeAsync(() => {
      tick(100);
      httpMock.expectOne(() => true).flush({ items: [], total: 0 });

      service.updateSort({ column: 'amount', order: 'asc' });
      const state = (service as any).state();

      expect(state.sort.column).toBe('amount');
      expect(state.sort.order).toBe('asc');
    }));
  });
});
