import usersModel from "./users.models";
import bcrypt from "bcrypt";

import {
  ICreateUserPayload,
  IUpdateUserPayload,
  IUserQuery,
  ICreateUserDB,
  UserRole,
} from "./users.type";

const SALT_ROUNDS = 10;

const ALLOWED_FIELDS = [
  "full_name",
  "email",
  "password_hash",
  "avatar_url",
  "role",
  "is_active",
  "is_banned",
  "last_login_at",
];

class UsersService {
  async createUser(payload: ICreateUserPayload) {
    const email = payload.email.toLowerCase().trim();

    const existingUser = await usersModel.findByEmail(email);
    if (existingUser) throw new Error("Email already exists");

    const hashed = await bcrypt.hash(payload.password, SALT_ROUNDS);

    const dbPayload: ICreateUserDB = {
      full_name: payload.full_name,
      email,
      password_hash: hashed,
      avatar_url: payload.avatar_url,

      role: payload.role ?? UserRole.USER,
      is_active: payload.is_active ?? true,
      is_banned: payload.is_banned ?? false,
    };

    const user = await usersModel.create(dbPayload);
    const { password_hash, ...safeUser } = user;

    return safeUser;
  }

  async getUsers(query: IUserQuery) {
    const users = await usersModel.findAll(query);
    return users.map(({ password_hash, ...u }) => u);
  }

  async getUserById(id: string) {
    const user = await usersModel.findById(id);
    if (!user) throw new Error("User not found");

    const { password_hash, ...safeUser } = user;
    return safeUser;
  }

  async getUserByEmail(email: string) {
    const user = await usersModel.findByEmail(email);
    if (!user) throw new Error("User not found");

    const { password_hash, ...safeUser } = user;
    return safeUser;
  }

  async updateUser(id: string, payload: IUpdateUserPayload) {
    const user = await usersModel.findById(id);
    if (!user) throw new Error("User not found");

    if (payload.email && payload.email !== user.email) {
      const exists = await usersModel.findByEmail(payload.email);
      if (exists) throw new Error("Email already exists");
    }

    if (payload.password) {
      const hashed = await bcrypt.hash(payload.password, SALT_ROUNDS);
      (payload as any).password_hash = hashed;
      delete (payload as any).password;
    }

    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([k]) => ALLOWED_FIELDS.includes(k))
    );

    const updated = await usersModel.update(id, cleanPayload);
    if (!updated) return null;

    const { password_hash, ...safeUser } = updated;
    return safeUser;
  }

  async deleteUser(id: string) {
    const user = await usersModel.findById(id);
    if (!user) throw new Error("User not found");

    return usersModel.delete(id);
  }

  async countAll(query: IUserQuery) {
    return usersModel.countAll(query);
  }
}

export default new UsersService();