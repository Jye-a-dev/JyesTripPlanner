import { z } from "zod";

/**
 * CREATE USER BAN
 */
export const createUserBanSchema = z.object({
	user_id: z.string().uuid(),

	admin_id: z.string().uuid().optional(),

	reason: z.string().min(1),

	expired_at: z.coerce.date().optional(),

	is_active: z.boolean().optional(),
});

/**
 * UPDATE USER BAN
 */
export const updateUserBanSchema = z.object({
	admin_id: z.string().uuid().optional(),

	reason: z.string().min(1).optional(),

	expired_at: z.coerce.date().optional(),

	is_active: z.boolean().optional(),
});

export const userBanIdSchema = z.object({
	id: z.string().uuid(),
});

export const userBanQuerySchema = z.object({
	page: z.coerce.number().min(1).optional(),
	limit: z.coerce.number().min(1).max(100).optional(),

	search: z.string().optional(),

	user_id: z.string().uuid().optional(),
	admin_id: z.string().uuid().optional(),

	is_active: z.boolean().optional(),

	sort_by: z.string().optional(),
	sort_order: z.enum(["ASC", "DESC"]).optional(),
});