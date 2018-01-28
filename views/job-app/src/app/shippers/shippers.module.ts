import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { AddShipperComponent } from './components/add-shipper/add-shipper.component';
import { ShippersComponent } from './components/shippers/shippers.component';
import { RouterModule, Routes } from '@angular/router';
import { ReceiverService } from './services/receiver';

import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { routes } from './shippers.routing';
import { UpdateShipperComponent } from './components/update-shipper/update-shipper.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        TextMaskModule,
        RouterModule.forChild(routes),
        NgbModule.forRoot()
    ],
    declarations: [
        ShippersComponent,
        AddShipperComponent,
        UpdateShipperComponent
    ],
    providers: [
        ReceiverService
    ],
    exports: [
        AddShipperComponent
    ]
})
export class ShippersModule {}