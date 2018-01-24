import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { ProductService } from '../../services/product';
import { Observable } from 'rxjs';

@Component({
    selector: 'add-product',
    templateUrl: './add-receiver.component.html',
    styleUrls: ['./add-receiver.component.scss']
})
export class AddReceiverComponent implements OnInit {
    receiverFormGroup: FormGroup;
    isAddProductLoading: boolean = false;
    addToolSuccess: boolean = false;
    showMoreFields: boolean = false;
    showMoreFieldsText: string = 'show more';

    @ViewChild('productForm') productForm: NgForm;

    @Output('closeAddProductModal')
    closeAddProductModal: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input('skip') skip: number;
    @Input('take') take: number;

    constructor(
        private _formBuilder: FormBuilder,
        private _productService: ProductService
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

    addProduct(receiverFormGroup) {
        this.isAddProductLoading = true;

        let receiver = {
            stateLicenseNumber: this.receiverFormGroup.controls['stateLicenseNumber'].value,
            typeOfLicense: this.receiverFormGroup.controls['typeOfLicense'].value,
            businessName: this.receiverFormGroup.controls['businessName'].value,
            businessAddress: this.receiverFormGroup.controls['businessAddress'].value,
            businessCity: this.receiverFormGroup.controls['businessCity'].value,
            businessState: this.receiverFormGroup.controls['businessState'].value,
            businessZip: this.receiverFormGroup.controls['businessZip'].value,
            phoneNumber: this.receiverFormGroup.controls['phoneNumber'].value,
            contactName: this.receiverFormGroup.controls['contactName'].value,
        };

        this._productService.addProduct(receiver).first().subscribe((product) => {
            console.log('product', product);
            if (1 === 1) {
                this.receiverFormGroup.reset();
                this._productService.doSearch();
                this.isAddProductLoading = false;
                this.addToolSuccess = true;
                Observable.timer(5000).first().subscribe(data => {
                    this.addToolSuccess = false;
                });
            } else {
                this.isAddProductLoading = false;
            }
        });
    
    }

    closeModal() {
        this.closeAddProductModal.emit(true);
    }

    ngAfterViewChecked() {
        this.formChanged();
    }

    formChanged() {
        if (this.productForm) {
            this.productForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }
    }

    toggleShowMoreFields() {
        if (this.showMoreFields) {
            this.showMoreFields = false;
            this.showMoreFieldsText = 'show more';
        } else {
            this.showMoreFields = true;
            this.showMoreFieldsText = 'show less';
        }
    }


    onValueChanged(data?: any) {
        if (!this.productForm) { return; }
        const form = this.productForm.form;
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'companyName': '',
        'contactName': '',
        'contactPhoneNumber': '',
        'contactEmail': '',
        'toolNumber': '',
        'toolName': '',
        'toolDescription': ''
    };

    validationMessages = {
        'companyName': {
            'required': 'Company Name is required.'
        },
        'contactName': {
            'required': 'Contact Name is required.'
        },
        'contactPhoneNumber': {
            'required': 'Phone Number is required.'
        },
        'contactEmail': {
            'required': 'Contact Email is required.'
        },
        'toolNumber': {
            'required': 'tool Number is required.'
        },
        'toolName': {
            'required': 'tool Name is required.'
        },
        'toolDescription': {
            'required': 'tool Description is required.'
        },
    };

}
