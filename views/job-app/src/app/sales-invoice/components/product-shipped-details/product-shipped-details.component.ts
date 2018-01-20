import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'vault-product-shipped-details',
    templateUrl: './product-shipped-details.component.html',
    styleUrls: ['./product-shipped-details.component.scss']
})
export class ProductShippedDetailsComponent {
    @Input() productShippedDetails: FormGroup;
    @Output() close = new EventEmitter<boolean>();

    closeForm(): void {
        this.close.emit(true);
    }

    get isShipper(): boolean {
        return this.productShippedDetails.controls.isShipper.value === 'true' ? true : false;
    }

}
