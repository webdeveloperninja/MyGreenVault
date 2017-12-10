import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductsComponent } from 'app/products/components/products/products.component';

export const routes: Routes = [
    { path: '', component: ProductsComponent }
];