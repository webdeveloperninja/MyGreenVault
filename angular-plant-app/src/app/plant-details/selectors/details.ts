import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State as DetailsState, getPlantState } from '../reducers';
import { State } from '../../reducers';

export const getSelected = createSelector(getPlantState, plant => plant.collection.selected);

export const getDetails = createSelector(getPlantState, getSelected, (plants: any, selected: string) => {
  if (!plants || !selected) {
    return;
  }
  return plants.entities.details[selected];
});

export const getPlantProfileImage = createSelector(getPlantState, plant => {
  if (plant.images.profileImages.length === 0) {
    return './assets/images/placeholder.jpg';
  }
  return plant.images.profileImages[plant.images.profileImages.length - 1];
});
