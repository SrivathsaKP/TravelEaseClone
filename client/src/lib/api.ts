import { apiRequest } from './queryClient';
import { Flight, Hotel, Train, Bus, Cab, Homestay, InsurancePlan } from './types';
import { MockService } from './mockServices';

// Environment variable to control whether to use mock data
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || true; // Default to true for development

// Flight API
export const fetchFlightSearchResults = async (
  source: string,
  destination: string,
  date: string
): Promise<Flight[]> => {
  console.log('fetchFlightSearchResults called with:', { source, destination, date, USE_MOCK_DATA });
  
  if (USE_MOCK_DATA) {
    console.log('Using mock data for flights');
    const result = await MockService.searchFlights(source, destination, date);
    console.log('Mock flights generated:', result.length);
    return result;
  }

  try {
    console.log('Attempting API call for flights');
    const response = await apiRequest(
      'GET',
      `/api/flights/search?source=${source}&destination=${destination}&date=${date}`
    );
    const data = await response.json();
    console.log('API response for flights:', data);
    return data.data;
  } catch (error) {
    console.error('Error fetching flight search results:', error);
    // Fallback to mock data if API fails
    console.log('Falling back to mock data for flights');
    const result = await MockService.searchFlights(source, destination, date);
    console.log('Fallback mock flights generated:', result.length);
    return result;
  }
};

export const fetchFlightById = async (flightId: string): Promise<Flight> => {
  if (USE_MOCK_DATA) {
    const flight = await MockService.getFlightById(flightId);
    if (!flight) throw new Error(`Flight with ID ${flightId} not found`);
    return flight;
  }

  try {
    const response = await apiRequest('GET', `/api/flights/${flightId}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching flight details:', error);
    // Fallback to mock data
    const flight = await MockService.getFlightById(flightId);
    if (!flight) throw error;
    return flight;
  }
};

// Hotel API
export const fetchHotelSearchResults = async (
  city: string,
  checkIn: string,
  checkOut: string
): Promise<Hotel[]> => {
  console.log('fetchHotelSearchResults called with:', { city, checkIn, checkOut, USE_MOCK_DATA });
  
  if (USE_MOCK_DATA) {
    console.log('Using mock data for hotels');
    const result = await MockService.searchHotels(city, checkIn, checkOut);
    console.log('Mock hotels generated:', result.length);
    return result;
  }

  try {
    console.log('Attempting API call for hotels');
    const response = await apiRequest(
      'GET',
      `/api/hotels/search?city=${city}&checkIn=${checkIn}&checkOut=${checkOut}`
    );
    const data = await response.json();
    console.log('API response for hotels:', data);
    return data.data;
  } catch (error) {
    console.error('Error fetching hotel search results:', error);
    // Fallback to mock data if API fails
    console.log('Falling back to mock data for hotels');
    const result = await MockService.searchHotels(city, checkIn, checkOut);
    console.log('Fallback mock hotels generated:', result.length);
    return result;
  }
};

export const fetchHotelById = async (hotelId: string): Promise<Hotel> => {
  if (USE_MOCK_DATA) {
    const hotel = await MockService.getHotelById(hotelId);
    if (!hotel) throw new Error(`Hotel with ID ${hotelId} not found`);
    return hotel;
  }

  try {
    const response = await apiRequest('GET', `/api/hotels/${hotelId}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    // Fallback to mock data
    const hotel = await MockService.getHotelById(hotelId);
    if (!hotel) throw error;
    return hotel;
  }
};

// Train API
export const fetchTrainSearchResults = async (
  source: string,
  destination: string,
  date: string
): Promise<Train[]> => {
  if (USE_MOCK_DATA) {
    return MockService.searchTrains(source, destination, date);
  }

  try {
    const response = await apiRequest(
      'GET',
      `/api/trains/search?source=${source}&destination=${destination}&date=${date}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching train search results:', error);
    // Fallback to mock data if API fails
    return MockService.searchTrains(source, destination, date);
  }
};

export const fetchTrainById = async (trainId: string): Promise<Train> => {
  if (USE_MOCK_DATA) {
    const train = await MockService.getTrainById(trainId);
    if (!train) throw new Error(`Train with ID ${trainId} not found`);
    return train;
  }

  try {
    const response = await apiRequest('GET', `/api/trains/${trainId}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching train details:', error);
    // Fallback to mock data
    const train = await MockService.getTrainById(trainId);
    if (!train) throw error;
    return train;
  }
};

// Bus API
export const fetchBusSearchResults = async (
  source: string,
  destination: string,
  date: string
): Promise<Bus[]> => {
  if (USE_MOCK_DATA) {
    return MockService.searchBuses(source, destination, date);
  }

  try {
    const response = await apiRequest(
      'GET',
      `/api/buses/search?source=${source}&destination=${destination}&date=${date}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching bus search results:', error);
    // Fallback to mock data if API fails
    return MockService.searchBuses(source, destination, date);
  }
};

export const fetchBusById = async (busId: string): Promise<Bus> => {
  if (USE_MOCK_DATA) {
    const bus = await MockService.getBusById(busId);
    if (!bus) throw new Error(`Bus with ID ${busId} not found`);
    return bus;
  }

  try {
    const response = await apiRequest('GET', `/api/buses/${busId}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching bus details:', error);
    // Fallback to mock data
    const bus = await MockService.getBusById(busId);
    if (!bus) throw error;
    return bus;
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

// Cab API
export const fetchCabSearchResults = async (
  city: string,
  pickupDate: string,
  vehicleType?: string
): Promise<Cab[]> => {
  if (USE_MOCK_DATA) {
    return MockService.searchCabs(city, pickupDate, vehicleType);
  }

  try {
    const response = await apiRequest(
      'GET',
      `/api/cabs/search?city=${city}&pickupDate=${pickupDate}${vehicleType ? `&vehicleType=${vehicleType}` : ''}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching cab search results:', error);
    return MockService.searchCabs(city, pickupDate, vehicleType);
  }
};

export const fetchCabById = async (cabId: string): Promise<Cab> => {
  if (USE_MOCK_DATA) {
    const cab = await MockService.getCabById(cabId);
    if (!cab) throw new Error(`Cab with ID ${cabId} not found`);
    return cab;
  }

  try {
    const response = await apiRequest('GET', `/api/cabs/${cabId}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching cab details:', error);
    const cab = await MockService.getCabById(cabId);
    if (!cab) throw error;
    return cab;
  }
};

// Homestay API
export const fetchHomestaySearchResults = async (
  location: string,
  checkIn: string,
  checkOut: string,
  guests?: number
): Promise<Homestay[]> => {
  if (USE_MOCK_DATA) {
    return MockService.searchHomestays(location, checkIn, checkOut, guests);
  }

  try {
    const response = await apiRequest(
      'GET',
      `/api/homestays/search?location=${location}&checkIn=${checkIn}&checkOut=${checkOut}${guests ? `&guests=${guests}` : ''}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching homestay search results:', error);
    return MockService.searchHomestays(location, checkIn, checkOut, guests);
  }
};

export const fetchHomestayById = async (homestayId: string): Promise<Homestay> => {
  if (USE_MOCK_DATA) {
    const homestay = await MockService.getHomestayById(homestayId);
    if (!homestay) throw new Error(`Homestay with ID ${homestayId} not found`);
    return homestay;
  }

  try {
    const response = await apiRequest('GET', `/api/homestays/${homestayId}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching homestay details:', error);
    const homestay = await MockService.getHomestayById(homestayId);
    if (!homestay) throw error;
    return homestay;
  }
};

// Insurance API
export const fetchInsurancePlanSearchResults = async (
  coverageType: string,
  duration: number
): Promise<InsurancePlan[]> => {
  if (USE_MOCK_DATA) {
    return MockService.searchInsurancePlans(coverageType, duration);
  }

  try {
    const response = await apiRequest(
      'GET',
      `/api/insurance-plans/search?coverageType=${coverageType}&duration=${duration}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching insurance plan search results:', error);
    return MockService.searchInsurancePlans(coverageType, duration);
  }
};

export const fetchInsurancePlanById = async (planId: string): Promise<InsurancePlan> => {
  if (USE_MOCK_DATA) {
    const plan = await MockService.getInsurancePlanById(planId);
    if (!plan) throw new Error(`Insurance plan with ID ${planId} not found`);
    return plan;
  }

  try {
    const response = await apiRequest('GET', `/api/insurance-plans/${planId}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching insurance plan details:', error);
    const plan = await MockService.getInsurancePlanById(planId);
    if (!plan) throw error;
    return plan;
  }
};
