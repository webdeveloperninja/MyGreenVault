import { Routes } from '@angular/router';

import { PlantsComponent } from './components/plants/plants.component';
import { BasicInfoComponent } from './containers/basic-info/basic-info.component';
import { KanbanComponent } from './containers/kanban/kanban.component';

export const routes: Routes = [
  { path: 'plants', pathMatch: 'full', component: PlantsComponent },
  { path: 'plants/:plantNumber', component: BasicInfoComponent },
  { path: 'kanban', component: KanbanComponent }
];
