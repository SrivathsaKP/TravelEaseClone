# Mock Services Documentation

This directory contains dynamic mock services for the TravelEase application. These services generate realistic data for all travel booking modules without requiring a backend API.

## Features

### 🚀 **Dynamic Data Generation**
- **Flights**: 10-15 flights per search with realistic airlines, schedules, and pricing
- **Hotels**: 10-15 hotels with star ratings, amenities, and room types
- **Buses**: 10-15 bus options with different operators and seat layouts
- **Trains**: 10-15 train services with various classes and availability
- **Cabs**: 10-15 cab options across different vehicle types and providers
- **Homestays**: 10-15 properties with host information and amenities
- **Insurance**: 10-15 plans with different coverage types and benefits

### 🎯 **Search Parameter Support**
All mock services accept real search parameters and generate contextually relevant results:
- **Location-based**: Results adapt to source/destination cities
- **Date-based**: Schedules adjust to search dates
- **Parameter-specific**: Vehicle types, coverage types, guest counts, etc.

### ⚡ **Realistic Performance**
- Simulated API delays (500-1500ms) for authentic UX
- Sorted results (price, rating, etc.)
- Availability and booking status simulation

## Usage

### Individual Services
```typescript
import { searchFlights, searchHotels } from '@/lib/mockServices';

// Search flights
const flights = await searchFlights('DEL', 'BOM', '2025-02-15');

// Search hotels
const hotels = await searchHotels('Mumbai', '2025-02-15', '2025-02-17');
```

### Unified Service
```typescript
import { MockService } from '@/lib/mockServices';

// All services available through MockService class
const flights = await MockService.searchFlights('DEL', 'BOM', '2025-02-15');
const hotels = await MockService.searchHotels('Mumbai', '2025-02-15', '2025-02-17');
```

## Service Files

- `flightMockService.ts` - Flight search and booking
- `hotelMockService.ts` - Hotel search and reservations
- `busMockService.ts` - Bus booking with seat selection
- `trainMockService.ts` - Train reservations with class options
- `cabMockService.ts` - Cab booking with vehicle types
- `homestayMockService.ts` - Homestay bookings with host details
- `insuranceMockService.ts` - Travel insurance plans
- `index.ts` - Unified exports and MockService class

## Integration

The mock services are integrated into the main API layer (`/lib/api.ts`) with automatic fallback:

1. **Development Mode**: Uses mock data by default
2. **API Available**: Tries real API first, falls back to mock on error
3. **Configurable**: Set `VITE_USE_MOCK_DATA=false` to disable

## Benefits

✅ **No Backend Required**: Full app functionality without server setup
✅ **Realistic Testing**: Comprehensive data for all scenarios
✅ **Development Speed**: Instant setup and consistent data
✅ **Offline Capable**: Works without internet connection
✅ **Dynamic Results**: Fresh data on every search
✅ **Type Safe**: Full TypeScript support with proper interfaces

## Authentication

The app includes a complete authentication flow:

### Demo Credentials
- **Email**: `demo@example.com`
- **Password**: `password`

### Features
- 🔐 Login/Signup pages with validation
- 👤 User session management
- 🚪 Guest browsing (like MakeMyTrip)
- 📱 Responsive design
- 🔄 Cross-tab login sync
- 🎨 Modern UI with shadcn/ui components

Users can browse and search without logging in, but will need to authenticate for bookings and personalized features.

