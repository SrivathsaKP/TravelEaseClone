import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Hotel } from '@/lib/types';
import { apiRequest } from '@/lib/queryClient';

interface HotelState {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  loading: boolean;
  error: string | null;
  filters: {
    priceRange: [number, number];
    starRating: number[];
    amenities: string[];
  };
}

const initialState: HotelState = {
  hotels: [],
  selectedHotel: null,
  loading: false,
  error: null,
  filters: {
    priceRange: [1000, 10000],
    starRating: [],
    amenities: []
  }
};

export const searchHotels = createAsyncThunk(
  'hotels/search',
  async ({ city, checkIn, checkOut }: { city: string; checkIn: string; checkOut: string }) => {
    try {
      const response = await apiRequest(
        'GET',
        `/api/hotels/search?city=${city}&checkIn=${checkIn}&checkOut=${checkOut}`,
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw new Error('Failed to search hotels');
    }
  }
);

export const getHotelById = createAsyncThunk(
  'hotels/getById',
  async (hotelId: string) => {
    try {
      const response = await apiRequest('GET', `/api/hotels/${hotelId}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      throw new Error('Failed to get hotel details');
    }
  }
);

const hotelSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    toggleStarRating: (state, action) => {
      const rating = action.payload;
      const index = state.filters.starRating.indexOf(rating);
      
      if (index !== -1) {
        state.filters.starRating.splice(index, 1);
      } else {
        state.filters.starRating.push(rating);
      }
    },
    toggleAmenity: (state, action) => {
      const amenity = action.payload;
      const index = state.filters.amenities.indexOf(amenity);
      
      if (index !== -1) {
        state.filters.amenities.splice(index, 1);
      } else {
        state.filters.amenities.push(amenity);
      }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload;
      })
      .addCase(searchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search hotels';
      })
      .addCase(getHotelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHotelById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedHotel = action.payload;
      })
      .addCase(getHotelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get hotel details';
      });
  },
});

export const { 
  setPriceRange,
  toggleStarRating,
  toggleAmenity,
  resetFilters
} = hotelSlice.actions;

export default hotelSlice.reducer;
