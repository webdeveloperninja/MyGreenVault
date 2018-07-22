import * as fromRoot from '../../reducers';
import * as fromActions from '../actions/details.actions';

export interface PlantDetailsState {}

export interface State {
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
        selected: plantId
      };
    }
    default: {
      return state;
    }
  }
}

export const getDetailsState = (state: State) => state;
