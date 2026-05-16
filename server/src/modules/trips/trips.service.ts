// src/modules/trips/trips.service.ts

import tripsModel from "./trips.model";
import { ICreateTripPayload, IUpdateTripPayload, ITripQuery } from "./trips.type";

class TripsService {
	async countAll(query: ITripQuery) {
		return tripsModel.countAll(query);
	}

  async countByUserId(user_id: string) {
    return tripsModel.countByUserId(user_id);
  }

  async countByStatus(status: string) {
    return tripsModel.countByStatus(status);
  }

	async createTrip(payload: ICreateTripPayload) {
		return tripsModel.create(payload);
	}

	async getTrips(query: ITripQuery) {
		return tripsModel.findAll(query);
	}

	async getTripById(id: string) {
		const trip = await tripsModel.findById(id);

		if (!trip) {
			throw new Error("Trip not found");
		}

		return trip;
	}

	async getTripsByUserId(user_id: string) {
		const trips = await tripsModel.findByUserId(user_id);

		if (!trips || trips.length === 0) {
			throw new Error("Trips not found");
		}

		return trips;
	}

	async updateTrip(id: string, payload: IUpdateTripPayload) {
		const trip = await tripsModel.findById(id);

		if (!trip) {
			throw new Error("Trip not found");
		}

		// validate logic date nếu update
		if (payload.start_date && payload.end_date && payload.end_date < payload.start_date) {
			throw new Error("end_date must be greater than or equal to start_date");
		}

		return tripsModel.update(id, payload);
	}

	async deleteTrip(id: string) {
		const trip = await tripsModel.findById(id);

		if (!trip) {
			throw new Error("Trip not found");
		}

		return tripsModel.delete(id);
	}
}

export default new TripsService();
