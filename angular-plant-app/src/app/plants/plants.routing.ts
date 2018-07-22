import { Routes } from '@angular/router';

import { PlantsComponent } from './components/plants/plants.component';
import { BasicInfoComponent } from './containers/basic-info/basic-info.component';

export const routes: Routes = [
  { path: 'plants', pathMatch: 'full', component: PlantsComponent },
  { path: 'plants/:id', component: BasicInfoComponent }
];
