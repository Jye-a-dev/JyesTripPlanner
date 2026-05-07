import pool from "../../config/database";
import { IUserReport, IUserReportQuery } from "./user_reports.type";

export class UserReportsModel {
	private tableName = "user_reports";

	async create(payload: any): Promise<IUserReport> {
		const query = `
      INSERT INTO ${this.tableName}
      (
        user_id,
        trip_id,
        title,
        content,
        status
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
    `;

		const values = [payload.user_id, payload.trip_id || null, payload.title, payload.content, payload.status || "pending"];

		const result = await pool.query(query, values);
		return result.rows[0];
	}

	async findAll(queryParams: IUserReportQuery): Promise<IUserReport[]> {
		const { page = 1, limit = 10, search = "", user_id, trip_id, status, handled_by, sort_by = "created_at", sort_order = "DESC" } = queryParams;

		const offset = (page - 1) * limit;

		let query = `SELECT * FROM ${this.tableName} WHERE 1=1`;
		const values: any[] = [];
		let i = 1;

		if (search) {
			query += ` AND (title ILIKE $${i} OR content ILIKE $${i})`;
			values.push(`%${search}%`);
			i++;
		}

		if (user_id) {
			query += ` AND user_id = $${i++}`;
			values.push(user_id);
		}

		if (trip_id) {
			query += ` AND trip_id = $${i++}`;
			values.push(trip_id);
		}

		if (status) {
			query += ` AND status = $${i++}`;
			values.push(status);
		}

		if (handled_by) {
			query += ` AND handled_by = $${i++}`;
			values.push(handled_by);
		}

		query += ` ORDER BY ${sort_by} ${sort_order} LIMIT $${i} OFFSET $${i + 1}`;
		values.push(limit, offset);

		const result = await pool.query(query, values);
		return result.rows;
	}

	async findById(id: string) {
		const res = await pool.query(`SELECT * FROM ${this.tableName} WHERE id=$1 LIMIT 1`, [id]);

		return res.rows[0] || null;
	}

	async update(id: string, payload: any) {
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

	async delete(id: string) {
		const res = await pool.query(`DELETE FROM ${this.tableName} WHERE id=$1`, [id]);

		return (res.rowCount ?? 0) > 0;
	}

	async countAll(queryParams: IUserReportQuery): Promise<number> {
		let query = `SELECT COUNT(*)::int AS total FROM ${this.tableName} WHERE 1=1`;

		const values: any[] = [];
		let i = 1;

		if (queryParams.search) {
			query += ` AND (title ILIKE $${i} OR content ILIKE $${i})`;
			values.push(`%${queryParams.search}%`);
			i++;
		}

		const res = await pool.query(query, values);

		return res.rows[0]?.total || 0;
	}
}

export default new UserReportsModel();
