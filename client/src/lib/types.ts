// Shared types across the application

// Flight Types
export interface Airport {
  code: string;
  name: string;
  terminal: string;
  cityCode: string;
  cityName: string;
  countryCode: string;
  countryName: string;
}

export interface FlightLocation {
  airport: Airport;
  departureTime?: string;
  arrivalTime?: string;
}

export interface TaxBreakup {
  key: string;
  value: number;
}

export interface Fare {
  currency: string;
  baseFare: number;
  tax: number;
  taxBreakup?: TaxBreakup[];
  totalFare: number;
}

export interface Seat {
  number: string;
  available: boolean;
  price: number;
  type: string;
}

export interface SeatRow {
  row: string;
  seats: Seat[];
}

export interface Airline {
  code: string;
  name: string;
  logo: string;
}

export interface Flight {
  id: string;
  resultIndex: string;
  isLCC: boolean;
  isRefundable: boolean;
  airline: Airline;
  flightNumber: string;
  source: FlightLocation;
  destination: FlightLocation;
  duration: number;
  cabinClass: string;
  availableSeats: number;
  fare: Fare;
  baggage?: string;
  cabinBaggage?: string;
  mealService?: string;
  seatMap?: SeatRow[];
  stops?: number;
}

// Hotel Types
export interface HotelImage {
  url: string;
  caption: string;
}

export interface HotelReview {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface RoomPricing {
  basePrice: number;
  tax: number;
  totalPrice: number;
  currency: string;
}

export interface RoomType {
  id: string;
  name: string;
  description: string;
  maxOccupancy: number;
  bedType: string;
  amenities: string[];
  images: string[];
  pricing: RoomPricing;
  availableRooms: number;
}

export interface Hotel {
  id: string;
  name: string;
  starRating: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  checkInTime: string;
  checkOutTime: string;
  description?: string;
  amenities?: string[];
  images: HotelImage[];
  reviews?: HotelReview[];
  roomTypes: RoomType[];
}

// Bus Types
export interface BusLocation {
  city: string;
  terminal: string;
  time: string;
}

export interface BusPoint {
  id: string;
  name: string;
  time: string;
  address: string;
  landmark?: string;
}

export interface BusSeat {
  number: string;
  available: boolean;
  price: number;
  type: string;
}

export interface BusSeatRow {
  row: number;
  seats: BusSeat[];
}

export interface BusSeatLayout {
  lowerDeck: BusSeatRow[];
  upperDeck?: BusSeatRow[];
}

export interface Bus {
  id: string;
  operatorId: string;
  operatorName: string;
  busNumber: string;
  busType: string;
  totalSeats: number;
  amenities?: string[];
  source: BusLocation;
  destination: BusLocation;
  duration: number;
  distance: number;
  fare: number;
  currency: string;
  rating?: number;
  availableSeats: number;
  seatLayout: BusSeatLayout;
  boardingPoints?: BusPoint[];
  droppingPoints?: BusPoint[];
}

// Train Types
export interface TrainStation {
  stationCode: string;
  stationName: string;
  city: string;
  departureTime?: string;
  arrivalTime?: string;
}

export interface TrainClassAvailability {
  available: number;
  waitlist: number;
  status: string;
}

export interface TrainClass {
  code: string;
  name: string;
  fare: number;
  availability: TrainClassAvailability;
}

export interface Train {
  id: string;
  trainNumber: string;
  name: string;
  type: string;
  source: TrainStation;
  destination: TrainStation;
  duration: number;
  distance: number;
  daysOfWeek: string[];
  classes: TrainClass[];
}

// Booking Types
export interface Passenger {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  seatNumber?: string;
}

export interface Booking {
  id: number;
  userId: number;
  bookingType: string;
  referenceId: string;
  status: string;
  bookingDate: string;
  travelDate: string;
  passengers?: Passenger[];
  totalAmount: number;
  currency: string;
  paymentStatus: string;
}

// User Types
export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}
