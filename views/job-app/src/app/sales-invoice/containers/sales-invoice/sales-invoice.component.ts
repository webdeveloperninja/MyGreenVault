import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from 'app/shared/services/header/header.service';
import { NotificationService } from 'app/shared/services/notification/notification.service';
import { ConstructionService } from 'app/construction.service';
import { createFormGroup as createReceiverFormGroup } from 'app/receivers/components/add-receiver/add-receiver.component';

const headerText: string = 'Sales Invoice / Shipping Manifest';

@Component({
    selector: 'ti-sales-invoice',
    templateUrl: './sales-invoice.component.html',
    styleUrls: ['./sales-invoice.component.scss']
})
export class SalesInvoiceComponent implements OnInit, OnDestroy {
    shippingManifest: FormGroup;

    addProduct = true;
    addReceiver = false;
    receiverInformation = false;

    resetSteps() {
        this.addProduct = false;
        this.addReceiver = false;
        this.receiverInformation = false;
    }

    constructor(
        private _fb: FormBuilder,
        private _headerService: HeaderService,
        private _notificationService: NotificationService,
        private _constructionService: ConstructionService) { }

    ngOnInit() {
        setTimeout(() => this._constructionService.turnOnConstruction());

        this.shippingManifest = this._fb.group({
            product: this._fb.group({
                uidTagNumber: [''],
                itemName: [''],
                itemDescription: [''],
                itemWeightOrCount: [''],
                qtyOrdered: [''],
                unitCost: [''],
                totalCost: ['']
            }),
            receiver: this._fb.group({
                qtyReceived: [''],
                unitRetailValue: [''],
                totalRetailValue: [''],
                receiverInformation: createReceiverFormGroup(this._fb)
            })
        });

        this._headerService.setHeaderText(headerText);

        this.shippingManifest.valueChanges.subscribe(data => {
            console.log('data', data);
        });
    }

    ngOnDestroy() {
        this._constructionService.turnOffConstruction();
        this._constructionService.turnTestFeatureOff();
    }

    sellProduct() {
        console.log(this.shippingManifest.value);
    }

    select(type) {
        this.resetSteps();
        if (type === 'product') {
            this.addProduct = true;
        } else if (type === 'receiver') {
            this.addReceiver = true;
        } else if (type === 'receiver-info') {
            this.receiverInformation = true;
        } else {
            this.addProduct = true;
        }
    }

    get receiverFormGroup() {
        return this.shippingManifest.get('receiver.receiverInformation');
    }
}
