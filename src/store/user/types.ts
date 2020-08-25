import { Repository } from "../../types";

export interface UserState {
  username: string;
  repositories: Repository[];
  loggedIn: boolean;
}

export const SET_USERNAME = "SET_USERNAME";
interface SetUsernameAction {
  type: typeof SET_USERNAME;
  username: string;
}

export const SET_REPOSITORIES = "SET_REPOSITORIES";
interface SetRepositoriesAction {
  type: typeof SET_REPOSITORIES;
  repositories: Repository[];
}

export const SET_LOGGED_IN = "SET_LOGGED_IN";
interface SetLoggedInAction {
  type: typeof SET_LOGGED_IN;
  loggedIn: boolean;
}

export type UserAction =
  | SetUsernameAction
  | SetRepositoriesAction
  | SetLoggedInAction;
