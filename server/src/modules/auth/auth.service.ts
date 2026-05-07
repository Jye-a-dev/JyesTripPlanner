import bcrypt from "bcrypt";
import usersModel from "../users/users.models";
import usersService from "../users/users.service";
import { UserRole } from "../users/users.type";
import { createAuthToken } from "./auth.token";

class AuthService {
  async register(payload: { full_name: string; email: string; password: string; avatar_url?: string }) {
    const user = await usersService.createUser(payload);

    const token = createAuthToken({
      id: user.id,
      email: user.email,
      role: user.role as UserRole,
    });

    return { user, token };
  }

  async login(payload: { email: string; password: string }) {
    const email = payload.email.toLowerCase().trim();
    const user = await usersModel.findByEmail(email);

    if (!user) {
      throw Object.assign(new Error("Invalid email or password"), { statusCode: 401 });
    }

    const isMatch = await bcrypt.compare(payload.password, user.password_hash);
    if (!isMatch) {
      throw Object.assign(new Error("Invalid email or password"), { statusCode: 401 });
    }

    if (!user.is_active) {
      throw Object.assign(new Error("User account is inactive"), { statusCode: 403 });
    }

    if (user.is_banned) {
      throw Object.assign(new Error("User account is banned"), { statusCode: 403 });
    }

    const updated = await usersModel.update(user.id, { last_login_at: new Date() });
    const currentUser = updated ?? user;
    const { password_hash, ...safeUser } = currentUser;

    const token = createAuthToken({
      id: safeUser.id,
      email: safeUser.email,
      role: safeUser.role as UserRole,
    });

    return { user: safeUser, token };
  }

  async me(userId: string) {
    const user = await usersModel.findById(userId);
    if (!user) throw Object.assign(new Error("User not found"), { statusCode: 404 });

    const { password_hash, ...safeUser } = user;
    return safeUser;
  }
}

export default new AuthService();
