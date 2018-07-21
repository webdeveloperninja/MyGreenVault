import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';
import { PlantDetailsRoutingModule } from './plant-details-routing.module';
import { DetailsComponent } from './containers/details/details.component';

@NgModule({
  imports: [CommonModule, PlantDetailsRoutingModule, StoreModule.forFeature('plant', reducers)],
  declarations: [DetailsComponent],
  providers: []
})
export class PlantDetailsModule {}
