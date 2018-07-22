import * as fromRoot from '../../reducers';
import * as fromActions from '../actions/details.actions';

export interface PlantDetailsState {}

export interface State {
  [key: string]: any;
  selected: string;
}

export const initialState: State = {
  selected: null
};

export function reducer(state = initialState, action: fromActions.All): State {
  switch (action.type) {
    case fromActions.ActionTypes.DetailsLoaded: {
      const plantId = action.payload._id;

      return {
        ...state,
        [plantId]: {
          ...action.payload
        },
        selected: plantId
      };
    }
    default: {
      return state;
    }
  }
}
