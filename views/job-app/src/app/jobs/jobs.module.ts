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

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';



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
        AddJobComponent
    ]
})
export class JobsModule {}