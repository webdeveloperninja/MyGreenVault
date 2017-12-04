import { Routes } from '@angular/router';
import { WeedComponent } from './components/weed/weed.component';
import { WeedDetailComponent } from './components/weed-detail/weed-detail.component';

export const routes: Routes = [
    { path: 'weed/:weedId',      component: WeedDetailComponent },
    { path: 'weed', component: WeedComponent }
];