import pool from "../../config/database";
import { ISystemLog, ISystemLogQuery } from "./system_log.type";

export class SystemLogsModel {
	private tableName = "system_logs";

	async create(payload: any): Promise<ISystemLog> {
		const query = `
      INSERT INTO ${this.tableName}
      (
        user_id,
        action,
        target_table,
        target_id,
        description
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
    `;

		const values = [payload.user_id || null, payload.action, payload.target_table || null, payload.target_id || null, payload.description || null];

		const result = await pool.query(query, values);

		return result.rows[0];
	}

	async findAll(queryParams: ISystemLogQuery): Promise<ISystemLog[]> {
		const { page = 1, limit = 10, search = "", user_id, action, target_table, target_id, sort_by = "created_at", sort_order = "DESC" } = queryParams;

		const offset = (page - 1) * limit;

		let query = `SELECT * FROM ${this.tableName} WHERE 1=1`;

		const values: any[] = [];
		let i = 1;

		if (search) {
			query += ` AND description ILIKE $${i}`;
			values.push(`%${search}%`);
			i++;
		}

		if (user_id) {
			query += ` AND user_id = $${i++}`;
			values.push(user_id);
		}

		if (action) {
			query += ` AND action = $${i++}`;
			values.push(action);
		}

		if (target_table) {
			query += ` AND target_table = $${i++}`;
			values.push(target_table);
		}

		if (target_id) {
			query += ` AND target_id = $${i++}`;
			values.push(target_id);
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

	async delete(id: string) {
		const res = await pool.query(`DELETE FROM ${this.tableName} WHERE id=$1`, [id]);

		return (res.rowCount ?? 0) > 0;
	}

	async countAll(queryParams: ISystemLogQuery): Promise<number> {
		let query = `SELECT COUNT(*)::int AS total FROM ${this.tableName} WHERE 1=1`;

		const values: any[] = [];
		let i = 1;

		if (queryParams.search) {
			query += ` AND description ILIKE $${i}`;
			values.push(`%${queryParams.search}%`);
			i++;
		}

		const res = await pool.query(query, values);

		return res.rows[0]?.total || 0;
	}
}

export default new SystemLogsModel();
