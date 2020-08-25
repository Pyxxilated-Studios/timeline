import { UserAction, UserState, SET_USERNAME, SET_REPOSITORIES } from "./types";

const initialState: UserState = {
  username: "",
  repositories: [],
};

const UserReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case SET_USERNAME: {
      return { ...state, username: action.username };
    }

    case SET_REPOSITORIES: {
      return { ...state, repositories: action.repositories };
    }

    default:
      return state;
  }
};

export default UserReducer;
