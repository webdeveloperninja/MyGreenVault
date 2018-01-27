import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { ReceiverService } from '../../services/receiver';
import { AbstractControl } from '@angular/forms/src/model';

@Component({
    selector: 'add-receiver',
    templateUrl: './add-shipper.component.html'
})
export class AddShipperComponent implements OnInit {
    isLoading = false;
    receiverFormGroup: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _productService: ReceiverService
    ) { }

    ngOnInit() {
        this.receiverFormGroup = this._formBuilder.group({
            stateLicenseNumber: ['', Validators.required],
            typeOfLicense: ['', Validators.required],
            businessName: ['', Validators.required],
            businessAddress: ['', Validators.required],
            businessCity: ['', Validators.required],
            businessState: ['', Validators.required],
            businessZip: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            contactName: ['', Validators.required],
        });
    }

    addProduct() {
        this.isLoading = true;
        this._productService.addReceiver(this.receiverFormGroup.value).subscribe(data => {
            this.receiverFormGroup.reset();
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
