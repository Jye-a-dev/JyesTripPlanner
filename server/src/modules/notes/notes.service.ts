import notesModel from "./notes.model";

import {
  ICreateNotePayload,
  IUpdateNotePayload,
  INoteQuery,
  ICreateNoteDB,
} from "./notes.type";

const ALLOWED_FIELDS = [
  "place_id",
  "itinerary_item_id",
  "title",
  "content",
];

class NotesService {
  async createNote(payload: ICreateNotePayload) {
    const dbPayload: ICreateNoteDB = {
      trip_id: payload.trip_id,
      place_id: payload.place_id ?? null,
      itinerary_item_id: payload.itinerary_item_id ?? null,
      title: payload.title,
      content: payload.content,
    };

    return notesModel.create(dbPayload);
  }

  async getNotes(query: INoteQuery) {
    return notesModel.findAll(query);
  }

  async getNoteById(id: string) {
    const note = await notesModel.findById(id);
    if (!note) throw new Error("Note not found");

    return note;
  }

  async updateNote(id: string, payload: IUpdateNotePayload) {
    const note = await notesModel.findById(id);
    if (!note) throw new Error("Note not found");

    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([k]) => ALLOWED_FIELDS.includes(k))
    );

    const updated = await notesModel.update(id, cleanPayload);
    if (!updated) return null;

    return updated;
  }

  async deleteNote(id: string) {
    const note = await notesModel.findById(id);
    if (!note) throw new Error("Note not found");

    return notesModel.delete(id);
  }

  async countAll(query: INoteQuery) {
    return notesModel.countAll(query);
  }
}

export default new NotesService();