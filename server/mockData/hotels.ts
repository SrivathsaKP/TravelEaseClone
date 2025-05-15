export const hotelData = {
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
          "url": "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
          "caption": "Hotel Exterior"
        },
        {
          "url": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
          "caption": "Hotel Lobby"
        },
        {
          "url": "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
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
          "url": "https://images.unsplash.com/photo-1631049035182-249067d7618e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
          "caption": "Hotel Exterior"
        },
        {
          "url": "https://images.unsplash.com/photo-1631049035182-249067d7618e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
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
    },
    {
      "id": "HT003",
      "name": "Boutique Inn Resort",
      "starRating": 4,
      "address": "789 Lake View Road",
      "city": "Jaipur",
      "state": "Rajasthan",
      "country": "India",
      "zipCode": "302010",
      "latitude": 26.9224,
      "longitude": 75.8224,
      "checkInTime": "14:00",
      "checkOutTime": "11:00",
      "description": "A charming boutique hotel with personalized service",
      "amenities": [
        "Swimming Pool",
        "Restaurant",
        "Bar",
        "Free WiFi",
        "Room Service",
        "Garden",
        "Parking"
      ],
      "images": [
        {
          "url": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
          "caption": "Hotel Exterior"
        },
        {
          "url": "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
          "caption": "Premium Room"
        }
      ],
      "reviews": [
        {
          "userId": "U3001",
          "userName": "Emily R.",
          "rating": 4.8,
          "comment": "Beautiful property with excellent service",
          "date": "2025-02-15"
        },
        {
          "userId": "U3002",
          "userName": "Michael T.",
          "rating": 4.5,
          "comment": "Loved the atmosphere and food",
          "date": "2025-03-10"
        }
      ],
      "roomTypes": [
        {
          "id": "RT004",
          "name": "Garden View Room",
          "description": "Cozy room with view of the garden",
          "maxOccupancy": 2,
          "bedType": "Queen",
          "amenities": ["TV", "Air Conditioning", "Mini Bar", "Safe", "Balcony"],
          "images": ["garden-room-1.jpg", "garden-room-2.jpg"],
          "pricing": {
            "basePrice": 3500,
            "tax": 630,
            "totalPrice": 4130,
            "currency": "INR"
          },
          "availableRooms": 4
        },
        {
          "id": "RT005",
          "name": "Premium Suite",
          "description": "Elegant suite with separate living area",
          "maxOccupancy": 3,
          "bedType": "King",
          "amenities": ["TV", "Air Conditioning", "Mini Bar", "Safe", "Jacuzzi", "Balcony"],
          "images": ["premium-suite-1.jpg", "premium-suite-2.jpg"],
          "pricing": {
            "basePrice": 6000,
            "tax": 1080,
            "totalPrice": 7080,
            "currency": "INR"
          },
          "availableRooms": 2
        }
      ]
    }
  ]
};
