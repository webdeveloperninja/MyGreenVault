import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { ReceiversModule } from '../receivers/receivers.module';

import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';
import { SalesInvoiceComponent } from './containers/sales-invoice/sales-invoice.component';
import { routes } from './sales-invoice.routing';
import { ProductComponent } from './components/product/product.component';
import { ReceiverComponent } from './components/receiver/receiver.component';
import { ShippersModule } from 'app/shippers/shippers.module';
import { SalesService } from './services/sales/sales.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ReceiversModule,
    ShippersModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot()
  ],
  declarations: [SalesInvoiceComponent, ProductComponent, ReceiverComponent],
  providers: [SalesService],
  exports: []
})
export class SalesInvoiceModule {}
