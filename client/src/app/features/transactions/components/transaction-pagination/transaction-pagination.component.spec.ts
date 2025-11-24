import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionPaginationComponent } from './transaction-pagination.component';
import { PageEvent } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TransactionPaginationComponent', () => {
    let component: TransactionPaginationComponent;
    let fixture: ComponentFixture<TransactionPaginationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TransactionPaginationComponent, NoopAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(TransactionPaginationComponent);
        component = fixture.componentInstance;

        // Set required inputs
        fixture.componentRef.setInput('length', 100);
        fixture.componentRef.setInput('pageSize', 10);
        fixture.componentRef.setInput('pageIndex', 0);
        fixture.componentRef.setInput('pageSizeOptions', [5, 10, 25]);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit page change event', () => {
        spyOn(component.pageChange, 'emit');

        const event: PageEvent = {
            pageIndex: 1,
            pageSize: 10,
            length: 100
        };

        component.handlePage(event);

        expect(component.pageChange.emit).toHaveBeenCalledWith(event);
    });
});
