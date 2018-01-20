import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'vault-shipper',
    templateUrl: './shipper.component.html',
    styleUrls: ['./shipper.component.scss']
})
export class ShipperComponent {
    @Input() shipper: FormGroup;
    @Output() close = new EventEmitter<boolean>();

    closeForm(): void {
        this.close.emit(true);
    }
}
