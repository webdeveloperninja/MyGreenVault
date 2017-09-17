import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AddJobComponent } from './components/add-job/add-job.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { RouterModule, Routes } from '@angular/router';
import { FilterPipe } from './pipes/filter.pipe';
import { JobStatusPipe } from './pipes/job-status.pipe';
import { JobsService } from './services/jobs';
import { ActiveJobService } from './services/activeJob';
import { UpdateJobComponent } from './components/update-job/update-job.component';


import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { routes } from './jobs.routing';
import { KanbanComponent } from './components/kanban/kanban.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { JobCheckoutsComponent } from './components/job-detail/job-checkouts/job-checkouts.component';
import { ToolUsageGraphComponent } from './components/job-detail/tool-usage-graph/tool-usage-graph.component';
import { JobContactComponent } from './components/job-detail/job-contact/job-contact.component';
import { SetupDocComponent } from './components/setup-doc/setup-doc.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        ChartsModule,
        RouterModule.forChild(routes),
        NgbModule.forRoot()
    ],
    declarations: [
        JobsComponent,
        AddJobComponent,
        UpdateJobComponent,
        FilterPipe,
        JobStatusPipe,
        KanbanComponent,
        JobCardComponent,
        JobDetailComponent,
        JobCheckoutsComponent,
        ToolUsageGraphComponent,
        JobContactComponent,
        SetupDocComponent
    ],
    providers: [
        JobsService,
        ActiveJobService
    ],
    exports: [
        JobsComponent,
        AddJobComponent,
        UpdateJobComponent
    ]
})
export class JobsModule {}