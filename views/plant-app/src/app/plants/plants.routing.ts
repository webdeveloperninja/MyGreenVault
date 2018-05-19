import { Routes } from '@angular/router';
import { PlantsComponent } from './components/plants/plants.component';
import { PlantContainerComponent } from './components/plant-detail/plant-container.component';
import { KanbanComponent } from './containers/kanban/kanban.component';

export const routes: Routes = [
  { path: 'plants', pathMatch: 'full', component: PlantsComponent },
  { path: 'plants/:plantNumber', component: PlantContainerComponent },
  { path: 'kanban', component: KanbanComponent }
];
