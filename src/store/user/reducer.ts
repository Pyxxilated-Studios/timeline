import {
  UserAction,
  UserState,
  SET_USERNAME,
  SET_REPOSITORIES,
  SET_LOGGED_IN,
  SET_TOKEN,
  SET_STATE,
  SET_FETCHED,
  LOGOUT
} from './types';

const initialState: UserState = {
  username: '',
  repositories: [],
  loggedIn: false,
  state: '',
  token: '',
  fetched: false
};

const UserReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case SET_USERNAME: {
      return { ...state, username: action.username };
    }

    case SET_REPOSITORIES: {
      return { ...state, repositories: action.repositories };
    }

    case SET_LOGGED_IN: {
      return { ...state, loggedIn: action.loggedIn };
    }

    case SET_STATE: {
      return { ...state, state: action.state };
    }

    case SET_TOKEN: {
      return { ...state, token: action.token };
    }

    case SET_FETCHED: {
      return { ...state, fetched: action.fetched };
    }

    case LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};

export default UserReducer;
