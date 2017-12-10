import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [
    { path: 'product/:productId',      component: ProductDetailComponent },
    { path: 'products', component: ProductsComponent }
];