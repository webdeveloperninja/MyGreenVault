import { Routes } from '@angular/router';
import { ShippersComponent } from './components/shippers/shippers.component';
import { AddShipperComponent } from './components/add-shipper/add-shipper.component';

export const routes: Routes = [
    { path: 'shippers', component: ShippersComponent },
    { path: 'shippers/add', component: AddShipperComponent }
];