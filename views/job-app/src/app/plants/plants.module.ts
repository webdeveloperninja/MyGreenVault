import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';

import { routes } from './plants.routing';

import { KanbanComponent } from './components/kanban/kanban.component';
import { PlantsComponent } from './components/plants/plants.component';
import { PlantDetailComponent } from './components/plant-detail/plant-detail.component';
import { PlantCardComponent } from './components/plant-card/plant-card.component';
import { AddPlantComponent } from './components/add-plant/add-plant.component';
import { UpdatePlantComponent } from './components/update-plant/update-plant.component';
import { JobCheckoutsComponent } from './components/plant-detail/job-checkouts/job-checkouts.component';
import { JobContactComponent } from './components/plant-detail/job-contact/job-contact.component';
import { ToolUsageGraphComponent } from './components/plant-detail/tool-usage-graph/tool-usage-graph.component';
import { FilterPipe } from './pipes/filter.pipe';
import { JobStatusPipe } from './pipes/job-status.pipe';

import { ActivePlantService } from './services/activePlant';
import { PlantsService } from './services/plants';

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
        JobCheckoutsComponent,
        JobContactComponent,
        PlantDetailComponent,
        FilterPipe,
        ToolUsageGraphComponent,
        JobStatusPipe
    ],
    providers: [
        ActivePlantService,
        PlantsService
    ],
    exports: [
    ]
})
export class PlantsModule {}