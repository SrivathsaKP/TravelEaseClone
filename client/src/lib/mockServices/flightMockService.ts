import { Flight } from '../types';

// Airlines data
const airlines = [
  { code: 'AI', name: 'Air India', logo: 'air-india-logo.png' },
  { code: '6E', name: 'IndiGo', logo: 'indigo-logo.png' },
  { code: 'SG', name: 'SpiceJet', logo: 'spicejet-logo.png' },
  { code: 'G8', name: 'GoAir', logo: 'goair-logo.png' },
  { code: 'UK', name: 'Vistara', logo: 'vistara-logo.png' },
  { code: 'AK', name: 'AirAsia', logo: 'airasia-logo.png' },
  { code: '9W', name: 'Jet Airways', logo: 'jet-airways-logo.png' },
  { code: 'I5', name: 'AirAsia India', logo: 'airasia-india-logo.png' },
  { code: 'QP', name: 'Akasa Air', logo: 'akasa-air-logo.png' },
  { code: 'EM', name: 'Emirates', logo: 'emirates-logo.png' },
  { code: 'QR', name: 'Qatar Airways', logo: 'qatar-airways-logo.png' },
  { code: 'EK', name: 'Etihad Airways', logo: 'etihad-airways-logo.png' },
  { code: 'BA', name: 'British Airways', logo: 'british-airways-logo.png' },
  { code: 'LH', name: 'Lufthansa', logo: 'lufthansa-logo.png' },
  { code: 'AF', name: 'Air France', logo: 'air-france-logo.png' }
];

// Popular airports
const airports = [
  { code: 'DEL', name: 'Indira Gandhi Airport', city: 'Delhi', country: 'India' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Airport', city: 'Mumbai', country: 'India' },
  { code: 'BLR', name: 'Bengaluru Airport', city: 'Bengaluru', country: 'India' },
  { code: 'CCU', name: 'Netaji Subhas Chandra Bose Airport', city: 'Kolkata', country: 'India' },
  { code: 'HYD', name: 'Rajiv Gandhi Airport', city: 'Hyderabad', country: 'India' },
  { code: 'MAA', name: 'Chennai Airport', city: 'Chennai', country: 'India' },
  { code: 'JAI', name: 'Jaipur Airport', city: 'Jaipur', country: 'India' },
  { code: 'AMD', name: 'Sardar Vallabhbhai Patel Airport', city: 'Ahmedabad', country: 'India' },
  { code: 'PNQ', name: 'Pune Airport', city: 'Pune', country: 'India' },
  { code: 'GOI', name: 'Goa Airport', city: 'Goa', country: 'India' },
  { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
  { code: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore' },
  { code: 'DXB', name: 'Dubai Airport', city: 'Dubai', country: 'UAE' },
  { code: 'JFK', name: 'John F. Kennedy Airport', city: 'New York', country: 'USA' },
  { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'UK' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
  { code: 'SYD', name: 'Sydney Airport', city: 'Sydney', country: 'Australia' },
  { code: 'HKG', name: 'Hong Kong Airport', city: 'Hong Kong', country: 'Hong Kong' }
];

// Cabin classes
const cabinClasses = ['Economy', 'Premium Economy', 'Business', 'First'];

// Meal services
const mealServices = ['Complimentary Meal', 'Snacks', 'Paid', 'No Meal'];

// Seat types
const seatTypes = ['window', 'middle', 'aisle'];

// Generate random flight number
const generateFlightNumber = (airlineCode: string): string => {
  const numbers = Math.floor(Math.random() * 9999) + 1000;
  return `${airlineCode}${numbers}`;
};

// Generate random time within a day
const generateRandomTime = (date: string, isDeparture: boolean = true): string => {
  const baseDate = new Date(date);
  const hour = isDeparture ? Math.floor(Math.random() * 12) + 6 : Math.floor(Math.random() * 12) + 12;
  const minute = Math.floor(Math.random() * 60);
  baseDate.setHours(hour, minute, 0, 0);
  return baseDate.toISOString();
};

// Generate random duration between 1-8 hours
const generateDuration = (): number => {
  return Math.floor(Math.random() * 420) + 60; // 1-8 hours in minutes
};

// Generate random fare
const generateFare = (duration: number): { baseFare: number; tax: number; totalFare: number } => {
  const baseFare = Math.floor(duration * (Math.random() * 20 + 10)); // 10-30 per minute
  const tax = Math.floor(baseFare * (Math.random() * 0.3 + 0.1)); // 10-40% tax
  return {
    baseFare,
    tax,
    totalFare: baseFare + tax
  };
};

// Generate seat map
const generateSeatMap = (): any[] => {
  const rows = Math.floor(Math.random() * 5) + 3; // 3-7 rows
  const seatMap = [];
  
  for (let i = 1; i <= rows; i++) {
    const seats = [];
    for (let j = 0; j < 6; j++) {
      const seatLetter = String.fromCharCode(65 + j); // A, B, C, D, E, F
      seats.push({
        number: `${i}${seatLetter}`,
        available: Math.random() > 0.3, // 70% chance of being available
        price: Math.floor(Math.random() * 500) + 100,
        type: seatTypes[Math.floor(Math.random() * seatTypes.length)]
      });
    }
    seatMap.push({ row: i.toString(), seats });
  }
  
  return seatMap;
};

// Generate tax breakup
const generateTaxBreakup = (tax: number): any[] => {
  const k3 = Math.floor(tax * 0.2);
  const yr = Math.floor(tax * 0.4);
  const other = tax - k3 - yr;
  
  return [
    { key: 'K3', value: k3 },
    { key: 'YR', value: yr },
    { key: 'OtherTaxes', value: other }
  ];
};

// Generate dynamic flights
export const generateFlights = (
  source: string = 'DEL',
  destination: string = 'BOM',
  date: string = new Date().toISOString().split('T')[0],
  count: number = 10
): Flight[] => {
  const flights: Flight[] = [];
  
  for (let i = 0; i < count; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const sourceAirport = airports.find(a => a.code === source) || airports[0];
    const destAirport = airports.find(a => a.code === destination) || airports[1];
    
    const departureTime = generateRandomTime(date, true);
    const duration = generateDuration();
    const arrivalTime = new Date(departureTime);
    arrivalTime.setMinutes(arrivalTime.getMinutes() + duration);
    
    const fare = generateFare(duration);
    const availableSeats = Math.floor(Math.random() * 20) + 5;
    
    const flight: Flight = {
      id: `FL${String(i + 1).padStart(3, '0')}`,
      resultIndex: `OB${i + 1}`,
      isLCC: Math.random() > 0.5,
      isRefundable: Math.random() > 0.3,
      airline,
      flightNumber: generateFlightNumber(airline.code),
      source: {
        airport: {
          code: sourceAirport.code,
          name: sourceAirport.name,
          terminal: Math.floor(Math.random() * 3) + 1,
          cityCode: sourceAirport.code,
          cityName: sourceAirport.city,
          countryCode: sourceAirport.country === 'India' ? 'IN' : 'XX',
          countryName: sourceAirport.country
        },
        departureTime
      },
      destination: {
        airport: {
          code: destAirport.code,
          name: destAirport.name,
          terminal: Math.floor(Math.random() * 3) + 1,
          cityCode: destAirport.code,
          cityName: destAirport.city,
          countryCode: destAirport.country === 'India' ? 'IN' : 'XX',
          countryName: destAirport.country
        },
        arrivalTime: arrivalTime.toISOString()
      },
      duration,
      cabinClass: cabinClasses[Math.floor(Math.random() * cabinClasses.length)],
      availableSeats,
      fare: {
        currency: 'INR',
        baseFare: fare.baseFare,
        tax: fare.tax,
        taxBreakup: generateTaxBreakup(fare.tax),
        totalFare: fare.totalFare
      },
      baggage: `${Math.floor(Math.random() * 10) + 15} KG`,
      cabinBaggage: `${Math.floor(Math.random() * 3) + 7} KG`,
      mealService: mealServices[Math.floor(Math.random() * mealServices.length)],
      seatMap: generateSeatMap()
    };
    
    flights.push(flight);
  }
  
  return flights.sort((a, b) => a.fare.totalFare - b.fare.totalFare);
};

// Search flights with dynamic generation
export const searchFlights = async (
  source: string = 'DEL',
  destination: string = 'BOM',
  date: string = new Date().toISOString().split('T')[0]
): Promise<Flight[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
  
  // Generate 10-15 flights for the search
  const count = Math.floor(Math.random() * 6) + 10;
  return generateFlights(source, destination, date, count);
};

// Get all flights (for development)
export const getAllFlights = async (): Promise<Flight[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateFlights('DEL', 'BOM', new Date().toISOString().split('T')[0], 15);
};

// Get flight by ID
export const getFlightById = async (id: string): Promise<Flight | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const flights = generateFlights('DEL', 'BOM', new Date().toISOString().split('T')[0], 20);
  return flights.find(flight => flight.id === id);
};

