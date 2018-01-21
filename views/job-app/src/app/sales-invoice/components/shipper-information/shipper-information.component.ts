import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'ti-shipper-information',
    templateUrl: './shipper-information.component.html',
    styleUrls: ['./shipper-information.component.scss']
})
export class ShipperInformationComponent {
    @Input() shipperInformation: FormGroup;
    @Output() close = new EventEmitter<boolean>();

    closeForm(): void {
        this.close.emit(true);
    }
}
