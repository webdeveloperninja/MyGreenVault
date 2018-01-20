import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';
import { SalesInvoiceComponent } from './containers/sales-invoice/sales-invoice.component';
import { routes } from './sales-invoice.routing';
import { ShipperInformationComponent } from './components/shipper-information/shipper-information.component';
import { ReceiverInformationComponent } from './components/receiver-information/receiver-information.component';
import { DistributorInformationComponent } from './components/distributor-information/distributor-information.component';
import { ProductShippedDetailsComponent } from './components/product-shipped-details/product-shipped-details.component';
import { ShipperComponent } from './components/shipper/shipper.component';
import { ReceiverComponent } from './components/receiver/receiver.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NgbModule.forRoot()
    ],
    declarations: [
        SalesInvoiceComponent,
        ShipperInformationComponent,
        ReceiverInformationComponent,
        DistributorInformationComponent,
        ProductShippedDetailsComponent,
        ShipperComponent,
        ReceiverComponent
    ],
    providers: [
    ],
    exports: [
    ]
})
export class SalesInvoiceModule {}