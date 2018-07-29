import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromFeature from './reducers';
import { PlantDetailsRoutingModule } from './plant-details-routing.module';
import { DetailsContainerComponent } from './containers/details/details-container.component';
import { PlantDetailsService } from './services/plant.service';
import { DetailsEffects } from './effects/details.effects';
import { DetailsComponent } from './components/details/details.component';
import { SharedModule } from '../shared/shared.module';
import { TimelineComponent } from './containers/timeline/timeline.component';
import { SelectedPlantComponent } from './components/selected-plant/selected-plant.component';
import { UpdateWeekComponent } from './components/update-week/update-week.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PlantDetailsRoutingModule,
    StoreModule.forFeature('plant', fromFeature.FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([DetailsEffects])
  ],
  declarations: [DetailsContainerComponent, DetailsComponent, TimelineComponent, SelectedPlantComponent, UpdateWeekComponent],
  providers: [PlantDetailsService]
})
export class PlantDetailsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PlantDetailsModule,
      providers: [fromFeature.reducerProvider]
    };
  }
}
