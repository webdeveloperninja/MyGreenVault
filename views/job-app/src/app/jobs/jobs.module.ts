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
import { SettingsService } from './services/settings';
import { SidebarService } from './services/sidebar';
import { UpdateJobComponent } from './components/update-job/update-job.component';

import {NgbModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';

export const routes: Routes = [
    { path: 'add-job', component: AddJobComponent },
    { path: '', component: JobsComponent }
];


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
    ],
    declarations: [
        JobsComponent,
        AddJobComponent,
        UpdateJobComponent,
        FilterPipe,
        JobStatusPipe
    ],
    providers: [
        JobsService,
        SettingsService,
        SidebarService,
        ActiveJobService
    ],
    exports: [
        JobsComponent,
        AddJobComponent,
        UpdateJobComponent
    ]
})
export class JobsModule {}