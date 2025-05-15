import { configureStore } from '@reduxjs/toolkit';
import flightReducer from './slices/flightSlice';
import hotelReducer from './slices/hotelSlice';
import trainReducer from './slices/trainSlice';
import busReducer from './slices/busSlice';

export const store = configureStore({
  reducer: {
    flights: flightReducer,
    hotels: hotelReducer,
    trains: trainReducer,
    buses: busReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
