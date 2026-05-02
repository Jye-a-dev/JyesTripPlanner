export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface IUser {
  id: string;
  full_name: string;
  email: string;
  password_hash: string;
  avatar_url?: string | null;

  role: UserRole;
  is_active: boolean;
  is_banned: boolean;

  last_login_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateUserPayload {
  full_name: string;
  email: string;
  password: string;
  avatar_url?: string;

  role?: UserRole;
  is_active?: boolean;
  is_banned?: boolean;
}

export interface ICreateUserDB {
  full_name: string;
  email: string;
  password_hash: string;
  avatar_url?: string | null;

  role?: UserRole;
  is_active?: boolean;
  is_banned?: boolean;
}

export interface IUpdateUserPayload {
  full_name?: string;
  email?: string;
  password?: string;
  avatar_url?: string | null;

  role?: UserRole;
  is_active?: boolean;
  is_banned?: boolean;

  last_login_at?: Date | null;
}

export interface IUserQuery {
  page?: number;
  limit?: number;
  search?: string;

  role?: UserRole;
  is_active?: boolean;
  is_banned?: boolean;

  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}