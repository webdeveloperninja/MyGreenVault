import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

import { SharedModule } from '../shared/shared.module';
import { AddPlantComponent } from './components/add-plant/add-plant.component';
import { DetailComponent } from './components/detail/detail.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { PlantCardComponent } from './components/plant-card/plant-card.component';
import { PlantsComponent } from './components/plants/plants.component';
import { QtyWeightValueComponent } from './components/qty-weight-value/qty-weight-value.component';
import { SaleAdapterComponent } from './components/sale-adapter/sale-adapter.component';
import { UpdatePlantComponent } from './components/update-plant/update-plant.component';
import { BasicInfoComponent } from './containers/basic-info/basic-info.component';
import { KanbanComponent } from './containers/kanban/kanban.component';
import { SaleComponent } from './containers/sale/sale.component';
import { SalesListComponent } from './containers/sales-list/sales-list.component';
import { TransactionComponent } from './containers/transaction/transaction.component';
import { FilterPipe } from './pipes/filter.pipe';
import { JobStatusPipe } from './pipes/job-status.pipe';
import { RoomTypeImagePipe } from '../shared/pipes/room-type-image.pipe';
import { UnitPipe } from './pipes/unit.pipe';
import { routes } from './plants.routing';
import { ExpenseService } from './services/expense';
import { NoteService } from './services/note';
import { PlantsService } from './services/plants';
import { SaleService } from './services/sale.service';
import { TodoService } from './services/todo';
import { DeleteImageComponent } from './components/delete-image/delete-image.component';

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
    BasicInfoComponent,
    PlantsComponent,
    AddPlantComponent,
    UpdatePlantComponent,
    FilterPipe,
    JobStatusPipe,
    DetailComponent,
    ExpensesComponent,
    KanbanComponent,
    PlantCardComponent,
    SaleComponent,
    SalesListComponent,
    QtyWeightValueComponent,
    UnitPipe,
    TransactionComponent,
    SaleAdapterComponent,
    DeleteImageComponent
  ],
  providers: [PlantsService, ExpenseService, TodoService, NoteService, SaleService],
  exports: []
})
export class PlantsModule {}
