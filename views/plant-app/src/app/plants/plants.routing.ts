import { Routes } from '@angular/router';
import { PlantsComponent } from './components/plants/plants.component';
import { PlantContainerComponent } from './components/plant-detail/plant-container.component';

export const routes: Routes = [
    { path: 'plants',  pathMatch: 'full', component: PlantsComponent},
    { path: 'plants/:plantNumber', component: PlantContainerComponent },
];