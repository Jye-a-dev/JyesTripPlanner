import { apiRequest } from "./apiClient";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type ApiResponse<T = unknown> = {
  success?: boolean;
  message?: string;
  data?: T;
};

export function useTripsApi() {
  return {
    create: (payload: unknown) => apiRequest<ApiResponse>("/trips", { method: "POST", body: payload }),
    findAll: (query?: QueryParams) => apiRequest<ApiResponse>("/trips", { method: "GET", query }),
    countAll: (query?: QueryParams) => apiRequest<ApiResponse>("/trips/count", { method: "GET", query }),
    findByUserId: (userId: string) => apiRequest<ApiResponse>(`/trips/user/${userId}`, { method: "GET" }),
    findById: (id: string) => apiRequest<ApiResponse>(`/trips/${id}`, { method: "GET" }),
    update: (id: string, payload: unknown) => apiRequest<ApiResponse>(`/trips/${id}`, { method: "PATCH", body: payload }),
    delete: (id: string) => apiRequest<ApiResponse>(`/trips/${id}`, { method: "DELETE" }),
  };
}