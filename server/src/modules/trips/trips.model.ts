// src/modules/trips/trips.model.ts

import pool from "../../config/database";
import { ITrip, ICreateTripPayload, IUpdateTripPayload, ITripQuery } from "./trips.type";

export class TripsModel {
	private tableName = "trips";

	async create(payload: ICreateTripPayload): Promise<ITrip> {
		const query = `
      INSERT INTO ${this.tableName}
      (
        user_id,
        title,
        destination,
        start_date,
        end_date,
        total_budget,
        currency,
        status,
        description,
        travel_style
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
      )
      RETURNING *
    `;

		const values = [
			payload.user_id,
			payload.title,
			payload.destination,
			payload.start_date,
			payload.end_date,
			payload.total_budget ?? 0,
			payload.currency || "VND",
			payload.status || "draft",
			payload.description || null,
			payload.travel_style || null,
		];

		const result = await pool.query(query, values);
		return result.rows[0];
	}

	async findAll(queryParams: ITripQuery): Promise<ITrip[]> {
		const { page = 1, limit = 10, search = "", status, start_date_from, start_date_to, sort_by = "created_at", sort_order = "DESC" } = queryParams;

		const offset = (page - 1) * limit;

		let query = `
      SELECT *
      FROM ${this.tableName}
      WHERE 1=1
    `;

		const values: any[] = [];
		let index = 1;

		if (search) {
			query += `
        AND (
          title ILIKE $${index}
          OR destination ILIKE $${index}
        )
      `;
			values.push(`%${search}%`);
			index++;
		}

		if (status) {
			query += ` AND status = $${index}`;
			values.push(status);
			index++;
		}

		if (start_date_from) {
			query += ` AND start_date >= $${index}`;
			values.push(start_date_from);
			index++;
		}

		if (start_date_to) {
			query += ` AND start_date <= $${index}`;
			values.push(start_date_to);
			index++;
		}

		query += `
      ORDER BY ${sort_by} ${sort_order}
      LIMIT $${index}
      OFFSET $${index + 1}
    `;

		values.push(limit, offset);

		const result = await pool.query(query, values);
		return result.rows;
	}

	async findById(id: string): Promise<ITrip | null> {
		const query = `
      SELECT *
      FROM ${this.tableName}
      WHERE id = $1
      LIMIT 1
    `;

		const result = await pool.query(query, [id]);
		return result.rows[0] || null;
	}

	async findByUserId(user_id: string): Promise<ITrip[]> {
		const query = `
      SELECT *
      FROM ${this.tableName}
      WHERE user_id = $1
      ORDER BY created_at DESC
    `;

		const result = await pool.query(query, [user_id]);
		return result.rows;
	}

	async update(id: string, payload: IUpdateTripPayload): Promise<ITrip | null> {
		const fields = Object.keys(payload);

		if (!fields.length) {
			return this.findById(id);
		}
		const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(", ");
		const values = [...Object.values(payload), id];

		const query = `
      UPDATE ${this.tableName}
      SET
        ${setClause},
        updated_at = NOW()
      WHERE id = $${values.length}
      RETURNING *
    `;

		const result = await pool.query(query, values);
		return result.rows[0] || null;
	}

	async delete(id: string): Promise<boolean> {
		const query = `
      DELETE FROM ${this.tableName}
      WHERE id = $1
    `;

		const result = await pool.query(query, [id]);
		return (result.rowCount ?? 0) > 0;
	}

	async countAll(queryParams: ITripQuery): Promise<number> {
		const { search = "", status, start_date_from, start_date_to } = queryParams;
		let query = `
      SELECT COUNT(*)::int AS total
      FROM ${this.tableName}
      WHERE 1=1
    `;
		const values: any[] = [];
		let index = 1;

		if (search) {
			query += `
        AND (
          title ILIKE $${index}
          OR destination ILIKE $${index}
        )
      `;
			values.push(`%${search}%`);
			index++;
		}

		if (status) {
			query += ` AND status = $${index}`;
			values.push(status);
			index++;
		}

		if (start_date_from) {
			query += ` AND start_date >= $${index}`;
			values.push(start_date_from);
			index++;
		}

		if (start_date_to) {
			query += ` AND start_date <= $${index}`;
			values.push(start_date_to);
			index++;
		}

		const result = await pool.query(query, values);
		return result.rows[0]?.total || 0;
	}
}

export default new TripsModel();
