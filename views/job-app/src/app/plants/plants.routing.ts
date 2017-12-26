import { Routes } from '@angular/router';
import { PlantsComponent } from './components/plants/plants.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { PlantDetailComponent } from './components/plant-detail/plant-detail.component';

export const routes: Routes = [
    { path: 'plants', component: PlantsComponent, pathMatch: 'full' },
    { path: 'plants/:plantNumber',      component: PlantDetailComponent },
    { path: 'status', component: KanbanComponent }
];