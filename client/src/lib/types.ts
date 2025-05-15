// Flight types
export interface Airline {
  code: string;
  name: string;
  logo: string;
}

export interface FlightPrice {
  amount: number;
  currency: string;
  basePrice: number;
  tax: number;
  fees: number;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: Airline;
  departureTime: string;
  arrivalTime: string;
  departureCode: string;
  arrivalCode: string;
  duration: string;
  stopCount: number;
  stops?: string[];
  price: FlightPrice;
  cabinClass: string;
  availableSeats: number;
}

// Hotel types
export interface HotelImage {
  url: string;
  caption?: string;
}

export interface HotelPricing {
  basePrice: number;
  totalPrice: number;
  taxesAndFees: number;
  currency: string;
}

export interface HotelRoomType {
  id: string;
  name: string;
  description: string;
  maxOccupancy: number;
  pricing: HotelPricing;
  amenities: string[];
  images: HotelImage[];
}

export interface Hotel {
  id: string;
  name: string;
  address: string;
  city: string;
  location: string;
  description: string;
  starRating: number;
  userRating?: number;
  reviewCount?: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  amenities: string[];
  images: HotelImage[];
  roomTypes: HotelRoomType[];
  propertyType?: string;
  specialOffer?: string;
}

// Homestay types
export interface Homestay {
  id: string;
  name: string;
  location: string;
  description: string;
  hostInfo: {
    name: string;
    rating: number;
    responseRate: number;
    joined: string;
  };
  rating: number;
  reviewCount: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  pricePerNight: number;
  cleaningFee?: number;
  serviceFee?: number;
  amenities: string[];
  images: HotelImage[];
  propertyType: string;
  specialOffer?: string;
  houseRules?: string[];
  latitude?: number;
  longitude?: number;
}

// Bus types
export interface BusOperator {
  id: string;
  name: string;
  logo?: string;
  rating?: number;
}

export interface BusSeat {
  name: string;
  fare: number;
  availableSeats: number;
}

export interface Bus {
  id: string;
  operator: BusOperator;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  departureLocation: string;
  arrivalLocation: string;
  busType: string;
  seatTypes: BusSeat[];
  amenities: string[];
  rating?: number;
}

// Train types
export interface TrainOperator {
  id: string;
  name: string;
  logo?: string;
}

export interface TrainClass {
  name: string;
  fare: number;
  availableSeats: number;
}

export interface Train {
  id: string;
  number: string;
  name: string;
  operator: TrainOperator;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  departureStation: string;
  arrivalStation: string;
  classes: TrainClass[];
  amenities: string[];
  days: string[];
}

// Cab types
export interface CabProvider {
  id: string;
  name: string;
  logo?: string;
  rating?: number;
}

export interface Cab {
  id: string;
  provider: CabProvider;
  vehicleType: string;
  vehicleName: string;
  seatingCapacity: number;
  price: number;
  pricePerKm?: number;
  image: string;
  amenities: string[];
  cancellationPolicy: string;
}

// Insurance types
export interface InsurancePlan {
  id: string;
  name: string;
  provider: string;
  logo?: string;
  coverageType: string;
  description: string;
  benefits: string[];
  premium: number;
  coverageAmount: number;
  duration: number;
  eligibleAge: {
    min: number;
    max: number;
  };
  documents?: string[];
  rating?: number;
}

// Booking types
export interface Booking {
  id: number;
  userId: number;
  bookingType: 'flight' | 'hotel' | 'bus' | 'train' | 'cab' | 'homestay' | 'insurance';
  itemId: string;
  startDate: string;
  endDate?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  passengers?: number;
  rooms?: number;
  amount: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  bookingDate: string;
  specialRequests?: string;
}

// Holiday Package type
export interface HolidayPackage {
  id: string;
  name: string;
  description: string;
  destination: string;
  duration: {
    days: number;
    nights: number;
  };
  inclusions: string[];
  price: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  images: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    meals?: string[];
    accommodation?: string;
  }[];
  departureCity: string;
  departureDate?: string;
  packageType?: string;
}