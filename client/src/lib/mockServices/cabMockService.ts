import { Cab } from '../types';

// Cab providers
const cabProviders = [
  { id: 'CP001', name: 'Uber', logo: 'uber-logo.png', rating: 4.3 },
  { id: 'CP002', name: 'Ola', logo: 'ola-logo.png', rating: 4.1 },
  { id: 'CP003', name: 'Meru', logo: 'meru-logo.png', rating: 4.0 },
  { id: 'CP004', name: 'TaxiForSure', logo: 'taxiforsure-logo.png', rating: 3.9 },
  { id: 'CP005', name: 'Rapido', logo: 'rapido-logo.png', rating: 4.2 },
  { id: 'CP006', name: 'BlaBlaCar', logo: 'blablacar-logo.png', rating: 4.0 },
  { id: 'CP007', name: 'ZoomCar', logo: 'zoomcar-logo.png', rating: 4.1 },
  { id: 'CP008', name: 'Drivezy', logo: 'drivezy-logo.png', rating: 3.8 }
];

// Vehicle types
const vehicleTypes = [
  { type: 'Mini', name: 'Maruti Swift', capacity: 4, basePrice: 10 },
  { type: 'Prime', name: 'Honda City', capacity: 4, basePrice: 12 },
  { type: 'Auto', name: 'Auto Rickshaw', capacity: 3, basePrice: 8 },
  { type: 'Bike', name: 'Motorcycle', capacity: 1, basePrice: 5 },
  { type: 'SUV', name: 'Toyota Innova', capacity: 6, basePrice: 15 },
  { type: 'Luxury', name: 'Mercedes E-Class', capacity: 4, basePrice: 25 },
  { type: 'Premium', name: 'BMW 5 Series', capacity: 4, basePrice: 30 },
  { type: 'XL', name: 'Mahindra Xylo', capacity: 7, basePrice: 18 }
];

// Cities
const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Goa'
];

// Amenities
const amenities = [
  'AC', 'Music System', 'GPS Navigation', 'Child Seat', 'Wheelchair Accessible',
  'Pet Friendly', 'Luggage Space', 'Phone Charger', 'WiFi', 'Premium Audio',
  'Leather Seats', 'Climate Control', 'Sunroof', 'Backup Camera', 'Safety Features'
];

// Cancellation policies
const cancellationPolicies = [
  'Free cancellation up to 5 minutes before pickup',
  '50% refund if cancelled 10 minutes before pickup',
  'No refund for cancellations within 5 minutes of pickup',
  'Free cancellation up to 15 minutes before pickup',
  '25% cancellation fee if cancelled within 10 minutes'
];

// Generate random price
const generatePrice = (basePrice: number): number => {
  return Math.floor(basePrice * (Math.random() * 0.4 + 0.8)); // 80-120% of base price
};

// Generate random price per km
const generatePricePerKm = (basePrice: number): number => {
  return Math.floor(basePrice * (Math.random() * 0.3 + 0.85)); // 85-115% of base price
};

// Generate cab amenities
const generateCabAmenities = (vehicleType: string): string[] => {
  const baseAmenities = ['AC'];
  const selectedAmenities = [...baseAmenities];
  
  // Add 2-5 random amenities
  const availableAmenities = amenities.filter(a => !selectedAmenities.includes(a));
  const count = Math.floor(Math.random() * 4) + 2;
  
  for (let i = 0; i < count && availableAmenities.length > 0; i++) {
    const index = Math.floor(Math.random() * availableAmenities.length);
    selectedAmenities.push(availableAmenities.splice(index, 1)[0]);
  }
  
  return selectedAmenities;
};

// Generate vehicle image
const generateVehicleImage = (vehicleName: string): string => {
  return `${vehicleName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
};

// Generate dynamic cabs
export const generateCabs = (
  city: string = 'Mumbai',
  pickupDate: string = new Date().toISOString().split('T')[0],
  vehicleType?: string,
  count: number = 10
): Cab[] => {
  const cabs: Cab[] = [];
  
  for (let i = 0; i < count; i++) {
    const provider = cabProviders[Math.floor(Math.random() * cabProviders.length)];
    const vehicle = vehicleType 
      ? vehicleTypes.find(v => v.type === vehicleType) || vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]
      : vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
    
    const price = generatePrice(vehicle.basePrice);
    const pricePerKm = generatePricePerKm(vehicle.basePrice);
    const amenities = generateCabAmenities(vehicle.type);
    const cancellationPolicy = cancellationPolicies[Math.floor(Math.random() * cancellationPolicies.length)];
    
    const cab: Cab = {
      id: `CB${String(i + 1).padStart(3, '0')}`,
      provider: {
        id: provider.id,
        name: provider.name,
        logo: provider.logo,
        rating: provider.rating + (Math.random() - 0.5) * 0.5
      },
      vehicleType: vehicle.type,
      vehicleName: vehicle.name,
      seatingCapacity: vehicle.capacity,
      price,
      pricePerKm,
      image: generateVehicleImage(vehicle.name),
      amenities,
      cancellationPolicy
    };
    
    cabs.push(cab);
  }
  
  return cabs.sort((a, b) => a.price - b.price);
};

// Search cabs with dynamic generation
export const searchCabs = async (
  city: string = 'Mumbai',
  pickupDate: string = new Date().toISOString().split('T')[0],
  vehicleType?: string
): Promise<Cab[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
  
  // Generate 10-15 cabs for the search
  const count = Math.floor(Math.random() * 6) + 10;
  return generateCabs(city, pickupDate, vehicleType, count);
};

// Get all cabs (for development)
export const getAllCabs = async (): Promise<Cab[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateCabs('Mumbai', new Date().toISOString().split('T')[0], undefined, 15);
};

// Get cab by ID
export const getCabById = async (id: string): Promise<Cab | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const cabs = generateCabs('Mumbai', new Date().toISOString().split('T')[0], undefined, 20);
  return cabs.find(cab => cab.id === id);
};

