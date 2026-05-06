import { z } from "zod";

/**
 * EXPENSE
 */

const expenseCategoryEnum = z.enum(["food", "transport", "hotel", "ticket", "shopping", "entertainment", "other"]);

/**
 * CREATE EXPENSE
 */
export const createExpenseSchema = z.object({
	trip_id: z.string().uuid(),

	itinerary_item_id: z.string().uuid().optional(),

	category: expenseCategoryEnum.optional(),

	title: z.string().min(1).max(150),

	amount: z.number().min(0),

	currency: z.string().max(10).optional(),

	expense_date: z.coerce.date().optional(),

	note: z.string().optional(),
});

/**
 * UPDATE EXPENSE
 */
export const updateExpenseSchema = z.object({
	itinerary_item_id: z.string().uuid().nullable().optional(),

	category: expenseCategoryEnum.optional(),

	title: z.string().min(1).max(150).optional(),

	amount: z.number().min(0).optional(),

	currency: z.string().max(10).optional(),

	expense_date: z.coerce.date().nullable().optional(),

	note: z.string().nullable().optional(),
});

export const expenseIdSchema = z.object({
	id: z.string().uuid(),
});

export const expenseQuerySchema = z.object({
	page: z.coerce.number().min(1).optional(),

	limit: z.coerce.number().min(1).max(100).optional(),

	search: z.string().optional(),

	trip_id: z.string().uuid().optional(),

	itinerary_item_id: z.string().uuid().optional(),

	category: expenseCategoryEnum.optional(),

	currency: z.string().optional(),

	expense_date_from: z.coerce.date().optional(),

	expense_date_to: z.coerce.date().optional(),

	min_amount: z.coerce.number().min(0).optional(),

	max_amount: z.coerce.number().min(0).optional(),

	sort_by: z.string().optional(),

	sort_order: z.enum(["ASC", "DESC"]).optional(),
});
