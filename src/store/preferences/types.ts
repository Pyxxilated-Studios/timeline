export type OrderType = 'oldestFirst' | 'newestFirst';

export interface PreferencesState {
  order: OrderType;
}

export const SET_ORDERING = 'SET_ORDERING';
interface SetOrderingAction {
  type: typeof SET_ORDERING;
  order: OrderType;
}

export type PreferencesAction = SetOrderingAction;
