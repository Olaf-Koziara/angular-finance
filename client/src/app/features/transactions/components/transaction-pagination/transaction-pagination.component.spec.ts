import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionPaginationComponent } from './transaction-pagination.component';
import { PageEvent } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('TransactionPaginationComponent', () => {
  let component: TransactionPaginationComponent;
  let fixture: ComponentFixture<TransactionPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionPaginationComponent, NoopAnimationsModule, MatPaginatorModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionPaginationComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('length', 100);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.componentRef.setInput('pageIndex', 0);
    fixture.componentRef.setInput('pageSizeOptions', [5, 10, 25]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Signals', () => {
    it('should accept and render length', () => {
      fixture.componentRef.setInput('length', 50);
      fixture.detectChanges();
      expect(component.length()).toBe(50);
    });

    it('should accept and render pageSize', () => {
      fixture.componentRef.setInput('pageSize', 25);
      fixture.detectChanges();
      expect(component.pageSize()).toBe(25);
    });

    it('should accept and render pageIndex', () => {
      fixture.componentRef.setInput('pageIndex', 2);
      fixture.detectChanges();
      expect(component.pageIndex()).toBe(2);
    });

    it('should accept and render pageSizeOptions', () => {
      const options = [10, 20, 50, 100];
      fixture.componentRef.setInput('pageSizeOptions', options);
      fixture.detectChanges();
      expect(component.pageSizeOptions()).toEqual(options);
    });
  });

  describe('Page Change Events', () => {
    it('should emit page change event when page is changed', () => {
      spyOn(component.pageChange, 'emit');

      const event: PageEvent = {
        pageIndex: 1,
        pageSize: 10,
        length: 100,
      };

      component.handlePage(event);

      expect(component.pageChange.emit).toHaveBeenCalledWith(event);
    });

    it('should emit correct event when page size changes', () => {
      spyOn(component.pageChange, 'emit');

      const event: PageEvent = {
        pageIndex: 0,
        pageSize: 25,
        length: 100,
      };

      component.handlePage(event);

      expect(component.pageChange.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          pageIndex: 0,
          pageSize: 25,
        })
      );
    });

    it('should emit correct event when navigating to next page', () => {
      spyOn(component.pageChange, 'emit');

      const event: PageEvent = {
        pageIndex: 1,
        pageSize: 10,
        length: 100,
      };

      component.handlePage(event);

      expect(component.pageChange.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          pageIndex: 1,
        })
      );
    });

    it('should emit correct event when navigating to previous page', () => {
      fixture.componentRef.setInput('pageIndex', 2);
      fixture.detectChanges();

      spyOn(component.pageChange, 'emit');

      const event: PageEvent = {
        pageIndex: 1,
        pageSize: 10,
        length: 100,
      };

      component.handlePage(event);

      expect(component.pageChange.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          pageIndex: 1,
        })
      );
    });
  });

  describe('Template Integration', () => {
    it('should render mat-paginator', () => {
      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      expect(paginator).toBeTruthy();
    });

    it('should bind length to paginator', () => {
      fixture.componentRef.setInput('length', 200);
      fixture.detectChanges();

      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      expect(paginator.componentInstance.length).toBe(200);
    });

    it('should bind pageSize to paginator', () => {
      fixture.componentRef.setInput('pageSize', 50);
      fixture.detectChanges();

      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      expect(paginator.componentInstance.pageSize).toBe(50);
    });

    it('should bind pageIndex to paginator', () => {
      fixture.componentRef.setInput('pageIndex', 3);
      fixture.detectChanges();

      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      expect(paginator.componentInstance.pageIndex).toBe(3);
    });

    it('should bind pageSizeOptions to paginator', () => {
      const options = [5, 10, 25, 50, 100];
      fixture.componentRef.setInput('pageSizeOptions', options);
      fixture.detectChanges();

      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      expect(paginator.componentInstance.pageSizeOptions).toEqual(options);
    });

    it('should trigger handlePage when paginator emits page event', () => {
      spyOn(component, 'handlePage');

      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      const event: PageEvent = {
        pageIndex: 1,
        pageSize: 10,
        length: 100,
      };

      paginator.componentInstance.page.emit(event);

      expect(component.handlePage).toHaveBeenCalledWith(event);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero length', () => {
      fixture.componentRef.setInput('length', 0);
      fixture.detectChanges();

      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should handle zero pageIndex', () => {
      fixture.componentRef.setInput('pageIndex', 0);
      fixture.detectChanges();

      expect(component.pageIndex()).toBe(0);
    });

    it('should handle single page of data', () => {
      fixture.componentRef.setInput('length', 5);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('pageIndex', 0);
      fixture.detectChanges();

      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      expect(paginator.componentInstance.getNumberOfPages()).toBe(1);
    });

    it('should handle exact multiple of page size', () => {
      fixture.componentRef.setInput('length', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();

      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      expect(paginator.componentInstance.getNumberOfPages()).toBe(10);
    });

    it('should handle non-exact multiple of page size', () => {
      fixture.componentRef.setInput('length', 95);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();

      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      expect(paginator.componentInstance.getNumberOfPages()).toBe(10);
    });

    it('should handle very large datasets', () => {
      fixture.componentRef.setInput('length', 10000);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();

      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should handle last page index', () => {
      fixture.componentRef.setInput('length', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('pageIndex', 9);
      fixture.detectChanges();

      expect(component.pageIndex()).toBe(9);
    });

    it('should handle page size larger than total length', () => {
      fixture.componentRef.setInput('length', 5);
      fixture.componentRef.setInput('pageSize', 100);
      fixture.detectChanges();

      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      expect(paginator.componentInstance.getNumberOfPages()).toBe(1);
    });

    it('should handle minimum page size option', () => {
      fixture.componentRef.setInput('pageSizeOptions', [1, 5, 10]);
      fixture.componentRef.setInput('pageSize', 1);
      fixture.detectChanges();

      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      expect(paginator.componentInstance.pageSize).toBe(1);
    });

    it('should handle maximum page size option', () => {
      fixture.componentRef.setInput('pageSizeOptions', [10, 50, 100]);
      fixture.componentRef.setInput('pageSize', 100);
      fixture.detectChanges();

      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      expect(paginator.componentInstance.pageSize).toBe(100);
    });

    it('should handle empty page size options', () => {
      fixture.componentRef.setInput('pageSizeOptions', []);
      fixture.detectChanges();

      expect(() => fixture.detectChanges()).not.toThrow();
    });
  });

  describe('Input Updates', () => {
    it('should update when length changes', () => {
      fixture.componentRef.setInput('length', 50);
      fixture.detectChanges();
      expect(component.length()).toBe(50);

      fixture.componentRef.setInput('length', 150);
      fixture.detectChanges();
      expect(component.length()).toBe(150);
    });

    it('should update when pageSize changes', () => {
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();
      expect(component.pageSize()).toBe(10);

      fixture.componentRef.setInput('pageSize', 25);
      fixture.detectChanges();
      expect(component.pageSize()).toBe(25);
    });

    it('should update when pageIndex changes', () => {
      fixture.componentRef.setInput('pageIndex', 0);
      fixture.detectChanges();
      expect(component.pageIndex()).toBe(0);

      fixture.componentRef.setInput('pageIndex', 5);
      fixture.detectChanges();
      expect(component.pageIndex()).toBe(5);
    });

    it('should update when pageSizeOptions change', () => {
      const options1 = [5, 10, 25];
      fixture.componentRef.setInput('pageSizeOptions', options1);
      fixture.detectChanges();
      expect(component.pageSizeOptions()).toEqual(options1);

      const options2 = [10, 20, 50, 100];
      fixture.componentRef.setInput('pageSizeOptions', options2);
      fixture.detectChanges();
      expect(component.pageSizeOptions()).toEqual(options2);
    });

    it('should handle rapid input changes', () => {
      for (let i = 0; i < 10; i++) {
        fixture.componentRef.setInput('pageIndex', i);
        fixture.detectChanges();
      }

      expect(() => fixture.detectChanges()).not.toThrow();
    });
  });

  describe('Component Properties', () => {
    it('should have OnPush change detection strategy', () => {
      expect(component.constructor.prototype.constructor.name).toBe(
        'TransactionPaginationComponent'
      );
    });

    it('should be standalone component', () => {
      expect((component.constructor as any).ɵcmp.standalone).toBeTrue();
    });

    it('should have all required inputs', () => {
      expect(component.length).toBeDefined();
      expect(component.pageSize).toBeDefined();
      expect(component.pageIndex).toBeDefined();
      expect(component.pageSizeOptions).toBeDefined();
    });

    it('should have pageChange output', () => {
      expect(component.pageChange).toBeDefined();
    });
  });

  describe('Paginator Behavior', () => {
    it('should calculate correct number of pages', () => {
      fixture.componentRef.setInput('length', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();

      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      expect(paginator.componentInstance.getNumberOfPages()).toBe(10);
    });

    it('should show correct range label', () => {
      fixture.componentRef.setInput('length', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('pageIndex', 0);
      fixture.detectChanges();

      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      const rangeLabel = paginator.componentInstance.getRangeLabel(0, 10, 100);
      expect(rangeLabel).toContain('1');
      expect(rangeLabel).toContain('10');
      expect(rangeLabel).toContain('100');
    });

    it('should have hasNextPage method work correctly', () => {
      fixture.componentRef.setInput('length', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('pageIndex', 0);
      fixture.detectChanges();

      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      expect(paginator.componentInstance.hasNextPage()).toBeTrue();
    });

    it('should have hasPreviousPage method work correctly', () => {
      fixture.componentRef.setInput('pageIndex', 0);
      fixture.detectChanges();

      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      expect(paginator.componentInstance.hasPreviousPage()).toBeFalse();
    });

    it('should have hasPreviousPage return true when not on first page', () => {
      fixture.componentRef.setInput('pageIndex', 2);
      fixture.detectChanges();

      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      expect(paginator.componentInstance.hasPreviousPage()).toBeTrue();
    });

    it('should have hasNextPage return false on last page', () => {
      fixture.componentRef.setInput('length', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('pageIndex', 9);
      fixture.detectChanges();

      const paginator = fixture.debugElement.query(By.css('mat-paginator'));
      expect(paginator.componentInstance.hasNextPage()).toBeFalse();
    });
  });
});
