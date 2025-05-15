import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Flight } from '@/lib/types';
import { apiRequest } from '@/lib/queryClient';

interface FlightState {
  flights: Flight[];
  selectedFlight: Flight | null;
  loading: boolean;
  error: string | null;
  filters: {
    priceRange: [number, number];
    airlines: string[];
    departureTimes: string[];
    stops: string[];
  };
}

const initialState: FlightState = {
  flights: [],
  selectedFlight: null,
  loading: false,
  error: null,
  filters: {
    priceRange: [1500, 10000],
    airlines: [],
    departureTimes: [],
    stops: []
  }
};

export const searchFlights = createAsyncThunk(
  'flights/search',
  async ({ source, destination, date }: { source: string; destination: string; date: string }) => {
    try {
      const response = await apiRequest(
        'GET',
        `/api/flights/search?source=${source}&destination=${destination}&date=${date}`,
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw new Error('Failed to search flights');
    }
  }
);

export const getFlightById = createAsyncThunk(
  'flights/getById',
  async (flightId: string) => {
    try {
      const response = await apiRequest('GET', `/api/flights/${flightId}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw new Error('Failed to get flight details');
    }
  }
);

const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    toggleAirline: (state, action) => {
      const airline = action.payload;
      const index = state.filters.airlines.indexOf(airline);
      
      if (index !== -1) {
        state.filters.airlines.splice(index, 1);
      } else {
        state.filters.airlines.push(airline);
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
    toggleStop: (state, action) => {
      const stop = action.payload;
      const index = state.filters.stops.indexOf(stop);
      
      if (index !== -1) {
        state.filters.stops.splice(index, 1);
      } else {
        state.filters.stops.push(stop);
      }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flights = action.payload;
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search flights';
      })
      .addCase(getFlightById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFlightById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFlight = action.payload;
      })
      .addCase(getFlightById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get flight details';
      });
  },
});

export const { 
  setPriceRange,
  toggleAirline,
  toggleDepartureTime,
  toggleStop,
  resetFilters
} = flightSlice.actions;

export default flightSlice.reducer;
