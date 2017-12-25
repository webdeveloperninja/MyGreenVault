import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';

import { routes } from './plants.routing';

import { KanbanComponent } from './components/kanban/kanban.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import { UpdateJobComponent } from './components/update-job/update-job.component';
import { JobCheckoutsComponent } from './components/job-detail/job-checkouts/job-checkouts.component';
import { JobContactComponent } from './components/job-detail/job-contact/job-contact.component';
import { ToolUsageGraphComponent } from './components/job-detail/tool-usage-graph/tool-usage-graph.component';

import { ActiveJobService } from './services/activeJob';
import { JobsService } from './services/jobs';

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
        JobsComponent,
        JobCardComponent,
        AddJobComponent,
        UpdateJobComponent,
        JobCheckoutsComponent,
        JobContactComponent
    ],
    providers: [
        ActiveJobService,
        JobsService
    ],
    exports: [
    ]
})
export class PlantsModule {}