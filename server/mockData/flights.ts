export const flightData = {
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
          "code": "BOM",
          "name": "Chhatrapati Shivaji Airport",
          "terminal": "2",
          "cityCode": "BOM",
          "cityName": "Mumbai",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T09:45:00"
      },
      "duration": 150,
      "cabinClass": "Economy",
      "availableSeats": 6,
      "fare": {
        "currency": "INR",
        "baseFare": 3500,
        "tax": 1203,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 163
          },
          {
            "key": "YR",
            "value": 450
          },
          {
            "key": "OtherTaxes",
            "value": 590
          }
        ],
        "totalFare": 4703
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Complimentary Meal",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": true, "price": 600, "type": "window"},
            {"number": "1B", "available": false, "price": 600, "type": "middle"},
            {"number": "1C", "available": true, "price": 600, "type": "aisle"}
          ]
        },
        {
          "row": "2",
          "seats": [
            {"number": "2A", "available": true, "price": 500, "type": "window"},
            {"number": "2B", "available": true, "price": 500, "type": "middle"},
            {"number": "2C", "available": true, "price": 500, "type": "aisle"}
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
          "code": "BOM",
          "name": "Chhatrapati Shivaji Airport",
          "terminal": "1",
          "cityCode": "BOM",
          "cityName": "Mumbai",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T11:45:00"
      },
      "duration": 135,
      "cabinClass": "Economy",
      "availableSeats": 12,
      "fare": {
        "currency": "INR",
        "baseFare": 3200,
        "tax": 950,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 170
          },
          {
            "key": "YR",
            "value": 280
          },
          {
            "key": "OtherTaxes",
            "value": 500
          }
        ],
        "totalFare": 4150
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Paid",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": false, "price": 550, "type": "window"},
            {"number": "1B", "available": true, "price": 550, "type": "middle"},
            {"number": "1C", "available": true, "price": 550, "type": "aisle"}
          ]
        },
        {
          "row": "2",
          "seats": [
            {"number": "2A", "available": true, "price": 450, "type": "window"},
            {"number": "2B", "available": true, "price": 450, "type": "middle"},
            {"number": "2C", "available": true, "price": 450, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL003",
      "resultIndex": "OB3",
      "isLCC": true,
      "isRefundable": true,
      "airline": {
        "code": "SG",
        "name": "SpiceJet",
        "logo": "spicejet-logo.png"
      },
      "flightNumber": "SG302",
      "source": {
        "airport": {
          "code": "DEL",
          "name": "Indira Gandhi Airport",
          "terminal": "1D",
          "cityCode": "DEL",
          "cityName": "Delhi",
          "countryCode": "IN",
          "countryName": "India"
        },
        "departureTime": "2025-09-09T14:15:00"
      },
      "destination": {
        "airport": {
          "code": "BOM",
          "name": "Chhatrapati Shivaji Airport",
          "terminal": "1",
          "cityCode": "BOM",
          "cityName": "Mumbai",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T16:40:00"
      },
      "duration": 145,
      "cabinClass": "Economy",
      "availableSeats": 8,
      "fare": {
        "currency": "INR",
        "baseFare": 3300,
        "tax": 950,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 170
          },
          {
            "key": "YR",
            "value": 300
          },
          {
            "key": "OtherTaxes",
            "value": 480
          }
        ],
        "totalFare": 4250
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Paid",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": false, "price": 550, "type": "window"},
            {"number": "1B", "available": false, "price": 550, "type": "middle"},
            {"number": "1C", "available": true, "price": 550, "type": "aisle"}
          ]
        },
        {
          "row": "2",
          "seats": [
            {"number": "2A", "available": true, "price": 450, "type": "window"},
            {"number": "2B", "available": true, "price": 450, "type": "middle"},
            {"number": "2C", "available": true, "price": 450, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL004",
      "resultIndex": "OB4",
      "isLCC": false,
      "isRefundable": true,
      "airline": {
        "code": "UK",
        "name": "Vistara",
        "logo": "vistara-logo.png"
      },
      "flightNumber": "UK707",
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
        "departureTime": "2025-09-09T18:45:00"
      },
      "destination": {
        "airport": {
          "code": "BOM",
          "name": "Chhatrapati Shivaji Airport",
          "terminal": "2",
          "cityCode": "BOM",
          "cityName": "Mumbai",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T21:10:00"
      },
      "duration": 145,
      "cabinClass": "Economy",
      "availableSeats": 4,
      "fare": {
        "currency": "INR",
        "baseFare": 4500,
        "tax": 1100,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 200
          },
          {
            "key": "YR",
            "value": 400
          },
          {
            "key": "OtherTaxes",
            "value": 500
          }
        ],
        "totalFare": 5600
      },
      "baggage": "20 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Complimentary Meal",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": false, "price": 650, "type": "window"},
            {"number": "1B", "available": true, "price": 650, "type": "middle"},
            {"number": "1C", "available": true, "price": 650, "type": "aisle"}
          ]
        },
        {
          "row": "2",
          "seats": [
            {"number": "2A", "available": true, "price": 550, "type": "window"},
            {"number": "2B", "available": true, "price": 550, "type": "middle"},
            {"number": "2C", "available": false, "price": 550, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL005",
      "resultIndex": "OB5",
      "isLCC": false,
      "isRefundable": true,
      "airline": {
        "code": "AI",
        "name": "Air India",
        "logo": "air-india-logo.png"
      },
      "flightNumber": "AI801",
      "source": {
        "airport": {
          "code": "BOM",
          "name": "Chhatrapati Shivaji Airport",
          "terminal": "2",
          "cityCode": "BOM",
          "cityName": "Mumbai",
          "countryCode": "IN",
          "countryName": "India"
        },
        "departureTime": "2025-09-09T06:00:00"
      },
      "destination": {
        "airport": {
          "code": "BLR",
          "name": "Kempegowda International Airport",
          "terminal": "1",
          "cityCode": "BLR",
          "cityName": "Bengaluru",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T07:45:00"
      },
      "duration": 105,
      "cabinClass": "Economy",
      "availableSeats": 9,
      "fare": {
        "currency": "INR",
        "baseFare": 2500,
        "tax": 900,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 150
          },
          {
            "key": "YR",
            "value": 350
          },
          {
            "key": "OtherTaxes",
            "value": 400
          }
        ],
        "totalFare": 3400
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Complimentary Meal",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": true, "price": 500, "type": "window"},
            {"number": "1B", "available": false, "price": 500, "type": "middle"},
            {"number": "1C", "available": true, "price": 500, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL006",
      "resultIndex": "OB6",
      "isLCC": true,
      "isRefundable": false,
      "airline": {
        "code": "6E",
        "name": "IndiGo",
        "logo": "indigo-logo.png"
      },
      "flightNumber": "6E291",
      "source": {
        "airport": {
          "code": "BOM",
          "name": "Chhatrapati Shivaji Airport",
          "terminal": "1",
          "cityCode": "BOM",
          "cityName": "Mumbai",
          "countryCode": "IN",
          "countryName": "India"
        },
        "departureTime": "2025-09-09T08:20:00"
      },
      "destination": {
        "airport": {
          "code": "BLR",
          "name": "Kempegowda International Airport",
          "terminal": "1",
          "cityCode": "BLR",
          "cityName": "Bengaluru",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T10:05:00"
      },
      "duration": 105,
      "cabinClass": "Economy",
      "availableSeats": 15,
      "fare": {
        "currency": "INR",
        "baseFare": 2300,
        "tax": 800,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 130
          },
          {
            "key": "YR",
            "value": 270
          },
          {
            "key": "OtherTaxes",
            "value": 400
          }
        ],
        "totalFare": 3100
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Paid",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": false, "price": 450, "type": "window"},
            {"number": "1B", "available": true, "price": 450, "type": "middle"},
            {"number": "1C", "available": true, "price": 450, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL007",
      "resultIndex": "OB7",
      "isLCC": true,
      "isRefundable": true,
      "airline": {
        "code": "SG",
        "name": "SpiceJet",
        "logo": "spicejet-logo.png"
      },
      "flightNumber": "SG154",
      "source": {
        "airport": {
          "code": "BOM",
          "name": "Chhatrapati Shivaji Airport",
          "terminal": "1",
          "cityCode": "BOM",
          "cityName": "Mumbai",
          "countryCode": "IN",
          "countryName": "India"
        },
        "departureTime": "2025-09-09T11:30:00"
      },
      "destination": {
        "airport": {
          "code": "BLR",
          "name": "Kempegowda International Airport",
          "terminal": "1",
          "cityCode": "BLR",
          "cityName": "Bengaluru",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T13:20:00"
      },
      "duration": 110,
      "cabinClass": "Economy",
      "availableSeats": 5,
      "fare": {
        "currency": "INR",
        "baseFare": 2400,
        "tax": 850,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 140
          },
          {
            "key": "YR",
            "value": 290
          },
          {
            "key": "OtherTaxes",
            "value": 420
          }
        ],
        "totalFare": 3250
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Paid",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": false, "price": 500, "type": "window"},
            {"number": "1B", "available": false, "price": 500, "type": "middle"},
            {"number": "1C", "available": true, "price": 500, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL008",
      "resultIndex": "OB8",
      "isLCC": false,
      "isRefundable": true,
      "airline": {
        "code": "UK",
        "name": "Vistara",
        "logo": "vistara-logo.png"
      },
      "flightNumber": "UK864",
      "source": {
        "airport": {
          "code": "BOM",
          "name": "Chhatrapati Shivaji Airport",
          "terminal": "2",
          "cityCode": "BOM",
          "cityName": "Mumbai",
          "countryCode": "IN",
          "countryName": "India"
        },
        "departureTime": "2025-09-09T16:30:00"
      },
      "destination": {
        "airport": {
          "code": "BLR",
          "name": "Kempegowda International Airport",
          "terminal": "1",
          "cityCode": "BLR",
          "cityName": "Bengaluru",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T18:25:00"
      },
      "duration": 115,
      "cabinClass": "Economy",
      "availableSeats": 7,
      "fare": {
        "currency": "INR",
        "baseFare": 3200,
        "tax": 950,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 170
          },
          {
            "key": "YR",
            "value": 330
          },
          {
            "key": "OtherTaxes",
            "value": 450
          }
        ],
        "totalFare": 4150
      },
      "baggage": "20 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Complimentary Meal",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": false, "price": 550, "type": "window"},
            {"number": "1B", "available": true, "price": 550, "type": "middle"},
            {"number": "1C", "available": true, "price": 550, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL009",
      "resultIndex": "OB9",
      "isLCC": true,
      "isRefundable": false,
      "airline": {
        "code": "G8",
        "name": "GoAir",
        "logo": "goair-logo.png"
      },
      "flightNumber": "G8423",
      "source": {
        "airport": {
          "code": "BLR",
          "name": "Kempegowda International Airport",
          "terminal": "1",
          "cityCode": "BLR",
          "cityName": "Bengaluru",
          "countryCode": "IN",
          "countryName": "India"
        },
        "departureTime": "2025-09-09T05:45:00"
      },
      "destination": {
        "airport": {
          "code": "MAA",
          "name": "Chennai International Airport",
          "terminal": "1",
          "cityCode": "MAA",
          "cityName": "Chennai",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T06:55:00"
      },
      "duration": 70,
      "cabinClass": "Economy",
      "availableSeats": 18,
      "fare": {
        "currency": "INR",
        "baseFare": 1800,
        "tax": 600,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 100
          },
          {
            "key": "YR",
            "value": 200
          },
          {
            "key": "OtherTaxes",
            "value": 300
          }
        ],
        "totalFare": 2400
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Paid",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": true, "price": 400, "type": "window"},
            {"number": "1B", "available": true, "price": 400, "type": "middle"},
            {"number": "1C", "available": true, "price": 400, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL010",
      "resultIndex": "OB10",
      "isLCC": false,
      "isRefundable": true,
      "airline": {
        "code": "AI",
        "name": "Air India",
        "logo": "air-india-logo.png"
      },
      "flightNumber": "AI539",
      "source": {
        "airport": {
          "code": "BLR",
          "name": "Kempegowda International Airport",
          "terminal": "1",
          "cityCode": "BLR",
          "cityName": "Bengaluru",
          "countryCode": "IN",
          "countryName": "India"
        },
        "departureTime": "2025-09-09T09:10:00"
      },
      "destination": {
        "airport": {
          "code": "MAA",
          "name": "Chennai International Airport",
          "terminal": "1",
          "cityCode": "MAA",
          "cityName": "Chennai",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T10:25:00"
      },
      "duration": 75,
      "cabinClass": "Economy",
      "availableSeats": 12,
      "fare": {
        "currency": "INR",
        "baseFare": 2000,
        "tax": 700,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 120
          },
          {
            "key": "YR",
            "value": 230
          },
          {
            "key": "OtherTaxes",
            "value": 350
          }
        ],
        "totalFare": 2700
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Complimentary Meal",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": false, "price": 450, "type": "window"},
            {"number": "1B", "available": true, "price": 450, "type": "middle"},
            {"number": "1C", "available": true, "price": 450, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL011",
      "resultIndex": "OB11",
      "isLCC": true,
      "isRefundable": false,
      "airline": {
        "code": "6E",
        "name": "IndiGo",
        "logo": "indigo-logo.png"
      },
      "flightNumber": "6E368",
      "source": {
        "airport": {
          "code": "BLR",
          "name": "Kempegowda International Airport",
          "terminal": "1",
          "cityCode": "BLR",
          "cityName": "Bengaluru",
          "countryCode": "IN",
          "countryName": "India"
        },
        "departureTime": "2025-09-09T12:25:00"
      },
      "destination": {
        "airport": {
          "code": "MAA",
          "name": "Chennai International Airport",
          "terminal": "1",
          "cityCode": "MAA",
          "cityName": "Chennai",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T13:40:00"
      },
      "duration": 75,
      "cabinClass": "Economy",
      "availableSeats": 20,
      "fare": {
        "currency": "INR",
        "baseFare": 1900,
        "tax": 650,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 110
          },
          {
            "key": "YR",
            "value": 210
          },
          {
            "key": "OtherTaxes",
            "value": 330
          }
        ],
        "totalFare": 2550
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Paid",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": true, "price": 420, "type": "window"},
            {"number": "1B", "available": true, "price": 420, "type": "middle"},
            {"number": "1C", "available": false, "price": 420, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL012",
      "resultIndex": "OB12",
      "isLCC": true,
      "isRefundable": true,
      "airline": {
        "code": "SG",
        "name": "SpiceJet",
        "logo": "spicejet-logo.png"
      },
      "flightNumber": "SG3492",
      "source": {
        "airport": {
          "code": "BLR",
          "name": "Kempegowda International Airport",
          "terminal": "1",
          "cityCode": "BLR",
          "cityName": "Bengaluru",
          "countryCode": "IN",
          "countryName": "India"
        },
        "departureTime": "2025-09-09T15:50:00"
      },
      "destination": {
        "airport": {
          "code": "MAA",
          "name": "Chennai International Airport",
          "terminal": "1",
          "cityCode": "MAA",
          "cityName": "Chennai",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T17:00:00"
      },
      "duration": 70,
      "cabinClass": "Economy",
      "availableSeats": 9,
      "fare": {
        "currency": "INR",
        "baseFare": 1950,
        "tax": 670,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 115
          },
          {
            "key": "YR",
            "value": 220
          },
          {
            "key": "OtherTaxes",
            "value": 335
          }
        ],
        "totalFare": 2620
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Paid",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": false, "price": 430, "type": "window"},
            {"number": "1B", "available": false, "price": 430, "type": "middle"},
            {"number": "1C", "available": true, "price": 430, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL013",
      "resultIndex": "OB13",
      "isLCC": false,
      "isRefundable": true,
      "airline": {
        "code": "UK",
        "name": "Vistara",
        "logo": "vistara-logo.png"
      },
      "flightNumber": "UK836",
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
        "departureTime": "2025-09-09T07:55:00"
      },
      "destination": {
        "airport": {
          "code": "BLR",
          "name": "Kempegowda International Airport",
          "terminal": "1",
          "cityCode": "BLR",
          "cityName": "Bengaluru",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T10:40:00"
      },
      "duration": 165,
      "cabinClass": "Economy",
      "availableSeats": 5,
      "fare": {
        "currency": "INR",
        "baseFare": 4300,
        "tax": 1050,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 190
          },
          {
            "key": "YR",
            "value": 360
          },
          {
            "key": "OtherTaxes",
            "value": 500
          }
        ],
        "totalFare": 5350
      },
      "baggage": "20 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Complimentary Meal",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": false, "price": 600, "type": "window"},
            {"number": "1B", "available": true, "price": 600, "type": "middle"},
            {"number": "1C", "available": true, "price": 600, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL014",
      "resultIndex": "OB14",
      "isLCC": true,
      "isRefundable": false,
      "airline": {
        "code": "G8",
        "name": "GoAir",
        "logo": "goair-logo.png"
      },
      "flightNumber": "G8345",
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
        "departureTime": "2025-09-09T10:50:00"
      },
      "destination": {
        "airport": {
          "code": "BLR",
          "name": "Kempegowda International Airport",
          "terminal": "1",
          "cityCode": "BLR",
          "cityName": "Bengaluru",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T13:50:00"
      },
      "duration": 180,
      "cabinClass": "Economy",
      "availableSeats": 14,
      "fare": {
        "currency": "INR",
        "baseFare": 3900,
        "tax": 980,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 180
          },
          {
            "key": "YR",
            "value": 320
          },
          {
            "key": "OtherTaxes",
            "value": 480
          }
        ],
        "totalFare": 4880
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Paid",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": true, "price": 550, "type": "window"},
            {"number": "1B", "available": true, "price": 550, "type": "middle"},
            {"number": "1C", "available": true, "price": 550, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL015",
      "resultIndex": "OB15",
      "isLCC": true,
      "isRefundable": true,
      "airline": {
        "code": "6E",
        "name": "IndiGo",
        "logo": "indigo-logo.png"
      },
      "flightNumber": "6E547",
      "source": {
        "airport": {
          "code": "MAA",
          "name": "Chennai International Airport",
          "terminal": "1",
          "cityCode": "MAA",
          "cityName": "Chennai",
          "countryCode": "IN",
          "countryName": "India"
        },
        "departureTime": "2025-09-09T06:35:00"
      },
      "destination": {
        "airport": {
          "code": "HYD",
          "name": "Rajiv Gandhi International Airport",
          "terminal": "1",
          "cityCode": "HYD",
          "cityName": "Hyderabad",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T08:05:00"
      },
      "duration": 90,
      "cabinClass": "Economy",
      "availableSeats": 17,
      "fare": {
        "currency": "INR",
        "baseFare": 2100,
        "tax": 710,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 120
          },
          {
            "key": "YR",
            "value": 240
          },
          {
            "key": "OtherTaxes",
            "value": 350
          }
        ],
        "totalFare": 2810
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Paid",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": true, "price": 450, "type": "window"},
            {"number": "1B", "available": true, "price": 450, "type": "middle"},
            {"number": "1C", "available": false, "price": 450, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL016",
      "resultIndex": "OB16",
      "isLCC": false,
      "isRefundable": true,
      "airline": {
        "code": "AI",
        "name": "Air India",
        "logo": "air-india-logo.png"
      },
      "flightNumber": "AI978",
      "source": {
        "airport": {
          "code": "MAA",
          "name": "Chennai International Airport",
          "terminal": "1",
          "cityCode": "MAA",
          "cityName": "Chennai",
          "countryCode": "IN",
          "countryName": "India"
        },
        "departureTime": "2025-09-09T11:20:00"
      },
      "destination": {
        "airport": {
          "code": "HYD",
          "name": "Rajiv Gandhi International Airport",
          "terminal": "1",
          "cityCode": "HYD",
          "cityName": "Hyderabad",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T12:55:00"
      },
      "duration": 95,
      "cabinClass": "Economy",
      "availableSeats": 10,
      "fare": {
        "currency": "INR",
        "baseFare": 2300,
        "tax": 750,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 130
          },
          {
            "key": "YR",
            "value": 260
          },
          {
            "key": "OtherTaxes",
            "value": 360
          }
        ],
        "totalFare": 3050
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Complimentary Meal",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": false, "price": 480, "type": "window"},
            {"number": "1B", "available": true, "price": 480, "type": "middle"},
            {"number": "1C", "available": true, "price": 480, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL017",
      "resultIndex": "OB17",
      "isLCC": true,
      "isRefundable": false,
      "airline": {
        "code": "SG",
        "name": "SpiceJet",
        "logo": "spicejet-logo.png"
      },
      "flightNumber": "SG723",
      "source": {
        "airport": {
          "code": "MAA",
          "name": "Chennai International Airport",
          "terminal": "1",
          "cityCode": "MAA",
          "cityName": "Chennai",
          "countryCode": "IN",
          "countryName": "India"
        },
        "departureTime": "2025-09-09T16:10:00"
      },
      "destination": {
        "airport": {
          "code": "HYD",
          "name": "Rajiv Gandhi International Airport",
          "terminal": "1",
          "cityCode": "HYD",
          "cityName": "Hyderabad",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T17:40:00"
      },
      "duration": 90,
      "cabinClass": "Economy",
      "availableSeats": 7,
      "fare": {
        "currency": "INR",
        "baseFare": 2150,
        "tax": 720,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 125
          },
          {
            "key": "YR",
            "value": 245
          },
          {
            "key": "OtherTaxes",
            "value": 350
          }
        ],
        "totalFare": 2870
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Paid",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": false, "price": 460, "type": "window"},
            {"number": "1B", "available": false, "price": 460, "type": "middle"},
            {"number": "1C", "available": true, "price": 460, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL018",
      "resultIndex": "OB18",
      "isLCC": false,
      "isRefundable": true,
      "airline": {
        "code": "UK",
        "name": "Vistara",
        "logo": "vistara-logo.png"
      },
      "flightNumber": "UK578",
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
        "departureTime": "2025-09-09T06:25:00"
      },
      "destination": {
        "airport": {
          "code": "CCU",
          "name": "Netaji Subhash Chandra Bose Airport",
          "terminal": "2",
          "cityCode": "CCU",
          "cityName": "Kolkata",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T08:45:00"
      },
      "duration": 140,
      "cabinClass": "Economy",
      "availableSeats": 6,
      "fare": {
        "currency": "INR",
        "baseFare": 4100,
        "tax": 1020,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 185
          },
          {
            "key": "YR",
            "value": 350
          },
          {
            "key": "OtherTaxes",
            "value": 485
          }
        ],
        "totalFare": 5120
      },
      "baggage": "20 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Complimentary Meal",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": false, "price": 580, "type": "window"},
            {"number": "1B", "available": true, "price": 580, "type": "middle"},
            {"number": "1C", "available": true, "price": 580, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL019",
      "resultIndex": "OB19",
      "isLCC": true,
      "isRefundable": false,
      "airline": {
        "code": "6E",
        "name": "IndiGo",
        "logo": "indigo-logo.png"
      },
      "flightNumber": "6E892",
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
        "departureTime": "2025-09-09T11:15:00"
      },
      "destination": {
        "airport": {
          "code": "CCU",
          "name": "Netaji Subhash Chandra Bose Airport",
          "terminal": "1",
          "cityCode": "CCU",
          "cityName": "Kolkata",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T13:30:00"
      },
      "duration": 135,
      "cabinClass": "Economy",
      "availableSeats": 13,
      "fare": {
        "currency": "INR",
        "baseFare": 3700,
        "tax": 950,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 175
          },
          {
            "key": "YR",
            "value": 325
          },
          {
            "key": "OtherTaxes",
            "value": 450
          }
        ],
        "totalFare": 4650
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Paid",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": true, "price": 530, "type": "window"},
            {"number": "1B", "available": true, "price": 530, "type": "middle"},
            {"number": "1C", "available": false, "price": 530, "type": "aisle"}
          ]
        }
      ]
    },
    {
      "id": "FL020",
      "resultIndex": "OB20",
      "isLCC": false,
      "isRefundable": true,
      "airline": {
        "code": "AI",
        "name": "Air India",
        "logo": "air-india-logo.png"
      },
      "flightNumber": "AI701",
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
        "departureTime": "2025-09-09T17:30:00"
      },
      "destination": {
        "airport": {
          "code": "CCU",
          "name": "Netaji Subhash Chandra Bose Airport",
          "terminal": "2",
          "cityCode": "CCU",
          "cityName": "Kolkata",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T19:50:00"
      },
      "duration": 140,
      "cabinClass": "Economy",
      "availableSeats": 8,
      "fare": {
        "currency": "INR",
        "baseFare": 3900,
        "tax": 980,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 180
          },
          {
            "key": "YR",
            "value": 340
          },
          {
            "key": "OtherTaxes",
            "value": 460
          }
        ],
        "totalFare": 4880
      },
      "baggage": "15 KG",
      "cabinBaggage": "7 KG",
      "mealService": "Complimentary Meal",
      "seatMap": [
        {
          "row": "1",
          "seats": [
            {"number": "1A", "available": false, "price": 550, "type": "window"},
            {"number": "1B", "available": true, "price": 550, "type": "middle"},
            {"number": "1C", "available": true, "price": 550, "type": "aisle"}
          ]
        }
      ]
    }
  ]
};
  ]
};
