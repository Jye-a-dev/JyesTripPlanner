import pool from "../../config/database";
import { ISystemSetting, ISystemSettingQuery } from "./system_setting.type";

export class SystemSettingsModel {
	private tableName = "system_settings";

	async create(payload: any): Promise<ISystemSetting> {
		const query = `
      INSERT INTO ${this.tableName}
      (
        setting_key,
        setting_value,
        description,
        updated_by
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *
    `;

		const values = [payload.setting_key, payload.setting_value, payload.description || null, payload.updated_by || null];

		const result = await pool.query(query, values);

		return result.rows[0];
	}

	async findAll(queryParams: ISystemSettingQuery): Promise<ISystemSetting[]> {
		const { page = 1, limit = 10, search = "", setting_key, updated_by, sort_by = "created_at", sort_order = "DESC" } = queryParams;

		const offset = (page - 1) * limit;

		let query = `SELECT * FROM ${this.tableName} WHERE 1=1`;

		const values: any[] = [];
		let i = 1;

		if (search) {
			query += `
        AND (
          setting_key ILIKE $${i}
          OR setting_value ILIKE $${i}
        )
      `;

			values.push(`%${search}%`);
			i++;
		}

		if (setting_key) {
			query += ` AND setting_key = $${i++}`;
			values.push(setting_key);
		}

		if (updated_by) {
			query += ` AND updated_by = $${i++}`;
			values.push(updated_by);
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

	async findByKey(setting_key: string) {
		const res = await pool.query(`SELECT * FROM ${this.tableName} WHERE setting_key=$1 LIMIT 1`, [setting_key]);

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

	async countAll(queryParams: ISystemSettingQuery): Promise<number> {
		let query = `SELECT COUNT(*)::int AS total FROM ${this.tableName} WHERE 1=1`;

		const values: any[] = [];
		let i = 1;

		if (queryParams.search) {
			query += `
        AND (
          setting_key ILIKE $${i}
          OR setting_value ILIKE $${i}
        )
      `;

			values.push(`%${queryParams.search}%`);
			i++;
		}

		const res = await pool.query(query, values);

		return res.rows[0]?.total || 0;
	}

  async countByKey(setting_key: string): Promise<number> {
    const res = await pool.query(
      `SELECT COUNT(*)::int AS total FROM ${this.tableName} WHERE setting_key=$1`,
      [setting_key]
    );
    return res.rows[0]?.total || 0;
  }
}

export default new SystemSettingsModel();
