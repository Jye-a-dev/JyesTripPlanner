import placesModel from "./places.model";

import { ICreatePlacePayload, IUpdatePlacePayload, IPlaceQuery, ICreatePlaceDB, PlaceType } from "./places.type";

const ALLOWED_FIELDS = [
	"name",
	"type",
	"address",
	"city",
	"country",
	"latitude",
	"longitude",
	"opening_hours",
	"ticket_price",
	"estimated_duration_minutes",
	"priority",
	"description",
];

class PlacesService {
	async createPlace(payload: ICreatePlacePayload) {
		const dbPayload: ICreatePlaceDB = {
			trip_id: payload.trip_id,

			name: payload.name,
			type: payload.type ?? PlaceType.OTHER,

			address: payload.address ?? null,
			city: payload.city ?? null,
			country: payload.country ?? null,

			latitude: payload.latitude ?? null,
			longitude: payload.longitude ?? null,

			opening_hours: payload.opening_hours ?? null,
			ticket_price: payload.ticket_price ?? 0,
			estimated_duration_minutes: payload.estimated_duration_minutes ?? 60,

			priority: payload.priority ?? 3,

			description: payload.description ?? null,
		};

		return placesModel.create(dbPayload);
	}

	async getPlaces(query: IPlaceQuery) {
		return placesModel.findAll(query);
	}

	async getPlaceById(id: string) {
		const place = await placesModel.findById(id);
		if (!place) throw new Error("Place not found");

		return place;
	}

	async updatePlace(id: string, payload: IUpdatePlacePayload) {
		const place = await placesModel.findById(id);
		if (!place) throw new Error("Place not found");

		const cleanPayload = Object.fromEntries(Object.entries(payload).filter(([k]) => ALLOWED_FIELDS.includes(k)));

		const updated = await placesModel.update(id, cleanPayload);
		if (!updated) return null;

		return updated;
	}

	async deletePlace(id: string) {
		const place = await placesModel.findById(id);
		if (!place) throw new Error("Place not found");

		return placesModel.delete(id);
	}

	async countAll(query: IPlaceQuery) {
		return placesModel.countAll(query);
	}
}

export default new PlacesService();
