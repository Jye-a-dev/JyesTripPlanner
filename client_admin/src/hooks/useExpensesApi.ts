import { apiRequest } from "./apiClient";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type ApiResponse<T = unknown> = {
  success?: boolean;
  message?: string;
  data?: T;
};

export function useExpensesApi() {
  return {
    create: (payload: unknown) => apiRequest<ApiResponse>("/expenses", { method: "POST", body: payload }),
    findAll: (query?: QueryParams) => apiRequest<ApiResponse>("/expenses", { method: "GET", query }),
    countAll: (query?: QueryParams) => apiRequest<ApiResponse>("/expenses/count", { method: "GET", query }),
    findById: (id: string) => apiRequest<ApiResponse>(`/expenses/${id}`, { method: "GET" }),
    update: (id: string, payload: unknown) => apiRequest<ApiResponse>(`/expenses/${id}`, { method: "PATCH", body: payload }),
    delete: (id: string) => apiRequest<ApiResponse>(`/expenses/${id}`, { method: "DELETE" }),
  };
}