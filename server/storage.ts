import { 
  User, InsertUser, Flight, InsertFlight, 
  Hotel, InsertHotel, Bus, InsertBus, 
  Train, InsertTrain, Booking, InsertBooking,
  Cab, InsertCab, Homestay, InsertHomestay,
  InsurancePlan, InsertInsurancePlan
} from "@shared/schema";
import { flightData } from "./mockData/flights";
import { hotelData } from "./mockData/hotels";
import { busData } from "./mockData/buses";
import { trainData } from "./mockData/trains";
import { cabData } from "./mockData/cabs";
import { homestayData } from "./mockData/homestays";
import { insuranceData } from "./mockData/insurance";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Flight methods
  getFlights(): Promise<Flight[]>;
  getFlightById(id: string): Promise<Flight | undefined>;
  searchFlights(source: string, destination: string, date: string): Promise<Flight[]>;
  
  // Hotel methods
  getHotels(): Promise<Hotel[]>;
  getHotelById(id: string): Promise<Hotel | undefined>;
  searchHotels(city: string, checkIn: string, checkOut: string): Promise<Hotel[]>;
  
  // Bus methods
  getBuses(): Promise<Bus[]>;
  getBusById(id: string): Promise<Bus | undefined>;
  searchBuses(source: string, destination: string, date: string): Promise<Bus[]>;
  
  // Train methods
  getTrains(): Promise<Train[]>;
  getTrainById(id: string): Promise<Train | undefined>;
  searchTrains(source: string, destination: string, date: string): Promise<Train[]>;
  
  // Cab methods
  getCabs(): Promise<Cab[]>;
  getCabById(id: string): Promise<Cab | undefined>;
  searchCabs(cityOrLocation: string, pickupDate: string, vehicleType?: string): Promise<Cab[]>;
  
  // Homestay methods
  getHomestays(): Promise<Homestay[]>;
  getHomestayById(id: string): Promise<Homestay | undefined>;
  searchHomestays(location: string, checkIn: string, checkOut: string, guests?: number): Promise<Homestay[]>;
  
  // Insurance methods
  getInsurancePlans(): Promise<InsurancePlan[]>;
  getInsurancePlanById(id: string): Promise<InsurancePlan | undefined>;
  searchInsurancePlans(coverageType: string, duration: number): Promise<InsurancePlan[]>;
  
  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingsByUserId(userId: number): Promise<Booking[]>;
  getBookingById(id: number): Promise<Booking | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private flights: Map<string, Flight>;
  private hotels: Map<string, Hotel>;
  private buses: Map<string, Bus>;
  private trains: Map<string, Train>;
  private cabs: Map<string, Cab>;
  private homestays: Map<string, Homestay>;
  private insurancePlans: Map<string, InsurancePlan>;
  private bookings: Map<number, Booking>;
  private userCurrentId: number;
  private bookingCurrentId: number;

  constructor() {
    this.users = new Map();
    this.flights = new Map();
    this.hotels = new Map();
    this.buses = new Map();
    this.trains = new Map();
    this.cabs = new Map();
    this.homestays = new Map();
    this.insurancePlans = new Map();
    this.bookings = new Map();
    this.userCurrentId = 1;
    this.bookingCurrentId = 1;
    
    // Initialize with mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize flights
    flightData.flights.forEach(flight => {
      this.flights.set(flight.id, flight as Flight);
    });
    
    // Initialize hotels
    hotelData.hotels.forEach(hotel => {
      this.hotels.set(hotel.id, hotel as Hotel);
    });
    
    // Initialize buses
    busData.buses.forEach(bus => {
      this.buses.set(bus.id, bus as Bus);
    });
    
    // Initialize trains
    trainData.trains.forEach(train => {
      this.trains.set(train.id, train as Train);
    });
    
    // Initialize cabs
    cabData.cabs.forEach(cab => {
      this.cabs.set(cab.id, cab as Cab);
    });
    
    // Initialize homestays
    homestayData.homestays.forEach(homestay => {
      this.homestays.set(homestay.id, homestay as Homestay);
    });
    
    // Initialize insurance plans
    insuranceData.insurancePlans.forEach(plan => {
      this.insurancePlans.set(plan.id, plan as InsurancePlan);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }
  
  // Flight methods
  async getFlights(): Promise<Flight[]> {
    return Array.from(this.flights.values());
  }
  
  async getFlightById(id: string): Promise<Flight | undefined> {
    return this.flights.get(id);
  }
  
  async searchFlights(source: string, destination: string, date: string): Promise<Flight[]> {
    return Array.from(this.flights.values()).filter(flight => {
      const flightDate = new Date(flight.source.departureTime).toISOString().split('T')[0];
      const searchDate = new Date(date).toISOString().split('T')[0];
      
      return flight.source.airport.cityCode.toLowerCase() === source.toLowerCase() &&
             flight.destination.airport.cityCode.toLowerCase() === destination.toLowerCase() &&
             flightDate === searchDate;
    });
  }
  
  // Hotel methods
  async getHotels(): Promise<Hotel[]> {
    return Array.from(this.hotels.values());
  }
  
  async getHotelById(id: string): Promise<Hotel | undefined> {
    return this.hotels.get(id);
  }
  
  async searchHotels(city: string, checkIn: string, checkOut: string): Promise<Hotel[]> {
    return Array.from(this.hotels.values()).filter(hotel => {
      return hotel.city.toLowerCase() === city.toLowerCase();
    });
  }
  
  // Bus methods
  async getBuses(): Promise<Bus[]> {
    return Array.from(this.buses.values());
  }
  
  async getBusById(id: string): Promise<Bus | undefined> {
    return this.buses.get(id);
  }
  
  async searchBuses(source: string, destination: string, date: string): Promise<Bus[]> {
    return Array.from(this.buses.values()).filter(bus => {
      const busDate = new Date(bus.source.time).toISOString().split('T')[0];
      const searchDate = new Date(date).toISOString().split('T')[0];
      
      return bus.source.city.toLowerCase() === source.toLowerCase() &&
             bus.destination.city.toLowerCase() === destination.toLowerCase() &&
             busDate === searchDate;
    });
  }
  
  // Train methods
  async getTrains(): Promise<Train[]> {
    return Array.from(this.trains.values());
  }
  
  async getTrainById(id: string): Promise<Train | undefined> {
    return this.trains.get(id);
  }
  
  async searchTrains(source: string, destination: string, date: string): Promise<Train[]> {
    return Array.from(this.trains.values()).filter(train => {
      const trainDate = new Date(train.source.departureTime).toISOString().split('T')[0];
      const searchDate = new Date(date).toISOString().split('T')[0];
      
      return train.source.city.toLowerCase() === source.toLowerCase() &&
             train.destination.city.toLowerCase() === destination.toLowerCase() &&
             trainDate === searchDate;
    });
  }
  
  // Booking methods
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingCurrentId++;
    const booking: Booking = { ...insertBooking, id };
    this.bookings.set(id, booking);
    return booking;
  }
  
  async getBookingsByUserId(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => booking.userId === userId);
  }
  
  async getBookingById(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  // Cab methods
  async getCabs(): Promise<Cab[]> {
    return Array.from(this.cabs.values());
  }
  
  async getCabById(id: string): Promise<Cab | undefined> {
    return this.cabs.get(id);
  }
  
  async searchCabs(cityOrLocation: string, pickupDate: string, vehicleType?: string): Promise<Cab[]> {
    return Array.from(this.cabs.values()).filter(cab => {
      const cabCurrentCity = cab.currentLocation?.city.toLowerCase();
      const searchCity = cityOrLocation.toLowerCase();
      
      // Filter by location/city
      const locationMatch = cabCurrentCity === searchCity;
      
      // Filter by vehicle type if provided
      const vehicleTypeMatch = !vehicleType || 
        cab.vehicleType.name.toLowerCase() === vehicleType.toLowerCase();
      
      return locationMatch && vehicleTypeMatch && cab.isAvailable;
    });
  }
  
  // Homestay methods
  async getHomestays(): Promise<Homestay[]> {
    return Array.from(this.homestays.values());
  }
  
  async getHomestayById(id: string): Promise<Homestay | undefined> {
    return this.homestays.get(id);
  }
  
  async searchHomestays(location: string, checkIn: string, checkOut: string, guests?: number): Promise<Homestay[]> {
    return Array.from(this.homestays.values()).filter(homestay => {
      const cityMatch = homestay.city.toLowerCase() === location.toLowerCase();
      
      // Filter by number of guests if provided
      const guestsMatch = !guests || homestay.maxGuests >= guests;
      
      // Check availability
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      
      const availabilityMatch = homestay.availability.some(period => {
        const periodStartDate = new Date(period.startDate);
        const periodEndDate = new Date(period.endDate);
        
        return checkInDate >= periodStartDate && checkOutDate <= periodEndDate;
      });
      
      return cityMatch && guestsMatch && availabilityMatch;
    });
  }
  
  // Insurance methods
  async getInsurancePlans(): Promise<InsurancePlan[]> {
    return Array.from(this.insurancePlans.values());
  }
  
  async getInsurancePlanById(id: string): Promise<InsurancePlan | undefined> {
    return this.insurancePlans.get(id);
  }
  
  async searchInsurancePlans(coverageType: string, duration: number): Promise<InsurancePlan[]> {
    return Array.from(this.insurancePlans.values()).filter(plan => {
      // Filter by coverage type (domestic, international, or both)
      const coverageTypeMatch = 
        coverageType === 'all' || 
        plan.coverageType === coverageType || 
        plan.coverageType === 'both';
      
      // Filter by duration
      const durationMatch = plan.duration >= duration;
      
      return coverageTypeMatch && durationMatch;
    });
  }
}

export const storage = new MemStorage();
