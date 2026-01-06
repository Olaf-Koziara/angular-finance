import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryPickerComponent } from './category-picker.component';
import { CategorySuggestionService } from '../../services/category-suggestion.service';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';

describe('CategoryPickerComponent', () => {
  let component: CategoryPickerComponent;
  let fixture: ComponentFixture<CategoryPickerComponent>;
  let mockCategorySuggestionService: jasmine.SpyObj<CategorySuggestionService>;

  beforeEach(async () => {
    mockCategorySuggestionService = jasmine.createSpyObj('CategorySuggestionService', [
      'suggestCategory',
    ]);

    await TestBed.configureTestingModule({
      imports: [CategoryPickerComponent, TranslateModule.forRoot(), BrowserAnimationsModule],
      providers: [
        {
          provide: CategorySuggestionService,
          useValue: mockCategorySuggestionService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryPickerComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Test Transaction');
    fixture.componentRef.setInput('selectedCategory', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit category change', () => {
    const categoryChangeSpy = jasmine.createSpy('categoryChange');
    component.categoryChange.subscribe(categoryChangeSpy);

    component.onCategoryChange('Food');

    expect(categoryChangeSpy).toHaveBeenCalledWith('Food');
  });

  it('should call AI service and emit suggested category', async () => {
    mockCategorySuggestionService.suggestCategory.and.returnValue(
      Promise.resolve('Transport')
    );
    const categoryChangeSpy = jasmine.createSpy('categoryChange');
    component.categoryChange.subscribe(categoryChangeSpy);

    await component.getSuggestion();

    expect(mockCategorySuggestionService.suggestCategory).toHaveBeenCalledWith(
      'Test Transaction'
    );
    expect(categoryChangeSpy).toHaveBeenCalledWith('Transport');
    expect(component.isLoadingSuggestion()).toBe(false);
  });

  it('should not call AI service if title is empty', async () => {
    fixture.componentRef.setInput('title', '');
    fixture.detectChanges();

    await component.getSuggestion();

    expect(mockCategorySuggestionService.suggestCategory).not.toHaveBeenCalled();
  });

  it('should handle AI service error gracefully', async () => {
    mockCategorySuggestionService.suggestCategory.and.returnValue(
      Promise.reject(new Error('API Error'))
    );
    spyOn(console, 'error');

    await component.getSuggestion();

    expect(component.isLoadingSuggestion()).toBe(false);
    expect(console.error).toHaveBeenCalled();
  });
});
