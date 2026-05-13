import { apiRequest } from "./apiClient";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type ApiResponse<T = unknown> = {
  success?: boolean;
  message?: string;
  data?: T;
};

export function useItineraryItemsApi() {
  return {
    create: (payload: unknown) => apiRequest<ApiResponse>("/itinerary_items", { method: "POST", body: payload }),
    findAll: (query?: QueryParams) => apiRequest<ApiResponse>("/itinerary_items", { method: "GET", query }),
    countAll: (query?: QueryParams) => apiRequest<ApiResponse>("/itinerary_items/count", { method: "GET", query }),
    findById: (id: string) => apiRequest<ApiResponse>(`/itinerary_items/${id}`, { method: "GET" }),
    update: (id: string, payload: unknown) => apiRequest<ApiResponse>(`/itinerary_items/${id}`, { method: "PATCH", body: payload }),
    delete: (id: string) => apiRequest<ApiResponse>(`/itinerary_items/${id}`, { method: "DELETE" }),
  };
}