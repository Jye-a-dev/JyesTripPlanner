import { apiRequest } from "./apiClient";

type ApiResponse<T = unknown> = {
  success?: boolean;
  message?: string;
  data?: T;
};

export function useAuthApi() {
  return {
    register: (payload: unknown) => apiRequest<ApiResponse>("/auth/register", { method: "POST", body: payload }),
    login: (payload: unknown) => apiRequest<ApiResponse>("/auth/login", { method: "POST", body: payload }),
    logout: () => apiRequest<ApiResponse>("/auth/logout", { method: "POST" }),
    me: (token?: string) => apiRequest<ApiResponse>("/auth/me", { method: "GET", token }),
  };
}