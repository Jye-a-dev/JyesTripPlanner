import { useMemo } from "react";
import { apiRequest } from "./apiClient";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type ApiResponse<T = unknown> = {
  success?: boolean;
  message?: string;
  data?: T;
};

export function useSystemSettingsApi() {
  return useMemo(() => ({
    create: (payload: unknown) => apiRequest<ApiResponse>("/system_settings", { method: "POST", body: payload }),
    findAll: (query?: QueryParams) => apiRequest<ApiResponse>("/system_settings", { method: "GET", query }),
    countAll: (query?: QueryParams) => apiRequest<ApiResponse>("/system_settings/count", { method: "GET", query }),
    countByKey: (key: string) => apiRequest<ApiResponse>(`/system_settings/count/key/${encodeURIComponent(key)}`, { method: "GET" }),
    findByKey: (key: string) => apiRequest<ApiResponse>(`/system_settings/key/${encodeURIComponent(key)}`, { method: "GET" }),
    findById: (id: string) => apiRequest<ApiResponse>(`/system_settings/${id}`, { method: "GET" }),
    update: (id: string, payload: unknown) => apiRequest<ApiResponse>(`/system_settings/${id}`, { method: "PATCH", body: payload }),
    delete: (id: string) => apiRequest<ApiResponse>(`/system_settings/${id}`, { method: "DELETE" }),
  }), []);
}


