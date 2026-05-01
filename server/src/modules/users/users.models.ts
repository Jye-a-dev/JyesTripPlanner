// src/modules/users/users.model.ts

import pool from "../../config/database";
import { IUser, ICreateUserPayload, IUpdateUserPayload, IUserQuery } from "./users.type";

export class UsersModel {
	private tableName = "users";

	async create(payload: ICreateUserPayload): Promise<IUser> {
		const query = `
      INSERT INTO ${this.tableName}
      (
        full_name,
        email,
        password_hash,
        avatar_url,
        phone,
        role,
        status,
        is_verified
      )
      VALUES
      (
        $1, $2, $3, $4, $5, $6, $7, $8
      )
      RETURNING *
    `;

		const values = [
			payload.full_name,
			payload.email,
			payload.password_hash,
			payload.avatar_url || null,
			payload.phone || null,
			payload.role || "user",
			payload.status || "active",
			payload.is_verified ?? false,
		];

		const result = await pool.query(query, values);
		return result.rows[0];
	}

	async findAll(queryParams: IUserQuery): Promise<IUser[]> {
		const { page = 1, limit = 10, search = "", role, status, sort_by = "created_at", sort_order = "DESC" } = queryParams;

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
          full_name ILIKE $${index}
          OR email ILIKE $${index}
        )
      `;
			values.push(`%${search}%`);
			index++;
		}

		if (role) {
			query += ` AND role = $${index}`;
			values.push(role);
			index++;
		}

		if (status) {
			query += ` AND status = $${index}`;
			values.push(status);
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

	async findById(id: string): Promise<IUser | null> {
		const query = `
      SELECT *
      FROM ${this.tableName}
      WHERE id = $1
      LIMIT 1
    `;

		const result = await pool.query(query, [id]);
		return result.rows[0] || null;
	}

	async findByEmail(email: string): Promise<IUser | null> {
		const query = `
      SELECT *
      FROM ${this.tableName}
      WHERE email = $1
      LIMIT 1
    `;

		const result = await pool.query(query, [email]);
		return result.rows[0] || null;
	}

	async update(id: string, payload: IUpdateUserPayload): Promise<IUser | null> {
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

	async countAll(queryParams: IUserQuery): Promise<number> {
		const { search = "", role, status } = queryParams;

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
        full_name ILIKE $${index}
        OR email ILIKE $${index}
      )
    `;
			values.push(`%${search}%`);
			index++;
		}

		if (role) {
			query += ` AND role = $${index}`;
			values.push(role);
			index++;
		}

		if (status) {
			query += ` AND status = $${index}`;
			values.push(status);
			index++;
		}

		const result = await pool.query(query, values);

		return result.rows[0]?.total || 0;
	};
}

export default new UsersModel();
