import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { WeedComponent } from './weed/components/weed/weed.component';

export const routes: Routes = [
    { path: '', component: WeedComponent }
];