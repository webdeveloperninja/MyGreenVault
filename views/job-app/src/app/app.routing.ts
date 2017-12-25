import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductsComponent } from 'app/products/components/products/products.component';
import { PlantsComponent } from 'app/plants/components/plants/plants.component';

export const routes: Routes = [
    { path: '', component: PlantsComponent }
];