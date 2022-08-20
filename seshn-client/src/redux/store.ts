import { apiSlice } from '@/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import { feedSlice } from './feedSlice';
import { settingsSlice } from './settingsSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import { videoPlayerSlice } from './videoPlayerSlice';
import { sessionSlice } from './sessionSlice';
import { librarySlice } from './librarySlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  feed: feedSlice.reducer,
  library: librarySlice.reducer,
  session: sessionSlice.reducer,
  settings: settingsSlice.reducer,
  auth: authSlice.reducer,
  videoPlayer: videoPlayerSlice.reducer,
});

const persistConfig = {
  key: '@seshn',
  storage: AsyncStorage,
  whitelist: ['auth'],
  debug: true,
  writeFailHandler: (err: Error) => {
    console.warn(err);
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
