import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ti-job-checkouts',
  templateUrl: './job-checkouts.component.html',
  styleUrls: ['./job-checkouts.component.scss']
})
export class JobCheckoutsComponent implements OnInit {
  private _checkouts;

  @Input('checkouts')
  set checkouts(checkouts: any) {
    let updatedCheckouts = this.formatCheckoutData(checkouts);
    this._checkouts = updatedCheckouts;
  }
  
  get checkouts() {
    return this._checkouts;
  }

  formatCheckoutData(checkouts) {
    if (checkouts) {
      let updatedCheckouts = checkouts.reduce((checkoutData, checkout) => {
        if (!checkoutData.toolNames.includes(checkout.toolName)) {
          checkoutData.toolNames.push(checkout.toolName);
          checkoutData.toolCost.push(checkout.cost);
          checkoutData.qty.push(checkout.toolCheckoutQty);
        } else {
          let index = checkoutData.toolNames.indexOf(checkout.toolName);
          checkoutData.toolCost[index] = Number(checkoutData.toolCost[index]) + Number(checkout.cost);
          checkoutData.qty[index] = Number(checkoutData.qty[index]) + Number(checkout.toolCheckoutQty);
        }

        checkoutData.combineCost = Number(checkoutData.combineCost) + Number(checkout.cost);

        return checkoutData;
      }, {
        toolNames: [],
        toolCost: [],
        qty: [],
        combineCost: 0
      });
      return updatedCheckouts;
    }
  }

  constructor() { }

  ngOnInit() {
    this._checkouts = {
      toolNames: [],
      toolCost: [],
      qty: []
    };
  }

  isCheckoutEmptyAndNotLoading() {
    if (this.checkouts && this.checkouts.length) {
      return false;
    }
    return true;
  }

}

