export enum LogAction {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LOGIN = "login",
  LOGOUT = "logout",
  BAN = "ban",
  UNBAN = "unban",
  OTHER = "other",
}

export interface ISystemLog {
  id: string;

  user_id?: string | null;

  action: LogAction;

  target_table?: string | null;
  target_id?: string | null;

  description?: string | null;

  created_at: Date;
}

export interface ICreateSystemLogPayload {
  user_id?: string | null;

  action: LogAction;

  target_table?: string | null;
  target_id?: string | null;

  description?: string | null;
}

export interface ISystemLogQuery {
  page?: number;
  limit?: number;
  search?: string;

  user_id?: string;
  action?: LogAction;
  target_table?: string;
  target_id?: string;

  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}