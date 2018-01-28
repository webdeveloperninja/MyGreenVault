import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '**', redirectTo: 'plants?skip=0&take=8', pathMatch: 'full' }
];