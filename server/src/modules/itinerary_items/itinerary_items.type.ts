export enum ItineraryStatus {
	PLANNED = "planned",
	DONE = "done",
	SKIPPED = "skipped",
	CANCELLED = "cancelled",
}

export interface IItineraryItem {
	id: string;

	trip_id: string;
	place_id?: string | null;

	day_number: number;
	visit_date?: Date | null;

	start_time?: string | null; // TIME
	end_time?: string | null;

	title: string;
	activity?: string | null;

	transport_method?: string | null;
	estimated_cost: number;

	order_index: number;

	status: ItineraryStatus;

	created_at: Date;
	updated_at: Date;
}

export interface ICreateItineraryItemPayload {
	trip_id: string;
	place_id?: string;

	day_number: number;
	visit_date?: Date;

	start_time?: string;
	end_time?: string;

	title: string;
	activity?: string;

	transport_method?: string;
	estimated_cost?: number;

	order_index?: number;

	status?: ItineraryStatus;
}

export interface ICreateItineraryItemDB {
	trip_id: string;
	place_id?: string | null;

	day_number: number;
	visit_date?: Date | null;

	start_time?: string | null;
	end_time?: string | null;

	title: string;
	activity?: string | null;

	transport_method?: string | null;
	estimated_cost?: number;

	order_index?: number;

	status?: ItineraryStatus;
}

export interface IUpdateItineraryItemPayload {
	place_id?: string | null;

	day_number?: number;
	visit_date?: Date | null;

	start_time?: string | null;
	end_time?: string | null;

	title?: string;
	activity?: string | null;

	transport_method?: string | null;
	estimated_cost?: number;

	order_index?: number;

	status?: ItineraryStatus;
}

export interface IItineraryQuery {
	page?: number;
	limit?: number;

	trip_id?: string;
	day_number?: number;
	status?: ItineraryStatus;

	sort_by?: string;
	sort_order?: "ASC" | "DESC";
}
