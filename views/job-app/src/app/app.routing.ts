import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
    { path: 'dashboard', component: WelcomeComponent },
    { path: '', component: WelcomeComponent }
];