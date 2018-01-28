import { Routes } from '@angular/router';
import { ReceiversComponent } from './components/receivers/receivers.component';
import { AddReceiverComponent } from './components/add-receiver/add-receiver.component';

export const routes: Routes = [
    { path: 'receivers', component: ReceiversComponent },
    { path: 'distributors', component: ReceiversComponent },
    { path: 'receivers/add', component: AddReceiverComponent }
];