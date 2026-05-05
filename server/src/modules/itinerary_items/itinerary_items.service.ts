import itineraryItemsModel from "./itinerary_items.model";

import { ICreateItineraryItemPayload, IUpdateItineraryItemPayload, IItineraryQuery, ICreateItineraryItemDB, ItineraryStatus } from "./itinerary_items.type";

const ALLOWED_FIELDS = [
	"place_id",
	"day_number",
	"visit_date",
	"start_time",
	"end_time",
	"title",
	"activity",
	"transport_method",
	"estimated_cost",
	"order_index",
	"status",
];

class ItineraryItemsService {
	async createItineraryItem(payload: ICreateItineraryItemPayload) {
		const dbPayload: ICreateItineraryItemDB = {
			trip_id: payload.trip_id,
			place_id: payload.place_id ?? null,

			day_number: payload.day_number,
			visit_date: payload.visit_date ?? null,

			start_time: payload.start_time ?? null,
			end_time: payload.end_time ?? null,

			title: payload.title,
			activity: payload.activity ?? null,

			transport_method: payload.transport_method ?? null,
			estimated_cost: payload.estimated_cost ?? 0,

			order_index: payload.order_index ?? 0,

			status: payload.status ?? ItineraryStatus.PLANNED,
		};

		return itineraryItemsModel.create(dbPayload);
	}

	async getItineraryItems(query: IItineraryQuery) {
		return itineraryItemsModel.findAll(query);
	}

	async getItineraryItemById(id: string) {
		const item = await itineraryItemsModel.findById(id);
		if (!item) throw new Error("Itinerary item not found");

		return item;
	}

	async updateItineraryItem(id: string, payload: IUpdateItineraryItemPayload) {
		const item = await itineraryItemsModel.findById(id);
		if (!item) throw new Error("Itinerary item not found");

		const cleanPayload = Object.fromEntries(Object.entries(payload).filter(([k]) => ALLOWED_FIELDS.includes(k)));

		const updated = await itineraryItemsModel.update(id, cleanPayload);
		if (!updated) return null;

		return updated;
	}

	async deleteItineraryItem(id: string) {
		const item = await itineraryItemsModel.findById(id);
		if (!item) throw new Error("Itinerary item not found");

		return itineraryItemsModel.delete(id);
	}

	async countAll(query: IItineraryQuery) {
		return itineraryItemsModel.countAll(query);
	}
}

export default new ItineraryItemsService();
