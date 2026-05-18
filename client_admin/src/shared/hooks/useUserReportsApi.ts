import { useMemo } from "react";
import { apiRequest } from "./apiClient";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type ApiResponse<T = unknown> = {
  success?: boolean;
  message?: string;
  data?: T;
};

export function useUserReportsApi() {
  return useMemo(() => ({
    create: (payload: unknown) => apiRequest<ApiResponse>("/user_reports", { method: "POST", body: payload }),
    findAll: (query?: QueryParams) => apiRequest<ApiResponse>("/user_reports", { method: "GET", query }),
    countAll: (query?: QueryParams) => apiRequest<ApiResponse>("/user_reports/count", { method: "GET", query }),
    findById: (id: string) => apiRequest<ApiResponse>(`/user_reports/${id}`, { method: "GET" }),
    update: (id: string, payload: unknown) => apiRequest<ApiResponse>(`/user_reports/${id}`, { method: "PATCH", body: payload }),
    delete: (id: string) => apiRequest<ApiResponse>(`/user_reports/${id}`, { method: "DELETE" }),
  }), []);
}



