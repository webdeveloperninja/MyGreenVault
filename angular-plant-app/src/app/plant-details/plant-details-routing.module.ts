import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsContainerComponent } from './containers/details/details-container.component';

export const routes: Routes = [{ path: 'details/:id', component: DetailsContainerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantDetailsRoutingModule {}
