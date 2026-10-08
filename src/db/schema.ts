import { pgTable, text, integer, serial, timestamp } from "drizzle-orm/pg-core";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  tripType: text("trip_type").notNull(), // local | oneway | round
  pickup: text("pickup").notNull(),
  dropoff: text("dropoff").notNull(),
  carType: text("car_type").notNull(),
  passengers: integer("passengers").notNull().default(1),
  distanceKm: integer("distance_km"), // null = to be quoted on call
  fareRupees: integer("fare_rupees"), // null = to be quoted on call
  status: text("status").notNull().default("requested"), // requested | confirmed | completed | cancelled
  notes: text("notes"),
  pickupAt: timestamp("pickup_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type BookingRow = typeof bookings.$inferSelect;
export type BookingInsert = typeof bookings.$inferInsert;
