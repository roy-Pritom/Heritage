import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import teamReducer from "./features/team/teamSlice";
const persistConfig = {
  key: 'addTeam',
  storage,
}
const persistedReducer = persistReducer(persistConfig,teamReducer)

export const store = configureStore({
  reducer: { 
    [baseApi.reducerPath]: baseApi.reducer,
    addTeam:persistedReducer

   },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],

    }
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store)