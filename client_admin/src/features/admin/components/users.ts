export type UserItem = {
  id: string;
  full_name: string;
  email: string;
  role: "admin" | "user";
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ApiResponse<T = unknown> = {
  data?: T;
  message?: string;
};

export function toUserItem(input: Record<string, unknown>): UserItem {
  return {
    id: String(input.id ?? ""),
    full_name: String(input.full_name ?? ""),
    email: String(input.email ?? ""),
    role: input.role === "admin" ? "admin" : "user",
    is_active: Boolean(input.is_active),
    created_at: typeof input.created_at === "string" ? input.created_at : undefined,
    updated_at: typeof input.updated_at === "string" ? input.updated_at : undefined,
  };
}

export function formatDate(input?: string) {
  if (!input) return "-";
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" }).format(date);
}




