import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as fromDetails from '../../reducers/plant-details.reducer';
import * as fromDetailsActions from '../../actions/details.actions';
import * as fromDetailsSelectors from '../../selectors/details';
import { Store } from '@ngrx/store';
import { PlantDetailsService } from '../../services/plant.service';

@Component({
  selector: 'vault-details-container',
  templateUrl: './details-container.component.html'
})
export class DetailsContainerComponent implements OnInit {
  routeParameters$ = this._activatedRoute.params;
  plantId: string;
  details$ = this._store.select(fromDetailsSelectors.getDetails);
  plantProfileImage$ = this._store.select(fromDetailsSelectors.getPlantProfileImage);
  weeks$ = this._store.select(fromDetailsSelectors.getWeeks);
  plantEvents$;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private _store: Store<fromDetails.State>,
    private readonly _plantService: PlantDetailsService
  ) {}

  ngOnInit() {
    this.routeParameters$.subscribe(routeParameters => {
      this.plantId = routeParameters.id;
      this.getPlantDetails(this.plantId);
      this.plantEvents$ = this._plantService.getEvents(this.plantId);
    });
  }

  saveProfileImage(image) {
    this._store.dispatch(new fromDetailsActions.LoadPlantProfileImage({ image }));
  }

  getPlantDetails(plantId: string) {
    this._store.dispatch(new fromDetailsActions.LoadDetailsAction({ plantId }));
  }
}
