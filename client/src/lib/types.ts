// Flight Types
export interface Airport {
  code: string;
  name: string;
  cityCode: string;
  cityName: string;
  countryCode: string;
  countryName: string;
  terminal?: string;
}

export interface Airline {
  code: string;
  name: string;
  logo?: string;
}

export interface TravelPoint {
  airport: Airport;
  departureTime?: string;
  arrivalTime?: string;
}

export interface FarePricing {
  currency: string;
  baseFare: number;
  tax: number;
  taxBreakup?: Array<{ key: string; value: number }>;
  totalFare: number;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: Airline;
  source: TravelPoint;
  destination: TravelPoint;
  duration: number; // in minutes
  stops: number;
  layovers?: Array<{
    airport: Airport;
    duration: number;
  }>;
  fare: FarePricing;
  departureDate: string;
  arrivalDate: string;
  isRefundable: boolean;
  isLCC: boolean;
  baggage?: string;
  cabinBaggage?: string;
  mealService?: string;
}

// Hotel Types
export interface HotelPricing {
  currency: string;
  basePrice: number;
  taxes: number;
  totalPrice: number;
}

export interface HotelRoomType {
  id: string;
  name: string;
  description?: string;
  maxOccupancy: number;
  bedType: string;
  amenities: string[];
  images: Array<{ url: string; caption?: string }>;
  pricing: HotelPricing;
  availableRooms: number;
}

export interface HotelReview {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Hotel {
  id: string;
  name: string;
  starRating: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  checkInTime: string;
  checkOutTime: string;
  description?: string;
  amenities: string[];
  images: Array<{ url: string; caption?: string }>;
  reviews: HotelReview[];
  roomTypes: HotelRoomType[];
}

// Bus Types
export interface Bus {
  id: string;
  operatorId: string;
  operatorName: string;
  busNumber: string;
  busType: string;
  totalSeats: number;
  availableSeats: number;
  departureTime: string;
  arrivalTime: string;
  departureLocation: string;
  arrivalLocation: string;
  duration: number; // in minutes
  fare: number;
  amenities: string[];
}

// Train Types
export interface Train {
  id: string;
  trainNumber: string;
  name: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: number; // in minutes
  classes: Array<{
    name: string;
    fare: number;
    availableSeats: number;
  }>;
  stops: Array<{
    station: string;
    arrivalTime: string;
    departureTime: string;
    stopDuration: number; // in minutes
    dayCount: number;
  }>;
}

// Cab Types
export interface Cab {
  id: string;
  vehicleType: string;
  model: string;
  maxPassengers: number;
  operator: string;
  farePerKm: number;
  baseFare: number;
  estimatedTotal: number;
  availableAt: string;
  features: string[];
  image?: string;
}

// Homestay Types
export interface Homestay {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  images: Array<{ url: string; caption?: string }>;
  host: {
    id: string;
    name: string;
    profilePicture?: string;
    rating: number;
    contactNumber: string;
    verificationStatus: string;
    memberSince: string;
    languages: string[];
  };
  amenities: string[];
  houseRules: string[];
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  minimumStay: number;
  availability: Array<{ startDate: string; endDate: string }>;
  currency: string;
}

// Insurance Types
export interface InsurancePlan {
  id: string;
  name: string;
  description: string;
  coverageType: string; // 'domestic', 'international', or 'both'
  coverageAmount: number;
  premium: number;
  benefits: Array<{
    name: string;
    description: string;
    coverageLimit?: number;
  }>;
  exclusions: string[];
  termsAndConditions: string;
  duration: number; // in days
  currency: string;
}

// Booking Types
export interface Booking {
  id: number;
  userId: string;
  bookingType: 'FLIGHT' | 'HOTEL' | 'BUS' | 'TRAIN' | 'CAB' | 'HOMESTAY' | 'INSURANCE';
  bookingDate: string;
  bookingNumber: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
  totalAmount: number;
  currency: string;
  flightBooking?: {
    flightId: string;
    journeyDate: string;
    passengers: Array<{
      name: string;
      age: number;
      gender: string;
      seatNumber?: string;
    }>;
    source: {
      code: string;
      name: string;
    };
    destination: {
      code: string;
      name: string;
    };
    departureTime: string;
    arrivalTime: string;
    airline: {
      code: string;
      name: string;
    };
  };
  hotelBooking?: {
    hotelId: string;
    checkIn: string;
    checkOut: string;
    roomType: string;
    guests: number;
  };
  busBooking?: {
    busId: string;
    journeyDate: string;
    passengers: Array<{
      name: string;
      age: number;
      gender: string;
      seatNumber?: string;
    }>;
    source: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
  };
  trainBooking?: {
    trainId: string;
    journeyDate: string;
    passengers: Array<{
      name: string;
      age: number;
      gender: string;
      seatNumber?: string;
    }>;
    source: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    class: string;
  };
  cabBooking?: {
    cabId: string;
    pickupDate: string;
    pickupLocation: string;
    dropLocation: string;
    vehicleType: string;
  };
  homestayBooking?: {
    homestayId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  };
  insuranceBooking?: {
    insurancePlanId: string;
    coverageStartDate: string;
    coverageEndDate: string;
    travelers: Array<{
      name: string;
      age: number;
      gender: string;
    }>;
  };
}