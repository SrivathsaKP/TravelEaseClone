import { Homestay } from '../types';

// Host names
const hostNames = [
  'John Smith', 'Maria Garcia', 'David Johnson', 'Sarah Williams', 'Michael Brown',
  'Lisa Davis', 'James Wilson', 'Jennifer Taylor', 'Robert Anderson', 'Linda Martinez'
];

// Property types
const propertyTypes = [
  'Apartment', 'House', 'Villa', 'Cottage', 'Studio', 'Loft', 'Penthouse', 'Bungalow',
  'Farmhouse', 'Treehouse', 'Beach House', 'Mountain Cabin', 'City Apartment', 'Suburban House'
];

// Cities with popular destinations
const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Goa',
  'Bangkok', 'Singapore', 'Dubai', 'New York', 'London', 'Paris', 'Sydney', 'Hong Kong', 'Tokyo', 'Seoul'
];

// Amenities
const amenities = [
  'WiFi', 'Kitchen', 'Washing Machine', 'Air Conditioning', 'Heating', 'TV', 'Free Parking',
  'Pool', 'Gym', 'Garden', 'Balcony', 'Terrace', 'BBQ Grill', 'Fireplace', 'Hot Tub',
  'Sauna', 'Game Room', 'Home Theater', 'Workspace', 'Pet Friendly', 'Child Friendly',
  'Wheelchair Accessible', 'Elevator', 'Doorman', 'Security System', 'Breakfast Included'
];

// House rules
const houseRules = [
  'No smoking', 'No parties or events', 'No pets', 'Quiet hours after 10 PM',
  'No shoes inside', 'No loud music', 'Check-in after 3 PM', 'Check-out before 11 AM',
  'No cooking after 10 PM', 'No visitors without permission', 'Keep the place clean',
  'Respect the neighbors', 'No commercial photography', 'No illegal activities'
];

// Generate random host info
const generateHostInfo = (): any => {
  const name = hostNames[Math.floor(Math.random() * hostNames.length)];
  const rating = Math.floor(Math.random() * 2) + 4; // 4-5 stars
  const responseRate = Math.floor(Math.random() * 20) + 80; // 80-100%
  const joinedYear = Math.floor(Math.random() * 10) + 2015;
  
  return {
    name,
    rating,
    responseRate,
    joined: `${joinedYear}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}`
  };
};

// Generate random price
const generatePrice = (): number => {
  return Math.floor(Math.random() * 5000) + 1000; // 1000-6000 per night
};

// Generate random cleaning fee
const generateCleaningFee = (): number => {
  return Math.floor(Math.random() * 1000) + 500; // 500-1500
};

// Generate random service fee
const generateServiceFee = (basePrice: number): number => {
  return Math.floor(basePrice * (Math.random() * 0.1 + 0.05)); // 5-15% of base price
};

// Generate homestay amenities
const generateHomestayAmenities = (): string[] => {
  const selectedAmenities = [];
  const availableAmenities = [...amenities];
  const count = Math.floor(Math.random() * 8) + 5; // 5-12 amenities
  
  for (let i = 0; i < count && availableAmenities.length > 0; i++) {
    const index = Math.floor(Math.random() * availableAmenities.length);
    selectedAmenities.push(availableAmenities.splice(index, 1)[0]);
  }
  
  return selectedAmenities;
};

// Generate house rules
const generateHouseRules = (): string[] => {
  const selectedRules = [];
  const availableRules = [...houseRules];
  const count = Math.floor(Math.random() * 6) + 3; // 3-8 rules
  
  for (let i = 0; i < count && availableRules.length > 0; i++) {
    const index = Math.floor(Math.random() * availableRules.length);
    selectedRules.push(availableRules.splice(index, 1)[0]);
  }
  
  return selectedRules;
};

// Generate homestay images
const generateImages = (propertyName: string): any[] => {
  const count = Math.floor(Math.random() * 6) + 4; // 4-9 images
  const images = [];
  const captions = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Garden', 'Balcony', 'Exterior', 'View'];
  
  for (let i = 0; i < count; i++) {
    images.push({
      url: `${propertyName.toLowerCase().replace(/\s+/g, '-')}-${i + 1}.jpg`,
      caption: captions[i] || 'Property View'
    });
  }
  
  return images;
};

// Generate random coordinates
const generateCoordinates = (city: string): { latitude: number; longitude: number } => {
  // Approximate coordinates for major cities
  const cityCoords: { [key: string]: [number, number] } = {
    'Mumbai': [19.0760, 72.8777],
    'Delhi': [28.7041, 77.1025],
    'Bangalore': [12.9716, 77.5946],
    'Hyderabad': [17.3850, 78.4867],
    'Chennai': [13.0827, 80.2707],
    'Kolkata': [22.5726, 88.3639],
    'Pune': [18.5204, 73.8567],
    'Ahmedabad': [23.0225, 72.5714],
    'Jaipur': [26.9124, 75.7873],
    'Goa': [15.2993, 74.1240]
  };
  
  const baseCoords = cityCoords[city] || [20.5937, 78.9629]; // Default to India center
  return {
    latitude: baseCoords[0] + (Math.random() - 0.5) * 0.1,
    longitude: baseCoords[1] + (Math.random() - 0.5) * 0.1
  };
};

// Generate dynamic homestays
export const generateHomestays = (
  location: string = 'Mumbai',
  checkIn: string = new Date().toISOString().split('T')[0],
  checkOut: string = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  guests?: number,
  count: number = 10
): Homestay[] => {
  const homestays: Homestay[] = [];
  
  for (let i = 0; i < count; i++) {
    const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const hostInfo = generateHostInfo();
    const rating = Math.floor(Math.random() * 2) + 3.5; // 3.5-5.0
    const reviewCount = Math.floor(Math.random() * 500) + 50;
    const bedrooms = Math.floor(Math.random() * 4) + 1; // 1-4 bedrooms
    const bathrooms = Math.floor(Math.random() * 3) + 1; // 1-3 bathrooms
    const maxGuests = Math.floor(Math.random() * 6) + 2; // 2-7 guests
    
    const pricePerNight = generatePrice();
    const cleaningFee = generateCleaningFee();
    const serviceFee = generateServiceFee(pricePerNight);
    const amenities = generateHomestayAmenities();
    const houseRules = generateHouseRules();
    const coordinates = generateCoordinates(location);
    
    const propertyName = `${propertyType} in ${location}`;
    const images = generateImages(propertyName);
    
    const homestay: Homestay = {
      id: `HS${String(i + 1).padStart(3, '0')}`,
      name: propertyName,
      location,
      description: `Beautiful ${propertyType.toLowerCase()} in the heart of ${location}. Perfect for ${maxGuests} guests with ${bedrooms} bedroom${bedrooms > 1 ? 's' : ''} and ${bathrooms} bathroom${bathrooms > 1 ? 's' : ''}.`,
      hostInfo,
      rating,
      reviewCount,
      bedrooms,
      bathrooms,
      maxGuests,
      pricePerNight,
      cleaningFee,
      serviceFee,
      amenities,
      images,
      propertyType,
      specialOffer: Math.random() > 0.7 ? '20% off for stays longer than 3 nights' : undefined,
      houseRules,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    };
    
    homestays.push(homestay);
  }
  
  return homestays.sort((a, b) => a.pricePerNight - b.pricePerNight);
};

// Search homestays with dynamic generation
export const searchHomestays = async (
  location: string = 'Mumbai',
  checkIn: string = new Date().toISOString().split('T')[0],
  checkOut: string = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  guests?: number
): Promise<Homestay[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
  
  // Generate 10-15 homestays for the search
  const count = Math.floor(Math.random() * 6) + 10;
  return generateHomestays(location, checkIn, checkOut, guests, count);
};

// Get all homestays (for development)
export const getAllHomestays = async (): Promise<Homestay[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateHomestays('Mumbai', new Date().toISOString().split('T')[0], new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], undefined, 15);
};

// Get homestay by ID
export const getHomestayById = async (id: string): Promise<Homestay | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const homestays = generateHomestays('Mumbai', new Date().toISOString().split('T')[0], new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], undefined, 20);
  return homestays.find(homestay => homestay.id === id);
};

