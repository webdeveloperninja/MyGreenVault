import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { ReceiverService } from 'app/receivers/services/receiver';

@Component({
    selector: 'update-receiver',
    templateUrl: './update-receiver.component.html',
    styleUrls: ['./update-receiver.component.scss']
})
export class UpdateReceiverComponent {
    @Input() parentFormGroup: FormGroup;

    isLoading = false;

    constructor(
        private _receiverService: ReceiverService
    ) { }

    updateReceiver() {
        this.isLoading = true;
        this._receiverService.updateReceiver(this.parentFormGroup.value).subscribe(data => {
            this.parentFormGroup.reset();
            this.isLoading = false;
        });
    }

    isRequiredValidator(control: AbstractControl) {
        if (control && control.touched && control.invalid && control.hasError('required')) {
            return true;
        }
        return false;
    }
}
