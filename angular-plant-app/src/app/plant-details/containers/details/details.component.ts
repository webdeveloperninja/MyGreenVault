import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as fromDetails from '../../reducers/plant-details.reducer';
import * as fromDetailsActions from '../../actions/details.actions';

import { Store } from '@ngrx/store';

@Component({
  selector: 'vault-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  routeParameters$ = this._activatedRoute.params;
  plantId: string;
  constructor(private readonly _activatedRoute: ActivatedRoute, private _store: Store<fromDetails.State>) {}

  ngOnInit() {
    this.routeParameters$.subscribe(routeParameters => {
      this.plantId = routeParameters.id;
      this.getPlantDetails(this.plantId);
    });
  }

  getPlantDetails(plantId: string) {
    this._store.dispatch(new fromDetailsActions.TestAction());
  }
}
