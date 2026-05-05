import { z } from "zod";

/**
 * CREATE PLACE
 */
export const createPlaceSchema = z.object({
  trip_id: z.string().uuid(),

  name: z.string().min(1).max(150),
  type: z.enum([
    "attraction",
    "restaurant",
    "hotel",
    "airport",
    "station",
    "shopping",
    "nature",
    "museum",
    "entertainment",
    "other",
  ]).optional(),

  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),

  latitude: z.number().optional(),
  longitude: z.number().optional(),

  opening_hours: z.string().optional(),
  ticket_price: z.number().min(0).optional(),
  estimated_duration_minutes: z.number().int().min(1).optional(),

  priority: z.number().int().min(1).max(5).optional(),

  description: z.string().optional(),
});

/**
 * UPDATE PLACE
 */
export const updatePlaceSchema = z.object({
  name: z.string().min(1).max(150).optional(),
  type: z.enum([
    "attraction",
    "restaurant",
    "hotel",
    "airport",
    "station",
    "shopping",
    "nature",
    "museum",
    "entertainment",
    "other",
  ]).optional(),

  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),

  latitude: z.number().optional(),
  longitude: z.number().optional(),

  opening_hours: z.string().optional(),
  ticket_price: z.number().min(0).optional(),
  estimated_duration_minutes: z.number().int().min(1).optional(),

  priority: z.number().int().min(1).max(5).optional(),

  description: z.string().optional(),
});

/**
 * PARAM
 */
export const placeIdSchema = z.object({
  id: z.string().uuid(),
});

/**
 * QUERY
 */
export const placeQuerySchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),

  search: z.string().optional(),

  trip_id: z.string().uuid().optional(),
  type: z.enum([
    "attraction",
    "restaurant",
    "hotel",
    "airport",
    "station",
    "shopping",
    "nature",
    "museum",
    "entertainment",
    "other",
  ]).optional(),

  city: z.string().optional(),
  country: z.string().optional(),

  sort_by: z.string().optional(),
  sort_order: z.enum(["ASC", "DESC"]).optional(),
});