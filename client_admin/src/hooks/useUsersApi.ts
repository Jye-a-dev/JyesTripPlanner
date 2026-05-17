import { useMemo } from "react";
import { apiRequest } from "./apiClient";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type ApiResponse<T = unknown> = {
  success?: boolean;
  message?: string;
  data?: T;
};

export function useUsersApi() {
  return useMemo(() => ({
    create: (payload: unknown) => apiRequest<ApiResponse>("/users", { method: "POST", body: payload }),
    findAll: (query?: QueryParams) => apiRequest<ApiResponse>("/users", { method: "GET", query }),
    countAll: (query?: QueryParams) => apiRequest<ApiResponse>("/users/count", { method: "GET", query }),
    countByEmail: (email: string) => apiRequest<ApiResponse>(`/users/count/email/${encodeURIComponent(email)}`, { method: "GET" }),
    countByRole: (role: "admin" | "user") => apiRequest<ApiResponse>(`/users/count/role/${role}`, { method: "GET" }),
    findByEmail: (email: string) => apiRequest<ApiResponse>(`/users/email/${encodeURIComponent(email)}`, { method: "GET" }),
    findById: (id: string) => apiRequest<ApiResponse>(`/users/${id}`, { method: "GET" }),
    update: (id: string, payload: unknown) => apiRequest<ApiResponse>(`/users/${id}`, { method: "PATCH", body: payload }),
    delete: (id: string) => apiRequest<ApiResponse>(`/users/${id}`, { method: "DELETE" }),
  }), []);
}


