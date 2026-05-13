import { z } from "zod";

/**
 * NOTE
 */

/**
 * CREATE NOTE
 */
export const createNoteSchema = z.object({
	trip_id: z.string().uuid(),

	place_id: z.string().uuid().optional(),

	itinerary_item_id: z.string().uuid().optional(),

	title: z.string().min(1).max(150),

	content: z.string().min(1),
});

/**
 * UPDATE NOTE
 */
export const updateNoteSchema = z.object({
	place_id: z.string().uuid().nullable().optional(),

	itinerary_item_id: z.string().uuid().nullable().optional(),

	title: z.string().min(1).max(150).optional(),

	content: z.string().min(1).optional(),
});

export const noteIdSchema = z.object({
	id: z.string().uuid(),
});

export const noteQuerySchema = z.object({
	page: z.coerce.number().min(1).optional(),

	limit: z.coerce.number().min(1).max(100).optional(),

	search: z.string().optional(),

	trip_id: z.string().uuid().optional(),

	place_id: z.string().uuid().optional(),

	itinerary_item_id: z.string().uuid().optional(),

	sort_by: z.string().optional(),

	sort_order: z.enum(["ASC", "DESC"]).optional(),
});
