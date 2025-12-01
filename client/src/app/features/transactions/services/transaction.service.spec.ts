import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('resets pagination when filters change', fakeAsync(() => {
    tick(100);
    httpMock.expectOne((req) => req.url === '/api/transactions').flush({ items: [], total: 0 });

    service.pagination.set({
      pageIndex: 2,
      pageSize: 10,
    });

    service.updateFilters({ search: 'rent' });
    tick(100);

    const req = httpMock.expectOne((request) => request.url === '/api/transactions');
    expect(req.request.params.get('page')).toBe('0');
    req.flush({ items: [], total: 0 });

    expect(service.pagination().pageIndex).toBe(0);
  }));

  it('updates a transaction and refreshes the list', fakeAsync(() => {
    tick(100);
    httpMock.expectOne((req) => req.url === '/api/transactions').flush({ items: [], total: 0 });

    const existing = {
      id: 't1',
      title: 'Rent',
      amount: 1000,
      category: 'Housing',
      date: new Date().toISOString(),
      type: 'expense' as const,
    };
    service.transactions.set([existing]);

    const changes = {
      title: 'Updated Rent',
      amount: 1200,
      category: 'Housing',
      date: existing.date,
      type: 'expense' as const,
    };

    let resolved = false;
    service.update(existing.id, changes).then(() => (resolved = true));

    const putReq = httpMock.expectOne(
      (req) => req.method === 'PUT' && req.url === `/api/transactions/${existing.id}`
    );
    expect(putReq.request.body).toEqual(changes);
    putReq.flush({ id: existing.id, ...changes });

    tick();
    tick(100);

    const refreshReq = httpMock.expectOne(
      (req) => req.method === 'GET' && req.url === '/api/transactions'
    );
    refreshReq.flush({ items: [{ id: existing.id, ...changes }], total: 1 });

    tick();

    expect(resolved).toBeTrue();
    expect(service.transactions()[0].title).toBe('Updated Rent');
  }));
});


