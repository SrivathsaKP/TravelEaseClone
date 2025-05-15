export const busData = {
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
    },
    {
      "id": "BS002",
      "operatorId": "OP002",
      "operatorName": "Intercity Express",
      "busNumber": "IC456",
      "busType": "AC Seater",
      "totalSeats": 48,
      "amenities": ["AC", "Charging Point", "WiFi", "Snacks"],
      "source": {
        "city": "Delhi",
        "terminal": "Anand Vihar ISBT",
        "time": "2025-09-09T08:30:00"
      },
      "destination": {
        "city": "Jaipur",
        "terminal": "Sindhi Camp Bus Stand",
        "time": "2025-09-09T15:00:00"
      },
      "duration": 390,
      "distance": 280,
      "fare": 950,
      "currency": "INR",
      "rating": 4.0,
      "availableSeats": 22,
      "seatLayout": {
        "lowerDeck": [
          {
            "row": 1,
            "seats": [
              {"number": "A1", "available": true, "price": 950, "type": "seater"},
              {"number": "A2", "available": true, "price": 950, "type": "seater"},
              {"number": "A3", "available": true, "price": 950, "type": "seater"}
            ]
          },
          {
            "row": 2,
            "seats": [
              {"number": "B1", "available": false, "price": 950, "type": "seater"},
              {"number": "B2", "available": false, "price": 950, "type": "seater"},
              {"number": "B3", "available": true, "price": 950, "type": "seater"}
            ]
          }
        ]
      },
      "boardingPoints": [
        {
          "id": "BP003",
          "name": "Anand Vihar ISBT",
          "time": "2025-09-09T08:30:00",
          "address": "Anand Vihar, Delhi",
          "landmark": "Near Metro Station"
        },
        {
          "id": "BP004",
          "name": "Connaught Place",
          "time": "2025-09-09T09:15:00",
          "address": "Connaught Place, Delhi",
          "landmark": "Block A"
        }
      ],
      "droppingPoints": [
        {
          "id": "DP003",
          "name": "Sindhi Camp",
          "time": "2025-09-09T15:00:00",
          "address": "Sindhi Camp, Jaipur",
          "landmark": "Main Bus Stand"
        }
      ]
    },
    {
      "id": "BS003",
      "operatorId": "OP003",
      "operatorName": "Comfort Travels",
      "busNumber": "CT789",
      "busType": "Non-AC Sleeper",
      "totalSeats": 32,
      "amenities": ["Blanket", "Water Bottle"],
      "source": {
        "city": "Delhi",
        "terminal": "Kashmere Gate ISBT",
        "time": "2025-09-09T20:00:00"
      },
      "destination": {
        "city": "Jaipur",
        "terminal": "Narayan Singh Circle",
        "time": "2025-09-10T04:30:00"
      },
      "duration": 510,
      "distance": 290,
      "fare": 800,
      "currency": "INR",
      "rating": 3.5,
      "availableSeats": 10,
      "seatLayout": {
        "lowerDeck": [
          {
            "row": 1,
            "seats": [
              {"number": "L1", "available": true, "price": 800, "type": "sleeper"},
              {"number": "L2", "available": true, "price": 800, "type": "sleeper"}
            ]
          },
          {
            "row": 2,
            "seats": [
              {"number": "L3", "available": false, "price": 800, "type": "sleeper"},
              {"number": "L4", "available": false, "price": 800, "type": "sleeper"}
            ]
          }
        ],
        "upperDeck": [
          {
            "row": 1,
            "seats": [
              {"number": "U1", "available": true, "price": 750, "type": "sleeper"},
              {"number": "U2", "available": true, "price": 750, "type": "sleeper"}
            ]
          },
          {
            "row": 2,
            "seats": [
              {"number": "U3", "available": true, "price": 750, "type": "sleeper"},
              {"number": "U4", "available": false, "price": 750, "type": "sleeper"}
            ]
          }
        ]
      },
      "boardingPoints": [
        {
          "id": "BP005",
          "name": "Kashmere Gate ISBT",
          "time": "2025-09-09T20:00:00",
          "address": "Kashmere Gate, Delhi",
          "landmark": "Gate 2"
        }
      ],
      "droppingPoints": [
        {
          "id": "DP004",
          "name": "Narayan Singh Circle",
          "time": "2025-09-10T04:30:00",
          "address": "Narayan Singh Circle, Jaipur",
          "landmark": "Bus Stop"
        }
      ]
    },
    {
      "id": "BS004",
      "operatorId": "OP004",
      "operatorName": "Premium Travels",
      "busNumber": "PT101",
      "busType": "Volvo AC Seater",
      "totalSeats": 42,
      "amenities": ["AC", "Charging Point", "WiFi", "TV", "Water Bottle", "Snacks"],
      "source": {
        "city": "Delhi",
        "terminal": "Sarai Kale Khan",
        "time": "2025-09-09T15:30:00"
      },
      "destination": {
        "city": "Jaipur",
        "terminal": "Sindhi Camp Bus Stand",
        "time": "2025-09-09T21:30:00"
      },
      "duration": 360,
      "distance": 280,
      "fare": 1400,
      "currency": "INR",
      "rating": 4.5,
      "availableSeats": 8,
      "seatLayout": {
        "lowerDeck": [
          {
            "row": 1,
            "seats": [
              {"number": "A1", "available": false, "price": 1400, "type": "seater"},
              {"number": "A2", "available": false, "price": 1400, "type": "seater"}
            ]
          },
          {
            "row": 2,
            "seats": [
              {"number": "B1", "available": true, "price": 1400, "type": "seater"},
              {"number": "B2", "available": true, "price": 1400, "type": "seater"}
            ]
          }
        ]
      },
      "boardingPoints": [
        {
          "id": "BP006",
          "name": "Sarai Kale Khan",
          "time": "2025-09-09T15:30:00",
          "address": "Sarai Kale Khan, Delhi",
          "landmark": "ISBT"
        },
        {
          "id": "BP007",
          "name": "Gurugram",
          "time": "2025-09-09T16:15:00",
          "address": "IFFCO Chowk, Gurugram",
          "landmark": "Metro Station"
        }
      ],
      "droppingPoints": [
        {
          "id": "DP005",
          "name": "Sindhi Camp",
          "time": "2025-09-09T21:30:00",
          "address": "Sindhi Camp, Jaipur",
          "landmark": "Main Bus Stand"
        },
        {
          "id": "DP006",
          "name": "Pink Square Mall",
          "time": "2025-09-09T21:45:00",
          "address": "Pink Square Mall, Jaipur",
          "landmark": "Main Entrance"
        }
      ]
    }
  ]
};
