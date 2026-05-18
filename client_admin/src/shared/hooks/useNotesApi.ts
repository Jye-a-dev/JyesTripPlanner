import { useMemo } from "react";
import { apiRequest } from "./apiClient";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type ApiResponse<T = unknown> = {
  success?: boolean;
  message?: string;
  data?: T;
};

export function useNotesApi() {
  return useMemo(() => ({
    create: (payload: unknown) => apiRequest<ApiResponse>("/notes", { method: "POST", body: payload }),
    findAll: (query?: QueryParams) => apiRequest<ApiResponse>("/notes", { method: "GET", query }),
    countAll: (query?: QueryParams) => apiRequest<ApiResponse>("/notes/count", { method: "GET", query }),
    findById: (id: string) => apiRequest<ApiResponse>(`/notes/${id}`, { method: "GET" }),
    update: (id: string, payload: unknown) => apiRequest<ApiResponse>(`/notes/${id}`, { method: "PATCH", body: payload }),
    delete: (id: string) => apiRequest<ApiResponse>(`/notes/${id}`, { method: "DELETE" }),
  }), []);
}



