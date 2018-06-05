import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  @Input() plantNumber: number;
  @ViewChild('plantSale') plantSale;

  constructor(private readonly _modalService: NgbModal) {}

  openAddSale() {
    this._modalService.open(this.plantSale);
  }
}
