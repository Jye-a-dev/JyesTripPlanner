import { z } from "zod";

/**
 * Helpers
 */
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;

/**
 * CREATE ITINERARY ITEM
 */
export const createItinerarySchema = z.object({
  trip_id: z.string().uuid(),
  place_id: z.string().uuid().optional(),

  day_number: z.number().int().min(1),
  visit_date: z.coerce.date().optional(),

  start_time: z.string().regex(timeRegex).optional(),
  end_time: z.string().regex(timeRegex).optional(),

  title: z.string().min(1).max(150),
  activity: z.string().optional(),

  transport_method: z.string().optional(),
  estimated_cost: z.number().min(0).optional(),

  order_index: z.number().int().min(0).optional(),

  status: z.enum(["planned", "done", "skipped", "cancelled"]).optional(),
}).refine(
  (data) => {
    if (data.start_time && data.end_time) {
      return data.end_time >= data.start_time;
    }
    return true;
  },
  {
    message: "end_time must be >= start_time",
    path: ["end_time"],
  }
);

/**
 * UPDATE ITINERARY ITEM
 */
export const updateItinerarySchema = z.object({
  place_id: z.string().uuid().optional(),

  day_number: z.number().int().min(1).optional(),
  visit_date: z.coerce.date().optional(),

  start_time: z.string().regex(timeRegex).optional(),
  end_time: z.string().regex(timeRegex).optional(),

  title: z.string().min(1).max(150).optional(),
  activity: z.string().optional(),

  transport_method: z.string().optional(),
  estimated_cost: z.number().min(0).optional(),

  order_index: z.number().int().min(0).optional(),

  status: z.enum(["planned", "done", "skipped", "cancelled"]).optional(),
}).refine(
  (data) => {
    if (data.start_time && data.end_time) {
      return data.end_time >= data.start_time;
    }
    return true;
  },
  {
    message: "end_time must be >= start_time",
    path: ["end_time"],
  }
);

/**
 * PARAM
 */
export const itineraryIdSchema = z.object({
  id: z.string().uuid(),
});

/**
 * QUERY
 */
export const itineraryQuerySchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),

  trip_id: z.string().uuid().optional(),
  day_number: z.coerce.number().int().min(1).optional(),

  status: z.enum(["planned", "done", "skipped", "cancelled"]).optional(),

  sort_by: z.string().optional(),
  sort_order: z.enum(["ASC", "DESC"]).optional(),
});