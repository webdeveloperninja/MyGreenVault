import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AddReceiverComponent } from './components/add-receiver/add-receiver.component';
import { ReceiversComponent } from './components/receivers/receivers.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductService } from './services/product';
import { ActiveWeedService } from './services/active-weed';
import { UpdateProductComponent } from './components/update-product/update-product.component';

import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { routes } from './products.routing';
import { CheckoutWeedComponent } from './components/checkout-weed/checkout-weed.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

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
        ReceiversComponent,
        AddReceiverComponent,
        UpdateProductComponent,
        CheckoutWeedComponent,
        ProductDetailComponent
    ],
    providers: [
        ProductService,
        ActiveWeedService
    ],
    exports: [
        ReceiversComponent,
        AddReceiverComponent,
        UpdateProductComponent
    ]
})
export class ProductsModule {}