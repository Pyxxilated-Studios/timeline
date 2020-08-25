import { Repository } from "../../types";

export interface UserState {
  username: string;
  repositories: Repository[];
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

export type UserAction = SetUsernameAction | SetRepositoriesAction;
