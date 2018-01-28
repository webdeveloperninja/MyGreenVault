import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { ReceiverService } from '../../services/receiver';
import { AbstractControl } from '@angular/forms/src/model';
import * as textMask from 'app/shared/utilities/input-masking';

@Component({
    selector: 'add-receiver',
    templateUrl: './add-shipper.component.html'
})
export class AddShipperComponent implements OnInit {
    isLoading = false;
    receiverFormGroup: FormGroup;

    phoneMask = textMask.phoneMask;
    zipMask = textMask.zipMask;

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
        const newProduct = {
            ...this.receiverFormGroup.value,
            phoneNumber: textMask.removePhoneMask(this.receiverFormGroup.controls.phoneNumber.value)
        };

        this._productService.addReceiver(newProduct).subscribe(data => {
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
