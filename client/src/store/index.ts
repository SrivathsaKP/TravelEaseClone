import { configureStore } from '@reduxjs/toolkit';
import tabReducer from './tabSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    tab: tabReducer,
    search: searchReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;