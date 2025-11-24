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
});


