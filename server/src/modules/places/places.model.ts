import pool from "../../config/database";
import { IPlace, IPlaceQuery, ICreatePlaceDB } from "./places.type";

export class PlacesModel {
	private tableName = "places";

	async create(payload: ICreatePlaceDB): Promise<IPlace> {
		const query = `
      INSERT INTO ${this.tableName}
      (
        trip_id, name, type, address, city, country,
        latitude, longitude, opening_hours, ticket_price,
        estimated_duration_minutes, priority, description
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING *
    `;

		const values = [
			payload.trip_id,
			payload.name,
			payload.type || "other",
			payload.address || null,
			payload.city || null,
			payload.country || null,
			payload.latitude ?? null,
			payload.longitude ?? null,
			payload.opening_hours || null,
			payload.ticket_price ?? 0,
			payload.estimated_duration_minutes ?? 60,
			payload.priority ?? 3,
			payload.description || null,
		];

		const result = await pool.query(query, values);
		return result.rows[0];
	}

	async findAll(queryParams: IPlaceQuery): Promise<IPlace[]> {
		const { page = 1, limit = 10, search = "", trip_id, type, city, country, sort_by = "created_at", sort_order = "DESC" } = queryParams;

		const offset = (page - 1) * limit;

		let query = `SELECT * FROM ${this.tableName} WHERE 1=1`;
		const values: any[] = [];
		let i = 1;

		if (search) {
			query += ` AND (name ILIKE $${i} OR address ILIKE $${i} OR description ILIKE $${i})`;
			values.push(`%${search}%`);
			i++;
		}

		if (trip_id) {
			query += ` AND trip_id = $${i++}`;
			values.push(trip_id);
		}

		if (type) {
			query += ` AND type = $${i++}`;
			values.push(type);
		}

		if (city) {
			query += ` AND city ILIKE $${i++}`;
			values.push(`%${city}%`);
		}

		if (country) {
			query += ` AND country ILIKE $${i++}`;
			values.push(`%${country}%`);
		}

		query += ` ORDER BY ${sort_by} ${sort_order} LIMIT $${i} OFFSET $${i + 1}`;
		values.push(limit, offset);

		const result = await pool.query(query, values);
		return result.rows;
	}

	async findById(id: string): Promise<IPlace | null> {
		const res = await pool.query(`SELECT * FROM ${this.tableName} WHERE id=$1 LIMIT 1`, [id]);
		return res.rows[0] || null;
	}

	async update(id: string, payload: any): Promise<IPlace | null> {
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
		const res = await pool.query(`DELETE FROM ${this.tableName} WHERE id=$1`, [id]);
		return (res.rowCount ?? 0) > 0;
	}

	async countAll(queryParams: IPlaceQuery): Promise<number> {
		let query = `SELECT COUNT(*)::int AS total FROM ${this.tableName} WHERE 1=1`;
		const values: any[] = [];
		let i = 1;

		if (queryParams.search) {
			query += ` AND (name ILIKE $${i} OR address ILIKE $${i} OR description ILIKE $${i})`;
			values.push(`%${queryParams.search}%`);
			i++;
		}

		if (queryParams.trip_id) {
			query += ` AND trip_id = $${i++}`;
			values.push(queryParams.trip_id);
		}

		if (queryParams.type) {
			query += ` AND type = $${i++}`;
			values.push(queryParams.type);
		}

		if (queryParams.city) {
			query += ` AND city ILIKE $${i++}`;
			values.push(`%${queryParams.city}%`);
		}

		if (queryParams.country) {
			query += ` AND country ILIKE $${i++}`;
			values.push(`%${queryParams.country}%`);
		}

		const res = await pool.query(query, values);
		return res.rows[0]?.total || 0;
	}
}

export default new PlacesModel();
