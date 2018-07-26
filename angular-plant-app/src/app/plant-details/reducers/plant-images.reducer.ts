import * as fromRoot from '../../reducers';
import * as fromActions from '../actions/details.actions';

export interface State {
  profileImages: string[];
}

export const initialState: State = {
  profileImages: []
};

export function reducer(state = initialState, action: fromActions.All): State {
  switch (action.type) {
    case fromActions.ActionTypes.PlantProfileImageLoaded: {
      const imageSource = action.payload.imageSource;

      return {
        ...state,
        profileImages: [...state.profileImages, ...imageSource.imageUrl]
      };
    }
    case fromActions.ActionTypes.DetailsLoaded: {
      const profileImages = action.payload.profileImages;

      return {
        ...initialState,
        profileImages: profileImages
      };
    }
    default: {
      return state;
    }
  }
}

export const getImagesState = (state: State) => state;
