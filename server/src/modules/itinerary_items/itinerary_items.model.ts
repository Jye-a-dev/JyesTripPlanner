import pool from "../../config/database";
import {
  IItineraryItem,
  IItineraryQuery,
  ICreateItineraryItemDB,
} from "./itinerary_items.type";

export class ItineraryItemsModel {
  private tableName = "itinerary_items";

  async create(payload: ICreateItineraryItemDB): Promise<IItineraryItem> {
    const query = `
      INSERT INTO ${this.tableName}
      (
        trip_id, place_id, day_number, visit_date,
        start_time, end_time, title, activity,
        transport_method, estimated_cost, order_index, status
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING *
    `;

    const values = [
      payload.trip_id,
      payload.place_id || null,
      payload.day_number,
      payload.visit_date || null,
      payload.start_time || null,
      payload.end_time || null,
      payload.title,
      payload.activity || null,
      payload.transport_method || null,
      payload.estimated_cost ?? 0,
      payload.order_index ?? 0,
      payload.status || "planned",
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll(queryParams: IItineraryQuery): Promise<IItineraryItem[]> {
    const {
      page = 1,
      limit = 10,
      trip_id,
      day_number,
      status,
      sort_by = "day_number",
      sort_order = "ASC",
    } = queryParams;

    const offset = (page - 1) * limit;

    let query = `SELECT * FROM ${this.tableName} WHERE 1=1`;
    const values: any[] = [];
    let i = 1;

    if (trip_id) {
      query += ` AND trip_id = $${i++}`;
      values.push(trip_id);
    }

    if (day_number !== undefined) {
      query += ` AND day_number = $${i++}`;
      values.push(day_number);
    }

    if (status) {
      query += ` AND status = $${i++}`;
      values.push(status);
    }

    query += ` ORDER BY ${sort_by} ${sort_order}, order_index ASC LIMIT $${i} OFFSET $${i + 1}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);
    return result.rows;
  }

  async findById(id: string): Promise<IItineraryItem | null> {
    const res = await pool.query(
      `SELECT * FROM ${this.tableName} WHERE id=$1 LIMIT 1`,
      [id]
    );
    return res.rows[0] || null;
  }

  async update(id: string, payload: any): Promise<IItineraryItem | null> {
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
    const res = await pool.query(
      `DELETE FROM ${this.tableName} WHERE id=$1`,
      [id]
    );
    return (res.rowCount ?? 0) > 0;
  }

  async countAll(queryParams: IItineraryQuery): Promise<number> {
    let query = `SELECT COUNT(*)::int AS total FROM ${this.tableName} WHERE 1=1`;
    const values: any[] = [];
    let i = 1;

    if (queryParams.trip_id) {
      query += ` AND trip_id = $${i++}`;
      values.push(queryParams.trip_id);
    }

    if (queryParams.day_number !== undefined) {
      query += ` AND day_number = $${i++}`;
      values.push(queryParams.day_number);
    }

    if (queryParams.status) {
      query += ` AND status = $${i++}`;
      values.push(queryParams.status);
    }

    const res = await pool.query(query, values);
    return res.rows[0]?.total || 0;
  }
}

export default new ItineraryItemsModel();