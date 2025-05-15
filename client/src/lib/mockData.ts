import { Flight, Hotel, Train, Bus } from './types';

// Mock flight data for testing front-end components
export const mockFlights: Flight[] = [
  {
    id: "FL001",
    resultIndex: "OB1",
    isLCC: false,
    isRefundable: true,
    airline: {
      code: "AI",
      name: "Air India",
      logo: "air-india-logo.png"
    },
    flightNumber: "AI9843",
    source: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Airport",
        terminal: "3",
        cityCode: "DEL",
        cityName: "Delhi",
        countryCode: "IN",
        countryName: "India"
      },
      departureTime: "2025-09-09T07:15:00"
    },
    destination: {
      airport: {
        code: "JAI",
        name: "Jaipur",
        terminal: "2",
        cityCode: "JAI",
        cityName: "Jaipur",
        countryCode: "IN",
        countryName: "India"
      },
      arrivalTime: "2025-09-09T08:15:00"
    },
    duration: 60,
    cabinClass: "Economy",
    availableSeats: 6,
    fare: {
      currency: "INR",
      baseFare: 1000,
      tax: 703,
      taxBreakup: [
        {
          key: "K3",
          value: 63
        },
        {
          key: "YR",
          value: 250
        },
        {
          key: "OtherTaxes",
          value: 390
        }
      ],
      totalFare: 1703
    },
    baggage: "15 KG",
    cabinBaggage: "7 KG",
    mealService: "Snacks",
    seatMap: [
      {
        row: "1",
        seats: [
          {"number": "1A", "available": true, "price": 300, "type": "window"},
          {"number": "1B", "available": false, "price": 300, "type": "middle"},
          {"number": "1C", "available": true, "price": 300, "type": "aisle"}
        ]
      },
      {
        row: "2",
        seats: [
          {"number": "2A", "available": true, "price": 200, "type": "window"},
          {"number": "2B", "available": true, "price": 200, "type": "middle"},
          {"number": "2C", "available": true, "price": 200, "type": "aisle"}
        ]
      }
    ]
  },
  {
    id: "FL002",
    resultIndex: "OB2",
    isLCC: true,
    isRefundable: false,
    airline: {
      code: "6E",
      name: "IndiGo",
      logo: "indigo-logo.png"
    },
    flightNumber: "6E185",
    source: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Airport",
        terminal: "1",
        cityCode: "DEL",
        cityName: "Delhi",
        countryCode: "IN",
        countryName: "India"
      },
      departureTime: "2025-09-09T09:30:00"
    },
    destination: {
      airport: {
        code: "JAI",
        name: "Jaipur",
        terminal: "2",
        cityCode: "JAI",
        cityName: "Jaipur",
        countryCode: "IN",
        countryName: "India"
      },
      arrivalTime: "2025-09-09T10:45:00"
    },
    duration: 75,
    cabinClass: "Economy",
    availableSeats: 12,
    fare: {
      currency: "INR",
      baseFare: 1200,
      tax: 550,
      taxBreakup: [
        {
          key: "K3",
          value: 70
        },
        {
          key: "YR",
          value: 180
        },
        {
          key: "OtherTaxes",
          value: 300
        }
      ],
      totalFare: 1750
    },
    baggage: "15 KG",
    cabinBaggage: "7 KG",
    mealService: "Paid",
    seatMap: [
      {
        row: "1",
        seats: [
          {"number": "1A", "available": false, "price": 350, "type": "window"},
          {"number": "1B", "available": true, "price": 350, "type": "middle"},
          {"number": "1C", "available": true, "price": 350, "type": "aisle"}
        ]
      },
      {
        row: "2",
        seats: [
          {"number": "2A", "available": true, "price": 250, "type": "window"},
          {"number": "2B", "available": true, "price": 250, "type": "middle"},
          {"number": "2C", "available": true, "price": 250, "type": "aisle"}
        ]
      }
    ]
  }
];

// Mock hotel data for testing front-end components
export const mockHotels: Hotel[] = [
  {
    id: "HT001",
    name: "Luxury Palace Hotel",
    starRating: 5,
    address: "123 Main Street",
    city: "Jaipur",
    state: "Rajasthan",
    country: "India",
    zipCode: "302001",
    latitude: 26.9124,
    longitude: 75.7873,
    checkInTime: "14:00",
    checkOutTime: "12:00",
    description: "A luxurious 5-star property in the heart of Jaipur",
    amenities: [
      "Swimming Pool",
      "Spa",
      "Gym",
      "Restaurant",
      "Free WiFi",
      "Room Service",
      "Conference Room",
      "Parking"
    ],
    images: [
      {
        url: "luxury-palace-exterior.jpg",
        caption: "Hotel Exterior"
      },
      {
        url: "luxury-palace-lobby.jpg",
        caption: "Hotel Lobby"
      },
      {
        url: "luxury-palace-room.jpg",
        caption: "Deluxe Room"
      }
    ],
    reviews: [
      {
        userId: "U1001",
        userName: "John D.",
        rating: 4.5,
        comment: "Excellent service and beautiful property",
        date: "2025-01-15"
      },
      {
        userId: "U1002",
        userName: "Mary S.",
        rating: 5.0,
        comment: "Perfect stay, highly recommended!",
        date: "2025-02-20"
      }
    ],
    roomTypes: [
      {
        id: "RT001",
        name: "Deluxe Room",
        description: "Spacious room with king-size bed",
        maxOccupancy: 2,
        bedType: "King",
        amenities: ["TV", "Air Conditioning", "Mini Bar", "Safe"],
        images: ["deluxe-room-1.jpg", "deluxe-room-2.jpg"],
        pricing: {
          basePrice: 5000,
          tax: 900,
          totalPrice: 5900,
          currency: "INR"
        },
        availableRooms: 5
      },
      {
        id: "RT002",
        name: "Executive Suite",
        description: "Luxury suite with separate living area",
        maxOccupancy: 3,
        bedType: "King + Sofa",
        amenities: ["TV", "Air Conditioning", "Mini Bar", "Safe", "Jacuzzi", "Balcony"],
        images: ["exec-suite-1.jpg", "exec-suite-2.jpg"],
        pricing: {
          basePrice: 8000,
          tax: 1440,
          totalPrice: 9440,
          currency: "INR"
        },
        availableRooms: 2
      }
    ]
  },
  {
    id: "HT002",
    name: "Budget Inn Express",
    starRating: 3,
    address: "456 Central Avenue",
    city: "Jaipur",
    state: "Rajasthan",
    country: "India",
    zipCode: "302005",
    latitude: 26.9024,
    longitude: 75.8024,
    checkInTime: "12:00",
    checkOutTime: "10:00",
    description: "Affordable comfort in a convenient location",
    amenities: [
      "Free WiFi",
      "Restaurant",
      "Parking"
    ],
    images: [
      {
        url: "budget-inn-exterior.jpg",
        caption: "Hotel Exterior"
      },
      {
        url: "budget-inn-room.jpg",
        caption: "Standard Room"
      }
    ],
    reviews: [
      {
        userId: "U2001",
        userName: "Robert J.",
        rating: 3.5,
        comment: "Good value for money",
        date: "2025-01-05"
      }
    ],
    roomTypes: [
      {
        id: "RT003",
        name: "Standard Room",
        description: "Comfortable room with twin beds",
        maxOccupancy: 2,
        bedType: "Twin",
        amenities: ["TV", "Air Conditioning"],
        images: ["standard-room-1.jpg", "standard-room-2.jpg"],
        pricing: {
          basePrice: 2000,
          tax: 360,
          totalPrice: 2360,
          currency: "INR"
        },
        availableRooms: 8
      }
    ]
  }
];

// Mock bus data for testing front-end components
export const mockBuses: Bus[] = [
  {
    id: "BS001",
    operatorId: "OP001",
    operatorName: "Royal Travels",
    busNumber: "RT123",
    busType: "Volvo AC Sleeper",
    totalSeats: 36,
    amenities: ["AC", "Charging Point", "Blanket", "Water Bottle"],
    source: {
      city: "Delhi",
      terminal: "Kashmere Gate ISBT",
      time: "2025-09-09T21:00:00"
    },
    destination: {
      city: "Jaipur",
      terminal: "Sindhi Camp Bus Stand",
      time: "2025-09-10T05:00:00"
    },
    duration: 480,
    distance: 280,
    fare: 1200,
    currency: "INR",
    rating: 4.2,
    availableSeats: 14,
    seatLayout: {
      lowerDeck: [
        {
          row: 1,
          seats: [
            {number: "L1", available: true, price: 1200, type: "sleeper"},
            {number: "L2", available: false, price: 1200, type: "sleeper"}
          ]
        },
        {
          row: 2,
          seats: [
            {number: "L3", available: true, price: 1200, type: "sleeper"},
            {number: "L4", available: true, price: 1200, type: "sleeper"}
          ]
        }
      ],
      upperDeck: [
        {
          row: 1,
          seats: [
            {number: "U1", available: true, price: 1100, type: "sleeper"},
            {number: "U2", available: true, price: 1100, type: "sleeper"}
          ]
        },
        {
          row: 2,
          seats: [
            {number: "U3", available: false, price: 1100, type: "sleeper"},
            {number: "U4", available: true, price: 1100, type: "sleeper"}
          ]
        }
      ]
    },
    boardingPoints: [
      {
        id: "BP001",
        name: "Kashmere Gate ISBT",
        time: "2025-09-09T21:00:00",
        address: "Kashmere Gate, Delhi",
        landmark: "Near Metro Station"
      },
      {
        id: "BP002",
        name: "Dhaula Kuan",
        time: "2025-09-09T21:30:00",
        address: "Dhaula Kuan, Delhi",
        landmark: "Metro Station"
      }
    ],
    droppingPoints: [
      {
        id: "DP001",
        name: "Sindhi Camp",
        time: "2025-09-10T05:00:00",
        address: "Sindhi Camp, Jaipur",
        landmark: "Main Bus Stand"
      },
      {
        id: "DP002",
        name: "Jaipur Railway Station",
        time: "2025-09-10T05:15:00",
        address: "Railway Station, Jaipur",
        landmark: "Near Entrance"
      }
    ]
  }
];

// Mock train data for testing front-end components
// Popular cities for autocomplete
export const popularCities = [
  {
    code: "DEL",
    name: "Delhi",
    airport: "Indira Gandhi International Airport",
    country: "India"
  },
  {
    code: "BOM",
    name: "Mumbai",
    airport: "Chhatrapati Shivaji International Airport",
    country: "India"
  },
  {
    code: "BLR",
    name: "Bengaluru",
    airport: "Bengaluru International Airport",
    country: "India"
  },
  {
    code: "CCU",
    name: "Kolkata",
    airport: "Netaji Subhas Chandra Bose International Airport",
    country: "India"
  },
  {
    code: "HYD",
    name: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    country: "India"
  },
  {
    code: "MAA",
    name: "Chennai",
    airport: "Chennai International Airport",
    country: "India"
  },
  {
    code: "BKK",
    name: "Bangkok",
    airport: "Suvarnabhumi Airport",
    country: "Thailand"
  },
  {
    code: "SIN",
    name: "Singapore",
    airport: "Changi Airport",
    country: "Singapore"
  },
  {
    code: "DXB",
    name: "Dubai",
    airport: "Dubai International Airport",
    country: "United Arab Emirates"
  },
  {
    code: "JFK",
    name: "New York",
    airport: "John F. Kennedy International Airport",
    country: "United States"
  },
  {
    code: "LHR",
    name: "London",
    airport: "Heathrow Airport",
    country: "United Kingdom"
  },
  {
    code: "CDG",
    name: "Paris",
    airport: "Charles de Gaulle Airport",
    country: "France"
  },
  {
    code: "SYD",
    name: "Sydney",
    airport: "Sydney Airport",
    country: "Australia"
  },
  {
    code: "HKG",
    name: "Hong Kong",
    airport: "Hong Kong International Airport",
    country: "Hong Kong"
  }
];

export const mockTrains: Train[] = [
  {
    id: "TR001",
    trainNumber: "12956",
    name: "Jaipur Delhi Superfast Express",
    type: "Superfast",
    source: {
      stationCode: "JP",
      stationName: "Jaipur Junction",
      city: "Jaipur",
      departureTime: "2025-09-09T16:35:00"
    },
    destination: {
      stationCode: "NDLS",
      stationName: "New Delhi",
      city: "Delhi",
      arrivalTime: "2025-09-09T22:05:00"
    },
    duration: 330,
    distance: 303,
    daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    classes: [
      {
        code: "1A",
        name: "First AC",
        fare: 1900,
        availability: {
          available: 4,
          waitlist: 0,
          status: "Available"
        }
      },
      {
        code: "2A",
        name: "Second AC",
        fare: 1120,
        availability: {
          available: 8,
          waitlist: 0,
          status: "Available"
        }
      },
      {
        code: "3A",
        name: "Third AC",
        fare: 780,
        availability: {
          available: 0,
          waitlist: 12,
          status: "WL12"
        }
      },
      {
        code: "SL",
        name: "Sleeper",
        fare: 280,
        availability: {
          available: 0,
          waitlist: 32,
          status: "WL32"
        }
      }
    ]
  }
];
