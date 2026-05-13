import pool from "../../config/database";
import { IUser, IUserQuery, ICreateUserDB } from "./users.type";

export class UsersModel {
  private tableName = "users";

  async create(payload: ICreateUserDB): Promise<IUser> {
    const query = `
      INSERT INTO ${this.tableName}
      (
        full_name,
        email,
        password_hash,
        avatar_url,
        role,
        is_active,
        is_banned
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
    `;

    const values = [
      payload.full_name,
      payload.email,
      payload.password_hash,
      payload.avatar_url || null,
      payload.role || "user",
      payload.is_active ?? true,
      payload.is_banned ?? false,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll(queryParams: IUserQuery): Promise<IUser[]> {
    const {
      page = 1,
      limit = 10,
      search = "",
      role,
      is_active,
      is_banned,
      sort_by = "created_at",
      sort_order = "DESC",
    } = queryParams;

    const offset = (page - 1) * limit;

    let query = `SELECT * FROM ${this.tableName} WHERE 1=1`;
    const values: any[] = [];
    let i = 1;

    if (search) {
      query += ` AND (full_name ILIKE $${i} OR email ILIKE $${i})`;
      values.push(`%${search}%`);
      i++;
    }

    if (role) {
      query += ` AND role = $${i++}`;
      values.push(role);
    }

    if (is_active !== undefined) {
      query += ` AND is_active = $${i++}`;
      values.push(is_active);
    }

    if (is_banned !== undefined) {
      query += ` AND is_banned = $${i++}`;
      values.push(is_banned);
    }

    query += ` ORDER BY ${sort_by} ${sort_order} LIMIT $${i} OFFSET $${i + 1}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);
    return result.rows;
  }

  async findById(id: string) {
    const res = await pool.query(
      `SELECT * FROM ${this.tableName} WHERE id=$1 LIMIT 1`,
      [id]
    );
    return res.rows[0] || null;
  }

  async findByEmail(email: string) {
    const res = await pool.query(
      `SELECT * FROM ${this.tableName} WHERE email=$1 LIMIT 1`,
      [email]
    );
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
    const res = await pool.query(
      `DELETE FROM ${this.tableName} WHERE id=$1`,
      [id]
    );
    return (res.rowCount ?? 0) > 0;
  }

  async countAll(queryParams: IUserQuery): Promise<number> {
    let query = `SELECT COUNT(*)::int AS total FROM ${this.tableName} WHERE 1=1`;
    const values: any[] = [];
    let i = 1;

    if (queryParams.search) {
      query += ` AND (full_name ILIKE $${i} OR email ILIKE $${i})`;
      values.push(`%${queryParams.search}%`);
      i++;
    }

    const res = await pool.query(query, values);
    return res.rows[0]?.total || 0;
  }
}

export default new UsersModel();