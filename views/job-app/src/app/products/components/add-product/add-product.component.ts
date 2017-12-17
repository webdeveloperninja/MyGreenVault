import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { ProductService } from 'app/products/services/product';
import { Observable } from 'rxjs';

@Component({
    selector: 'add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
    productFormGroup: FormGroup;
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
        this.productFormGroup = this._formBuilder.group({
            name: ['', Validators.required],
            weight: ['', Validators.required],
            idealWeight: ['', Validators.required],
            autoOrderWeight: [''],
            supplierName: [''],
            supplierEmail: [''],
            supplierPhone: [''],
            costPerGram: ['', Validators.required],
            costPerEighth: ['', Validators.required],
            costPerQuarter: ['', Validators.required],
            costPerHalf: [''],
            costPerOunce: [''],
            costPerQuarterPound: [''],
        });
    }

    addProduct(productFormGroup) {
        this.isAddProductLoading = true;

        let product = {
            name: this.productFormGroup.controls['name'].value,
            weight: this.productFormGroup.controls['weight'].value,
            idealWeight: this.productFormGroup.controls['idealWeight'].value,
            autoOrderWeight: this.productFormGroup.controls['autoOrderWeight'].value,
            supplierName: this.productFormGroup.controls['supplierName'].value,
            supplierEmail: this.productFormGroup.controls['supplierEmail'].value,
            supplierPhone: this.productFormGroup.controls['supplierPhone'].value,
            costPerGram: this.productFormGroup.controls['costPerGram'].value,
            costPerEighth: this.productFormGroup.controls['costPerEighth'].value,
            costPerQuarter: this.productFormGroup.controls['costPerQuarter'].value,
            costPerHalf: this.productFormGroup.controls['costPerHalf'].value,
            costPerOunce: this.productFormGroup.controls['costPerOunce'].value,
            costPerQuarterPound: this.productFormGroup.controls['costPerQuarterPound'].value,
        };

        console.log('product', product);
        this._productService.addProduct(product).first().subscribe((product) => {
            console.log('product', product);
        });
        // this._weedService.addTool(product).subscribe((tool) => {
        //     if (1 === 1) {
        //         this.productFormGroup.reset();
        //         // this._toolsService.getTools(this.skip, this.take).first().subscribe();
        //         this.isAddProductLoading = false;
        //         this.addToolSuccess = true;
        //         Observable.timer(5000).first().subscribe(data => {
        //             this.addToolSuccess = false;
        //         });
        //     } else {
        //         this.isAddProductLoading = false;
        //     }
        // })
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
