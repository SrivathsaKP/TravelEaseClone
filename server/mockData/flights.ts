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
          "code": "JAI",
          "name": "Jaipur",
          "terminal": "2",
          "cityCode": "JAI",
          "cityName": "Jaipur",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T15:30:00"
      },
      "duration": 75,
      "cabinClass": "Economy",
      "availableSeats": 8,
      "fare": {
        "currency": "INR",
        "baseFare": 1100,
        "tax": 650,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 70
          },
          {
            "key": "YR",
            "value": 200
          },
          {
            "key": "OtherTaxes",
            "value": 380
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
            {"number": "1B", "available": false, "price": 350, "type": "middle"},
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
          "code": "JAI",
          "name": "Jaipur",
          "terminal": "2",
          "cityCode": "JAI",
          "cityName": "Jaipur",
          "countryCode": "IN",
          "countryName": "India"
        },
        "arrivalTime": "2025-09-09T19:50:00"
      },
      "duration": 65,
      "cabinClass": "Economy",
      "availableSeats": 4,
      "fare": {
        "currency": "INR",
        "baseFare": 1500,
        "tax": 800,
        "taxBreakup": [
          {
            "key": "K3",
            "value": 100
          },
          {
            "key": "YR",
            "value": 300
          },
          {
            "key": "OtherTaxes",
            "value": 400
          }
        ],
        "totalFare": 2300
      },
      "baggage": "20 KG",
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
        },
        {
          "row": "2",
          "seats": [
            {"number": "2A", "available": true, "price": 350, "type": "window"},
            {"number": "2B", "available": true, "price": 350, "type": "middle"},
            {"number": "2C", "available": false, "price": 350, "type": "aisle"}
          ]
        }
      ]
    }
  ]
};
