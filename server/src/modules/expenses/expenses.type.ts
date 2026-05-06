export enum ExpenseCategory {
	FOOD = "food",
	TRANSPORT = "transport",
	HOTEL = "hotel",
	TICKET = "ticket",
	SHOPPING = "shopping",
	ENTERTAINMENT = "entertainment",
	OTHER = "other",
}

export interface IExpense {
	id: string;

	trip_id: string;
	itinerary_item_id?: string | null;

	category: ExpenseCategory;

	title: string;
	amount: number;
	currency: string;

	expense_date?: Date | null;
	note?: string | null;

	created_at: Date;
	updated_at: Date;
}

export interface ICreateExpensePayload {
	trip_id: string;
	itinerary_item_id?: string | null;

	category?: ExpenseCategory;

	title: string;
	amount: number;
	currency?: string;

	expense_date?: Date;
	note?: string;
}

export interface ICreateExpenseDB {
	trip_id: string;
	itinerary_item_id?: string | null;

	category?: ExpenseCategory;

	title: string;
	amount: number;
	currency?: string;

	expense_date?: Date | null;
	note?: string | null;
}

export interface IUpdateExpensePayload {
	itinerary_item_id?: string | null;

	category?: ExpenseCategory;

	title?: string;
	amount?: number;
	currency?: string;

	expense_date?: Date | null;
	note?: string | null;
}

export interface IExpenseQuery {
	page?: number;
	limit?: number;
	search?: string;

	trip_id?: string;
	itinerary_item_id?: string;

	category?: ExpenseCategory;
	currency?: string;

	expense_date_from?: Date;
	expense_date_to?: Date;

	min_amount?: number;
	max_amount?: number;

	sort_by?: string;
	sort_order?: "ASC" | "DESC";
}
