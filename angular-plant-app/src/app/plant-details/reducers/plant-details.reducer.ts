import * as fromRoot from '../../reducers';
import * as fromActions from '../actions/details.actions';

export interface State {
  [key: string]: any;
}

export const initialState: State = {};

export function reducer(state = initialState, action: fromActions.All): State {
  switch (action.type) {
    case fromActions.ActionTypes.DetailsLoaded: {
      const plantId = action.payload.details._id;

      return {
        ...state,
        [plantId]: {
          ...action.payload.details
        }
      };
    }
    default: {
      return state;
    }
  }
}

export const getDetailsState = (state: State) => state;
