import { Repository } from '../../types';

export interface UserState {
  username: string;
  repositories: Repository[];
  loggedIn: boolean;
  state: string;
  token: string;
  fetched: boolean;
}

export const SET_USERNAME = 'SET_USERNAME';
interface SetUsernameAction {
  type: typeof SET_USERNAME;
  username: string;
}

export const SET_REPOSITORIES = 'SET_REPOSITORIES';
interface SetRepositoriesAction {
  type: typeof SET_REPOSITORIES;
  repositories: Repository[];
}

export const SET_LOGGED_IN = 'SET_LOGGED_IN';
interface SetLoggedInAction {
  type: typeof SET_LOGGED_IN;
  loggedIn: boolean;
}

export const SET_STATE = 'SET_STATE';
interface SetStateAction {
  type: typeof SET_STATE;
  state: string;
}

export const SET_TOKEN = 'SET_TOKEN';
interface SetTokenAction {
  type: typeof SET_TOKEN;
  token: string;
}

export const SET_FETCHED = 'SET_FETCHED';
interface SetFetchedAction {
  type: typeof SET_FETCHED;
  fetched: boolean;
}

export const LOGOUT = 'LOGOUT';
interface LogoutAction {
  type: typeof LOGOUT;
}

export type UserAction =
  | SetUsernameAction
  | SetRepositoriesAction
  | SetLoggedInAction
  | SetStateAction
  | SetTokenAction
  | SetFetchedAction
  | LogoutAction;
