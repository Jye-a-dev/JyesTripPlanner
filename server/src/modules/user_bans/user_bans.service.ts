import userBansModel from "./user_bans.model";

import {
	IUserBanQuery,
	ICreateUserBanPayload,
	IUpdateUserBanPayload,
} from "./user_bans.type";

const ALLOWED_FIELDS = [
	"admin_id",
	"reason",
	"expired_at",
	"is_active",
];

class UserBansService {
	async createUserBan(payload: ICreateUserBanPayload) {
		return userBansModel.create({
			user_id: payload.user_id,
			admin_id: payload.admin_id ?? null,
			reason: payload.reason,
			expired_at: payload.expired_at ?? null,
			is_active: payload.is_active ?? true,
		});
	}

	async getUserBans(query: IUserBanQuery) {
		return userBansModel.findAll(query);
	}

	async getUserBanById(id: string) {
		const ban = await userBansModel.findById(id);
		if (!ban) throw new Error("User ban not found");

		return ban;
	}

	async updateUserBan(id: string, payload: IUpdateUserBanPayload) {
		const ban = await userBansModel.findById(id);
		if (!ban) throw new Error("User ban not found");

		const cleanPayload = Object.fromEntries(
			Object.entries(payload).filter(([k]) => ALLOWED_FIELDS.includes(k))
		);

		return userBansModel.update(id, cleanPayload);
	}

	async deleteUserBan(id: string) {
		const ban = await userBansModel.findById(id);
		if (!ban) throw new Error("User ban not found");

		return userBansModel.delete(id);
	}

	async countAll(query: IUserBanQuery) {
		return userBansModel.countAll(query);
	}
}

export default new UserBansService();