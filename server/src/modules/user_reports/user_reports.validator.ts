import { z } from "zod";

/**
 * CREATE USER REPORT
 */
export const createUserReportSchema = z.object({
	user_id: z.string().uuid(),

	trip_id: z.string().uuid().optional(),

	title: z.string().min(2).max(200),
	content: z.string().min(1),

	status: z
		.enum(["pending", "reviewing", "resolved", "rejected"])
		.optional(),
});

/**
 * UPDATE USER REPORT
 */
export const updateUserReportSchema = z.object({
	title: z.string().min(2).max(200).optional(),
	content: z.string().min(1).optional(),

	status: z
		.enum(["pending", "reviewing", "resolved", "rejected"])
		.optional(),

	handled_by: z.string().uuid().optional(),
	handled_note: z.string().optional(),
	handled_at: z.coerce.date().optional(),
});

export const userReportIdSchema = z.object({
	id: z.string().uuid(),
});

export const userReportQuerySchema = z.object({
	page: z.coerce.number().min(1).optional(),
	limit: z.coerce.number().min(1).max(100).optional(),

	search: z.string().optional(),

	user_id: z.string().uuid().optional(),
	trip_id: z.string().uuid().optional(),

	status: z
		.enum(["pending", "reviewing", "resolved", "rejected"])
		.optional(),

	handled_by: z.string().uuid().optional(),

	sort_by: z.string().optional(),
	sort_order: z.enum(["ASC", "DESC"]).optional(),
});