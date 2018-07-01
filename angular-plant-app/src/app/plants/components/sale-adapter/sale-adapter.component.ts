import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { SaleComponent } from '../../containers/sale/sale.component';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'sale-adapter',
  templateUrl: './sale-adapter.component.html',
  styleUrls: ['./sale-adapter.component.scss']
})
export class SaleAdapterComponent {
  @Input() plantNumber: number;
  @ViewChild(SaleComponent) sale: SaleComponent;
  @Output() close = new EventEmitter();

  sellingPlantLoading$ = this._saleService.sellingPlantLoading$;

  sellPlant() {
    this.sale.sellProduct();
  }

  closeForm() {
    this.close.emit();
  }

  constructor(private readonly _saleService: SaleService) {}
}
