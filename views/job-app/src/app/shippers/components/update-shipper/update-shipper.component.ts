import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { ReceiverService } from 'app/shippers/services/receiver';

@Component({
    selector: 'update-receiver',
    templateUrl: './update-shipper.component.html',
    styleUrls: ['./update-shipper.component.scss']
})
export class UpdateShipperComponent {
    @Input() parentFormGroup: FormGroup;
    @Output() shipperUpdated = new EventEmitter<boolean>();

    isLoading = false;

    constructor(
        private _receiverService: ReceiverService
    ) { }

    updateReceiver() {
        this.isLoading = true;
        this._receiverService.updateReceiver(this.parentFormGroup.value).subscribe(data => {
            this.parentFormGroup.reset();
            this.isLoading = false;
            this.shipperUpdated.next(true);
        });
    }

    isRequiredValidator(control: AbstractControl) {
        if (control && control.touched && control.invalid && control.hasError('required')) {
            return true;
        }
        return false;
    }
}
