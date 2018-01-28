import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { ReceiverService } from '../../services/receiver';
import { AbstractControl } from '@angular/forms/src/model';
import * as textMask from 'app/shared/utilities/input-masking';
import { HeaderService } from 'app/shared/services/header/header.service';
import { markAsTouched } from 'app/shared/utilities/forms';
import emailMask from 'text-mask-addons/dist/emailMask';

const pageTitle = 'Add shipper';

@Component({
    selector: 'add-receiver',
    templateUrl: './add-shipper.component.html'
})
export class AddShipperComponent implements OnInit {
    isLoading = false;
    receiverFormGroup: FormGroup;

    phoneMask = textMask.phoneMask;
    zipMask = textMask.zipMask;
    emailMask = emailMask;

    constructor(
        private _formBuilder: FormBuilder,
        private _productService: ReceiverService,
        private _headerService: HeaderService
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
            contactEmail: ['']
        });

        this._headerService.setHeaderText(pageTitle);
    }

    addShipper() {
        if( this.receiverFormGroup.valid) {
            this.isLoading = true;
            const newProduct = {
                ...this.receiverFormGroup.value,
                phoneNumber: textMask.removePhoneMask(this.receiverFormGroup.controls.phoneNumber.value)
            };
    
            this._productService.addReceiver(newProduct).subscribe(data => {
                this.receiverFormGroup.reset();
                this.isLoading = false;
            });
        } else {
            markAsTouched(this.receiverFormGroup);
        }
    }

    isRequiredValidator(control: AbstractControl) {
        if (control && control.touched && control.invalid && control.hasError('required')) {
            return true;
        }
        return false;
    }
}
