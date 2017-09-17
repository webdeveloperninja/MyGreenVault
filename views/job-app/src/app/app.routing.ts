import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { JobsComponent } from './jobs/components/jobs/jobs.component';

export const routes: Routes = [
    { path: '', component: JobsComponent }
];