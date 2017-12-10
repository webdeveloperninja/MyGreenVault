import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { WeedDetailComponent } from './components/weed-detail/weed-detail.component';

export const routes: Routes = [
    { path: 'weed/:weedId',      component: WeedDetailComponent },
    { path: 'weed', component: ProductsComponent }
];