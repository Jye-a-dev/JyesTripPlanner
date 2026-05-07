import { z } from "zod";

/**
 * CREATE SYSTEM LOG
 */
export const createSystemLogSchema = z.object({
	user_id: z.string().uuid().optional(),

	action: z.enum(["create", "update", "delete", "login", "logout", "ban", "unban", "other"]),

	target_table: z.string().max(100).optional(),

	target_id: z.string().uuid().optional(),

	description: z.string().optional(),
});

export const systemLogIdSchema = z.object({
	id: z.string().uuid(),
});

export const systemLogQuerySchema = z.object({
	page: z.coerce.number().min(1).optional(),
	limit: z.coerce.number().min(1).max(100).optional(),

	search: z.string().optional(),

	user_id: z.string().uuid().optional(),

	action: z.enum(["create", "update", "delete", "login", "logout", "ban", "unban", "other"]).optional(),

	target_table: z.string().optional(),

	target_id: z.string().uuid().optional(),

	sort_by: z.string().optional(),
	sort_order: z.enum(["ASC", "DESC"]).optional(),
});
