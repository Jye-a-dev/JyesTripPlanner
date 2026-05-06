import pool from "../../config/database";
import {
  INote,
  INoteQuery,
  ICreateNoteDB,
  IUpdateNotePayload,
} from "./notes.type";

export class NotesModel {
  private tableName = "notes";

  async create(payload: ICreateNoteDB): Promise<INote> {
    const query = `
      INSERT INTO ${this.tableName}
      (
        trip_id,
        place_id,
        itinerary_item_id,
        title,
        content
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
    `;

    const values = [
      payload.trip_id,
      payload.place_id || null,
      payload.itinerary_item_id || null,
      payload.title,
      payload.content,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll(queryParams: INoteQuery): Promise<INote[]> {
    const {
      page = 1,
      limit = 10,
      search = "",
      trip_id,
      place_id,
      itinerary_item_id,
      sort_by = "created_at",
      sort_order = "DESC",
    } = queryParams;

    const offset = (page - 1) * limit;

    let query = `SELECT * FROM ${this.tableName} WHERE 1=1`;
    const values: any[] = [];
    let i = 1;

    if (search) {
      query += ` AND (title ILIKE $${i} OR content ILIKE $${i})`;
      values.push(`%${search}%`);
      i++;
    }

    if (trip_id) {
      query += ` AND trip_id = $${i++}`;
      values.push(trip_id);
    }

    if (place_id) {
      query += ` AND place_id = $${i++}`;
      values.push(place_id);
    }

    if (itinerary_item_id) {
      query += ` AND itinerary_item_id = $${i++}`;
      values.push(itinerary_item_id);
    }

    query += ` ORDER BY ${sort_by} ${sort_order} LIMIT $${i} OFFSET $${i + 1}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);
    return result.rows;
  }

  async findById(id: string): Promise<INote | null> {
    const res = await pool.query(
      `SELECT * FROM ${this.tableName} WHERE id=$1 LIMIT 1`,
      [id]
    );

    return res.rows[0] || null;
  }

  async update(id: string, payload: IUpdateNotePayload): Promise<INote | null> {
    const fields = Object.keys(payload);
    if (!fields.length) return this.findById(id);

    const set = fields.map((f, i) => `${f}=$${i + 1}`).join(", ");
    const values = [...Object.values(payload), id];

    const query = `
      UPDATE ${this.tableName}
      SET ${set}, updated_at = NOW()
      WHERE id = $${values.length}
      RETURNING *
    `;

    const res = await pool.query(query, values);
    return res.rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const res = await pool.query(`DELETE FROM ${this.tableName} WHERE id=$1`, [
      id,
    ]);

    return (res.rowCount ?? 0) > 0;
  }

  async countAll(queryParams: INoteQuery): Promise<number> {
    let query = `SELECT COUNT(*)::int AS total FROM ${this.tableName} WHERE 1=1`;
    const values: any[] = [];
    let i = 1;

    if (queryParams.search) {
      query += ` AND (title ILIKE $${i} OR content ILIKE $${i})`;
      values.push(`%${queryParams.search}%`);
      i++;
    }

    if (queryParams.trip_id) {
      query += ` AND trip_id = $${i++}`;
      values.push(queryParams.trip_id);
    }

    const res = await pool.query(query, values);
    return res.rows[0]?.total || 0;
  }
}

export default new NotesModel();