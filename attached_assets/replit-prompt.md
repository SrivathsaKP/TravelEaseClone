## Mock Data Implementation

To facilitate development without relying on external APIs, implement comprehensive mock data services:

### Mock Flight Data Example (JSON)

```json
{
  "flights": [
    {
      "id": "FL001",
      "resultIndex": "OB1",
      "isLCC": false,
      "isRefundable": true,
      "airline": {
        "code": "AI",
        "name": "Air India",
        "logo": "air-india-logo.png"
      },
      "flightNumber": "AI9843",
      "source": {
        "airport": {
          "code": "DEL",
          "name": "Indira Gandhi Airport",
          "terminal": "3",
          "cityCode": "DEL",
          "cityName": "Delhi",
          "countryCode": "IN",
          "countryName": "India"
        },
        "departureTime": "2025-09-09T07:15:00"
      },
      "destination": {
        "airport": {
          "code": "JAI",
          "name": "Jaipur",
          "terminal": "2",
          "cityCode": "JAI",
          "cityName": "Jaipur",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T08:15:00"
      },
      "duration": 60,
      "cabinClass": "Economy",
      "availableSeats": 6,
      "fare": {
        "currency": "INR",
        "baseFare": 1000,
        "tax": 703,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 63
          },
          {
            "key": "YR",
            "value": 250
          },
          {
            "key": "OtherTaxes",
            "value": 390
          }
        ],
        "totalFare": 1703
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Snacks",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": true, "price": 300, "type": "window"},
            {"number": "1B", "available": false, "price": 300, "type": "middle"},
            {"number": "1C", "available": true, "price": 300, "type": "aisle"}
          ]
        },
        {
          "row": "2",
          "seats": [
            {"number": "2A", "available": true, "price": 200, "type": "window"},
            {"number": "2B", "available": true, "price": 200, "type": "middle"},
            {"number": "2C", "available": true, "price": 200, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL002",
      "resultIndex": "OB2",
      "isLCC": true,
      "isRefundable": false,
      "airline": {
        "code": "6E",
        "name": "IndiGo",
        "logo": "indigo-logo.png"
      },
      "flightNumber": "6E185",
      "source": {
        "airport": {
          "code": "DEL",
          "name": "Indira Gandhi Airport",
          "terminal": "1",
          "cityCode": "DEL",
          "cityName": "Delhi",
          "countryCode": "IN",
          "countryName": "India"
        },
        "departureTime": "2025-09-09T09:30:00"
      },
      "destination": {
        "airport": {
          "code": "JAI",
          "name": "Jaipur",
          "terminal": "2",
          "cityCode": "JAI",
          "cityName": "Jaipur",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T10:45:00"
      },
      "duration": 75,
      "cabinClass": "Economy",
      "availableSeats": 12,
      "fare": {
        "currency": "INR",
        "baseFare": 1200,
        "tax": 550,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 70
          },
          {
            "key": "YR",
            "value": 180
          },
          {
            "key": "OtherTaxes",
            "value": 300
          }
        ],
        "totalFare": 1750
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Paid",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": false, "price": 350, "type": "window"},
            {"number": "1B", "available": true, "price": 350, "type": "middle"},
            {"number": "1C", "available": true, "price": 350, "type": "aisle"}
          ]
        },
        {
          "row": "2",
          "seats": [
            {"number": "2A", "available": true, "price": 250, "type": "window"},
            {"number": "2B", "available": true, "price": 250, "type": "middle"},
            {"number": "2C", "available": true, "price": 250, "type": "aisle"}
          ]
        }
      ]
    }
  ]
}
```

### Mock Hotel Data Example (JSON)

```json
{
  "hotels": [
    {
      "id": "HT001",
      "name": "Luxury Palace Hotel",
      "starRating": 5,
      "address": "123 Main Street",
      "city": "Jaipur",
      "state": "Rajasthan",
      "country": "India",
      "zipCode": "302001",
      "latitude": 26.9124,
      "longitude": 75.7873,
      "checkInTime": "14:00",
      "checkOutTime": "12:00",
      "description": "A luxurious 5-star property in the heart of Jaipur",
      "amenities": [
        "Swimming Pool",
        "Spa",
        "Gym",
        "Restaurant",
        "Free WiFi",
        "Room Service",
        "Conference Room",
        "Parking"
      ],
      "images": [
        {
          "url": "luxury-palace-exterior.jpg",
          "caption": "Hotel Exterior"
        },
        {
          "url": "luxury-palace-lobby.jpg",
          "caption": "Hotel Lobby"
        },
        {
          "url": "luxury-palace-room.jpg",
          "caption": "Deluxe Room"
        }
      ],
      "reviews": [
        {
          "userId": "U1001",
          "userName": "John D.",
          "rating": 4.5,
          "comment": "Excellent service and beautiful property",
          "date": "2025-01-15"
        },
        {
          "userId": "U1002",
          "userName": "Mary S.",
          "rating": 5.0,
          "comment": "Perfect stay, highly recommended!",
          "date": "2025-02-20"
        }
      ],
      "roomTypes": [
        {
          "id": "RT001",
          "name": "Deluxe Room",
          "description": "Spacious room with king-size bed",
          "maxOccupancy": 2,
          "bedType": "King",
          "amenities": ["TV", "Air Conditioning", "Mini Bar", "Safe"],
          "images": ["deluxe-room-1.jpg", "deluxe-room-2.jpg"],
          "pricing": {
            "basePrice": 5000,
            "tax": 900,
            "totalPrice": 5900,
            "currency": "INR"
          },
          "availableRooms": 5
        },
        {
          "id": "RT002",
          "name": "Executive Suite",
          "description": "Luxury suite with separate living area",
          "maxOccupancy": 3,
          "bedType": "King + Sofa",
          "amenities": ["TV", "Air Conditioning", "Mini Bar", "Safe", "Jacuzzi", "Balcony"],
          "images": ["exec-suite-1.jpg", "exec-suite-2.jpg"],
          "pricing": {
            "basePrice": 8000,
            "tax": 1440,
            "totalPrice": 9440,
            "currency": "INR"
          },
          "availableRooms": 2
        }
      ]
    },
    {
      "id": "HT002",
      "name": "Budget Inn Express",
      "starRating": 3,
      "address": "456 Central Avenue",
      "city": "Jaipur",
      "state": "Rajasthan",
      "country": "India",
      "zipCode": "302005",
      "latitude": 26.9024,
      "longitude": 75.8024,
      "checkInTime": "12:00",
      "checkOutTime": "10:00",
      "description": "Affordable comfort in a convenient location",
      "amenities": [
        "Free WiFi",
        "Restaurant",
        "Parking"
      ],
      "images": [
        {
          "url": "budget-inn-exterior.jpg",
          "caption": "Hotel Exterior"
        },
        {
          "url": "budget-inn-room.jpg",
          "caption": "Standard Room"
        }
      ],
      "reviews": [
        {
          "userId": "U2001",
          "userName": "Robert J.",
          "rating": 3.5,
          "comment": "Good value for money",
          "date": "2025-01-05"
        }
      ],
      "roomTypes": [
        {
          "id": "RT003",
          "name": "Standard Room",
          "description": "Comfortable room with twin beds",
          "maxOccupancy": 2,
          "bedType": "Twin",
          "amenities": ["TV", "Air Conditioning"],
          "images": ["standard-room-1.jpg", "standard-room-2.jpg"],
          "pricing": {
            "basePrice": 2000,
            "tax": 360,
            "totalPrice": 2360,
            "currency": "INR"
          },
          "availableRooms": 8
        }
      ]
    }
  ]
}
```

### Mock Bus Data Example (JSON)

```json
{
  "buses": [
    {
      "id": "BS001",
      "operatorId": "OP001",
      "operatorName": "Royal Travels",
      "busNumber": "RT123",
      "busType": "Volvo AC Sleeper",
      "totalSeats": 36,
      "amenities": ["AC", "Charging Point", "Blanket", "Water Bottle"],
      "source": {
        "city": "Delhi",
        "terminal": "Kashmere Gate ISBT",
        "time": "2025-09-09T21:00:00"
      },
      "destination": {
        "city": "Jaipur",
        "terminal": "Sindhi Camp Bus Stand",
        "time": "2025-09-10T05:00:00"
      },
      "duration": 480,
      "distance": 280,
      "fare": 1200,
      "currency": "INR",
      "rating": 4.2,
      "availableSeats": 14,
      "seatLayout": {
        "lowerDeck": [
          {
            "row": 1,
            "seats": [
              {"number": "L1", "available": true, "price": 1200, "type": "sleeper"},
              {"number": "L2", "available": false, "price": 1200, "type": "sleeper"}
            ]
          },
          {
            "row": 2,
            "seats": [
              {"number": "L3", "available": true, "price": 1200, "type": "sleeper"},
              {"number": "L4", "available": true, "price": 1200, "type": "sleeper"}
            ]
          }
        ],
        "upperDeck": [
          {
            "row": 1,
            "seats": [
              {"number": "U1", "available": true, "price": 1100, "type": "sleeper"},
              {"number": "U2", "available": true, "price": 1100, "type": "sleeper"}
            ]
          },
          {
            "row": 2,
            "seats": [
              {"number": "U3", "available": false, "price": 1100, "type": "sleeper"},
              {"number": "U4", "available": true, "price": 1100, "type": "sleeper"}
            ]
          }
        ]
      },
      "boardingPoints": [
        {
          "id": "BP001",
          "name": "Kashmere Gate ISBT",
          "time": "2025-09-09T21:00:00",
          "address": "Kashmere Gate, Delhi",
          "landmark": "Near Metro Station"
        },
        {
          "id": "BP002",
          "name": "Dhaula Kuan",
          "time": "2025-09-09T21:30:00",
          "address": "Dhaula Kuan, Delhi",
          "landmark": "Metro Station"
        }
      ],
      "droppingPoints": [
        {
          "id": "DP001",
          "name": "Sindhi Camp",
          "time": "2025-09-10T05:00:00",
          "address": "Sindhi Camp, Jaipur",
          "landmark": "Main Bus Stand"
        },
        {
          "id": "DP002",
          "name": "Jaipur Railway Station",
          "time": "2025-09-10T05:15:00",
          "address": "Railway Station, Jaipur",
          "landmark": "Near Entrance"
        }
      ]
    }
  ]
}
```

### Mock Train Data Example (JSON)

```json
{
  "trains": [
    {
      "id": "TR001",
      "trainNumber": "12956",
      "name": "Jaipur Delhi Superfast Express",
      "type": "Superfast",
      "source": {
        "stationCode": "JP",
        "stationName": "Jaipur Junction",
        "city": "Jaipur",
        "departureTime": "2025-09-09T16:35:00"
      },
      "destination": {
        "stationCode": "NDLS",
        "stationName": "New Delhi",
        "city": "Delhi",
        "arrivalTime": "2025-09-09T22:05:00"
      },
      "duration": 330,
      "distance": 303,
      "daysOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "classes": [
        {
          "code": "1A",
          "name": "First AC",
          "fare": 1900,
          "availability": {
            "available": 4,
            "waitlist": 0,
            "status": "Available"
          }
        },
        {
          "code": "2A",
          "name": "Second AC",
          "fare": 1120,
          "availability": {
            "available": 8,
            "waitlist": 0,
            "status": "Available"
          }
        },
        {
          "code": "3A",
          "name": "Third AC",
          "fare": 780,
          "availability": {
            "available": 0,
            "waitlist": 12,
            "status": "WL12"
          }
        },
        {
          "code": "SL",
          "name": "Sleeper",
          "fare": 280,
          "availability": {
            "available": 0,
            "waitlist": 32,
            "status": "WL32"
          }
        }
      ],
      "stops": [
        {
          "stationCode": "JP",
          "stationName": "Jaipur Junction",
          "arrivalTime": null,
          "departureTime": "2025-09-09T16:35:00",
          "haltTime": 0,
          "day": 1,
          "distance": 0,
          "platformNumber": "1"
        },
        {
          "stationCode": "GGN",
          "stationName": "Gurugram",
          "arrivalTime": "2025-09-09T21:15:00",
          "departureTime": "2025-09-09T21:17:00",
          "haltTime": 2,
          "day": 1,
          "distance": 245,
          "platformNumber": "2"
        },
        {
          "stationCode": "NDLS",
          "stationName": "New Delhi",
          "arrivalTime": "2025-09-09T22:05:00",
          "departureTime": null,
          "haltTime": 0,
          "day": 1,
          "distance": 303,
          "platformNumber": "5"
        }
      ]
    }
  ]
}
```

### Mock Cab Data Example (JSON)

```json
{
  "cabs": [
    {
      "id": "CB001",
      "type": {
        "id": "CT001",
        "name": "Economy",
        "description": "Affordable compact cars",
        "maxPassengers": 4,
        "baseFare": 50,
        "perKmRate": 10,
        "waitingChargePerMin": 1,
        "image": "economy-cab.jpg"
      },
      "driver": {
        "id": "DR001",
        "name": "Rajesh Kumar",
        "phone": "+91XXXXXXXXXX",
        "licenseNumber": "DL-1234567890",
        "rating": 4.7,
        "totalTrips": 1240,
        "joinedDate": "2022-05-15"
      },
      "vehicle": {
        "model": "Maruti Suzuki Swift",
        "registrationNumber": "DL1AB1234",
        "color": "White",
        "year": 2022,
        "features": ["AC", "4 Seater", "Luggage Space"]
      },
      "availability": true
    },
    {
      "id": "CB002",
      "type": {
        "id": "CT002",
        "name": "Premium",
        "description": "Spacious sedan for comfortable rides",
        "maxPassengers": 4,
        "baseFare": 100,
        "perKmRate": 15,
        "waitingChargePerMin": 2,
        "image": "premium-cab.jpg"
      },
      "driver": {
        "id": "DR002",
        "name": "Amit Singh",
        "phone": "+91XXXXXXXXXX",
        "licenseNumber": "DL-0987654321",
        "rating": 4.9,
        "totalTrips": 850,
        "joinedDate": "2021-11-20"
      },
      "vehicle": {
        "model": "Honda City",
        "registrationNumber": "DL5XY7890",
        "color": "Silver",
        "year": 2023,
        "features": ["AC", "4 Seater", "Large Trunk", "Music System"]
      },
      "availability": true
    }
  ],
  "fareEstimates": [
    {
      "cabTypeId": "CT001",
      "sourceLat": 28.6139,
      "sourceLng": 77.2090,
      "destinationLat": 28.7041,
      "destinationLng": 77.1025,
      "distance": 15.2,
      "estimatedTime": 45,
      "baseFare": 50,
      "distanceFare": 152,
      "totalFare": 202,
      "currency": "INR"
    },
    {
      "cabTypeId": "CT002",
      "sourceLat": 28.6139,
      "sourceLng": 77.2090,
      "destinationLat": 28.7041,
      "destinationLng": 77.1025,
      "distance": 15.2,
      "estimatedTime": 45,
      "baseFare": 100,
      "distanceFare": 228,
      "totalFare": 328,
      "currency": "INR"
    }
  ]
}
```

### Mock Booking Data Example (JSON)

```json
{
  "bookings": [
    {
      "id": "BK001",
      "userId": "U1001",
      "bookingType": "FLIGHT",
      "bookingNumber": "TE-F12345",
      "bookingDate": "2025-05-01T14:30:00",
      "status": "CONFIRMED",
      "paymentStatus": "PAID",
      "totalAmount": 5412,
      "currency": "INR",
      "flightBooking": {
        "flightId": "FL001",
        "journeyDate": "2025-05-15",
        "passengers": [
          {
            "name": "John Doe",
            "age": 35,
            "gender": "MALE",
            "seatNumber": "12A"
          },
          {
            "name": "Jane Doe",
            "age": 32,
            "gender": "FEMALE",
            "seatNumber": "12B"
          }
        ],
        "source": {
          "code": "DEL",
          "name": "Delhi"
        },
        "destination": {
          "code": "BOM",
          "name": "Mumbai"
        },
        "departureTime": "2025-05-15T10:00:00",
        "arrivalTime": "2025-05-15T12:15:00",
        "airline": {
          "code": "AI",
          "name": "Air India"
        }
      }
    },
    {
      "id": "BK002",
      "userId": "U1001",
      "bookingType": "HOTEL",
      "bookingNumber": "TE-H54321",
      "bookingDate": "2025-05-02T11:45:00",
      "status": "CONFIRMED",
      "paymentStatus": "PAID",
      "totalAmount": 9440,
      "currency": "INR",
      "hotelBooking": {
        "hotelId": "HT001",
        "checkIn": "2025-05-15",
        "checkOut": "2025-05-17",
        "roomType": "Executive Suite",
        "guests": 2,
        "rooms": 1,
        "specialRequests": "High floor room with city view if possible"
      }
    }
  ]
}
```

## External API Integration (Production Mode)

In production mode, the application will connect to real travel APIs instead of using mock data. Here's how the integration will work for each service:

### 1. Flight API Integration

As specified in your requirements, the application will integrate with the Adivaha Travel API for flight booking:

**Base URL**: `https://www.abengines.com/api/v1/travel-api/flights/`

**Authentication Headers**:
```
Content-Type: application/json
Accept-encoding: gzip
PID: [Your-PID]
x-api-key: [Your-API-Key]
```

**Flight Search Request Example**:
```json
{
  "action": "flightSearch",
  "adults": "1",
  "children": "0",
  "infants": "0",
  "isoneway": "Yes",
  "From_IATACODE": "DEL",
  "To_IATACODE": "JAI",
  "departure_date": "2024-09-09",
  "return_date": "2024-09-10",
  "Flights_category": "Economy"
}
```

### 2. Hotel API Integration

For hotel booking, integrate with a suitable hotel booking API (e.g., Booking.com Partner API, Expedia API, etc.).

### 3. Bus API Integration

For bus booking, integrate with bus booking providers like RedBus API or similar services.

### 4. Train API Integration

For train booking, integrate with railway APIs like IRCTC API (if available) or alternative providers.

### 5. Cab API Integration

For cab booking, integrate with ride-hailing APIs like Uber API, Ola API, or similar services.

### 6. Payment Gateway Integration

For real payment processing, integrate with payment gateways like:
- Razorpay
- PayU
- Stripe
- PayPal

## Environment Toggle Implementation

To easily switch between development and production environments, implement a configuration mechanism that allows toggling between mock data and real API calls:

### Configuration Files

```yaml
# application.yml
spring:
  profiles:
    active: ${SPRING_PROFILES_ACTIVE:dev}  # Default to dev environment

# application-dev.yml (Development Environment)
travelease:
  mode: development
  mock-data:
    enabled: true
    path: classpath:mockdata/
  external-api:
    enabled: false

# application-prod.yml (Production Environment)
travelease:
  mode: production
  mock-data:
    enabled: false
  external-api:
    enabled: true
    adivaha:
      base-url: https://www.abengines.com/api/v1/travel-api/
      pid: ${ADIVAHA_PID}
      api-key: ${ADIVAHA_API_KEY}
```

### Service Factory Pattern

Implement a service factory that creates the appropriate service implementation based on the active environment:

```java
@Configuration
public class ServiceFactory {

    @Value("${travelease.mock-data.enabled}")
    private boolean mockDataEnabled;

    @Value("${travelease.external-api.enabled}")
    private boolean externalApiEnabled;

    @Bean
    @Primary
    public FlightService flightService(
            MockFlightService mockFlightService,
            ExternalApiFlightService externalApiFlightService) {

        if (mockDataEnabled) {
            return mockFlightService;
        } else if (externalApiEnabled) {
            return externalApiFlightService;
        } else {
            throw new IllegalStateException("No flight service implementation is enabled");
        }
    }

    // Similar beans for other services (HotelService, BusService, etc.)
}
```

This approach ensures that the application can seamlessly switch between development mode with mock data and production mode with real API integrations by simply changing the active profile.

## API Response Format Standardization

Ensure that both mock data responses and external API responses follow the same format to maintain consistency across environments:

```java
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private List<String> errors;
    
    // Constructors, getters, setters
}
```

## Testing Both Environments

Create comprehensive test suites that verify the application works correctly in both environments:

1. **Unit Tests**: Test individual components with mocked dependencies
2. **Integration Tests**: Test interaction between components
3. **Environment-specific Tests**: Test both mock data services and external API integrations
        "departureTime": "2025-09-09T09:30:00"
      },
      "destination": {
        "airport": {
          "code": "JAI",
          "name": "Jaipur",
          "terminal": "2",
          "cityCode": "JAI",
          "cityName": "Jaipur",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T10:45:00"
      },
      "duration": 75,
      "cabinClass": "Economy",
      "availableSeats": 12,
      "fare": {
        "currency": "INR",
        "baseFare": 1200,
        "tax": 550,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 70
          },
          {
            "key": "YR",
            "value": 180
          },
          {
            "key": "OtherTaxes",
            "value": 300
          }
        ],
        "totalFare": 1750
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Paid",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": false, "price": 350, "type": "window"},
            {"number": "1B", "available": true, "price": 350, "type": "middle"},
            {"number": "1C", "available": true, "price": 350, "type": "aisle"}
          ]
        },
        {
          "row": "2",
          "seats": [
            {"number": "2A", "available": true, "price": 250, "type": "window"},
            {"number": "2B", "available": true, "price": 250, "type": "middle"},
            {"number": "2C", "available": true, "price": 250, "type": "aisle"}
          ]
        }
      ]
    }
  ]
}
```

### Mock Hotel Data Example (JSON)

```json
{
  "hotels": [
    {
      "id": "HT001",
      "name": "Luxury Palace Hotel",
      "starRating": 5,
      "address": "123 Main Street",
      "city": "Jaipur",
      "state": "Rajasthan",
      "country": "India",
      "zipCode": "302001",
      "latitude": 26.9124,
      "longitude": 75.7873,
      "checkInTime": "14:00",
      "checkOutTime": "12:00",
      "description": "A luxurious 5-star property in the heart of Jaipur",
      "amenities": [
        "Swimming Pool",
        "Spa",
        "Gym",
        "Restaurant",
        "Free WiFi",
        "Room Service",
        "Conference Room",
        "Parking"
      ],
      "images": [
        {
          "url": "luxury-palace# TravelEase: Make My Trip Clone - Comprehensive Development Plan

## Project Overview

Create a fully functional Make My Trip clone called "TravelEase" using Spring Boot (latest LTS) for the backend, React.js with Redux for the frontend, and MySQL (latest LTS) for the database. The application should support all core travel booking functionalities including flights, hotels, buses, trains, and cabs with user management, payment processing, and booking history.

## Tech Stack Requirements

### Frontend
- React.js (Latest LTS)
- Redux for state management
- Redux Persist for session persistence
- RTK Query for API integration (NOT Axios)
- Responsive design for all device types
- Material UI / Tailwind CSS for styling

### Backend
- Spring Boot (Latest LTS)
- Spring Security for authentication
- Spring Data JPA for database operations
- RESTful API design
- Microservices architecture

### Database
- MySQL (Latest LTS)
- Properly normalized database design

## Core Modules & Features

### 1. Authentication Module
- User registration with email verification
- Login with JWT token authentication
- Social login integration (Google, Facebook)
- Password reset functionality
- User profile management
- Role-based access control (User, Admin, Super Admin)

### 2. Flight Booking Module
- Flight search with filters (one-way, round-trip, multi-city)
- Advanced filters (price range, airlines, departure/arrival time, stops)
- Seat selection functionality
- Fare comparison calendar
- Traveler information collection
- Booking confirmation with e-tickets
- Flight status tracking

### 3. Hotel Booking Module
- Hotel search with location-based results
- Filters for price range, star rating, amenities, property type
- Room type selection
- Date range picker for check-in/check-out
- Photo gallery and property details
- Reviews and ratings display
- Map view for hotel location
- Special offers and discounts display

### 4. Bus Booking Module
- Bus route search with date selection
- Seat layout visualization and selection
- Bus type filters (AC, Non-AC, Sleeper, etc.)
- Departure time filters
- Boarding and dropping point selection
- Fare comparison between operators

### 5. Train Booking Module
- Train search by stations and date
- Train list with timings and availability
- Class selection (1AC, 2AC, 3AC, Sleeper, etc.)
- Seat/berth allocation
- Quota selection (General, Tatkal, etc.)
- Passenger details form

### 6. Cab Booking Module
- Point-to-point cab booking
- Different cab categories (Economy, Premium, etc.)
- Fare estimation based on distance
- Driver rating and reviews
- Ride scheduling for future dates
- Location tracking integration

### 7. Payment Module
- Multiple payment options (Credit/Debit cards, UPI, Net Banking, Wallets)
- Secure payment gateway integration
- Saved cards functionality with tokenization
- Discount coupon application
- Wallet and rewards integration
- Invoice generation
- Refund processing

### 8. User Dashboard
- Booking history with status
- Upcoming trips display
- Easy cancellation and modification options
- E-ticket download
- Review submission for completed trips
- Personalized offers
- Saved traveler profiles

### 9. Admin Dashboard
- Booking management
- User management
- Reports and analytics
- Inventory management
- Pricing and offer management
- Support ticket handling

### 10. Super Admin Module
- System configuration
- API integration management
- Access control
- Data backup and restoration
- System performance monitoring

## Database Schema Design

### User Management Tables
- users (id, username, email, password_hash, phone, status, created_at, updated_at)
- user_roles (id, user_id, role_id)
- roles (id, name, description)
- user_profiles (id, user_id, first_name, last_name, gender, dob, address, city, state, country, zip, profile_pic)
- saved_travelers (id, user_id, name, age, gender, id_type, id_number)

### Authentication Tables
- refresh_tokens (id, user_id, token, expires_at, created_at)
- password_reset_tokens (id, user_id, token, expires_at, created_at)

### Flight Tables
- airlines (id, name, code, logo, status)
- airports (id, name, code, city, country, timezone)
- flights (id, airline_id, flight_number, departure_airport_id, arrival_airport_id, departure_time, arrival_time, duration, status)
- flight_prices (id, flight_id, class_type, base_price, tax, available_seats, booking_date)
- flight_bookings (id, user_id, booking_number, booking_date, status, payment_status, total_amount)
- flight_booking_passengers (id, booking_id, passenger_name, passenger_age, passenger_gender, seat_number, special_requirements)

### Hotel Tables
- hotels (id, name, address, city, state, country, zip, star_rating, description, check_in_time, check_out_time, status)
- hotel_amenities (id, hotel_id, amenity_name)
- hotel_images (id, hotel_id, image_url, is_primary)
- room_types (id, hotel_id, name, description, max_occupancy, price_per_night)
- room_inventory (id, room_type_id, date, available_rooms)
- hotel_bookings (id, user_id, hotel_id, room_type_id, booking_number, check_in, check_out, guests, rooms, total_amount, status, payment_status)

### Bus Tables
- bus_operators (id, name, description, contact_info, rating)
- buses (id, operator_id, bus_number, bus_type, total_seats, amenities)
- bus_routes (id, source_city, destination_city, distance, duration)
- bus_schedules (id, bus_id, route_id, departure_time, arrival_time, fare)
- bus_seats (id, schedule_id, seat_number, is_available, position_x, position_y)
- bus_bookings (id, user_id, schedule_id, booking_number, booking_date, journey_date, total_amount, status, payment_status)
- bus_booking_passengers (id, booking_id, passenger_name, passenger_age, passenger_gender, seat_number)

### Train Tables
- trains (id, train_number, name, source_station, destination_station, days_running)
- train_classes (id, train_id, class_type, fare)
- stations (id, name, code, city, state)
- train_routes (id, train_id, station_id, arrival_time, departure_time, day, distance, sequence)
- train_availability (id, train_id, class_id, date, available_seats, waiting_list, status)
- train_bookings (id, user_id, train_id, class_id, booking_number, journey_date, source_station, destination_station, total_amount, status, payment_status)
- train_booking_passengers (id, booking_id, passenger_name, passenger_age, passenger_gender, seat_number, status)

### Cab Tables
- cab_types (id, name, description, base_fare, per_km_rate)
- cab_drivers (id, name, phone, license_number, rating, status)
- cab_vehicles (id, driver_id, type_id, model, registration_number, color, capacity)
- cab_bookings (id, user_id, vehicle_id, booking_number, pickup_location, dropoff_location, pickup_time, estimated_distance, estimated_fare, status, payment_status)

### Payment Tables
- payments (id, booking_type, booking_id, user_id, amount, payment_method, transaction_id, status, created_at)
- payment_methods (id, user_id, method_type, card_last_four, card_type, token, is_default)
- coupons (id, code, description, discount_type, discount_value, min_order_value, max_discount, valid_from, valid_to, usage_limit, used_count)
- user_coupons (id, user_id, coupon_id, is_used, used_at)
- refunds (id, payment_id, amount, reason, status, refund_date)

### Common Tables
- bookings (id, user_id, booking_type, booking_reference_id, booking_date, total_amount, status, payment_status)
- notifications (id, user_id, title, message, is_read, created_at)
- reviews (id, user_id, entity_type, entity_id, rating, review_text, created_at)
- favorites (id, user_id, entity_type, entity_id)

## Frontend Structure

### Directory Organization
```
/src
  /app
    store.js
    hooks.js
  /features
    /auth
      authSlice.js
      Login.jsx
      Register.jsx
      ProfilePage.jsx
    /flights
      flightApiSlice.js
      FlightSearch.jsx
      FlightResults.jsx
      FlightDetails.jsx
      FlightBooking.jsx
    /hotels
      hotelApiSlice.js
      HotelSearch.jsx
      HotelResults.jsx
      HotelDetails.jsx
      RoomSelection.jsx
      HotelBooking.jsx
    /buses
      busApiSlice.js
      BusSearch.jsx
      BusResults.jsx
      SeatSelection.jsx
      BusBooking.jsx
    /trains
      trainApiSlice.js
      TrainSearch.jsx
      TrainResults.jsx
      TrainBooking.jsx
    /cabs
      cabApiSlice.js
      CabSearch.jsx
      CabResults.jsx
      CabBooking.jsx
    /payment
      paymentApiSlice.js
      PaymentPage.jsx
      PaymentSuccess.jsx
      PaymentFailed.jsx
    /dashboard
      dashboardApiSlice.js
      Dashboard.jsx
      BookingHistory.jsx
      BookingDetails.jsx
    /admin
      adminApiSlice.js
      AdminDashboard.jsx
      UserManagement.jsx
      BookingManagement.jsx
      ReportsPage.jsx
  /components
    /ui
      Header.jsx
      Footer.jsx
      Sidebar.jsx
      SearchBox.jsx
      FilterPanel.jsx
      DatePicker.jsx
      Stepper.jsx
    /common
      LoadingSpinner.jsx
      ErrorBoundary.jsx
      NotFound.jsx
      ProtectedRoute.jsx
  /utils
    formatters.js
    validators.js
    constants.js
  /assets
    /images
    /icons
    /styles
  App.jsx
  index.jsx
```

### Redux Structure 

#### Store Configuration
```javascript
// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './api';

import authReducer from '../features/auth/authSlice';
import uiReducer from '../features/ui/uiSlice';
import searchReducer from '../features/search/searchSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'ui', 'search'] // only these will be persisted
};

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  search: searchReducer,
  [api.reducerPath]: api.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(api.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
```

#### RTK Query API Configuration
```javascript
// api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
```

#### Sample API Slice for Flights
```javascript
// flightApiSlice.js
import { api } from '../../app/api';

export const flightApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    searchFlights: builder.query({
      query: (searchParams) => ({
        url: 'flights/search',
        method: 'POST',
        body: searchParams,
      }),
    }),
    getFlightDetails: builder.query({
      query: (flightId) => `flights/${flightId}`,
    }),
    bookFlight: builder.mutation({
      query: (bookingData) => ({
        url: 'flights/booking',
        method: 'POST',
        body: bookingData,
      }),
    }),
    getBooking: builder.query({
      query: (bookingId) => `bookings/flight/${bookingId}`,
    }),
  }),
});

export const {
  useSearchFlightsQuery,
  useLazySearchFlightsQuery,
  useGetFlightDetailsQuery,
  useBookFlightMutation,
  useGetBookingQuery,
} = flightApiSlice;
```

## Backend Structure (Microservices)

### Service Organization
```
/travel-ease
  /api-gateway
    - Routes all requests to appropriate microservices
    - Handles authentication and authorization
    - Rate limiting and request validation
    - Routes to mock services in dev env and real services in production
  
  /auth-service
    - User registration and login
    - JWT token generation and validation
    - Password reset and account management
    - User profile management
  
  /flight-service
    - Flight search and booking
    - Flight data management
    - Seat allocation
    - Flight status updates
    - Dev: Returns mock flight data
    - Prod: Integrates with external flight API (Adivaha/abengines)
  
  /hotel-service
    - Hotel search and booking
    - Room inventory management
    - Hotel data and amenities
    - Review management
    - Dev: Returns mock hotel data
    - Prod: Integrates with external hotel API
  
  /bus-service
    - Bus search and booking
    - Seat layout and selection
    - Bus operator management
    - Route management
    - Dev: Returns mock bus data
    - Prod: Integrates with external bus API
  
  /train-service
    - Train search and booking
    - Station and route management
    - Seat/berth allocation
    - Train schedule management
    - Dev: Returns mock train data
    - Prod: Integrates with external train API
  
  /cab-service
    - Cab booking and management
    - Driver and vehicle management
    - Fare calculation
    - Ride scheduling
    - Dev: Returns mock cab data
    - Prod: Integrates with external cab API
  
  /payment-service
    - Payment processing
    - Multiple payment methods
    - Refund handling
    - Invoice generation
    - Dev: Simulates payment flows
    - Prod: Integrates with real payment gateways
  
  /booking-service
    - Centralized booking management
    - Booking status tracking
    - Cancellation and modification
    - Notification dispatching
  
  /notification-service
    - Email notifications
    - SMS notifications
    - Push notifications
    - Notification templates
  
  /admin-service
    - Admin dashboard APIs
    - Reporting and analytics
    - System configuration
    - User management
  
  /config-server
    - Centralized configuration management
    - Environment-specific configs
    - Controls dev/prod mode for all services
  
  /service-registry
    - Service discovery and registration
    - Load balancing
  
  /circuit-breaker
    - Fault tolerance
    - Service degradation handling
    
  /mock-data-service
    - Provides mock data for all services in dev environment
    - Contains realistic sample data for testing
    - Simulates delays and errors for testing edge cases
```

### Sample Spring Boot Service Structure (Flight Service)
```
/flight-service
  /src/main/java/com/travelease/flightservice
    /controller
      FlightController.java
      FlightBookingController.java
      AirlineController.java
      AirportController.java
    /service
      FlightService.java
      FlightBookingService.java
      AirlineService.java
      AirportService.java
      /impl
        FlightServiceImpl.java
        MockFlightServiceImpl.java
        ExternalApiFlightServiceImpl.java
    /repository
      FlightRepository.java
      FlightBookingRepository.java
      AirlineRepository.java
      AirportRepository.java
    /model
      Flight.java
      FlightBooking.java
      Airline.java
      Airport.java
      Passenger.java
      FlightPrice.java
    /dto
      FlightSearchRequestDTO.java
      FlightSearchResponseDTO.java
      FlightBookingRequestDTO.java
      FlightBookingResponseDTO.java
    /exception
      FlightNotFoundException.java
      BookingFailedException.java
      GlobalExceptionHandler.java
    /config
      SwaggerConfig.java
      SecurityConfig.java
      ServiceConfig.java  // Configuration for dev/prod environment
    /external
      /adivaha  // External flight API integration
        AdivahaTravelApiClient.java
        AdivahaTravelApiConfig.java
        AdivahaTravelApiException.java
        AdivahaTravelApiMapper.java
    /util
      FlightMapper.java
      EnvironmentDetector.java  // Detects dev/prod environment
    FlightServiceApplication.java
  /src/main/resources
    application.yml
    application-dev.yml  // Development-specific properties with mock data flag
    application-prod.yml // Production-specific properties with external API credentials
    bootstrap.yml
    /mockdata  // JSON files with mock data
      flights.json
      airlines.json
      airports.json
  /src/test
    /java/com/travelease/flightservice
      /controller
        FlightControllerTest.java
      /service
        FlightServiceTest.java
        MockFlightServiceTest.java
        ExternalApiFlightServiceTest.java
```

### Environment-Based Configuration

Add the following configuration to enable switching between dev and prod modes:

```yaml
# application.yml
spring:
  profiles:
    active: ${SPRING_PROFILES_ACTIVE:dev}  # Default to dev if not specified

# Common properties for all environments
travelease:
  service:
    version: 1.0.0
```

```yaml
# application-dev.yml
travelease:
  mock:
    enabled: true
    data-path: classpath:mockdata/
  external-api:
    enabled: false
```

```yaml
# application-prod.yml
travelease:
  mock:
    enabled: false
  external-api:
    enabled: true
    adivaha:
      base-url: https://www.abengines.com/api/v1/travel-api/
      pid: ${ADIVAHA_PID}
      api-key: ${ADIVAHA_API_KEY}
```

### Service Implementation with Environment Detection

```java
// ServiceConfig.java
@Configuration
public class ServiceConfig {
    
    @Value("${travelease.mock.enabled}")
    private boolean mockEnabled;
    
    @Value("${travelease.external-api.enabled}")
    private boolean externalApiEnabled;
    
    @Bean
    @Primary
    public FlightService flightService(
            MockFlightServiceImpl mockFlightService,
            ExternalApiFlightServiceImpl externalApiFlightService) {
        
        if (mockEnabled) {
            return mockFlightService;
        } else if (externalApiEnabled) {
            return externalApiFlightService;
        } else {
            throw new IllegalStateException("No flight service implementation is enabled");
        }
    }
}
```

```java
// FlightService.java
public interface FlightService {
    List<FlightDTO> searchFlights(FlightSearchRequestDTO searchRequest);
    FlightDTO getFlightDetails(String flightId);
    FlightBookingResponseDTO bookFlight(FlightBookingRequestDTO bookingRequest);
}
```

```java
// MockFlightServiceImpl.java
@Service
@ConditionalOnProperty(name = "travelease.mock.enabled", havingValue = "true")
public class MockFlightServiceImpl implements FlightService {
    
    private final List<FlightDTO> mockFlights;
    
    public MockFlightServiceImpl(@Value("${travelease.mock.data-path}") String mockDataPath) {
        // Load mock data from JSON files
        this.mockFlights = loadMockFlightsFromJson(mockDataPath + "flights.json");
    }
    
    @Override
    public List<FlightDTO> searchFlights(FlightSearchRequestDTO searchRequest) {
        // Filter mock flights based on search criteria
        return mockFlights.stream()
            .filter(flight -> matchesSearchCriteria(flight, searchRequest))
            .collect(Collectors.toList());
    }
    
    @Override
    public FlightDTO getFlightDetails(String flightId) {
        return mockFlights.stream()
            .filter(flight -> flight.getId().equals(flightId))
            .findFirst()
            .orElseThrow(() -> new FlightNotFoundException("Flight not found with ID: " + flightId));
    }
    
    @Override
    public FlightBookingResponseDTO bookFlight(FlightBookingRequestDTO bookingRequest) {
        // Simulate booking process with mock data
        return createMockBookingResponse(bookingRequest);
    }
    
    // Helper methods for loading and filtering mock data
    private List<FlightDTO> loadMockFlightsFromJson(String jsonPath) {
        // Implementation to load mock data from JSON file
    }
    
    private boolean matchesSearchCriteria(FlightDTO flight, FlightSearchRequestDTO searchRequest) {
        // Implementation to match flight with search criteria
    }
    
    private FlightBookingResponseDTO createMockBookingResponse(FlightBookingRequestDTO bookingRequest) {
        // Implementation to create mock booking response
    }
}
```

```java
// ExternalApiFlightServiceImpl.java
@Service
@ConditionalOnProperty(name = "travelease.external-api.enabled", havingValue = "true")
public class ExternalApiFlightServiceImpl implements FlightService {
    
    private final AdivahaTravelApiClient apiClient;
    private final AdivahaTravelApiMapper apiMapper;
    
    public ExternalApiFlightServiceImpl(AdivahaTravelApiClient apiClient, AdivahaTravelApiMapper apiMapper) {
        this.apiClient = apiClient;
        this.apiMapper = apiMapper;
    }
    
    @Override
    public List<FlightDTO> searchFlights(FlightSearchRequestDTO searchRequest) {
        // Convert internal DTO to external API request format
        var apiRequest = apiMapper.toApiSearchRequest(searchRequest);
        
        // Call external API
        var apiResponse = apiClient.searchFlights(apiRequest);
        
        // Map response back to internal DTO format
        return apiMapper.toFlightDTOList(apiResponse);
    }
    
    @Override
    public FlightDTO getFlightDetails(String flightId) {
        // Call external API to get flight details
        var apiResponse = apiClient.getFlightDetails(flightId);
        
        // Map response to internal DTO
        return apiMapper.toFlightDTO(apiResponse);
    }
    
    @Override
    public FlightBookingResponseDTO bookFlight(FlightBookingRequestDTO bookingRequest) {
        // Convert to API request format
        var apiRequest = apiMapper.toApiBookingRequest(bookingRequest);
        
        // Call external API to book flight
        var apiResponse = apiClient.bookFlight(apiRequest);
        
        // Map response to internal DTO
        return apiMapper.toBookingResponseDTO(apiResponse);
    }
}
```

### External API Client Implementation

```java
// AdivahaTravelApiClient.java
@Service
@ConditionalOnProperty(name = "travelease.external-api.enabled", havingValue = "true")
public class AdivahaTravelApiClient {
    
    private final RestTemplate restTemplate;
    private final String baseUrl;
    private final String pid;
    private final String apiKey;
    
    public AdivahaTravelApiClient(
            RestTemplate restTemplate,
            @Value("${travelease.external-api.adivaha.base-url}") String baseUrl,
            @Value("${travelease.external-api.adivaha.pid}") String pid,
            @Value("${travelease.external-api.adivaha.api-key}") String apiKey) {
        this.restTemplate = restTemplate;
        this.baseUrl = baseUrl;
        this.pid = pid;
        this.apiKey = apiKey;
    }
    
    public AdivahaFlightSearchResponse searchFlights(AdivahaFlightSearchRequest request) {
        HttpHeaders headers = createHeaders();
        HttpEntity<AdivahaFlightSearchRequest> entity = new HttpEntity<>(request, headers);
        
        try {
            ResponseEntity<AdivahaFlightSearchResponse> response = restTemplate.exchange(
                baseUrl + "flights/",
                HttpMethod.POST,
                entity,
                AdivahaFlightSearchResponse.class
            );
            
            return response.getBody();
        } catch (RestClientException e) {
            throw new AdivahaTravelApiException("Failed to search flights", e);
        }
    }
    
    public AdivahaFlightDetailsResponse getFlightDetails(String flightId) {
        HttpHeaders headers = createHeaders();
        HttpEntity<Void> entity = new HttpEntity<>(headers);
        
        try {
            ResponseEntity<AdivahaFlightDetailsResponse> response = restTemplate.exchange(
                baseUrl + "flights/" + flightId,
                HttpMethod.GET,
                entity,
                AdivahaFlightDetailsResponse.class
            );
            
            return response.getBody();
        } catch (RestClientException e) {
            throw new AdivahaTravelApiException("Failed to get flight details", e);
        }
    }
    
    public AdivahaBookingResponse bookFlight(AdivahaBookingRequest request) {
        HttpHeaders headers = createHeaders();
        HttpEntity<AdivahaBookingRequest> entity = new HttpEntity<>(request, headers);
        
        try {
            ResponseEntity<AdivahaBookingResponse> response = restTemplate.exchange(
                baseUrl + "flights/booking",
                HttpMethod.POST,
                entity,
                AdivahaBookingResponse.class
            );
            
            return response.getBody();
        } catch (RestClientException e) {
            throw new AdivahaTravelApiException("Failed to book flight", e);
        }
    }
    
    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("Accept-encoding", "gzip");
        headers.set("PID", pid);
        headers.set("x-api-key", apiKey);
        return headers;
    }
    
    // API request/response model classes would be defined here
}
```

## Microservices Architecture Implementation

### API Gateway Implementation

The API Gateway is the central entry point for all client requests and manages routing to the appropriate microservices:

```java
// ApiGatewayApplication.java
@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }
}
```

```yaml
# application.yml for API Gateway
spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      routes:
        - id: auth-service
          uri: lb://auth-service
          predicates:
            - Path=/api/auth/**
          filters:
            - StripPrefix=2
            
        - id: flight-service
          uri: lb://flight-service
          predicates:
            - Path=/api/flights/**
          filters:
            - StripPrefix=2
            
        - id: hotel-service
          uri: lb://hotel-service
          predicates:
            - Path=/api/hotels/**
          filters:
            - StripPrefix=2
            
        - id: bus-service
          uri: lb://bus-service
          predicates:
            - Path=/api/buses/**
          filters:
            - StripPrefix=2
            
        - id: train-service
          uri: lb://train-service
          predicates:
            - Path=/api/trains/**
          filters:
            - StripPrefix=2
            
        - id: cab-service
          uri: lb://cab-service
          predicates:
            - Path=/api/cabs/**
          filters:
            - StripPrefix=2
            
        - id: payment-service
          uri: lb://payment-service
          predicates:
            - Path=/api/payments/**
          filters:
            - StripPrefix=2
            
        - id: booking-service
          uri: lb://booking-service
          predicates:
            - Path=/api/bookings/**
          filters:
            - StripPrefix=2
            
        - id: admin-service
          uri: lb://admin-service
          predicates:
            - Path=/api/admin/**
          filters:
            - StripPrefix=2
```

### Service Registry Implementation

The Service Registry enables service discovery in the microservices architecture:

```java
// ServiceRegistryApplication.java
@SpringBootApplication
@EnableEurekaServer
public class ServiceRegistryApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServiceRegistryApplication.class, args);
    }
}
```

```yaml
# application.yml for Service Registry
server:
  port: 8761

spring:
  application:
    name: service-registry

eureka:
  client:
    register-with-eureka: false
    fetch-registry: false
  server:
    wait-time-in-ms-when-sync-empty: 0
```

### Config Server Implementation

The Config Server provides centralized configuration management:

```java
// ConfigServerApplication.java
@SpringBootApplication
@EnableConfigServer
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}
```

```yaml
# application.yml for Config Server
server:
  port: 8888

spring:
  application:
    name: config-server
  cloud:
    config:
      server:
        git:
          uri: ${CONFIG_REPO_URI:https://github.com/yourusername/travelease-config}
          default-label: ${CONFIG_REPO_BRANCH:main}
          search-paths: config-files
```

### Circuit Breaker Implementation

The Circuit Breaker provides fault tolerance and prevents cascading failures:

```java
// FlightServiceImpl.java with Circuit Breaker
@Service
public class ExternalApiFlightServiceImpl implements FlightService {
    
    private final AdivahaTravelApiClient apiClient;
    
    @CircuitBreaker(name = "flightService", fallbackMethod = "searchFlightsFallback")
    @Retry(name = "flightService")
    @Bulkhead(name = "flightService")
    @RateLimiter(name = "flightService")
    @Override
    public List<FlightDTO> searchFlights(FlightSearchRequestDTO searchRequest) {
        // Make API call to external service
        return apiClient.searchFlights(searchRequest);
    }
    
    public List<FlightDTO> searchFlightsFallback(FlightSearchRequestDTO searchRequest, Exception e) {
        // Return cached data or minimal response
        log.error("Flight search failed, returning fallback response", e);
        return Collections.emptyList();
    }
}
```

```yaml
# application.yml with Resilience4j configuration
resilience4j:
  circuitbreaker:
    instances:
      flightService:
        registerHealthIndicator: true
        slidingWindowType: COUNT_BASED
        slidingWindowSize: 10
        failureRateThreshold: 50
        waitDurationInOpenState: 10000
        permittedNumberOfCallsInHalfOpenState: 3
        automaticTransitionFromOpenToHalfOpenEnabled: true
  retry:
    instances:
      flightService:
        maxAttempts: 3
        waitDuration: 1000
        enableExponentialBackoff: true
        exponentialBackoffMultiplier: 2
  bulkhead:
    instances:
      flightService:
        maxConcurrentCalls: 10
  ratelimiter:
    instances:
      flightService:
        limitRefreshPeriod: 1000
        limitForPeriod: 5
        timeoutDuration: 500
```

### Cross-Service Communication

For communication between microservices, use Spring Cloud OpenFeign:

```java
// BookingService.java using Feign Client
@FeignClient(name = "flight-service")
public interface FlightServiceClient {
    
    @PostMapping("/flights/search")
    List<FlightDTO> searchFlights(@RequestBody FlightSearchRequestDTO searchRequest);
    
    @GetMapping("/flights/{flightId}")
    FlightDTO getFlightDetails(@PathVariable("flightId") String flightId);
    
    @PostMapping("/flights/booking")
    FlightBookingResponseDTO bookFlight(@RequestBody FlightBookingRequestDTO bookingRequest);
}

@Service
public class BookingServiceImpl implements BookingService {
    
    private final FlightServiceClient flightServiceClient;
    private final HotelServiceClient hotelServiceClient;
    private final PaymentServiceClient paymentServiceClient;
    private final BookingRepository bookingRepository;
    
    @Transactional
    @Override
    public BookingResponseDTO createFlightBooking(CreateFlightBookingRequestDTO request) {
        // Get flight details
        FlightDTO flight = flightServiceClient.getFlightDetails(request.getFlightId());
        
        // Create booking record
        Booking booking = new Booking();
        booking.setUserId(request.getUserId());
        booking.setBookingType(BookingType.FLIGHT);
        booking.setBookingDate(LocalDateTime.now());
        booking.setStatus(BookingStatus.PENDING);
        booking.setPaymentStatus(PaymentStatus.PENDING);
        booking.setTotalAmount(flight.getFare().getTotalFare() * request.getPassengers().size());
        booking.setCurrency(flight.getFare().getCurrency());
        
        Booking savedBooking = bookingRepository.save(booking);
        
        // Process payment
        PaymentRequestDTO paymentRequest = new PaymentRequestDTO();
        paymentRequest.setBookingId(savedBooking.getId());
        paymentRequest.setAmount(savedBooking.getTotalAmount());
        paymentRequest.setCurrency(savedBooking.getCurrency());
        paymentRequest.setPaymentMethod(request.getPaymentMethod());
        
        PaymentResponseDTO paymentResponse = paymentServiceClient.processPayment(paymentRequest);
        
        // Update booking status based on payment
        if (paymentResponse.isSuccess()) {
            savedBooking.setStatus(BookingStatus.CONFIRMED);
            savedBooking.setPaymentStatus(PaymentStatus.PAID);
        } else {
            savedBooking.setStatus(BookingStatus.FAILED);
            savedBooking.setPaymentStatus(PaymentStatus.FAILED);
        }
        
        savedBooking = bookingRepository.save(savedBooking);
        
        // Book the flight if payment successful
        if (paymentResponse.isSuccess()) {
            FlightBookingRequestDTO flightBookingRequest = new FlightBookingRequestDTO();
            flightBookingRequest.setFlightId(request.getFlightId());
            flightBookingRequest.setPassengers(request.getPassengers());
            flightBookingRequest.setBookingId(savedBooking.getId());
            
            FlightBookingResponseDTO flightBookingResponse = flightServiceClient.bookFlight(flightBookingRequest);
            
            // Update booking with reference information
            savedBooking.setBookingReference(flightBookingResponse.getBookingReference());
            savedBooking = bookingRepository.save(savedBooking);
        }
        
        return mapToBookingResponse(savedBooking);
    }
}
```

## Inter-Service Communication Flow

### Booking Flow Example

1. **User initiates booking**: The client submits a booking request to the API Gateway.

2. **API Gateway routes request**: The request is routed to the Booking Service.

3. **Booking Service validates request**: The Booking Service validates the booking request.

4. **Booking Service gets travel details**: The Booking Service communicates with the appropriate travel service (Flight, Hotel, etc.) to get details and verify availability.

5. **Booking Service creates a booking record**: A pending booking record is created in the database.

6. **Booking Service initiates payment**: The Booking Service communicates with the Payment Service to process the payment.

7. **Payment Service processes payment**: The Payment Service handles the payment transaction, potentially communicating with external payment gateways.

8. **Payment Service returns result**: The Payment Service returns the payment result to the Booking Service.

9. **Booking Service finalizes booking**: Based on the payment result, the Booking Service confirms or cancels the booking and updates its status.

10. **Booking Service confirms travel reservation**: The Booking Service communicates with the travel service to confirm the reservation.

11. **Booking Service initiates notification**: The Booking Service communicates with the Notification Service to send a confirmation email/SMS to the user.

12. **Response returned to client**: The booking confirmation is returned through the API Gateway to the client.

## Docker Configuration for Microservices

Each microservice should be containerized using Docker for consistent deployment:

### Dockerfile Example for Flight Service

```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/flight-service-0.0.1-SNAPSHOT.jar flight-service.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "flight-service.jar"]
```

### Docker Compose for Local Development

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: travelease
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
      - ./init-scripts:/docker-entrypoint-initdb.d

  service-registry:
    build: ./service-registry
    ports:
      - "8761:8761"

  config-server:
    build: ./config-server
    ports:
      - "8888:8888"
    depends_on:
      - service-registry
    environment:
      - SPRING_PROFILES_ACTIVE=dev
      - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://service-registry:8761/eureka/

  api-gateway:
    build: ./api-gateway
    ports:
      - "8080:8080"
    depends_on:
      - service-registry
      - config-server
    environment:
      - SPRING_PROFILES_ACTIVE=dev
      - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://service-registry:8761/eureka/
      - SPRING_CLOUD_CONFIG_URI=http://config-server:8888

  auth-service:
    build: ./auth-service
    depends_on:
      - mysql
      - service-registry
      - config-server
    environment:
      - SPRING_PROFILES_ACTIVE=dev
      - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://service-registry:8761/eureka/
      - SPRING_CLOUD_CONFIG_URI=http://config-server:8888
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/travelease
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=rootpassword

  flight-service:
    build: ./flight-service
    depends_on:
      - mysql
      - service-registry
      - config-server
    environment:
      - SPRING_PROFILES_ACTIVE=dev
      - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://service-registry:8761/eureka/
      - SPRING_CLOUD_CONFIG_URI=http://config-server:8888
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/travelease
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=rootpassword

  # Additional services (hotel-service, bus-service, etc.) follow the same pattern

volumes:
  mysql-data:
```

## Kubernetes Deployment for Production

For production deployment, use Kubernetes to manage the microservices:

### Kubernetes Deployment Example for Flight Service

```yaml
# flight-service-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: flight-service
spec:
  replicas: 2
  selector:
    matchLabels:
      app: flight-service
  template:
    metadata:
      labels:
        app: flight-service
    spec:
      containers:
      - name: flight-service
        image: travelease/flight-service:latest
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "prod"
        - name: EUREKA_CLIENT_SERVICEURL_DEFAULTZONE
          value: "http://service-registry:8761/eureka/"
        - name: SPRING_CLOUD_CONFIG_URI
          value: "http://config-server:8888"
        - name: SPRING_DATASOURCE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url
        - name: SPRING_DATASOURCE_USERNAME
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: username
        - name: SPRING_DATASOURCE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: password
        - name: ADIVAHA_PID
          valueFrom:
            secretKeyRef:
              name: api-credentials
              key: adivaha-pid
        - name: ADIVAHA_API_KEY
          valueFrom:
            secretKeyRef:
              name: api-credentials
              key: adivaha-api-key
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          initialDelaySeconds: 60
          periodSeconds: 30
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 15
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
```

```yaml
# flight-service-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: flight-service
spec:
  selector:
    app: flight-service
  ports:
  - port: 8080
    targetPort: 8080
  type: ClusterIP
```

## Deployment Strategy

### CI/CD Pipeline

Implement a CI/CD pipeline for automated testing and deployment:

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up JDK 17
      uses: actions/setup-java@v2
      with:
        java-version: '17'
        distribution: 'adopt'
        
    - name: Build with Maven
      run: mvn -B package --file pom.xml
      
    - name: Run tests
      run: mvn test
      
    - name: Build Docker images
      run: |
        docker-compose build
        
    - name: Push Docker images
      if: github.event_name == 'push' && github.ref == 'refs/heads/main'
      run: |
        echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
        docker-compose push
        
    - name: Deploy to Kubernetes
      if: github.event_name == 'push' && github.ref == 'refs/heads/main'
      run: |
        echo "${{ secrets.KUBE_CONFIG_DATA }}" | base64 -d > /tmp/kubeconfig
        export KUBECONFIG=/tmp/kubeconfig
        kubectl apply -f kubernetes/
```

## Monitoring and Logging

Implement comprehensive monitoring and logging for the microservices:

### Monitoring with Spring Boot Actuator and Prometheus

```yaml
# application.yml for services
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: always
      probes:
        enabled: true
  metrics:
    export:
      prometheus:
        enabled: true
```

### Centralized Logging with ELK Stack

Configure all services to send logs to a centralized ELK (Elasticsearch, Logstash, Kibana) stack:

```xml
<!-- pom.xml dependency -->
<dependency>
    <groupId>net.logstash.logback</groupId>
    <artifactId>logstash-logback-encoder</artifactId>
    <version>7.2</version>
</dependency>
```

```xml
<!-- logback-spring.xml -->
<configuration>
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    
    <appender name="LOGSTASH" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
        <destination>${LOGSTASH_HOST:-localhost}:${LOGSTASH_PORT:-5000}</destination>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder">
            <customFields>{"app":"${spring.application.name}", "env":"${spring.profiles.active}"}</customFields>
        </encoder>
    </appender>
    
    <root level="INFO">
        <appender-ref ref="CONSOLE" />
        <appender-ref ref="LOGSTASH" />
    </root>
</configuration>
```

## Frontend Integration with Backend

The React frontend will connect to the backend microservices through the API Gateway using RTK Query:

### RTK Query API Setup

```javascript
// src/app/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
```

### Flight API Slice

```javascript
// src/features/flights/flightApiSlice.js
import { api } from '../../app/api';

export const flightApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    searchFlights: builder.query({
      query: (searchParams) => ({
        url: 'flights/search',
        method: 'POST',
        body: searchParams,
      }),
      providesTags: ['Flights'],
    }),
    getFlightDetails: builder.query({
      query: (flightId) => `flights/${flightId}`,
      providesTags: (result, error, flightId) => [{ type: 'Flight', id: flightId }],
    }),
    bookFlight: builder.mutation({
      query: (bookingData) => ({
        url: 'flights/booking',
        method: 'POST',
        body: bookingData,
      }),
      invalidatesTags: ['UserBookings'],
    }),
  }),
});

export const {
  useSearchFlightsQuery,
  useLazySearchFlightsQuery,
  useGetFlightDetailsQuery,
  useBookFlightMutation,
} = flightApiSlice;
```

### Booking API Slice

```javascript
// src/features/bookings/bookingApiSlice.js
import { api } from '../../app/api';

export const bookingApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserBookings: builder.query({
      query: () => 'bookings/user',
      providesTags: ['UserBookings'],
    }),
    getBookingDetails: builder.query({
      query: (bookingId) => `bookings/${bookingId}`,
      providesTags: (result, error, bookingId) => [{ type: 'Booking', id: bookingId }],
    }),
    cancelBooking: builder.mutation({
      query: (bookingId) => ({
        url: `bookings/${bookingId}/cancel`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, bookingId) => [
        'UserBookings',
        { type: 'Booking', id: bookingId },
      ],
    }),
  }),
});

export const {
  useGetUserBookingsQuery,
  useGetBookingDetailsQuery,
  useCancelBookingMutation,
} = bookingApiSlice;
```

## Conclusion

This comprehensive development plan provides a detailed blueprint for building a robust Make My Trip clone with Spring Boot microservices, React frontend, and MySQL database. The architecture supports both development with mock data and production with real API integrations, allowing for seamless switching between environments.

The implementation follows industry best practices, including:
- Microservices architecture for scalability and maintainability
- Environment-specific configuration for different deployment scenarios
- Comprehensive error handling and resilience patterns
- Efficient inter-service communication
- Secure authentication and authorization
- Containerization for consistent deployment
- Monitoring and logging for operational visibility

By following this plan, you'll be able to develop a fully functional travel booking platform that meets all your specified requirements.

## UI/UX Requirements

- The top toolbar must display flight, hotel, cab, bus, train modules
- When a specific module is scrolled to top, show relevant information for that module (similar to Make My Trip's behavior)
- All modules should have a consistent look and feel
- Responsive design for all screen sizes
- Material design principles with custom theming
- Smooth transitions between pages
- Loading indicators for all async operations
- Clear error messages and validation feedback
- Accessible design with proper contrast and keyboard navigation
- Dark mode support

## Testing Strategy

### Frontend Testing
- Unit tests for React components using Jest and React Testing Library
- Integration tests for component interactions
- Redux store tests for state management
- E2E testing using Cypress

### Backend Testing
- Unit tests for services and repositories
- Integration tests for APIs
- Performance testing for critical endpoints
- Load testing for high-traffic scenarios

## Mock Data and Development Environment

For development, create mock services that simulate the real API responses:

```javascript
// Mock Flight Data Example
const mockFlights = [
  {
    id: 'FL001',
    airline: {
      code: 'AI',
      name: 'Air India',
      logo: 'air-india-logo.png'
    },
    flightNumber: 'AI9843',
    source: {
      code: 'DEL',
      city: 'Delhi',
      terminal: '3',
      country: 'India'
    },
    destination: {
      code: 'JAI',
      city: 'Jaipur',
      terminal: '2',
      country: 'India'
    },
    departureTime: '2025-09-09T07:15:00',
    arrivalTime: '2025-09-09T08:15:00',
    duration: 60, // in minutes
    price: {
      baseFare: 1000,
      tax: 703,
      total: 1703
    },
    cabinClass: 'Economy',
    availableSeats: 6,
    isRefundable: true
  },
  // More flight data...
];
```

## Deployment Considerations

- Containerize each microservice using Docker
- Deploy using Kubernetes for orchestration
- Set up CI/CD pipeline using Jenkins or GitHub Actions
- Configure environment-specific properties
- Implement proper logging and monitoring
- Set up database backup strategies
- Configure SSL for secure communication

## Additional Instructions

1. Follow best practices for code organization and commenting
2. Implement proper error handling at all levels
3. Create comprehensive documentation for APIs and components
4. Use Git for version control with proper branching strategy
5. Follow Test-Driven Development (TDD) approach where possible
6. Implement proper logging throughout the application
7. Ensure data validation at both frontend and backend
8. Focus on security best practices, especially for payment processing
9. Use responsive design principles for all UI components
10. Create consistent styling using shared components and a design system

This comprehensive plan provides the foundation for building a robust Make My Trip clone with all core functionalities. The implementation can be adjusted based on specific requirements and timelines.
