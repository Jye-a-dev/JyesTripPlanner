export enum PlaceType {
  ATTRACTION = "attraction",
  RESTAURANT = "restaurant",
  HOTEL = "hotel",
  AIRPORT = "airport",
  STATION = "station",
  SHOPPING = "shopping",
  NATURE = "nature",
  MUSEUM = "museum",
  ENTERTAINMENT = "entertainment",
  OTHER = "other",
}

export interface IPlace {
  id: string;
  trip_id: string;

  name: string;
  type: PlaceType;

  address?: string | null;
  city?: string | null;
  country?: string | null;

  latitude?: number | null;
  longitude?: number | null;

  opening_hours?: string | null;
  ticket_price: number;
  estimated_duration_minutes: number;

  priority: number;

  description?: string | null;

  created_at: Date;
  updated_at: Date;
}

export interface ICreatePlacePayload {
  trip_id: string;

  name: string;
  type?: PlaceType;

  address?: string;
  city?: string;
  country?: string;

  latitude?: number;
  longitude?: number;

  opening_hours?: string;
  ticket_price?: number;
  estimated_duration_minutes?: number;

  priority?: number;

  description?: string;
}

export interface ICreatePlaceDB {
  trip_id: string;

  name: string;
  type?: PlaceType;

  address?: string | null;
  city?: string | null;
  country?: string | null;

  latitude?: number | null;
  longitude?: number | null;

  opening_hours?: string | null;
  ticket_price?: number;
  estimated_duration_minutes?: number;

  priority?: number;

  description?: string | null;
}

export interface IUpdatePlacePayload {
  name?: string;
  type?: PlaceType;

  address?: string | null;
  city?: string | null;
  country?: string | null;

  latitude?: number | null;
  longitude?: number | null;

  opening_hours?: string | null;
  ticket_price?: number;
  estimated_duration_minutes?: number;

  priority?: number;

  description?: string | null;
}

export interface IPlaceQuery {
  page?: number;
  limit?: number;
  search?: string;

  trip_id?: string;
  type?: PlaceType;

  city?: string;
  country?: string;

  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}