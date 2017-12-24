import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ProductService, Tool } from '../../services/product';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../../shared/services/notification/notification.service';
import { Product } from 'app/products/models/Product';


@Component({
    selector: 'ti-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
    activeProductForm: FormGroup;
    showMoreFields: boolean = false;
    showMoreFieldsText: string = 'show more';

    @Input('skip') skip: number;
    @Input('take') take: number;
    @Input() activeProduct: Product;
        
    @Output('closeUpdateModal') closeUpdateModal: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output('isLoading') isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();


    constructor(
        private _fb: FormBuilder,
        private _productService: ProductService,
        private _notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.activeProductForm = this.createGroup();
    }

    createGroup() {
        const group = this._fb.group(
            {
                name: [this.activeProduct.name, Validators.required],
                weight: [this.activeProduct.weight, Validators.required],
                idealWeight: [this.activeProduct.idealWeight, Validators.required],
                autoOrderWeight: [this.activeProduct.autoOrderWeight],
                supplierName: [this.activeProduct.supplierName],
                supplierEmail: [this.activeProduct.supplierEmail],
                supplierPhone: [this.activeProduct.supplierPhone],
                costPerGram: [this.activeProduct.costPerGram, Validators.required],
                costPerEighth: [this.activeProduct.costPerEighth, Validators.required],
                costPerQuarter: [this.activeProduct.costPerQuarter, Validators.required],
                costPerHalf: [this.activeProduct.costPerHalf],
                costPerOunce: [this.activeProduct.costPerOunce],
                costPerQuarterPound: [this.activeProduct.costPerQuarterPound],
            }
        );
        return group;
    }

    updateProduct() {
        // this._productService.updateProduct(activeProduct.value).first().subscribe(data => {
        //     this.closeModal();
        // });
    }

    closeModal() {
        this.closeUpdateModal.emit(true);
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

}
