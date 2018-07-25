import * as fromRoot from '../../reducers';
import * as fromActions from '../actions/details.actions';

export interface State {
  profileImage: string;
}

export const initialState: State = {
  profileImage: ''
};

export function reducer(state = initialState, action: fromActions.All): State {
  switch (action.type) {
    case fromActions.ActionTypes.PlantProfileImageLoaded: {
      const imageSource = action.payload.imageSource;

      return {
        ...state,
        profileImage: imageSource.imageUrl
      };
    }
    case fromActions.ActionTypes.DetailsLoaded: {
      console.log('action', action.payload);
      const imageSource = action.payload.profilePictures[action.payload.profilePictures.length - 1];
      return {
        ...state,
        profileImage: imageSource ? imageSource: './assets/images/placeholder.jpg';
      };
    }
    default: {
      return state;
    }
  }
}

export const getImagesState = (state: State) => state;
