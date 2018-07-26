import * as fromRoot from '../../reducers';
import * as fromActions from '../actions/details.actions';

export interface State {
  [plantId: string]: string[];
}

export const initialState: State = {};

export function reducer(state = initialState, action: fromActions.All): State {
  switch (action.type) {
    case fromActions.ActionTypes.PlantProfileImageLoaded: {
      const imageSource = action.payload.imageSource.imageUrl;
      const plantId = action.payload.plantId;

      return {
        ...state,
        [plantId]: [...state[plantId], imageSource]
      };
    }
    case fromActions.ActionTypes.DetailsLoaded: {
      const profileImages = action.payload.profileImages;

      return {
        ...initialState,
        [action.payload._id]: [...action.payload.profileImages]
      };
    }
    default: {
      return state;
    }
  }
}

export const getImagesState = (state: State) => state;
