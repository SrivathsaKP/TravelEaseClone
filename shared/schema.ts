import { pgTable, text, serial, integer, boolean, timestamp, jsonb, real, varchar, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Cab, Homestay and Insurance Types from client/src/lib/types.ts
import { 
  Cab as CabType, 
  HomestayProperty as HomestayType, 
  InsurancePlan as InsuranceType 
} from "../client/src/lib/types";

// Session storage table - required for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User Model - updated for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(), // Replit Auth uses string ID
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
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
  userId: varchar("user_id").notNull(),
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
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true, updatedAt: true });
export const upsertUserSchema = createInsertSchema(users).omit({ createdAt: true, updatedAt: true });
export const insertFlightSchema = createInsertSchema(flights).omit({ id: true });
export const insertHotelSchema = createInsertSchema(hotels).omit({ id: true });
export const insertBusSchema = createInsertSchema(buses).omit({ id: true });
// Cab Model
export const cabs = pgTable("cabs", {
  id: text("id").primaryKey(),
  vehicleType: jsonb("vehicle_type").notNull(), // { id, name, description, capacity, pricePerKm, image }
  licensePlate: text("license_plate").notNull(),
  driver: jsonb("driver").notNull(), // { id, name, phoneNumber, rating, totalRides, photo }
  isAvailable: boolean("is_available").notNull(),
  currentLocation: jsonb("current_location"), // { address, city, state, landmark, latitude, longitude }
  rating: real("rating"),
  fare: jsonb("fare").notNull(), // { baseFare, perKmRate, perMinuteRate, tax, totalFare, currency }
});

// Homestay Model
export const homestays = pgTable("homestays", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // 'entire-place', 'private-room', or 'shared-room'
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull(),
  zipCode: text("zip_code"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  images: jsonb("images").notNull(), // [{ url, caption }]
  host: jsonb("host").notNull(), // { id, name, profilePicture, rating, contactNumber, verificationStatus, memberSince, languages }
  amenities: jsonb("amenities").notNull(), // string[]
  houseRules: jsonb("house_rules").notNull(), // string[]
  maxGuests: integer("max_guests").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  beds: integer("beds").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  pricePerNight: integer("price_per_night").notNull(),
  rating: real("rating").notNull(),
  reviewCount: integer("review_count").notNull(),
  minimumStay: integer("minimum_stay").notNull(),
  availability: jsonb("availability").notNull(), // [{ startDate, endDate }]
  currency: text("currency").notNull(),
});

// Insurance Model
export const insurancePlans = pgTable("insurance_plans", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  coverageType: text("coverage_type").notNull(), // 'domestic', 'international', or 'both'
  coverageAmount: integer("coverage_amount").notNull(),
  premium: integer("premium").notNull(),
  benefits: jsonb("benefits").notNull(), // [{ name, description, coverageLimit }]
  exclusions: jsonb("exclusions").notNull(), // string[]
  termsAndConditions: text("terms_and_conditions").notNull(),
  duration: integer("duration").notNull(), // in days
  currency: text("currency").notNull(),
});

export const insertTrainSchema = createInsertSchema(trains).omit({ id: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, bookingDate: true });
export const insertCabSchema = createInsertSchema(cabs).omit({ id: true });
export const insertHomestaySchema = createInsertSchema(homestays).omit({ id: true });
export const insertInsurancePlanSchema = createInsertSchema(insurancePlans).omit({ id: true });

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpsertUser = z.infer<typeof upsertUserSchema>;
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
export type InsertCab = z.infer<typeof insertCabSchema>;
export type Cab = typeof cabs.$inferSelect;
export type InsertHomestay = z.infer<typeof insertHomestaySchema>;
export type Homestay = typeof homestays.$inferSelect;
export type InsertInsurancePlan = z.infer<typeof insertInsurancePlanSchema>;
export type InsurancePlan = typeof insurancePlans.$inferSelect;
