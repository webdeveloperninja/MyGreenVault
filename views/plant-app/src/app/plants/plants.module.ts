import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

import { SharedModule } from '../shared/shared.module';
import { AddPlantComponent } from './components/add-plant/add-plant.component';
import { PlantCardComponent } from './components/plant-card/plant-card.component';
import { DetailComponent } from './components/plant-detail/detail/detail.component';
import { ExpensesComponent } from './components/plant-detail/expenses/expenses.component';
import { NotesComponent } from './components/plant-detail/notes/notes.component';
import { PlantContainerComponent } from './components/plant-detail/plant-container.component';
import { TodoComponent } from './components/plant-detail/todo/todo.component';
import { PlantsComponent } from './components/plants/plants.component';
import { UpdatePlantComponent } from './components/update-plant/update-plant.component';
import { KanbanComponent } from './containers/kanban/kanban.component';
import { SaleComponent } from './containers/sale/sale.component';
import { FilterPipe } from './pipes/filter.pipe';
import { JobStatusPipe } from './pipes/job-status.pipe';
import { routes } from './plants.routing';
import { ExpenseService } from './services/expense';
import { NoteService } from './services/note';
import { PlantsService } from './services/plants';
import { SaleService } from './services/sale.service';
import { TodoService } from './services/todo';

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
    PlantsComponent,
    AddPlantComponent,
    UpdatePlantComponent,
    PlantContainerComponent,
    FilterPipe,
    JobStatusPipe,
    DetailComponent,
    ExpensesComponent,
    TodoComponent,
    NotesComponent,
    KanbanComponent,
    PlantCardComponent,
    SaleComponent
  ],
  providers: [PlantsService, ExpenseService, TodoService, NoteService, SaleService],
  exports: []
})
export class PlantsModule {}
