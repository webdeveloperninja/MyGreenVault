import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { filter, map } from 'rxjs/operators';

import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnChanges {
  @Input() plantNumber: number;
  @Output() openAddSale = new EventEmitter();

  sales$ = this._saleService.sales$;
  salesLoading$ = this._saleService.salesLoading$;

  noSales$ = combineLatest(this.sales$, this.salesLoading$).pipe(
    map(([sales, loading]) => {
      return !!sales && sales.length === 0 && !loading;
    })
  );

  totalExpense$ = this.sales$.pipe(
    filter(sales => !!sales),
    map(sales => {
      return sales.reduce((acc, sale) => {
        return (acc += Number(sale.cost));
      }, 0);
    })
  );

  constructor(private readonly _saleService: SaleService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.plantNumber.currentValue) {
      this._saleService.getAll(this.plantNumber);
    }
  }

  addSale() {
    this.openAddSale.emit();
  }
}
