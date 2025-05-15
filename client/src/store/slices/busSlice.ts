import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Bus } from '@/lib/types';
import { apiRequest } from '@/lib/queryClient';

interface BusState {
  buses: Bus[];
  selectedBus: Bus | null;
  loading: boolean;
  error: string | null;
  filters: {
    priceRange: [number, number];
    busTypes: string[];
    busOperators: string[];
    departureTimes: string[];
  };
}

const initialState: BusState = {
  buses: [],
  selectedBus: null,
  loading: false,
  error: null,
  filters: {
    priceRange: [500, 2000],
    busTypes: [],
    busOperators: [],
    departureTimes: []
  }
};

export const searchBuses = createAsyncThunk(
  'buses/search',
  async ({ source, destination, date }: { source: string; destination: string; date: string }) => {
    try {
      const response = await apiRequest(
        'GET',
        `/api/buses/search?source=${source}&destination=${destination}&date=${date}`,
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw new Error('Failed to search buses');
    }
  }
);

export const getBusById = createAsyncThunk(
  'buses/getById',
  async (busId: string) => {
    try {
      const response = await apiRequest('GET', `/api/buses/${busId}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw new Error('Failed to get bus details');
    }
  }
);

const busSlice = createSlice({
  name: 'buses',
  initialState,
  reducers: {
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    toggleBusType: (state, action) => {
      const busType = action.payload;
      const index = state.filters.busTypes.indexOf(busType);
      
      if (index !== -1) {
        state.filters.busTypes.splice(index, 1);
      } else {
        state.filters.busTypes.push(busType);
      }
    },
    toggleBusOperator: (state, action) => {
      const operator = action.payload;
      const index = state.filters.busOperators.indexOf(operator);
      
      if (index !== -1) {
        state.filters.busOperators.splice(index, 1);
      } else {
        state.filters.busOperators.push(operator);
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
      .addCase(searchBuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBuses.fulfilled, (state, action) => {
        state.loading = false;
        state.buses = action.payload;
      })
      .addCase(searchBuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search buses';
      })
      .addCase(getBusById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBusById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBus = action.payload;
      })
      .addCase(getBusById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get bus details';
      });
  },
});

export const { 
  setPriceRange,
  toggleBusType,
  toggleBusOperator,
  toggleDepartureTime,
  resetFilters
} = busSlice.actions;

export default busSlice.reducer;
