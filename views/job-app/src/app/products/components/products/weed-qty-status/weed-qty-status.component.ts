import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ti-tool-qty-status',
    templateUrl: './weed-qty-status.component.html',
    styleUrls: ['./weed-qty-status.component.scss']
})
export class WeedQtyStatusComponent implements OnInit {
    @Input() toolQty;
    @Input() idealToolQty;


    constructor() { }

    ngOnInit() {
    }

}
