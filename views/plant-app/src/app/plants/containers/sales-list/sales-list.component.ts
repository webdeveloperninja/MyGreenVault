import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';

import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnChanges {
  @Input() plantNumber: number;

  sales$ = this._saleService.sales$;
  salesLoading$ = this._saleService.salesLoading$;

  noSales$ = combineLatest(this.sales$, this.salesLoading$).pipe(
    map(([sales, loading]) => {
      return !!sales && sales.length === 0 && !loading;
    })
  );

  constructor(private readonly _saleService: SaleService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.plantNumber.currentValue) {
      this._saleService.getAll(this.plantNumber);
    }
  }
}
