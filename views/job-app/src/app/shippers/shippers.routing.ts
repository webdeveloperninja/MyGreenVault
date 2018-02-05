import { Routes } from '@angular/router';
import { ShippersComponent } from './components/shippers/shippers.component';
import { AddShipperContainerComponent } from 'app/shippers/containers/add-shipper-container/add-shipper-container.component';

export const routes: Routes = [
    { path: 'shippers', component: ShippersComponent },
    { path: 'shippers/add', component: AddShipperContainerComponent }
];