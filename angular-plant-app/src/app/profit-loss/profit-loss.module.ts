import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

import { SharedModule } from '../shared/shared.module';
import { ExpensesComponent } from './containers/expenses/expenses.component';
import { QtyWeightValueComponent } from './components/qty-weight-value/qty-weight-value.component';
import { SaleAdapterComponent } from './containers/sale-adapter/sale-adapter.component';
import { SaleComponent } from './containers/sale/sale.component';
import { SalesListComponent } from './containers/sales-list/sales-list.component';
import { TransactionComponent } from './containers/transaction/transaction.component';
import { FilterPipe } from './pipes/filter.pipe';
import { RoomTypeImagePipe } from '../shared/pipes/room-type-image.pipe';
import { UnitPipe } from './pipes/unit.pipe';
import { routes } from './profit-loss.routing';
import { ExpenseService } from './services/expense';
import { SaleService } from './services/sale.service';
import { ProfitLossComponent } from '../profit-loss/containers/profit-loss/profit-loss.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TextMaskModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot()
  ],
  declarations: [
    ProfitLossComponent,
    FilterPipe,
    ExpensesComponent,
    SaleComponent,
    SalesListComponent,
    QtyWeightValueComponent,
    UnitPipe,
    TransactionComponent,
    SaleAdapterComponent
  ],
  providers: [ExpenseService, SaleService],
  exports: []
})
export class ProfitLossModule {}
