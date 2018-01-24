import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { ReceiverService } from '../../services/receiver';
import { Observable } from 'rxjs';

@Component({
    selector: 'add-receiver',
    templateUrl: './add-receiver.component.html',
    styleUrls: ['./add-receiver.component.scss']
})
export class AddReceiverComponent implements OnInit {
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
        this._productService.addReceiver(this.receiverFormGroup.value);
        this.receiverFormGroup.reset();
    }
}
