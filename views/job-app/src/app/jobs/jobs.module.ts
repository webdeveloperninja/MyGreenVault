import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
        JobsComponent,
        AddJobComponent,
        UpdateJobComponent,
        FilterPipe,
        JobStatusPipe,
        KanbanComponent,
        JobCardComponent,
        JobDetailComponent
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