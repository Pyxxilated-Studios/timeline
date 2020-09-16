import { PreferencesState, PreferencesAction, SET_ORDERING } from './types';

const initialState: PreferencesState = {
  order: 'oldestFirst'
};

export const PreferencesReducer = (state = initialState, action: PreferencesAction): PreferencesState => {
  switch (action.type) {
    case SET_ORDERING:
      return {
        ...state,
        order: action.order
      };

    default:
      return state;
  }
};
