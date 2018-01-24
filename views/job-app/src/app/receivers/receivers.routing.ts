import { Routes } from '@angular/router';
import { ReceiversComponent } from './components/receivers/receivers.component';

export const routes: Routes = [
    { path: 'receivers', component: ReceiversComponent },
    { path: 'distributors', component: ReceiversComponent }
];