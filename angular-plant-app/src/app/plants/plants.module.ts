import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

import { SharedModule } from '../shared/shared.module';
import { PlantsComponent } from './containers/plants/plants.component';
import { routes } from './plants.routing.module';
import { PlantsSearchService } from './services/plants';
import { UpdatePlantComponent } from './containers/update-plant/update-plant.component';
import { AddPlantComponent } from './containers/add-plant/add-plant.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TextMaskModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot()
  ],
  declarations: [PlantsComponent, AddPlantComponent, UpdatePlantComponent],
  exports: []
})
export class PlantsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PlantsModule,
      providers: [PlantsSearchService]
    };
  }
}
