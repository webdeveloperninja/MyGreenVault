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

        if (!!checkouts) {

        let updatedCheckouts = checkouts.reduce((checkoutData, checkout) => {
                if (!checkoutData.toolNames.includes(checkout.tool.toolName)) {
                    checkoutData.toolNames.push(checkout.tool.toolName);
                    checkoutData.toolCost.push(Number(checkout.tool.toolCost) * Number(checkout.toolQty));
                    checkoutData.qty.push(Number(checkout.toolQty));
                } else {
                    let index = checkoutData.toolNames.indexOf(checkout.tool.toolName);
                    checkoutData.toolCost[index] = Number(checkoutData.toolCost[index]) + (Number(checkout.tool.toolCost) * Number(checkout.toolQty));
                    checkoutData.qty[index] = Number(checkoutData.qty[index]) + Number(checkout.toolQty);
                }

                checkoutData.combineCost = Number(checkoutData.combineCost) + (Number(checkout.tool.toolCost) * Number(checkout.toolQty));

                return checkoutData;
            }, {
                toolNames: [],
                toolCost: [],
                qty: [],
                combineCost: 0
            });

            // this.checkouts = updatedCheckouts;
            this._checkouts = updatedCheckouts;
        }
        

        }


    get checkouts() {
        return this._checkouts;
    }

    @Input() isCheckoutsLoading;

    ngOnInit() {
        
    }
}

