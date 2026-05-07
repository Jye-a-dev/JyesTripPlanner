export interface IUserBan {
  id: string;

  user_id: string;
  admin_id?: string | null;

  reason: string;

  banned_at: Date;
  expired_at?: Date | null;

  is_active: boolean;
}

export interface ICreateUserBanPayload {
  user_id: string;
  admin_id?: string | null;

  reason: string;
  expired_at?: Date | null;

  is_active?: boolean;
}

export interface IUpdateUserBanPayload {
  admin_id?: string | null;

  reason?: string;
  expired_at?: Date | null;

  is_active?: boolean;
}

export interface IUserBanQuery {
  page?: number;
  limit?: number;
  search?: string;

  user_id?: string;
  admin_id?: string;
  is_active?: boolean;

  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}