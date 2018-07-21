import * as fromRoot from 'app/reducers';
import * as fromActions from '../actions/details.actions';

export interface PlantDetailsState {}

export interface State {
  entities: { [id: string]: any };
}

export const initialState: State = {
  entities: {
    test: { test: 'yay' }
  }
};

export function reducer(state = initialState, action: fromActions.All): State {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
