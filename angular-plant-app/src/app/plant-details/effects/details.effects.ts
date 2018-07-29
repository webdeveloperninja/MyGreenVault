import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { asyncScheduler, empty, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, skip, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import * as fromDetailsSelectors from '../selectors/details';
import * as fromDetailsActions from '../actions/details.actions';
import * as fromDetails from '../reducers/plant-details.reducer';

import { Scheduler } from 'rxjs/internal/Scheduler';
import { PlantDetailsService } from '../services/plant.service';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>('Search Scheduler');

@Injectable()
export class DetailsEffects {
  @Effect()
  getDetails$: Observable<Action> = this.actions$.pipe(
    ofType<fromDetailsActions.LoadDetailsAction>(fromDetailsActions.ActionTypes.LoadDetails),
    map(action => action.payload.plantId),
    switchMap(plantId => {
      return this._plantService.getPlantDetail(plantId).pipe(
        map((details: any[]) => new fromDetailsActions.DetailsLoadedAction(details)),
        catchError(err => of(new fromDetailsActions.DetailsLoadFailedAction(err)))
      );
    })
  );

  @Effect()
  loadPlantProfileImage$: Observable<Action> = this.actions$.pipe(
    ofType<fromDetailsActions.LoadPlantProfileImage>(fromDetailsActions.ActionTypes.LoadPlantProfileImage),
    withLatestFrom(this._store.select(fromDetailsSelectors.getSelected)),
    map(([action, plantId]) => [action.payload.image, plantId]),
    switchMap(([image, plantId]: [any, string]) => {
      return this._plantService.saveProfileImage(plantId, image).pipe(
        map((imageSource: any) => new fromDetailsActions.PlantProfileImageLoaded({ imageSource, plantId })),
        catchError(err => of(new fromDetailsActions.PlantProfileImageLoadFailed(err)))
      );
    })
  );

  constructor(private actions$: Actions, private _plantService: PlantDetailsService, private _store: Store<fromDetails.State>) {}
}
