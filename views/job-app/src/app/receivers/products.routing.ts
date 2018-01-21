import { Routes } from '@angular/router';
import { ReceiversComponent } from './components/receivers/receivers.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [
    { path: 'product/:productId',      component: ProductDetailComponent },
    { path: 'receivers', component: ReceiversComponent }
];