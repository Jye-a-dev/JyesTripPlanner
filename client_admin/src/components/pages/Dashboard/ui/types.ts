export type UserRole = "admin" | "user";

export type UserItem = {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  is_banned: boolean;
};

export type TripStatus = "draft" | "planning" | "active" | "completed" | "cancelled";

export type TripItem = {
  id: string;
  title: string;
  destination: string;
  status: TripStatus;
  user_id: string;
};

export type UserFormState = {
  full_name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type TripFormState = {
  user_id: string;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  status: TripStatus;
};

export type ApiListResponse<T> = {
  data?: T[];
};


