import { z } from "zod";

/**
 * CREATE SYSTEM SETTING
 */
export const createSystemSettingSchema = z.object({
	setting_key: z.string().min(1).max(150),

	setting_value: z.string().min(1),

	description: z.string().optional(),

	updated_by: z.string().uuid().optional(),
});

/**
 * UPDATE SYSTEM SETTING
 */
export const updateSystemSettingSchema = z.object({
	setting_key: z.string().min(1).max(150).optional(),

	setting_value: z.string().min(1).optional(),

	description: z.string().optional(),

	updated_by: z.string().uuid().optional(),
});

export const systemSettingIdSchema = z.object({
	id: z.string().uuid(),
});

export const systemSettingKeySchema = z.object({
  key: z.string().min(1).max(150),
});

export const systemSettingQuerySchema = z.object({
	page: z.coerce.number().min(1).optional(),
	limit: z.coerce.number().min(1).max(100).optional(),

	search: z.string().optional(),

	setting_key: z.string().optional(),

	updated_by: z.string().uuid().optional(),

	sort_by: z.string().optional(),
	sort_order: z.enum(["ASC", "DESC"]).optional(),
});
