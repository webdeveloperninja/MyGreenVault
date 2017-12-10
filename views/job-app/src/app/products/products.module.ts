import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AddWeedComponent } from './components/add-weed/add-weed.component';
import { ProductsComponent } from './components/products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { WeedService } from './services/weed';
import { ActiveWeedService } from './services/active-weed';
import { UpdateWeedComponent } from './components/update-weed/update-weed.component';

import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { routes } from './products.routing';
import { AddWeedQtyComponent } from './components/add-weed-qty/add-weed-qty.component';
import { CheckoutWeedComponent } from './components/checkout-weed/checkout-weed.component';
// import { WeedQtyStatusComponent } from './components/weed/weed-qty-status/weed-qty-status.component';
import { WeedDetailComponent } from './components/weed-detail/weed-detail.component';

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
        AddWeedComponent,
        UpdateWeedComponent,
        AddWeedQtyComponent,
        CheckoutWeedComponent,
        // WeedQtyStatusComponent,
        WeedDetailComponent,
    ],
    providers: [
        WeedService,
        ActiveWeedService
    ],
    exports: [
        ProductsComponent,
        AddWeedComponent,
        UpdateWeedComponent
    ]
})
export class ProductsModule {}