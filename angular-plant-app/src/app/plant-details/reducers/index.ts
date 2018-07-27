import { createSelector, createFeatureSelector, ActionReducerMap, combineReducers } from '@ngrx/store';
import * as fromDetailsEntity from './plant-details.reducer';
import * as fromDetailsImages from './plant-images.reducer';
import * as fromDetailsCollection from './collection.reducer';
import * as fromRoot from '../../reducers';
import { InjectionToken } from '@angular/core';

export const featureName = 'plant';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<State>>(`${featureName} - Feature Reducer`);
export const reducerProvider = [{ provide: FEATURE_REDUCER_TOKEN, useFactory: getReducers }];

export interface DetailsState {
  entities: {
    details: fromDetailsEntity.State;
    images: fromDetailsImages.State;
  };
  collection: fromDetailsCollection.State;
}

export interface State extends fromRoot.State {
  entities: {
    details: fromDetailsEntity.State;
    profileImages: fromDetailsImages.State;
  };
  collection: fromDetailsCollection.State;
}

const plantReducers = {
  details: fromDetailsEntity.reducer,
  profileImages: fromDetailsImages.reducer
};

export function getReducers() {
  return {
    entities: combineReducers(plantReducers),
    collection: fromDetailsCollection.reducer
  };
}

export const getPlantState = createFeatureSelector<State>('plant');
