export interface INote {
  id: string;

  trip_id: string;
  place_id?: string | null;
  itinerary_item_id?: string | null;

  title: string;
  content: string;

  created_at: Date;
  updated_at: Date;
}

export interface ICreateNotePayload {
  trip_id: string;
  place_id?: string | null;
  itinerary_item_id?: string | null;

  title: string;
  content: string;
}

export interface ICreateNoteDB {
  trip_id: string;
  place_id?: string | null;
  itinerary_item_id?: string | null;

  title: string;
  content: string;
}

export interface IUpdateNotePayload {
  place_id?: string | null;
  itinerary_item_id?: string | null;

  title?: string;
  content?: string;
}

export interface INoteQuery {
  page?: number;
  limit?: number;
  search?: string;

  trip_id?: string;
  place_id?: string;
  itinerary_item_id?: string;

  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}