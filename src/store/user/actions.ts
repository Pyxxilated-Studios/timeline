import {
  UserAction,
  SET_USERNAME,
  SET_REPOSITORIES,
  SET_LOGGED_IN,
  SET_STATE,
  SET_TOKEN,
  SET_FETCHED,
  LOGOUT
} from './types';

import { Repository } from '../../types';

export const setUsername = (username: string): UserAction => {
  return {
    type: SET_USERNAME,
    username
  };
};

export const setRepositories = (repositories: Repository[]): UserAction => {
  return {
    type: SET_REPOSITORIES,
    repositories
  };
};

export const setLoggedIn = (loggedIn: boolean): UserAction => {
  return { type: SET_LOGGED_IN, loggedIn };
};

export const setState = (state: string): UserAction => {
  return { type: SET_STATE, state };
};

export const setToken = (token: string): UserAction => {
  return { type: SET_TOKEN, token };
};

export const setFetched = (fetched: boolean): UserAction => {
  return { type: SET_FETCHED, fetched };
};

export const logout = (): UserAction => {
  return { type: LOGOUT };
};
