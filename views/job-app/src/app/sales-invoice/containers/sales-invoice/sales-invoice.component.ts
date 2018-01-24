import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from 'app/shared/services/header/header.service';

const headerText: string = 'Sales Invoice / Shipping Manifest';

@Component({
    selector: 'ti-sales-invoice',
    templateUrl: './sales-invoice.component.html',
    styleUrls: ['./sales-invoice.component.scss']
})
export class SalesInvoiceComponent implements OnInit {
    shippingManifest: FormGroup;

    showShipperInformation: boolean = false;
    showReceiverInformation: boolean = false;
    showDistributorInformation: boolean = false;
    showProductShippedDetails: boolean = true;

    constructor(
        private _fb: FormBuilder, 
        private _headerService: HeaderService) { }

    ngOnInit() {
        this.shippingManifest = this._fb.group({
            shipperInformation: this._fb.group({
                stateLicenseNumber: [''],
                typeOfLicense: [''],
                businessName: [''],
                businessAddress: [''],
                city: [''],
                state: [''],
                zip: [''],
                phoneNumber: [''],
                contactName: ['']
            }),
            receiverInformation: this._fb.group({
                stateLicenseNumber: [''],
                typeOfLicense: [''],
                businessName: [''],
                businessAddress: [''],
                city: [''],
                state: [''],
                zip: [''],
                phoneNumber: [''],
                contactName: ['']
            }),
            distributorInformation: this._fb.group({
                stateLicenseNumber: [''],
                businessName: [''],
                businessAddress: [''],
                city: [''],
                state: [''],
                zip: [''],
                phoneNumber: [''],
                contactName: [''],
                driversName: [''],
                driversLicenseNumber: [''],
                vehicleMake: [''],
                vehicleModel: [''],
                vehicleLicensePlateNumber: [''],
                actualDateTimeOfArrival: ['']
            }),
            productShippedDetails: this._fb.group({
                isShipper: ['true'],
                shipper: this._fb.group({
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
                    totalRetailValue: ['']
                })
            })
        });

        this._headerService.setHeaderText(headerText);

        this.shippingManifest.valueChanges.subscribe(data => {
            console.log('data', data);
        });
    }

    addShipper() {
        this.showShipperInformation = true;
        this.showReceiverInformation = false;
        this.showDistributorInformation = false;
        this.showProductShippedDetails = false;
    }

    addShippedProduct() {
        this.showShipperInformation = false;
        this.showReceiverInformation = false;
        this.showDistributorInformation = false;
        this.showProductShippedDetails = true;
    }


    addDistributor() {
        this.showDistributorInformation = true;
        this.showReceiverInformation = false;
        this.showShipperInformation = false;
        this.showProductShippedDetails = false;
    }

    closeShipper(): void {
        this.showShipperInformation = false;
    }

    closeReceiver(): void {
        this.showReceiverInformation = false;
    }

    closeDistributor(): void {
        this.showDistributorInformation = false;
    }

    closeProductShippedInformation(): void {
        this.showProductShippedDetails = false;
    }

    addReceiver() {
        this.showReceiverInformation = true;
        this.showShipperInformation = false;
        this.showDistributorInformation = false;
        this.showProductShippedDetails = false;
    }
}
