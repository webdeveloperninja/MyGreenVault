import { Routes } from '@angular/router';
import { ReceiversComponent } from './components/receivers/receivers.component';
import { AddReceiverContainerComponent } from 'app/receivers/containers/add-receiver-container/add-receiver-container.component';

export const routes: Routes = [
    { path: 'receivers', component: ReceiversComponent },
    { path: 'distributors', component: ReceiversComponent },
    { path: 'receivers/add', component: AddReceiverContainerComponent }
];