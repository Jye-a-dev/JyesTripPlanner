import { useMemo } from "react";
import { apiRequest } from "./apiClient";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type ApiResponse<T = unknown> = {
  success?: boolean;
  message?: string;
  data?: T;
};

export function usePlacesApi() {
  return useMemo(() => ({
    create: (payload: unknown) => apiRequest<ApiResponse>("/places", { method: "POST", body: payload }),
    findAll: (query?: QueryParams) => apiRequest<ApiResponse>("/places", { method: "GET", query }),
    countAll: (query?: QueryParams) => apiRequest<ApiResponse>("/places/count", { method: "GET", query }),
    findById: (id: string) => apiRequest<ApiResponse>(`/places/${id}`, { method: "GET" }),
    update: (id: string, payload: unknown) => apiRequest<ApiResponse>(`/places/${id}`, { method: "PATCH", body: payload }),
    delete: (id: string) => apiRequest<ApiResponse>(`/places/${id}`, { method: "DELETE" }),
  }), []);
}



