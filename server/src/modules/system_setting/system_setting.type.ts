export interface ISystemSetting {
  id: string;

  setting_key: string;
  setting_value: string;

  description?: string | null;

  updated_by?: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface ICreateSystemSettingPayload {
  setting_key: string;
  setting_value: string;

  description?: string | null;
  updated_by?: string | null;
}

export interface IUpdateSystemSettingPayload {
  setting_key?: string;
  setting_value?: string;

  description?: string | null;
  updated_by?: string | null;
}

export interface ISystemSettingQuery {
  page?: number;
  limit?: number;
  search?: string;

  setting_key?: string;
  updated_by?: string;

  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}