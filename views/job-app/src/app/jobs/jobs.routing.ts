import { Routes } from '@angular/router';
import { JobsComponent } from './components/jobs/jobs.component';
import { KanbanComponent } from './components/kanban/kanban.component';

export const routes: Routes = [
    { path: 'jobs', component: JobsComponent },
    { path: 'kanban', component: KanbanComponent }
];