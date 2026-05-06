import expensesModel from "./expenses.model";

import {
  ICreateExpensePayload,
  IUpdateExpensePayload,
  IExpenseQuery,
  ICreateExpenseDB,
} from "./expenses.type";

const ALLOWED_FIELDS = [
  "itinerary_item_id",
  "category",
  "title",
  "amount",
  "currency",
  "expense_date",
  "note",
];

class ExpensesService {
  async createExpense(payload: ICreateExpensePayload) {
    const dbPayload: ICreateExpenseDB = {
      trip_id: payload.trip_id,
      itinerary_item_id: payload.itinerary_item_id ?? null,
      category: payload.category,
      title: payload.title,
      amount: payload.amount,
      currency: payload.currency ?? "VND",
      expense_date: payload.expense_date ?? null,
      note: payload.note ?? null,
    };

    return expensesModel.create(dbPayload);
  }

  async getExpenses(query: IExpenseQuery) {
    return expensesModel.findAll(query);
  }

  async getExpenseById(id: string) {
    const expense = await expensesModel.findById(id);
    if (!expense) throw new Error("Expense not found");

    return expense;
  }

  async updateExpense(id: string, payload: IUpdateExpensePayload) {
    const expense = await expensesModel.findById(id);
    if (!expense) throw new Error("Expense not found");

    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([k]) => ALLOWED_FIELDS.includes(k))
    );

    const updated = await expensesModel.update(id, cleanPayload);
    if (!updated) return null;

    return updated;
  }

  async deleteExpense(id: string) {
    const expense = await expensesModel.findById(id);
    if (!expense) throw new Error("Expense not found");

    return expensesModel.delete(id);
  }

  async countAll(query: IExpenseQuery) {
    return expensesModel.countAll(query);
  }
}

export default new ExpensesService();