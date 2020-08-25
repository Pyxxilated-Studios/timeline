import {
  UserAction,
  SET_USERNAME,
  SET_REPOSITORIES,
  SET_LOGGED_IN,
} from "./types";

import { Repository } from "../../types";

export const setUsername = (username: string): UserAction => {
  return {
    type: SET_USERNAME,
    username,
  };
};

export const setRepositories = (repositories: Repository[]): UserAction => {
  return {
    type: SET_REPOSITORIES,
    repositories,
  };
};

export const setLoggedIn = (loggedIn: boolean): UserAction => {
  return { type: SET_LOGGED_IN, loggedIn };
};
