import pool from "../../config/database";
import {
  IExpense,
  IExpenseQuery,
  ICreateExpenseDB,
  IUpdateExpensePayload,
} from "./expenses.type";

export class ExpensesModel {
  private tableName = "expenses";

  async create(payload: ICreateExpenseDB): Promise<IExpense> {
    const query = `
      INSERT INTO ${this.tableName}
      (
        trip_id,
        itinerary_item_id,
        category,
        title,
        amount,
        currency,
        expense_date,
        note
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
    `;

    const values = [
      payload.trip_id,
      payload.itinerary_item_id || null,
      payload.category || "other",
      payload.title,
      payload.amount,
      payload.currency || "VND",
      payload.expense_date || null,
      payload.note || null,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll(queryParams: IExpenseQuery): Promise<IExpense[]> {
    const {
      page = 1,
      limit = 10,
      search = "",
      trip_id,
      itinerary_item_id,
      category,
      currency,
      expense_date_from,
      expense_date_to,
      min_amount,
      max_amount,
      sort_by = "created_at",
      sort_order = "DESC",
    } = queryParams;

    const offset = (page - 1) * limit;

    let query = `SELECT * FROM ${this.tableName} WHERE 1=1`;
    const values: any[] = [];
    let i = 1;

    if (search) {
      query += ` AND title ILIKE $${i}`;
      values.push(`%${search}%`);
      i++;
    }

    if (trip_id) {
      query += ` AND trip_id = $${i++}`;
      values.push(trip_id);
    }

    if (itinerary_item_id) {
      query += ` AND itinerary_item_id = $${i++}`;
      values.push(itinerary_item_id);
    }

    if (category) {
      query += ` AND category = $${i++}`;
      values.push(category);
    }

    if (currency) {
      query += ` AND currency = $${i++}`;
      values.push(currency);
    }

    if (expense_date_from) {
      query += ` AND expense_date >= $${i++}`;
      values.push(expense_date_from);
    }

    if (expense_date_to) {
      query += ` AND expense_date <= $${i++}`;
      values.push(expense_date_to);
    }

    if (min_amount !== undefined) {
      query += ` AND amount >= $${i++}`;
      values.push(min_amount);
    }

    if (max_amount !== undefined) {
      query += ` AND amount <= $${i++}`;
      values.push(max_amount);
    }

    query += ` ORDER BY ${sort_by} ${sort_order} LIMIT $${i} OFFSET $${i + 1}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);
    return result.rows;
  }

  async findById(id: string): Promise<IExpense | null> {
    const res = await pool.query(
      `SELECT * FROM ${this.tableName} WHERE id=$1 LIMIT 1`,
      [id]
    );

    return res.rows[0] || null;
  }

  async update(
    id: string,
    payload: IUpdateExpensePayload
  ): Promise<IExpense | null> {
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

  async countAll(queryParams: IExpenseQuery): Promise<number> {
    let query = `SELECT COUNT(*)::int AS total FROM ${this.tableName} WHERE 1=1`;
    const values: any[] = [];
    let i = 1;

    if (queryParams.search) {
      query += ` AND title ILIKE $${i}`;
      values.push(`%${queryParams.search}%`);
      i++;
    }

    if (queryParams.trip_id) {
      query += ` AND trip_id = $${i++}`;
      values.push(queryParams.trip_id);
    }

    if (queryParams.category) {
      query += ` AND category = $${i++}`;
      values.push(queryParams.category);
    }

    const res = await pool.query(query, values);
    return res.rows[0]?.total || 0;
  }
}

export default new ExpensesModel();