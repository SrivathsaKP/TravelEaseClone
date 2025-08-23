import { Hotel } from '../types';

// Hotel chains and brands
const hotelChains = [
  'Taj Hotels', 'Oberoi Hotels', 'ITC Hotels', 'Marriott', 'Hilton', 'Hyatt', 'Accor', 'IHG',
  'Radisson', 'Lemon Tree', 'Treebo', 'OYO', 'FabHotels', 'Ginger Hotels', 'Ibis', 'Novotel'
];

// Hotel names
const hotelNames = [
  'Grand Palace', 'Royal Plaza', 'Luxury Inn', 'Business Center', 'Resort & Spa', 'Executive Hotel',
  'Comfort Inn', 'Premier Lodge', 'Heritage Palace', 'Modern Suites', 'Garden View', 'City Center',
  'Airport Hotel', 'Downtown Plaza', 'Seaside Resort', 'Mountain View', 'Riverside Hotel', 'Skyline Tower'
];

// Cities with popular destinations
const cities = [
  { name: 'Mumbai', state: 'Maharashtra', country: 'India' },
  { name: 'Delhi', state: 'Delhi', country: 'India' },
  { name: 'Bangalore', state: 'Karnataka', country: 'India' },
  { name: 'Hyderabad', state: 'Telangana', country: 'India' },
  { name: 'Chennai', state: 'Tamil Nadu', country: 'India' },
  { name: 'Kolkata', state: 'West Bengal', country: 'India' },
  { name: 'Pune', state: 'Maharashtra', country: 'India' },
  { name: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { name: 'Jaipur', state: 'Rajasthan', country: 'India' },
  { name: 'Goa', state: 'Goa', country: 'India' },
  { name: 'Bangkok', state: 'Bangkok', country: 'Thailand' },
  { name: 'Singapore', state: 'Singapore', country: 'Singapore' },
  { name: 'Dubai', state: 'Dubai', country: 'UAE' },
  { name: 'New York', state: 'New York', country: 'USA' },
  { name: 'London', state: 'England', country: 'UK' },
  { name: 'Paris', state: 'Île-de-France', country: 'France' }
];

// Amenities
const allAmenities = [
  'Free WiFi', 'Swimming Pool', 'Spa', 'Gym', 'Restaurant', 'Room Service', 'Conference Room',
  'Parking', 'Air Conditioning', 'TV', 'Mini Bar', 'Safe', 'Balcony', 'Garden', 'Terrace',
  'Business Center', 'Laundry Service', 'Airport Shuttle', 'Pet Friendly', 'Kids Club',
  'Bar/Lounge', 'Fitness Center', 'Spa Services', 'Outdoor Pool', 'Indoor Pool', 'Hot Tub',
  'Tennis Court', 'Golf Course', 'Beach Access', 'Mountain View', 'City View', 'River View'
];

// Room types
const roomTypes = [
  { name: 'Standard Room', description: 'Comfortable room with essential amenities' },
  { name: 'Deluxe Room', description: 'Spacious room with premium amenities' },
  { name: 'Executive Room', description: 'Luxury room with business facilities' },
  { name: 'Suite', description: 'Large suite with separate living area' },
  { name: 'Presidential Suite', description: 'Ultimate luxury with all amenities' },
  { name: 'Family Room', description: 'Perfect for families with extra space' },
  { name: 'Honeymoon Suite', description: 'Romantic setting with special amenities' }
];

// Bed types
const bedTypes = ['Single', 'Double', 'Queen', 'King', 'Twin', 'King + Sofa', 'Queen + Twin'];

// Room amenities
const roomAmenities = [
  'TV', 'Air Conditioning', 'Mini Bar', 'Safe', 'Balcony', 'Garden View', 'City View',
  'Mountain View', 'River View', 'Ocean View', 'Work Desk', 'Sofa', 'Dining Table',
  'Kitchenette', 'Jacuzzi', 'Shower', 'Bathtub', 'Hair Dryer', 'Iron', 'Coffee Maker'
];

// Generate random hotel name
const generateHotelName = (): string => {
  const chain = hotelChains[Math.floor(Math.random() * hotelChains.length)];
  const name = hotelNames[Math.floor(Math.random() * hotelNames.length)];
  return Math.random() > 0.3 ? `${chain} ${name}` : name;
};

// Generate random address
const generateAddress = (city: string): string => {
  const streets = ['Main Street', 'Central Avenue', 'Park Road', 'Beach Road', 'Hill Road', 'Airport Road'];
  const street = streets[Math.floor(Math.random() * streets.length)];
  const number = Math.floor(Math.random() * 999) + 1;
  return `${number}, ${street}, ${city}`;
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

// Generate random amenities
const generateAmenities = (): string[] => {
  const count = Math.floor(Math.random() * 8) + 5; // 5-12 amenities
  const amenities = [...allAmenities];
  const selected: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * amenities.length);
    selected.push(amenities.splice(index, 1)[0]);
  }
  
  return selected;
};

// Generate room amenities
const generateRoomAmenities = (): string[] => {
  const count = Math.floor(Math.random() * 6) + 3; // 3-8 amenities
  const amenities = [...roomAmenities];
  const selected: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * amenities.length);
    selected.push(amenities.splice(index, 1)[0]);
  }
  
  return selected;
};

// Generate room types for hotel
const generateRoomTypes = (): any[] => {
  const count = Math.floor(Math.random() * 4) + 2; // 2-5 room types
  const types = [];
  
  for (let i = 0; i < count; i++) {
    const roomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];
    const bedType = bedTypes[Math.floor(Math.random() * bedTypes.length)];
    const basePrice = Math.floor(Math.random() * 8000) + 2000; // 2000-10000
    const tax = Math.floor(basePrice * 0.18); // 18% GST
    
    types.push({
      id: `RT${String(i + 1).padStart(3, '0')}`,
      name: roomType.name,
      description: roomType.description,
      maxOccupancy: Math.floor(Math.random() * 3) + 1,
      bedType,
      amenities: generateRoomAmenities(),
      images: [`room-${i + 1}-1.jpg`, `room-${i + 1}-2.jpg`],
      pricing: {
        basePrice,
        tax,
        totalPrice: basePrice + tax,
        currency: 'INR'
      },
      availableRooms: Math.floor(Math.random() * 10) + 1
    });
  }
  
  return types;
};

// Generate reviews
const generateReviews = (): any[] => {
  const count = Math.floor(Math.random() * 8) + 3; // 3-10 reviews
  const reviews = [];
  const names = ['John D.', 'Mary S.', 'Robert J.', 'Sarah M.', 'David L.', 'Emma W.', 'Michael B.', 'Lisa K.'];
  
  for (let i = 0; i < count; i++) {
    reviews.push({
      userId: `U${String(i + 1).padStart(4, '0')}`,
      userName: names[Math.floor(Math.random() * names.length)],
      rating: Math.floor(Math.random() * 2) + 3.5, // 3.5-5.0
      comment: 'Great stay, highly recommended!',
      date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  }
  
  return reviews;
};

// Generate hotel images
const generateImages = (hotelName: string): any[] => {
  const count = Math.floor(Math.random() * 4) + 3; // 3-6 images
  const images = [];
  const captions = ['Hotel Exterior', 'Hotel Lobby', 'Deluxe Room', 'Restaurant', 'Swimming Pool', 'Spa'];
  
  for (let i = 0; i < count; i++) {
    images.push({
      url: `${hotelName.toLowerCase().replace(/\s+/g, '-')}-${i + 1}.jpg`,
      caption: captions[i] || 'Hotel View'
    });
  }
  
  return images;
};

// Generate dynamic hotels
export const generateHotels = (
  city: string = 'Mumbai',
  checkIn: string = new Date().toISOString().split('T')[0],
  checkOut: string = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  count: number = 10
): Hotel[] => {
  const hotels: Hotel[] = [];
  const cityData = cities.find(c => c.name === city) || cities[0];
  
  for (let i = 0; i < count; i++) {
    const hotelName = generateHotelName();
    const starRating = Math.floor(Math.random() * 3) + 3; // 3-5 stars
    const coordinates = generateCoordinates(city);
    const amenities = generateAmenities();
    const roomTypes = generateRoomTypes();
    const reviews = generateReviews();
    const images = generateImages(hotelName);
    
    const hotel: Hotel = {
      id: `HT${String(i + 1).padStart(3, '0')}`,
      name: hotelName,
      starRating,
      address: generateAddress(city),
      city: cityData.name,
      state: cityData.state,
      country: cityData.country,
      zipCode: `${Math.floor(Math.random() * 999999) + 100000}`,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      checkInTime: '14:00',
      checkOutTime: '12:00',
      description: `A ${starRating}-star property in the heart of ${city} offering comfortable accommodations and excellent service.`,
      amenities,
      images,
      reviews,
      roomTypes
    };
    
    hotels.push(hotel);
  }
  
  return hotels.sort((a, b) => a.starRating - b.starRating);
};

// Search hotels with dynamic generation
export const searchHotels = async (
  city: string = 'Mumbai',
  checkIn: string = new Date().toISOString().split('T')[0],
  checkOut: string = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
): Promise<Hotel[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
  
  // Generate 10-15 hotels for the search
  const count = Math.floor(Math.random() * 6) + 10;
  return generateHotels(city, checkIn, checkOut, count);
};

// Get all hotels (for development)
export const getAllHotels = async (): Promise<Hotel[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateHotels('Mumbai', new Date().toISOString().split('T')[0], new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], 15);
};

// Get hotel by ID
export const getHotelById = async (id: string): Promise<Hotel | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const hotels = generateHotels('Mumbai', new Date().toISOString().split('T')[0], new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], 20);
  return hotels.find(hotel => hotel.id === id);
};

