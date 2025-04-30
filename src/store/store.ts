'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import storage from '@/store/customStorage';

import {
  AUTHENTICATED_GLOBAL_API_REDUCER_PATH,
  UNAUTHENTICATED_GLOBAL_API_REDUCER_PATH,
} from '@/actions/action.constants';
import { authenticated_global_api } from '@/actions/authenticated-api';
import { unauthenticated_global_api } from '@/actions/unauthenticated-api';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [
    UNAUTHENTICATED_GLOBAL_API_REDUCER_PATH,
    AUTHENTICATED_GLOBAL_API_REDUCER_PATH,
  ],
};

const rootReducer = combineReducers({
  [UNAUTHENTICATED_GLOBAL_API_REDUCER_PATH]: unauthenticated_global_api.reducer,
  [AUTHENTICATED_GLOBAL_API_REDUCER_PATH]: authenticated_global_api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const concatMiddleWare = [
  unauthenticated_global_api.middleware,
  authenticated_global_api.middleware,
];

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(concatMiddleWare),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
