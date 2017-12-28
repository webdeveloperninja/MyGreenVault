import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';

import { routes } from './plants.routing';

import { KanbanComponent } from './components/kanban/kanban.component';
import { PlantsComponent } from './components/plants/plants.component';
import { PlantContainerComponent } from './components/plant-detail/plant-container.component';
import { PlantCardComponent } from './components/plant-card/plant-card.component';
import { AddPlantComponent } from './components/add-plant/add-plant.component';
import { UpdatePlantComponent } from './components/update-plant/update-plant.component';
import { FilterPipe } from './pipes/filter.pipe';
import { JobStatusPipe } from './pipes/job-status.pipe';
import { PlantsService } from './services/plants';
import { DetailComponent } from './components/plant-detail/detail/detail.component';
import { ExpensesComponent } from './components/plant-detail/expenses/expenses.component';
import { ExpenseService } from './services/expense';
import { TodoService } from './services/todo';
import { TodoComponent } from './components/plant-detail/todo/todo.component';

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
        KanbanComponent,
        PlantsComponent,
        PlantCardComponent,
        AddPlantComponent,
        UpdatePlantComponent,
        PlantContainerComponent,
        FilterPipe,
        JobStatusPipe,
        DetailComponent,
        ExpensesComponent,
        TodoComponent
    ],
    providers: [
        PlantsService,
        ExpenseService,
        TodoService
    ],
    exports: [
    ]
})
export class PlantsModule {}