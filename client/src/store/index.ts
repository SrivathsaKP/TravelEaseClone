import { configureStore } from '@reduxjs/toolkit';
import tabReducer from './tabSlice';

export const store = configureStore({
  reducer: {
    tab: tabReducer,
    // Add other reducers here as needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;