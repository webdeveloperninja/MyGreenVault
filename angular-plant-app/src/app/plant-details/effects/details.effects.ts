import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { asyncScheduler, empty, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, skip, switchMap, takeUntil } from 'rxjs/operators';

import * as fromDetailsActions from '../actions/details.actions';

import { Scheduler } from 'rxjs/internal/Scheduler';
import { PlantDetailsService } from '../services/plant.service';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>('Search Scheduler');

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

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

  constructor(
    private actions$: Actions,
    private _plantService: PlantDetailsService,
    @Optional()
    @Inject(SEARCH_DEBOUNCE)
    private debounce: number,
    /**
     * You inject an optional Scheduler that will be undefined
     * in normal application usage, but its injected here so that you can mock out
     * during testing using the RxJS TestScheduler for simulating passages of time.
     */
    @Optional()
    @Inject(SEARCH_SCHEDULER)
    private scheduler: Scheduler
  ) {}
}
