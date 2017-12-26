import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductsComponent } from './components/products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductService } from './services/product';
import { ActiveWeedService } from './services/active-weed';
import { UpdateProductComponent } from './components/update-product/update-product.component';

import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { routes } from './products.routing';
import { AddWeedQtyComponent } from './components/add-weed-qty/add-weed-qty.component';
import { CheckoutWeedComponent } from './components/checkout-weed/checkout-weed.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { WeedQtyStatusComponent } from './components/products/weed-qty-status/weed-qty-status.component';

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
        ProductsComponent,
        AddProductComponent,
        UpdateProductComponent,
        AddWeedQtyComponent,
        CheckoutWeedComponent,
        ProductDetailComponent,
        WeedQtyStatusComponent
    ],
    providers: [
        ProductService,
        ActiveWeedService
    ],
    exports: [
        ProductsComponent,
        AddProductComponent,
        UpdateProductComponent
    ]
})
export class ProductsModule {}