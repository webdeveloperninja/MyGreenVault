import * as fromRoot from '../../reducers';
import * as fromActions from '../actions/details.actions';

export interface State {
  [key: string]: any;
}

export const initialState: State = {};

export function reducer(state = initialState, action: fromActions.All): State {
  switch (action.type) {
    case fromActions.ActionTypes.PlantWeeksLoaded: {
      const weeks = action.payload;

      return weeks.reduce((acc, week) => {
        return {
          ...acc,
          [week._id]: week
        };
      }, {});
    }
    default: {
      return state;
    }
  }
}

export const getDetailsState = (state: State) => state;
