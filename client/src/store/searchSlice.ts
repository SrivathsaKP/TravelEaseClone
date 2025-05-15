import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

// Define types for search states
interface FlightSearchState {
  tripType: 'one-way' | 'round-trip' | 'multi-city';
  source: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  travelers: number;
  class: string;
}

interface HotelSearchState {
  city: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  guests: number;
  adults: number;
  children: number;
  priceRange: [number, number];
  starRating: number;
}

interface BusSearchState {
  source: string;
  destination: string;
  date: string;
  travelers: number;
  busType: string;
  departureTime: string;
}

interface TrainSearchState {
  source: string;
  destination: string;
  date: string;
  class: string;
  travelers: number;
  trainClass: string;
  trainType: string;
}

interface HomestaySearchState {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface CabSearchState {
  city: string;
  pickupDate: string;
  pickupTime: string;
  cabType: string;
}

interface InsuranceSearchState {
  travelType: 'domestic' | 'international';
  travelers: number;
  startDate: string;
  duration: number;
}

// Define the overall search state
interface SearchState {
  flight: FlightSearchState;
  hotel: HotelSearchState;
  bus: BusSearchState;
  train: TrainSearchState;
  homestay: HomestaySearchState;
  cab: CabSearchState;
  insurance: InsuranceSearchState;
  activeSearch: 'flight' | 'hotel' | 'bus' | 'train' | 'homestay' | 'cab' | 'insurance' | null;
}

// Initialize with default values
const initialState: SearchState = {
  flight: {
    tripType: 'one-way',
    source: '',
    destination: '',
    departureDate: new Date().toISOString().split('T')[0],
    travelers: 1,
    class: 'Economy',
  },
  hotel: {
    city: '',
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    rooms: 1,
    guests: 1,
    adults: 1,
    children: 0,
    priceRange: [1000, 10000] as [number, number],
    starRating: 0,
  },
  bus: {
    source: '',
    destination: '',
    date: new Date().toISOString().split('T')[0],
    travelers: 1,
    busType: 'All',
    departureTime: 'all',
  },
  train: {
    source: '',
    destination: '',
    date: new Date().toISOString().split('T')[0],
    class: 'All Classes',
    travelers: 1,
    trainClass: 'All Classes',
    trainType: 'All',
  },
  homestay: {
    location: '',
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    guests: 1,
  },
  cab: {
    city: '',
    pickupDate: new Date().toISOString().split('T')[0],
    pickupTime: '10:00',
    cabType: 'All',
  },
  insurance: {
    travelType: 'domestic',
    travelers: 1,
    startDate: new Date().toISOString().split('T')[0],
    duration: 5,
  },
  activeSearch: null,
};

// Create the slice
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // Flight search actions
    setFlightSearch: (state, action: PayloadAction<FlightSearchState>) => {
      state.flight = action.payload;
      state.activeSearch = 'flight';
    },
    
    // Hotel search actions
    setHotelSearch: (state, action: PayloadAction<HotelSearchState>) => {
      state.hotel = action.payload;
      state.activeSearch = 'hotel';
    },
    
    // Bus search actions
    setBusSearch: (state, action: PayloadAction<BusSearchState>) => {
      state.bus = action.payload;
      state.activeSearch = 'bus';
    },
    
    // Train search actions
    setTrainSearch: (state, action: PayloadAction<TrainSearchState>) => {
      state.train = action.payload;
      state.activeSearch = 'train';
    },
    
    // Homestay search actions
    setHomestaySearch: (state, action: PayloadAction<HomestaySearchState>) => {
      state.homestay = action.payload;
      state.activeSearch = 'homestay';
    },
    
    // Cab search actions
    setCabSearch: (state, action: PayloadAction<CabSearchState>) => {
      state.cab = action.payload;
      state.activeSearch = 'cab';
    },
    
    // Insurance search actions
    setInsuranceSearch: (state, action: PayloadAction<InsuranceSearchState>) => {
      state.insurance = action.payload;
      state.activeSearch = 'insurance';
    },
    
    // Reset search action
    resetSearch: (state) => {
      state.activeSearch = null;
    },
  },
});

// Export actions
export const {
  setFlightSearch,
  setHotelSearch,
  setBusSearch,
  setTrainSearch,
  setHomestaySearch,
  setCabSearch,
  setInsuranceSearch,
  resetSearch,
} = searchSlice.actions;

// Export selectors
export const selectFlightSearch = (state: RootState) => state.search.flight;
export const selectHotelSearch = (state: RootState) => state.search.hotel;
export const selectBusSearch = (state: RootState) => state.search.bus;
export const selectTrainSearch = (state: RootState) => state.search.train;
export const selectHomestaySearch = (state: RootState) => state.search.homestay;
export const selectCabSearch = (state: RootState) => state.search.cab;
export const selectInsuranceSearch = (state: RootState) => state.search.insurance;
export const selectActiveSearch = (state: RootState) => state.search.activeSearch;

// Export reducer
export default searchSlice.reducer;