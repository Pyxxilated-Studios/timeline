import {
  UserAction,
  UserState,
  SET_USERNAME,
  SET_REPOSITORIES,
  SET_LOGGED_IN,
} from "./types";

const initialState: UserState = {
  username: "",
  repositories: [],
  loggedIn: false,
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

    default:
      return state;
  }
};

export default UserReducer;
