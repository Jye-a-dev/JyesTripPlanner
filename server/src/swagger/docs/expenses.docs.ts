// src/swagger/docs/expenses.docs.ts

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Expense management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Expense:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         trip_id:
 *           type: string
 *           format: uuid
 *         itinerary_item_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         category:
 *           type: string
 *           enum: [food, transport, hotel, ticket, shopping, entertainment, other]
 *         title:
 *           type: string
 *           example: Ăn tối
 *         amount:
 *           type: number
 *           example: 250000
 *         currency:
 *           type: string
 *           example: VND
 *         expense_date:
 *           type: string
 *           format: date
 *           nullable: true
 *           example: 2025-06-01
 *         note:
 *           type: string
 *           nullable: true
 *           example: Ăn tối tại nhà hàng hải sản
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     CreateExpenseRequest:
 *       type: object
 *       required:
 *         - trip_id
 *         - title
 *         - amount
 *       properties:
 *         trip_id:
 *           type: string
 *           format: uuid
 *           example: 550e8400-e29b-41d4-a716-446655440000
 *         itinerary_item_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           example: 550e8400-e29b-41d4-a716-446655440001
 *         category:
 *           type: string
 *           enum: [food, transport, hotel, ticket, shopping, entertainment, other]
 *           example: food
 *         title:
 *           type: string
 *           example: Ăn tối
 *         amount:
 *           type: number
 *           example: 250000
 *         currency:
 *           type: string
 *           example: VND
 *         expense_date:
 *           type: string
 *           format: date
 *           example: 2025-06-01
 *         note:
 *           type: string
 *           example: Ăn tối tại nhà hàng hải sản
 *
 *     UpdateExpenseRequest:
 *       type: object
 *       properties:
 *         itinerary_item_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         category:
 *           type: string
 *           enum: [food, transport, hotel, ticket, shopping, entertainment, other]
 *         title:
 *           type: string
 *           example: Ăn trưa
 *         amount:
 *           type: number
 *           example: 180000
 *         currency:
 *           type: string
 *           example: VND
 *         expense_date:
 *           type: string
 *           format: date
 *           nullable: true
 *         note:
 *           type: string
 *           nullable: true
 */

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Create expense
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateExpenseRequest'
 *           example:
 *             trip_id: 550e8400-e29b-41d4-a716-446655440000
 *             itinerary_item_id: 550e8400-e29b-41d4-a716-446655440001
 *             category: food
 *             title: Ăn tối
 *             amount: 250000
 *             currency: VND
 *             expense_date: 2025-06-01
 *             note: Ăn tối tại nhà hàng hải sản
 *     responses:
 *       201:
 *         description: Expense created successfully
 *
 *   get:
 *     summary: Get all expenses
 *     tags: [Expenses]
 *     parameters:
 *       - in: query
 *         name: page
 *         example: 1
 *       - in: query
 *         name: limit
 *         example: 10
 *       - in: query
 *         name: search
 *         example: Ăn tối
 *       - in: query
 *         name: trip_id
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *       - in: query
 *         name: itinerary_item_id
 *         example: 550e8400-e29b-41d4-a716-446655440001
 *       - in: query
 *         name: category
 *         example: food
 *       - in: query
 *         name: currency
 *         example: VND
 *       - in: query
 *         name: expense_date_from
 *         example: 2025-01-01
 *       - in: query
 *         name: expense_date_to
 *         example: 2025-12-31
 *       - in: query
 *         name: min_amount
 *         example: 100000
 *       - in: query
 *         name: max_amount
 *         example: 500000
 *       - in: query
 *         name: sort_by
 *         example: created_at
 *       - in: query
 *         name: sort_order
 *         example: DESC
 *     responses:
 *       200:
 *         description: Expenses fetched successfully
 */

/**
 * @swagger
 * /expenses/count:
 *   get:
 *     summary: Count expenses
 *     tags: [Expenses]
 *     responses:
 *       200:
 *         description: Expenses counted successfully
 */

/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Get expense by id
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       200:
 *         description: Expense fetched successfully
 *
 *   patch:
 *     summary: Update expense
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateExpenseRequest'
 *           example:
 *             title: Ăn trưa
 *             amount: 180000
 *             category: food
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *
 *   delete:
 *     summary: Delete expense
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 */