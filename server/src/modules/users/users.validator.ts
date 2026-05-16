import { z } from "zod";

/**
 * CREATE USER
 */
export const createUserSchema = z.object({
	full_name: z.string().min(2).max(100),
	email: z.string().email(),
	password: z.string().min(6),

	avatar_url: z.string().url().optional(),

	role: z.enum(["admin", "user"]).optional(),
	is_active: z.boolean().optional(),
	is_banned: z.boolean().optional(),
});

/**
 * UPDATE USER
 */
export const updateUserSchema = z.object({
	full_name: z.string().min(2).max(100).optional(),
	email: z.string().email().optional(),
	password: z.string().min(6).optional(),

	avatar_url: z.string().url().optional(),

	role: z.enum(["admin", "user"]).optional(),
	is_active: z.boolean().optional(),
	is_banned: z.boolean().optional(),
});

export const userIdSchema = z.object({
	id: z.string().uuid(),
});

export const userEmailSchema = z.object({
  email: z.string().email(),
});

export const userRoleSchema = z.object({
  role: z.enum(["admin", "user"]),
});

export const userQuerySchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  search: z.string().optional(),
  role: z.enum(["admin", "user"]).optional(),
  sort_by: z.string().optional(),
  sort_order: z.enum(["ASC", "DESC"]).optional(),
});
