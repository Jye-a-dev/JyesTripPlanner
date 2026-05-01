// src/modules/users/users.validator.ts

import { z } from "zod";

export const createUserSchema = z.object({
	full_name: z.string().min(2).max(100),
	email: z.string().email(),
	password_hash: z.string().min(6),
	avatar_url: z.string().url().optional(),
	phone: z.string().max(20).optional(),
	role: z.enum(["admin", "user"]).optional(),
	status: z.enum(["active", "inactive", "banned"]).optional(),
	is_verified: z.boolean().optional(),
});

export const updateUserSchema = createUserSchema.partial();

export const userIdSchema = z.object({
	id: z.string().uuid(),
});

export const userQuerySchema = z.object({
	page: z.coerce.number().min(1).optional(),
	limit: z.coerce.number().min(1).max(100).optional(),
	search: z.string().optional(),
	role: z.enum(["admin", "user"]).optional(),
	status: z.enum(["active", "inactive", "banned"]).optional(),
	is_verified: z.coerce.boolean().optional(),
	sort_by: z.string().optional(),
	sort_order: z.enum(["ASC", "DESC"]).optional(),
});
