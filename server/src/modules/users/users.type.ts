// src/modules/users/users.type.ts

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BANNED = "banned",
}

export interface IUser {
  id: string
  full_name: string
  email: string
  password_hash: string
  avatar_url?: string | null
  phone?: string | null
  role: UserRole
  status: UserStatus
  is_verified: boolean
  last_login_at?: Date | null
  created_at: Date
  updated_at: Date
}

export interface ICreateUserPayload {
  full_name: string
  email: string
  password_hash: string
  avatar_url?: string
  phone?: string
  role?: UserRole
  status?: UserStatus
  is_verified?: boolean
}

export interface IUpdateUserPayload {
  full_name?: string
  email?: string
  password_hash?: string
  avatar_url?: string | null
  phone?: string | null
  role?: UserRole
  status?: UserStatus
  is_verified?: boolean
  last_login_at?: Date | null
}

export interface IUserQuery {
  page?: number
  limit?: number
  search?: string
  role?: UserRole
  status?: UserStatus
  is_verified?: boolean
  sort_by?: string
  sort_order?: "ASC" | "DESC"
}