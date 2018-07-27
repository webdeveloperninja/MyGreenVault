import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State as DetailsState, getPlantState } from '../reducers';
import { State } from '../../reducers';

export const getSelected = createSelector(getPlantState, plant => (!!plant ? plant.collection.selected : null));

export const getDetails = createSelector(getPlantState, getSelected, (plants: any, selected: string) => {
  if (!plants || !selected) {
    return;
  }
  return plants.entities.details[selected];
});

export const getPlantProfileImage = createSelector(getPlantState, getSelected, (plant, selectedPlantId) => {
  const images = plant.entities.profileImages[selectedPlantId];
  if (!images || !images.length || !images[images.length - 1]) {
    return './assets/images/placeholder.jpg';
  }

  const image = images[images.length - 1];

  return image;
});
