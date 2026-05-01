// src/modules/users/users.service.ts

import usersModel from "./users.models";
import { ICreateUserPayload, IUpdateUserPayload, IUserQuery } from "./users.type";

class UsersService {
	async countAll(query: IUserQuery) {
		const total = await usersModel.countAll(query);

		if (total === 0) {
			throw new Error("Non exist");
		}

		return total;
	}

	async createUser(payload: ICreateUserPayload) {
		const existingUser = await usersModel.findByEmail(payload.email);

		if (existingUser) {
			throw new Error("Email already exists");
		}

		return usersModel.create(payload);
	}

	async getUsers(query: IUserQuery) {
		return usersModel.findAll(query);
	}

	async getUserById(id: string) {
		const user = await usersModel.findById(id);

		if (!user) {
			throw new Error("User not found");
		}

		return user;
	}

	async getUserByEmail(email: string) {
		const user = await usersModel.findByEmail(email);

		if (!user) {
			throw new Error("User not found");
		}

		return user;
	}

	async updateUser(id: string, payload: IUpdateUserPayload) {
		const user = await usersModel.findById(id);

		if (!user) {
			throw new Error("User not found");
		}

		if (payload.email && payload.email !== user.email) {
			const existingUser = await usersModel.findByEmail(payload.email);

			if (existingUser) {
				throw new Error("Email already exists");
			}
		}

		return usersModel.update(id, payload);
	}

	async deleteUser(id: string) {
		const user = await usersModel.findById(id);

		if (!user) {
			throw new Error("User not found");
		}

		return usersModel.delete(id);
	}
}

export default new UsersService();
