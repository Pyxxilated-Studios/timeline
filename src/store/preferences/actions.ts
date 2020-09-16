import { PreferencesAction, OrderType, SET_ORDERING } from './types';

export const setOrdering = (order: OrderType): PreferencesAction => {
  return { type: SET_ORDERING, order };
};
