import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Train } from '@/lib/types';
import { apiRequest } from '@/lib/queryClient';

interface TrainState {
  trains: Train[];
  selectedTrain: Train | null;
  loading: boolean;
  error: string | null;
  filters: {
    priceRange: [number, number];
    trainClasses: string[];
    departureTimes: string[];
  };
}

const initialState: TrainState = {
  trains: [],
  selectedTrain: null,
  loading: false,
  error: null,
  filters: {
    priceRange: [200, 2000],
    trainClasses: [],
    departureTimes: []
  }
};

export const searchTrains = createAsyncThunk(
  'trains/search',
  async ({ source, destination, date }: { source: string; destination: string; date: string }) => {
    try {
      const response = await apiRequest(
        'GET',
        `/api/trains/search?source=${source}&destination=${destination}&date=${date}`,
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw new Error('Failed to search trains');
    }
  }
);

export const getTrainById = createAsyncThunk(
  'trains/getById',
  async (trainId: string) => {
    try {
      const response = await apiRequest('GET', `/api/trains/${trainId}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw new Error('Failed to get train details');
    }
  }
);

const trainSlice = createSlice({
  name: 'trains',
  initialState,
  reducers: {
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    toggleTrainClass: (state, action) => {
      const trainClass = action.payload;
      const index = state.filters.trainClasses.indexOf(trainClass);
      
      if (index !== -1) {
        state.filters.trainClasses.splice(index, 1);
      } else {
        state.filters.trainClasses.push(trainClass);
      }
    },
    toggleDepartureTime: (state, action) => {
      const time = action.payload;
      const index = state.filters.departureTimes.indexOf(time);
      
      if (index !== -1) {
        state.filters.departureTimes.splice(index, 1);
      } else {
        state.filters.departureTimes.push(time);
      }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchTrains.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTrains.fulfilled, (state, action) => {
        state.loading = false;
        state.trains = action.payload;
      })
      .addCase(searchTrains.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search trains';
      })
      .addCase(getTrainById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrainById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTrain = action.payload;
      })
      .addCase(getTrainById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get train details';
      });
  },
});

export const { 
  setPriceRange,
  toggleTrainClass,
  toggleDepartureTime,
  resetFilters
} = trainSlice.actions;

export default trainSlice.reducer;
