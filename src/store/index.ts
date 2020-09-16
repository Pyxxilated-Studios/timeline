import { Dispatch } from 'react';
import { combineReducers, createStore, compose, applyMiddleware, AnyAction, Action } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { UserReducer } from './user/reducer';
import { PreferencesReducer } from './preferences/reducer';

const rootReducer = combineReducers({
  user: UserReducer,
  preferences: PreferencesReducer
});

const persistConfig = {
  key: 'timeline',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk),
    (process.env.NODE_ENV === 'development' &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = Dispatch<AnyAction> & ThunkDispatch<RootState, unknown, AnyAction>;
export type RootThunk = ThunkAction<any, RootState, unknown, Action<string | void | boolean>>;
