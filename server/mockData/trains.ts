export const trainData = {
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
      ]
    },
    {
      "id": "TR002",
      "trainNumber": "12015",
      "name": "Delhi Jaipur Shatabdi Express",
      "type": "Shatabdi",
      "source": {
        "stationCode": "NDLS",
        "stationName": "New Delhi",
        "city": "Delhi",
        "departureTime": "2025-09-09T06:05:00"
      },
      "destination": {
        "stationCode": "JP",
        "stationName": "Jaipur Junction",
        "city": "Jaipur",
        "arrivalTime": "2025-09-09T10:35:00"
      },
      "duration": 270,
      "distance": 303,
      "daysOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "classes": [
        {
          "code": "CC",
          "name": "Chair Car",
          "fare": 850,
          "availability": {
            "available": 12,
            "waitlist": 0,
            "status": "Available"
          }
        },
        {
          "code": "EC",
          "name": "Executive Chair Car",
          "fare": 1650,
          "availability": {
            "available": 6,
            "waitlist": 0,
            "status": "Available"
          }
        }
      ]
    },
    {
      "id": "TR003",
      "trainNumber": "12986",
      "name": "Double Decker Express",
      "type": "Superfast",
      "source": {
        "stationCode": "DEL",
        "stationName": "Delhi",
        "city": "Delhi",
        "departureTime": "2025-09-09T13:40:00"
      },
      "destination": {
        "stationCode": "JP",
        "stationName": "Jaipur Junction",
        "city": "Jaipur",
        "arrivalTime": "2025-09-09T18:25:00"
      },
      "duration": 285,
      "distance": 303,
      "daysOfWeek": ["Monday", "Wednesday", "Friday", "Sunday"],
      "classes": [
        {
          "code": "2S",
          "name": "Second Sitting",
          "fare": 250,
          "availability": {
            "available": 25,
            "waitlist": 0,
            "status": "Available"
          }
        },
        {
          "code": "CC",
          "name": "Chair Car",
          "fare": 480,
          "availability": {
            "available": 15,
            "waitlist": 0,
            "status": "Available"
          }
        }
      ]
    },
    {
      "id": "TR004",
      "trainNumber": "19708",
      "name": "Aravali Express",
      "type": "Mail/Express",
      "source": {
        "stationCode": "DEL",
        "stationName": "Delhi",
        "city": "Delhi",
        "departureTime": "2025-09-09T23:45:00"
      },
      "destination": {
        "stationCode": "JP",
        "stationName": "Jaipur Junction",
        "city": "Jaipur",
        "arrivalTime": "2025-09-10T06:30:00"
      },
      "duration": 405,
      "distance": 303,
      "daysOfWeek": ["Monday", "Tuesday", "Thursday", "Saturday"],
      "classes": [
        {
          "code": "SL",
          "name": "Sleeper",
          "fare": 240,
          "availability": {
            "available": 30,
            "waitlist": 0,
            "status": "Available"
          }
        },
        {
          "code": "3A",
          "name": "Third AC",
          "fare": 630,
          "availability": {
            "available": 10,
            "waitlist": 0,
            "status": "Available"
          }
        },
        {
          "code": "2A",
          "name": "Second AC",
          "fare": 950,
          "availability": {
            "available": 5,
            "waitlist": 0,
            "status": "Available"
          }
        }
      ]
    }
  ]
};
