import { Bus } from '../types';

// Bus operators
const busOperators = [
  { id: 'OP001', name: 'Royal Travels', logo: 'royal-travels-logo.png', rating: 4.2 },
  { id: 'OP002', name: 'Orange Tours', logo: 'orange-tours-logo.png', rating: 4.0 },
  { id: 'OP003', name: 'Green Express', logo: 'green-express-logo.png', rating: 4.5 },
  { id: 'OP004', name: 'Blue Star', logo: 'blue-star-logo.png', rating: 3.8 },
  { id: 'OP005', name: 'Red Bus', logo: 'red-bus-logo.png', rating: 4.1 },
  { id: 'OP006', name: 'Yellow Express', logo: 'yellow-express-logo.png', rating: 3.9 },
  { id: 'OP007', name: 'Purple Travels', logo: 'purple-travels-logo.png', rating: 4.3 },
  { id: 'OP008', name: 'White Line', logo: 'white-line-logo.png', rating: 4.0 },
  { id: 'OP009', name: 'Black Diamond', logo: 'black-diamond-logo.png', rating: 4.4 },
  { id: 'OP010', name: 'Silver Express', logo: 'silver-express-logo.png', rating: 3.7 }
];

// Bus types
const busTypes = [
  'Volvo AC Sleeper', 'Non-AC Sleeper', 'AC Seater', 'Non-AC Seater',
  'Luxury AC Sleeper', 'Premium AC Sleeper', 'Deluxe AC Seater', 'Standard Seater'
];

// Cities with bus terminals
const cities = [
  { name: 'Delhi', terminals: ['Kashmere Gate ISBT', 'Anand Vihar ISBT', 'Sarai Kale Khan ISBT'] },
  { name: 'Mumbai', terminals: ['Mumbai Central', 'Borivali', 'Thane'] },
  { name: 'Bangalore', terminals: ['Kempegowda Bus Station', 'Majestic', 'Electronic City'] },
  { name: 'Hyderabad', terminals: ['JBS', 'Secunderabad', 'Dilsukhnagar'] },
  { name: 'Chennai', terminals: ['CMBT', 'Tambaram', 'Chengalpattu'] },
  { name: 'Kolkata', terminals: ['Esplanade', 'Howrah', 'Sealdah'] },
  { name: 'Pune', terminals: ['Swargate', 'Pune Station', 'Hinjewadi'] },
  { name: 'Ahmedabad', terminals: ['Geeta Mandir', 'Paldi', 'Satellite'] },
  { name: 'Jaipur', terminals: ['Sindhi Camp', 'Jaipur Railway Station', 'Vaishali Nagar'] },
  { name: 'Goa', terminals: ['Panaji', 'Mapusa', 'Margao'] }
];

// Amenities
const amenities = [
  'AC', 'Charging Point', 'Blanket', 'Water Bottle', 'WiFi', 'Entertainment System',
  'USB Charging', 'Reading Light', 'Reclining Seats', 'Foot Rest', 'Pillow',
  'Snacks', 'Coffee/Tea', 'Magazine', 'First Aid Kit', 'Fire Extinguisher'
];

// Seat types
const seatTypes = ['sleeper', 'seater', 'semi-sleeper'];

// Generate random bus number
const generateBusNumber = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const numbers = Math.floor(Math.random() * 999) + 100;
  return `${letter}${numbers}`;
};

// Generate random time
const generateRandomTime = (date: string, isDeparture: boolean = true): string => {
  const baseDate = new Date(date);
  const hour = isDeparture ? Math.floor(Math.random() * 12) + 18 : Math.floor(Math.random() * 12) + 6; // Evening departure, morning arrival
  const minute = Math.floor(Math.random() * 60);
  baseDate.setHours(hour, minute, 0, 0);
  return baseDate.toISOString();
};

// Generate random duration between 4-12 hours
const generateDuration = (): number => {
  return Math.floor(Math.random() * 480) + 240; // 4-12 hours in minutes
};

// Generate random distance
const generateDistance = (): number => {
  return Math.floor(Math.random() * 800) + 200; // 200-1000 km
};

// Generate random fare based on distance and bus type
const generateFare = (distance: number, busType: string): number => {
  let baseRate = 2; // per km
  if (busType.includes('AC')) baseRate += 1;
  if (busType.includes('Luxury') || busType.includes('Premium')) baseRate += 1.5;
  if (busType.includes('Sleeper')) baseRate += 0.5;
  
  return Math.floor(distance * baseRate * (Math.random() * 0.3 + 0.85)); // 85-115% of base rate
};

// Generate seat layout
const generateSeatLayout = (busType: string): any => {
  const isSleeper = busType.includes('Sleeper');
  const totalSeats = Math.floor(Math.random() * 20) + 30; // 30-50 seats
  
  if (isSleeper) {
    const lowerDeckRows = Math.floor(totalSeats / 4);
    const upperDeckRows = Math.floor(totalSeats / 4);
    
    const lowerDeck = [];
    const upperDeck = [];
    
    for (let i = 1; i <= lowerDeckRows; i++) {
      lowerDeck.push({
        row: i,
        seats: [
          { number: `L${i * 2 - 1}`, available: Math.random() > 0.3, price: Math.floor(Math.random() * 200) + 800, type: 'sleeper' },
          { number: `L${i * 2}`, available: Math.random() > 0.3, price: Math.floor(Math.random() * 200) + 800, type: 'sleeper' }
        ]
      });
    }
    
    for (let i = 1; i <= upperDeckRows; i++) {
      upperDeck.push({
        row: i,
        seats: [
          { number: `U${i * 2 - 1}`, available: Math.random() > 0.3, price: Math.floor(Math.random() * 200) + 700, type: 'sleeper' },
          { number: `U${i * 2}`, available: Math.random() > 0.3, price: Math.floor(Math.random() * 200) + 700, type: 'sleeper' }
        ]
      });
    }
    
    return { lowerDeck, upperDeck };
  } else {
    const rows = Math.floor(totalSeats / 4);
    const seats = [];
    
    for (let i = 1; i <= rows; i++) {
      seats.push({
        row: i,
        seats: [
          { number: `${i}A`, available: Math.random() > 0.3, price: Math.floor(Math.random() * 100) + 500, type: 'seater' },
          { number: `${i}B`, available: Math.random() > 0.3, price: Math.floor(Math.random() * 100) + 500, type: 'seater' },
          { number: `${i}C`, available: Math.random() > 0.3, price: Math.floor(Math.random() * 100) + 500, type: 'seater' },
          { number: `${i}D`, available: Math.random() > 0.3, price: Math.floor(Math.random() * 100) + 500, type: 'seater' }
        ]
      });
    }
    
    return { seats };
  }
};

// Generate boarding points
const generateBoardingPoints = (sourceCity: string, departureTime: string): any[] => {
  const city = cities.find(c => c.name === sourceCity);
  const terminals = city?.terminals || ['Main Bus Stand'];
  const points = [];
  
  for (let i = 0; i < Math.min(terminals.length, 3); i++) {
    const time = new Date(departureTime);
    time.setMinutes(time.getMinutes() + i * 30); // 30 min intervals
    
    points.push({
      id: `BP${String(i + 1).padStart(3, '0')}`,
      name: terminals[i],
      time: time.toISOString(),
      address: `${terminals[i]}, ${sourceCity}`,
      landmark: `Near ${terminals[i]}`
    });
  }
  
  return points;
};

// Generate dropping points
const generateDroppingPoints = (destCity: string, arrivalTime: string): any[] => {
  const city = cities.find(c => c.name === destCity);
  const terminals = city?.terminals || ['Main Bus Stand'];
  const points = [];
  
  for (let i = 0; i < Math.min(terminals.length, 3); i++) {
    const time = new Date(arrivalTime);
    time.setMinutes(time.getMinutes() + i * 15); // 15 min intervals
    
    points.push({
      id: `DP${String(i + 1).padStart(3, '0')}`,
      name: terminals[i],
      time: time.toISOString(),
      address: `${terminals[i]}, ${destCity}`,
      landmark: `Near ${terminals[i]}`
    });
  }
  
  return points;
};

// Generate bus amenities
const generateBusAmenities = (busType: string): string[] => {
  const baseAmenities = ['First Aid Kit', 'Fire Extinguisher'];
  const selectedAmenities = [...baseAmenities];
  
  if (busType.includes('AC')) {
    selectedAmenities.push('AC');
  }
  
  // Add 3-6 random amenities
  const availableAmenities = amenities.filter(a => !selectedAmenities.includes(a));
  const count = Math.floor(Math.random() * 4) + 3;
  
  for (let i = 0; i < count && availableAmenities.length > 0; i++) {
    const index = Math.floor(Math.random() * availableAmenities.length);
    selectedAmenities.push(availableAmenities.splice(index, 1)[0]);
  }
  
  return selectedAmenities;
};

// Generate dynamic buses
export const generateBuses = (
  source: string = 'Delhi',
  destination: string = 'Mumbai',
  date: string = new Date().toISOString().split('T')[0],
  count: number = 10
): Bus[] => {
  const buses: Bus[] = [];
  
  for (let i = 0; i < count; i++) {
    const operator = busOperators[Math.floor(Math.random() * busOperators.length)];
    const busType = busTypes[Math.floor(Math.random() * busTypes.length)];
    const departureTime = generateRandomTime(date, true);
    const duration = generateDuration();
    const arrivalTime = new Date(departureTime);
    arrivalTime.setMinutes(arrivalTime.getMinutes() + duration);
    
    const distance = generateDistance();
    const fare = generateFare(distance, busType);
    const availableSeats = Math.floor(Math.random() * 20) + 5;
    const seatLayout = generateSeatLayout(busType);
    const amenities = generateBusAmenities(busType);
    const boardingPoints = generateBoardingPoints(source, departureTime);
    const droppingPoints = generateDroppingPoints(destination, arrivalTime.toISOString());
    
    const bus: Bus = {
      id: `BS${String(i + 1).padStart(3, '0')}`,
      operatorId: operator.id,
      operatorName: operator.name,
      busNumber: generateBusNumber(),
      busType,
      totalSeats: Object.values(seatLayout).flat().length * 2, // Approximate total seats
      amenities,
      source: {
        city: source,
        terminal: boardingPoints[0]?.name || 'Main Bus Stand',
        time: departureTime
      },
      destination: {
        city: destination,
        terminal: droppingPoints[0]?.name || 'Main Bus Stand',
        time: arrivalTime.toISOString()
      },
      duration,
      distance,
      fare,
      currency: 'INR',
      rating: operator.rating + (Math.random() - 0.5) * 0.5, // Add some variation
      availableSeats,
      seatLayout,
      boardingPoints,
      droppingPoints
    };
    
    buses.push(bus);
  }
  
  return buses.sort((a, b) => a.fare - b.fare);
};

// Search buses with dynamic generation
export const searchBuses = async (
  source: string = 'Delhi',
  destination: string = 'Mumbai',
  date: string = new Date().toISOString().split('T')[0]
): Promise<Bus[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
  
  // Generate 10-15 buses for the search
  const count = Math.floor(Math.random() * 6) + 10;
  return generateBuses(source, destination, date, count);
};

// Get all buses (for development)
export const getAllBuses = async (): Promise<Bus[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateBuses('Delhi', 'Mumbai', new Date().toISOString().split('T')[0], 15);
};

// Get bus by ID
export const getBusById = async (id: string): Promise<Bus | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const buses = generateBuses('Delhi', 'Mumbai', new Date().toISOString().split('T')[0], 20);
  return buses.find(bus => bus.id === id);
};

