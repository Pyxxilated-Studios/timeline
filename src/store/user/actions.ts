import { UserAction, SET_USERNAME, SET_REPOSITORIES } from "./types";

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
