// src/modules/expenses/expenses.route.ts

import { Router } from "express";
import expensesController from "./expenses.controller";

import validateMiddleware from "../../middlewares/validate.middleware";

import {
	createExpenseSchema,
	updateExpenseSchema,
	expenseIdSchema,
	expenseQuerySchema,
} from "./expenses.validator";

const router = Router();

router.post(
	"/",
	validateMiddleware(createExpenseSchema),
	expensesController.create
);

router.get(
	"/",
	validateMiddleware(expenseQuerySchema),
	expensesController.findAll
);

router.get(
	"/count",
	validateMiddleware(expenseQuerySchema),
	expensesController.countAll
);

router.get(
	"/:id",
	validateMiddleware(expenseIdSchema),
	expensesController.findById
);

router.patch(
	"/:id",
	validateMiddleware(updateExpenseSchema),
	expensesController.update
);

router.delete(
	"/:id",
	validateMiddleware(expenseIdSchema),
	expensesController.delete
);

export default router;