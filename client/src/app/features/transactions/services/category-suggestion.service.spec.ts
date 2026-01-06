import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategorySuggestionService } from './category-suggestion.service';
import { environment } from '../../../../environments/environment';

describe('CategorySuggestionService', () => {
  let service: CategorySuggestionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategorySuggestionService],
    });

    service = TestBed.inject(CategorySuggestionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return suggested category', async () => {
    const title = 'Coffee at Starbucks';
    const expectedCategory = 'Food';

    const promise = service.suggestCategory(title);

    const req = httpMock.expectOne(`${environment.apiUrl}/transaction/suggest-category`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ title });

    req.flush({ category: expectedCategory });

    const result = await promise;
    expect(result).toBe(expectedCategory);
  });

  it('should handle HTTP errors', async () => {
    const title = 'Test Transaction';

    const promise = service.suggestCategory(title);

    const req = httpMock.expectOne(`${environment.apiUrl}/transaction/suggest-category`);
    req.error(new ProgressEvent('error'), { status: 500, statusText: 'Server Error' });

    await expectAsync(promise).toBeRejected();
  });
});
