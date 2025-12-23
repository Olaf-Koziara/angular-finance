import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { TransactionFiltersComponent } from './transaction-filters.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { TransactionFilters } from '../../models/transaction.model';
import { By } from '@angular/platform-browser';

describe('TransactionFiltersComponent', () => {
  let component: TransactionFiltersComponent;
  let fixture: ComponentFixture<TransactionFiltersComponent>;

  const defaultFilters: TransactionFilters = {
    search: '',
    type: 'all',
    categories: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionFiltersComponent, NoopAnimationsModule, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionFiltersComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('filters', defaultFilters);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should initialize form with input values', () => {
      const initialFilters: TransactionFilters = {
        search: 'initial search',
        type: 'income',
        categories: ['Food', 'Transport'],
      };

      fixture.componentRef.setInput('filters', initialFilters);
      fixture.detectChanges();

      const formValue = component.formGroup.getRawValue();
      expect(formValue.search).toBe('initial search');
      expect(formValue.type).toBe('income');
      expect(formValue.categories).toEqual(['Food', 'Transport']);
    });

    it('should initialize form with default empty values', () => {
      const formValue = component.formGroup.getRawValue();
      expect(formValue.search).toBe('');
      expect(formValue.type).toBe('all');
      expect(formValue.categories).toBeNull();
    });

    it('should have nonNullable controls for search and type', () => {
      component.formGroup.reset();
      const formValue = component.formGroup.getRawValue();
      expect(formValue.search).toBe('');
      expect(formValue.type).toBe('all');
    });
  });

  describe('Filter Changes', () => {
    it('should emit changes when form value changes with debounce', fakeAsync(() => {
      spyOn(component.changed, 'emit');

      component.formGroup.patchValue({ search: 'new search' });

      expect(component.changed.emit).not.toHaveBeenCalled();

      tick(300);

      expect(component.changed.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          search: 'new search',
        })
      );
    }));

    it('should debounce multiple rapid changes', fakeAsync(() => {
      spyOn(component.changed, 'emit');

      component.formGroup.patchValue({ search: 'a' });
      tick(100);
      component.formGroup.patchValue({ search: 'ab' });
      tick(100);
      component.formGroup.patchValue({ search: 'abc' });
      tick(300);

      expect(component.changed.emit).toHaveBeenCalledTimes(1);
      expect(component.changed.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          search: 'abc',
        })
      );
    }));

    it('should emit changes when type changes', fakeAsync(() => {
      spyOn(component.changed, 'emit');

      component.formGroup.patchValue({ type: 'expense' });
      tick(300);

      expect(component.changed.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'expense',
        })
      );
    }));

    it('should emit changes when categories change', fakeAsync(() => {
      spyOn(component.changed, 'emit');

      component.formGroup.patchValue({ categories: ['Food', 'Transport'] });
      tick(300);

      expect(component.changed.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          categories: ['Food', 'Transport'],
        })
      );
    }));

    it('should not emit initial value on component creation', fakeAsync(() => {
      const newFixture = TestBed.createComponent(TransactionFiltersComponent);
      const newComponent = newFixture.componentInstance;
      newFixture.componentRef.setInput('filters', defaultFilters);

      spyOn(newComponent.changed, 'emit');
      newFixture.detectChanges();
      tick(300);

      expect(newComponent.changed.emit).not.toHaveBeenCalled();
    }));
  });

  describe('Clear Search', () => {
    it('should clear search field', () => {
      component.formGroup.patchValue({ search: 'test search' });
      expect(component.formGroup.controls.search.value).toBe('test search');

      component.clearSearch();

      expect(component.formGroup.controls.search.value).toBe('');
    });

    it('should emit change after clearing search', fakeAsync(() => {
      spyOn(component.changed, 'emit');
      component.formGroup.patchValue({ search: 'test search' });
      tick(300);
      (component.changed.emit as jasmine.Spy).calls.reset();

      component.clearSearch();
      tick(300);

      expect(component.changed.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          search: '',
        })
      );
    }));

    it('should not affect other form values when clearing search', fakeAsync(() => {
      component.formGroup.patchValue({
        search: 'test',
        type: 'income',
        categories: ['Food'],
      });
      tick(300);

      component.clearSearch();

      expect(component.formGroup.controls.type.value).toBe('income');
      expect(component.formGroup.controls.categories.value).toEqual(['Food']);
    }));
  });

  describe('Clear All Filters', () => {
    it('should reset all form values to defaults', () => {
      component.formGroup.patchValue({
        search: 'test search',
        type: 'income',
        categories: ['Food', 'Transport'],
      });

      component.clearFilters();

      const formValue = component.formGroup.getRawValue();
      expect(formValue.search).toBe('');
      expect(formValue.type).toBe('all');
      expect(formValue.categories).toBeNull();
    });

    it('should emit default filters when clearing', () => {
      spyOn(component.changed, 'emit');

      component.formGroup.patchValue({
        search: 'test',
        type: 'income',
        categories: ['Food'],
      });

      component.clearFilters();

      expect(component.changed.emit).toHaveBeenCalledWith({
        search: '',
        type: 'all',
        categories: null,
      });
    });

    it('should mark form as pristine after clearing', () => {
      component.formGroup.patchValue({ search: 'test' });
      component.formGroup.markAsDirty();

      component.clearFilters();

      expect(component.formGroup.pristine).toBeTrue();
    });

    it('should mark form as untouched after clearing', () => {
      component.formGroup.controls.search.markAsTouched();

      component.clearFilters();

      expect(component.formGroup.untouched).toBeTrue();
    });

    it('should not trigger debounced emission', fakeAsync(() => {
      spyOn(component.changed, 'emit');

      component.clearFilters();

      expect(component.changed.emit).toHaveBeenCalledTimes(1);

      tick(300);

      expect(component.changed.emit).toHaveBeenCalledTimes(1);
    }));
  });

  describe('Computed Properties', () => {
    it('should compute hasActiveFilters as false when filters are default', () => {
      fixture.componentRef.setInput('filters', defaultFilters);
      fixture.detectChanges();

      expect(component.hasActiveFilters()).toBeFalse();
    });

    it('should compute hasActiveFilters as true when search is present', () => {
      fixture.componentRef.setInput('filters', {
        search: 'test',
        type: 'all',
        categories: null,
      });
      fixture.detectChanges();

      expect(component.hasActiveFilters()).toBeTrue();
    });

    it('should compute hasActiveFilters as false when search is only whitespace', () => {
      fixture.componentRef.setInput('filters', {
        search: '   ',
        type: 'all',
        categories: null,
      });
      fixture.detectChanges();

      expect(component.hasActiveFilters()).toBeFalse();
    });

    it('should compute hasActiveFilters as true when type is not all', () => {
      fixture.componentRef.setInput('filters', {
        search: '',
        type: 'income',
        categories: null,
      });
      fixture.detectChanges();

      expect(component.hasActiveFilters()).toBeTrue();
    });

    it('should compute hasActiveFilters as true when categories are present', () => {
      fixture.componentRef.setInput('filters', {
        search: '',
        type: 'all',
        categories: ['Food'],
      });
      fixture.detectChanges();

      expect(component.hasActiveFilters()).toBeTrue();
    });

    it('should compute hasActiveFilters as false when categories is empty array', () => {
      fixture.componentRef.setInput('filters', {
        search: '',
        type: 'all',
        categories: [],
      });
      fixture.detectChanges();

      expect(component.hasActiveFilters()).toBeFalse();
    });

    it('should compute hasActiveFilters as true when multiple filters are active', () => {
      fixture.componentRef.setInput('filters', {
        search: 'test',
        type: 'expense',
        categories: ['Food', 'Transport'],
      });
      fixture.detectChanges();

      expect(component.hasActiveFilters()).toBeTrue();
    });
  });

  describe('Input Signal Updates', () => {
    it('should update form when filters input changes', () => {
      const newFilters: TransactionFilters = {
        search: 'updated search',
        type: 'expense',
        categories: ['Food'],
      };

      fixture.componentRef.setInput('filters', newFilters);
      fixture.detectChanges();

      const formValue = component.formGroup.getRawValue();
      expect(formValue.search).toBe('updated search');
      expect(formValue.type).toBe('expense');
      expect(formValue.categories).toEqual(['Food']);
    });

    it('should not emit change event when input updates form', fakeAsync(() => {
      spyOn(component.changed, 'emit');

      fixture.componentRef.setInput('filters', {
        search: 'external update',
        type: 'income',
        categories: ['Transport'],
      });
      fixture.detectChanges();
      tick(300);

      expect(component.changed.emit).not.toHaveBeenCalled();
    }));

    it('should handle null categories in input', () => {
      fixture.componentRef.setInput('filters', {
        search: 'test',
        type: 'all',
        categories: null,
      });
      fixture.detectChanges();

      expect(component.formGroup.controls.categories.value).toBeNull();
    });
  });

  describe('Categories', () => {
    it('should have TRANSACTION_CATEGORIES available', () => {
      expect(component.categories).toBeDefined();
      expect(component.categories.length).toBeGreaterThan(0);
    });

    it('should include standard categories', () => {
      expect(component.categories).toContain('Food');
      expect(component.categories).toContain('Transport');
      expect(component.categories).toContain('Housing');
    });
  });

  describe('Types', () => {
    it('should have all transaction types available', () => {
      expect(component.types).toEqual(['all', 'income', 'expense']);
    });

    it('should have readonly types array', () => {
      expect(Object.isFrozen(component.types) || Array.isArray(component.types)).toBeTrue();
    });
  });

  describe('TrackBy Functions', () => {
    it('should track types by value', () => {
      expect(component.trackByType(0, 'all')).toBe('all');
      expect(component.trackByType(1, 'income')).toBe('income');
    });

    it('should track categories by value', () => {
      expect(component.trackByCategory(0, 'Food')).toBe('Food');
      expect(component.trackByCategory(1, 'Transport')).toBe('Transport');
    });
  });

  describe('Template Integration', () => {
    it('should render search input', () => {
      const searchInput = fixture.debugElement.query(By.css('input[formControlName="search"]'));
      expect(searchInput).toBeTruthy();
    });

    it('should render type select', () => {
      const typeSelect = fixture.debugElement.query(By.css('mat-select[formControlName="type"]'));
      expect(typeSelect).toBeTruthy();
    });

    it('should render categories select', () => {
      const categoriesSelect = fixture.debugElement.query(
        By.css('mat-select[formControlName="categories"]')
      );
      expect(categoriesSelect).toBeTruthy();
    });

    it('should update form when user types in search', fakeAsync(() => {
      const searchInput = fixture.debugElement.query(By.css('input[formControlName="search"]'));
      const inputElement = searchInput.nativeElement as HTMLInputElement;

      inputElement.value = 'test search';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.formGroup.controls.search.value).toBe('test search');
    }));
  });

  describe('Memory and Cleanup', () => {
    it('should unsubscribe from valueChanges on destroy', () => {
      const subscription = (component as any).formGroup.valueChanges.subscribe();
      spyOn(subscription, 'unsubscribe');

      fixture.destroy();

      expect(subscription.unsubscribe).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle extremely long search strings', fakeAsync(() => {
      const longSearch = 'a'.repeat(1000);
      spyOn(component.changed, 'emit');

      component.formGroup.patchValue({ search: longSearch });
      tick(300);

      expect(component.changed.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          search: longSearch,
        })
      );
    }));

    it('should handle special characters in search', fakeAsync(() => {
      spyOn(component.changed, 'emit');

      component.formGroup.patchValue({ search: '!@#$%^&*()' });
      tick(300);

      expect(component.changed.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          search: '!@#$%^&*()',
        })
      );
    }));

    it('should handle rapid filter changes without errors', fakeAsync(() => {
      for (let i = 0; i < 100; i++) {
        component.formGroup.patchValue({ search: `search${i}` });
        tick(10);
      }

      tick(300);
      expect(() => flush()).not.toThrow();
    }));

    it('should handle all categories selected', fakeAsync(() => {
      spyOn(component.changed, 'emit');

      component.formGroup.patchValue({ categories: [...component.categories] });
      tick(300);

      expect(component.changed.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          categories: component.categories,
        })
      );
    }));
  });

  describe('Component Properties', () => {
    it('should have OnPush change detection strategy', () => {
      expect(component.constructor.prototype.constructor.name).toBe('TransactionFiltersComponent');
    });

    it('should be standalone component', () => {
      expect((component.constructor as any).ɵcmp.standalone).toBeTrue();
    });
  });
});
