// src/modules/trips/trips.validator.ts

import { z } from "zod";

// ======================================================
// BASE SCHEMA (KHÔNG refine)
// ======================================================

const baseTripSchema = z.object({
	user_id: z.string().uuid(),

	title: z.string().min(1).max(150),
	destination: z.string().min(1).max(150),

	start_date: z.coerce.date(),
	end_date: z.coerce.date(),

	total_budget: z.coerce.number().min(0).optional(),
	currency: z.string().max(10).optional(),

	status: z.enum(["draft", "planning", "active", "completed", "cancelled"]).optional(),

	description: z.string().optional(),
	travel_style: z.string().max(100).optional(),
});

// ======================================================
// CREATE
// ======================================================

export const createTripSchema = baseTripSchema.refine((data) => data.end_date >= data.start_date, {
	message: "end_date must be greater than or equal to start_date",
	path: ["end_date"],
});

// ======================================================
// UPDATE
// ======================================================

export const updateTripSchema = baseTripSchema
	.omit({ user_id: true }) // ✅ hợp lệ vì chưa refine
	.partial()
	.refine(
		(data) => {
			if (data.start_date && data.end_date) {
				return data.end_date >= data.start_date;
			}
			return true;
		},
		{
			message: "end_date must be greater than or equal to start_date",
			path: ["end_date"],
		},
	);

// ======================================================
// PARAMS
// ======================================================

export const tripIdSchema = z.object({
	id: z.string().uuid(),
});

export const tripUserIdSchema = z.object({
  user_id: z.string().uuid(),
});

export const tripStatusSchema = z.object({
  status: z.enum(["draft", "planning", "active", "completed", "cancelled"]),
});

// ======================================================
// QUERY
// ======================================================

export const tripQuerySchema = z.object({
	page: z.coerce.number().min(1).optional(),
	limit: z.coerce.number().min(1).max(100).optional(),

	search: z.string().optional(),

	status: z.enum(["draft", "planning", "active", "completed", "cancelled"]).optional(),

	start_date_from: z.coerce.date().optional(),
	start_date_to: z.coerce.date().optional(),

	sort_by: z.string().optional(),
	sort_order: z.enum(["ASC", "DESC"]).optional(),
});
