import pool from "../../config/database";
import { IUserBan, IUserBanQuery } from "./user_bans.type";

export class UserBansModel {
	private tableName = "user_bans";

	async create(payload: any): Promise<IUserBan> {
		const query = `
      INSERT INTO ${this.tableName}
      (
        user_id,
        admin_id,
        reason,
        expired_at,
        is_active
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
    `;

		const values = [payload.user_id, payload.admin_id || null, payload.reason, payload.expired_at || null, payload.is_active ?? true];

		const result = await pool.query(query, values);

		return result.rows[0];
	}

	async findAll(queryParams: IUserBanQuery): Promise<IUserBan[]> {
		const { page = 1, limit = 10, search = "", user_id, admin_id, is_active, sort_by = "banned_at", sort_order = "DESC" } = queryParams;

		const offset = (page - 1) * limit;

		let query = `SELECT * FROM ${this.tableName} WHERE 1=1`;

		const values: any[] = [];
		let i = 1;

		if (search) {
			query += ` AND reason ILIKE $${i}`;
			values.push(`%${search}%`);
			i++;
		}

		if (user_id) {
			query += ` AND user_id = $${i++}`;
			values.push(user_id);
		}

		if (admin_id) {
			query += ` AND admin_id = $${i++}`;
			values.push(admin_id);
		}

		if (is_active !== undefined) {
			query += ` AND is_active = $${i++}`;
			values.push(is_active);
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
      SET ${set}
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

	async countAll(queryParams: IUserBanQuery): Promise<number> {
		let query = `SELECT COUNT(*)::int AS total FROM ${this.tableName} WHERE 1=1`;

		const values: any[] = [];
		let i = 1;

		if (queryParams.search) {
			query += ` AND reason ILIKE $${i}`;
			values.push(`%${queryParams.search}%`);
			i++;
		}

		const res = await pool.query(query, values);

		return res.rows[0]?.total || 0;
	}
}

export default new UserBansModel();
