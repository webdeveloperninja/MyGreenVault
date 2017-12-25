import { Routes } from '@angular/router';
import { JobsComponent } from './components/jobs/jobs.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';

export const routes: Routes = [
    { path: 'jobs', component: JobsComponent },
    // { path: 'jobs/:jobNumber',      component: JobDetailComponent },
    { path: 'kanban', component: KanbanComponent }
];