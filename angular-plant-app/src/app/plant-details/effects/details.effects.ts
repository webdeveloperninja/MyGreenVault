import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { asyncScheduler, empty, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, skip, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import * as fromDetailsSelectors from '../selectors/details';
import * as fromDetailsActions from '../actions/details.actions';
import * as fromDetails from '../reducers/plant-details.reducer';
import * as moment from 'moment';
import { Scheduler } from 'rxjs/internal/Scheduler';
import { PlantDetailsService } from '../services/plant.service';
import { Week } from '../models/week';

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

  @Effect()
  loadPlantWeeks$: Observable<Action> = this.actions$.pipe(
    ofType<fromDetailsActions.DetailsLoadedAction>(fromDetailsActions.ActionTypes.DetailsLoaded),
    withLatestFrom(this._store.select(fromDetailsSelectors.getDetails)),
    map(([action, details]) => [action.payload, details.weeks]),
    switchMap(([_, weeks]: [any, string[]]) => {
      return this._plantService.getPlantWeeks(weeks).pipe(
        map((weeks: any) => new fromDetailsActions.PlantWeeksLoaded(weeks)),
        catchError(err => of(new fromDetailsActions.PlantWeeksLoadFailed(err)))
      );
    })
  );

  @Effect()
  updateWeek$: Observable<Action> = this.actions$.pipe(
    ofType<fromDetailsActions.UpdateWeek>(fromDetailsActions.ActionTypes.UpdateWeek),
    map(action => action.payload),
    switchMap(weekRequest => {
      return this._plantService.updateWeek(weekRequest.weekId, weekRequest.week).pipe(
        map((weeks: any) => new fromDetailsActions.WeekUpdated(weeks)),
        catchError(err => of(new fromDetailsActions.UpdateWeekFailed(err)))
      );
    })
  );

  @Effect()
  selectDefaultWeek$: Observable<Action> = this.actions$.pipe(
    ofType<fromDetailsActions.PlantWeeksLoaded>(fromDetailsActions.ActionTypes.PlantWeeksLoaded),
    withLatestFrom(this._store.select(fromDetailsSelectors.getWeekEntities)),
    switchMap(([_, entities]) => {
      let selectedWeek: Week;

      for (const prop in entities) {
        const week: Week = entities[prop];

        if (moment().isSameOrAfter(week.start, 'day') && moment().isSameOrBefore(week.end, 'day')) {
          selectedWeek = week;
        }
      }

      // if selectedWeek null return last week

      return of(new fromDetailsActions.SelectPlantWeek(selectedWeek._id));
    })
  );

  @Effect()
  weekUpdated$: Observable<Action> = this.actions$.pipe(
    ofType<fromDetailsActions.WeekUpdated>(fromDetailsActions.ActionTypes.WeekUpdated),
    withLatestFrom(this._store.select(fromDetailsSelectors.getSelected)),
    map(([action, plantId]) => plantId),
    switchMap(
      (plantId): any => {
        return of(new fromDetailsActions.LoadDetailsAction({ plantId }));
      }
    )
  );

  constructor(private actions$: Actions, private _plantService: PlantDetailsService, private _store: Store<fromDetails.State>) {}
}
