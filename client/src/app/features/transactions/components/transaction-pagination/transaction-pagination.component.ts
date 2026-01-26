import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-transaction-pagination',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './transaction-pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionPaginationComponent {
  readonly length = input.required<number>();
  readonly pageSize = input.required<number>();
  readonly pageIndex = input.required<number>();
  readonly pageSizeOptions = input.required<readonly number[]>();
  readonly pageChange = output<PageEvent>();

  handlePage(event: PageEvent): void {
    this.pageChange.emit(event);
  }
}
