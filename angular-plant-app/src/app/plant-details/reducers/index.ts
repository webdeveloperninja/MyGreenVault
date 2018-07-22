import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromDetails from './plant-details.reducer';
import * as fromRoot from '../../reducers';

export interface DetailsState {
  details: fromDetails.State;
}

export interface State extends fromRoot.State {
  details: DetailsState;
}

export const reducers: ActionReducerMap<DetailsState> = {
  details: fromDetails.reducer
};

export const getPlantState = createFeatureSelector<State>('plant');
