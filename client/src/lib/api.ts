import { apiRequest } from './queryClient';
import { Flight, Hotel, Train, Bus } from './types';

// Flight API
export const fetchFlightSearchResults = async (
  source: string,
  destination: string,
  date: string
): Promise<Flight[]> => {
  try {
    const response = await apiRequest(
      'GET',
      `/api/flights/search?source=${source}&destination=${destination}&date=${date}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching flight search results:', error);
    throw error;
  }
};

export const fetchFlightById = async (flightId: string): Promise<Flight> => {
  try {
    const response = await apiRequest('GET', `/api/flights/${flightId}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching flight details:', error);
    throw error;
  }
};

// Hotel API
export const fetchHotelSearchResults = async (
  city: string,
  checkIn: string,
  checkOut: string
): Promise<Hotel[]> => {
  try {
    const response = await apiRequest(
      'GET',
      `/api/hotels/search?city=${city}&checkIn=${checkIn}&checkOut=${checkOut}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching hotel search results:', error);
    throw error;
  }
};

export const fetchHotelById = async (hotelId: string): Promise<Hotel> => {
  try {
    const response = await apiRequest('GET', `/api/hotels/${hotelId}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    throw error;
  }
};

// Train API
export const fetchTrainSearchResults = async (
  source: string,
  destination: string,
  date: string
): Promise<Train[]> => {
  try {
    const response = await apiRequest(
      'GET',
      `/api/trains/search?source=${source}&destination=${destination}&date=${date}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching train search results:', error);
    throw error;
  }
};

export const fetchTrainById = async (trainId: string): Promise<Train> => {
  try {
    const response = await apiRequest('GET', `/api/trains/${trainId}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching train details:', error);
    throw error;
  }
};

// Bus API
export const fetchBusSearchResults = async (
  source: string,
  destination: string,
  date: string
): Promise<Bus[]> => {
  try {
    const response = await apiRequest(
      'GET',
      `/api/buses/search?source=${source}&destination=${destination}&date=${date}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching bus search results:', error);
    throw error;
  }
};

export const fetchBusById = async (busId: string): Promise<Bus> => {
  try {
    const response = await apiRequest('GET', `/api/buses/${busId}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching bus details:', error);
    throw error;
  }
};

// User Authentication
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await apiRequest('POST', '/api/users/login', { username, password });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const registerUser = async (userData: any) => {
  try {
    const response = await apiRequest('POST', '/api/users/register', userData);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Booking
export const createBooking = async (bookingData: any) => {
  try {
    const response = await apiRequest('POST', '/api/bookings', bookingData);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const fetchUserBookings = async (userId: number) => {
  try {
    const response = await apiRequest('GET', `/api/users/${userId}/bookings`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }
};
