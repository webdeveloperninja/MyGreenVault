import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { ReceiverService } from '../../services/receiver';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AbstractControl } from '@angular/forms';
import { markAsDirty } from 'app/shared/utilities/forms';

@Component({
    selector: 'add-receiver',
    templateUrl: './add-receiver.component.html'
})
export class AddReceiverComponent implements OnInit {
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
            contactEmail: ['']
        });
    }



    addProduct() {
        if (this.receiverFormGroup.valid) {
            this.isLoading = true;
            this._productService.addReceiver(this.receiverFormGroup.value).subscribe(data => {
                this.receiverFormGroup.reset();
                this.isLoading = false;
            });
        } else {
            markAsDirty(this.receiverFormGroup);
        }

    }

    isRequiredValidator(control: AbstractControl) {
        if (control && control.touched && control.invalid && control.hasError('required')) {
            return true;
        }
        return false;
    }
}
