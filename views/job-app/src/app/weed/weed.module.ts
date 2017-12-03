import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AddWeedComponent } from './components/add-weed/add-weed.component';
import { WeedComponent } from './components/weed/weed.component';
import { RouterModule, Routes } from '@angular/router';
import { WeedService } from './services/weed';
import { ActiveWeedService } from './services/active-weed';
import { UpdateWeedComponent } from './components/update-weed/update-weed.component';

import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { routes } from './weed.routing';
import { AddWeedQtyComponent } from './components/add-weed-qty/add-weed-qty.component';
import { CheckoutWeedComponent } from './components/checkout-weed/checkout-weed.component';
import { WeedQtyStatusComponent } from './components/weed/weed-qty-status/weed-qty-status.component';

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
        WeedComponent,
        AddWeedComponent,
        UpdateWeedComponent,
        AddWeedQtyComponent,
        CheckoutWeedComponent,
        WeedQtyStatusComponent,
    ],
    providers: [
        WeedService,
        ActiveWeedService
    ],
    exports: [
        WeedComponent,
        AddWeedComponent,
        UpdateWeedComponent
    ]
})
export class WeedModule {}