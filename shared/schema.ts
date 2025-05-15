import { pgTable, text, serial, integer, boolean, timestamp, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Cab, Homestay and Insurance Types from client/src/lib/types.ts
import { 
  Cab as CabType, 
  HomestayProperty as HomestayType, 
  InsurancePlan as InsuranceType 
} from "../client/src/lib/types";

// User Model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Flight Model
export const flights = pgTable("flights", {
  id: serial("id").primaryKey(),
  flightNumber: text("flight_number").notNull(),
  airline: jsonb("airline").notNull(), // { code, name, logo }
  source: jsonb("source").notNull(), // { airport: { code, name, terminal, cityCode, cityName, countryCode, countryName }, departureTime }
  destination: jsonb("destination").notNull(), // { airport: { code, name, terminal, cityCode, cityName, countryCode, countryName }, arrivalTime }
  duration: integer("duration").notNull(), // in minutes
  cabinClass: text("cabin_class").notNull(),
  availableSeats: integer("available_seats").notNull(),
  price: jsonb("price").notNull(), // { currency, baseFare, tax, taxBreakup: [{ key, value }], totalFare }
  baggage: text("baggage"),
  cabinBaggage: text("cabin_baggage"),
  mealService: text("meal_service"),
  isRefundable: boolean("is_refundable").default(false),
  isLCC: boolean("is_lcc").default(false),
  seatMap: jsonb("seat_map") // [{ row, seats: [{ number, available, price, type }] }]
});

// Hotel Model
export const hotels = pgTable("hotels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  starRating: integer("star_rating").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull(),
  zipCode: text("zip_code"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  checkInTime: text("check_in_time").notNull(),
  checkOutTime: text("check_out_time").notNull(),
  description: text("description"),
  amenities: jsonb("amenities"), // array of amenities
  images: jsonb("images"), // [{ url, caption }]
  reviews: jsonb("reviews"), // [{ userId, userName, rating, comment, date }]
  roomTypes: jsonb("room_types") // [{ id, name, description, maxOccupancy, bedType, amenities, images, pricing, availableRooms }]
});

// Bus Model
export const buses = pgTable("buses", {
  id: serial("id").primaryKey(),
  operatorId: text("operator_id").notNull(),
  operatorName: text("operator_name").notNull(),
  busNumber: text("bus_number").notNull(),
  busType: text("bus_type").notNull(),
  totalSeats: integer("total_seats").notNull(),
  amenities: jsonb("amenities"), // array of amenities
  source: jsonb("source").notNull(), // { city, terminal, time }
  destination: jsonb("destination").notNull(), // { city, terminal, time }
  duration: integer("duration").notNull(), // in minutes
  distance: integer("distance").notNull(), // in kilometers
  fare: integer("fare").notNull(),
  currency: text("currency").notNull(),
  rating: real("rating"),
  availableSeats: integer("available_seats").notNull(),
  seatLayout: jsonb("seat_layout"), // { lowerDeck, upperDeck }
  boardingPoints: jsonb("boarding_points"), // [{ id, name, time, address, landmark }]
  droppingPoints: jsonb("dropping_points") // [{ id, name, time, address, landmark }]
});

// Train Model
export const trains = pgTable("trains", {
  id: serial("id").primaryKey(),
  trainNumber: text("train_number").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  source: jsonb("source").notNull(), // { stationCode, stationName, city, departureTime }
  destination: jsonb("destination").notNull(), // { stationCode, stationName, city, arrivalTime }
  duration: integer("duration").notNull(), // in minutes
  distance: integer("distance").notNull(), // in kilometers
  daysOfWeek: jsonb("days_of_week").notNull(), // array of days
  classes: jsonb("classes").notNull() // [{ code, name, fare, availability: { available, waitlist, status } }]
});

// Booking Model
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  bookingType: text("booking_type").notNull(), // flight, hotel, bus, train
  referenceId: text("reference_id").notNull(),
  status: text("status").notNull(),
  bookingDate: timestamp("booking_date").defaultNow(),
  travelDate: timestamp("travel_date").notNull(),
  passengers: jsonb("passengers"), // array of passenger details
  totalAmount: integer("total_amount").notNull(),
  currency: text("currency").notNull(),
  paymentStatus: text("payment_status").notNull(),
});

// Creating insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertFlightSchema = createInsertSchema(flights).omit({ id: true });
export const insertHotelSchema = createInsertSchema(hotels).omit({ id: true });
export const insertBusSchema = createInsertSchema(buses).omit({ id: true });
export const insertTrainSchema = createInsertSchema(trains).omit({ id: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, bookingDate: true });

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertFlight = z.infer<typeof insertFlightSchema>;
export type Flight = typeof flights.$inferSelect;
export type InsertHotel = z.infer<typeof insertHotelSchema>;
export type Hotel = typeof hotels.$inferSelect;
export type InsertBus = z.infer<typeof insertBusSchema>;
export type Bus = typeof buses.$inferSelect;
export type InsertTrain = z.infer<typeof insertTrainSchema>;
export type Train = typeof trains.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
