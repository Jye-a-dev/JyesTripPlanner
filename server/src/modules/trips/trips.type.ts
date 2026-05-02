// src/modules/trips/trips.type.ts

export enum TripStatus {
	DRAFT = "draft",
	PLANNING = "planning",
	ACTIVE = "active",
	COMPLETED = "completed",
	CANCELLED = "cancelled",
}

export interface ITrip {
	id: string;
	user_id: string;
	title: string;
	destination: string;
	start_date: Date;
	end_date: Date;
	total_budget: number;
	currency: string;
	status: TripStatus;
	description?: string | null;
	travel_style?: string | null;
	created_at: Date;
	updated_at: Date;
}

export interface ICreateTripPayload {
	user_id: string;
	title: string;
	destination: string;
	start_date: Date;
	end_date: Date;
	total_budget?: number;
	currency?: string;
	status?: TripStatus;
	description?: string;
	travel_style?: string;
}

export interface IUpdateTripPayload {
	title?: string;
	destination?: string;
	start_date?: Date
	end_date?: Date;
	total_budget?: number;
	currency?: string;
	status?: TripStatus;
	description?: string | null;
	travel_style?: string | null;
}

export interface ITripQuery {
	page?: number;
	limit?: number;
	search?: string;
	status?: TripStatus;
	start_date_from?: Date;
	start_date_to?: Date;
	sort_by?: string;
	sort_order?: "ASC" | "DESC";
}
