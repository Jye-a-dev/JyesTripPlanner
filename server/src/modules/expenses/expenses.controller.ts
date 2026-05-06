// src/modules/expenses/expenses.controller.ts

import { Request, Response, NextFunction } from "express";
import expensesService from "./expenses.service";

class ExpensesController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const expense = await expensesService.createExpense(req.body);

			return res.status(201).json({
				success: true,
				message: "Expense created successfully",
				data: expense,
			});
		} catch (error) {
			next(error);
		}
	}

	async findAll(req: Request, res: Response, next: NextFunction) {
		try {
			const expenses = await expensesService.getExpenses(req.query);

			return res.status(200).json({
				success: true,
				message: "Expenses fetched successfully",
				data: expenses,
			});
		} catch (error) {
			next(error);
		}
	}

	async countAll(req: Request, res: Response, next: NextFunction) {
		try {
			const total = await expensesService.countAll(req.query);

			return res.status(200).json({
				success: true,
				message: "Expenses counted successfully",
				data: {
					total,
				},
			});
		} catch (error) {
			next(error);
		}
	}

	async findById(req: Request, res: Response, next: NextFunction) {
		try {
			const expense = await expensesService.getExpenseById(
				String(req.params.id)
			);

			return res.status(200).json({
				success: true,
				message: "Expense fetched successfully",
				data: expense,
			});
		} catch (error) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const expense = await expensesService.updateExpense(
				String(req.params.id),
				req.body
			);

			return res.status(200).json({
				success: true,
				message: "Expense updated successfully",
				data: expense,
			});
		} catch (error) {
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			await expensesService.deleteExpense(String(req.params.id));

			return res.status(200).json({
				success: true,
				message: "Expense deleted successfully",
			});
		} catch (error) {
			next(error);
		}
	}
}

export default new ExpensesController();