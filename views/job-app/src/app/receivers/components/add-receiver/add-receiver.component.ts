import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { ReceiverService } from '../../services/receiver';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AbstractControl } from '@angular/forms';
import { markAsTouched } from 'app/shared/utilities/forms';
import { HeaderService } from 'app/shared/services/header/header.service';
import * as textMask from 'app/shared/utilities/input-masking';
import emailMask from 'text-mask-addons/dist/emailMask';

const pageTitle = 'Add Receiver';

@Component({
    selector: 'add-receiver',
    templateUrl: './add-receiver.component.html'
})
export class AddReceiverComponent implements OnInit {
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



    addReceiver() {
        if (this.receiverFormGroup.valid) {
            this.isLoading = true;
            const newReceiver = {
                ...this.receiverFormGroup.value,
                phoneNumber: textMask.removePhoneMask(this.receiverFormGroup.controls.phoneNumber.value)
            }

            this._productService.addReceiver(newReceiver).subscribe(data => {
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
