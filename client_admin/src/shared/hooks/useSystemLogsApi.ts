import { useMemo } from "react";
import { apiRequest } from "./apiClient";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type ApiResponse<T = unknown> = {
  success?: boolean;
  message?: string;
  data?: T;
};

export function useSystemLogsApi() {
  return useMemo(() => ({
    create: (payload: unknown) => apiRequest<ApiResponse>("/system_log", { method: "POST", body: payload }),
    findAll: (query?: QueryParams) => apiRequest<ApiResponse>("/system_log", { method: "GET", query }),
    countAll: (query?: QueryParams) => apiRequest<ApiResponse>("/system_log/count", { method: "GET", query }),
    findById: (id: string) => apiRequest<ApiResponse>(`/system_log/${id}`, { method: "GET" }),
    delete: (id: string) => apiRequest<ApiResponse>(`/system_log/${id}`, { method: "DELETE" }),
  }), []);
}



