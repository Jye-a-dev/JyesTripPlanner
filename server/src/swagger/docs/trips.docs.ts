// src/swagger/docs/trips.docs.ts

/**
 * @swagger
 * tags:
 *   name: Trips
 *   description: Trip management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Trip:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *           example: Trip Đà Nẵng
 *         destination:
 *           type: string
 *           example: Đà Nẵng
 *         start_date:
 *           type: string
 *           format: date
 *           example: 2025-06-01
 *         end_date:
 *           type: string
 *           format: date
 *           example: 2025-06-05
 *         total_budget:
 *           type: number
 *           example: 5000000
 *         currency:
 *           type: string
 *           example: VND
 *         status:
 *           type: string
 *           enum: [draft, planning, active, completed, cancelled]
 *         description:
 *           type: string
 *           example: Trip đi biển
 *         travel_style:
 *           type: string
 *           example: Relax
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     CreateTripRequest:
 *       type: object
 *       required:
 *         - user_id
 *         - title
 *         - destination
 *         - start_date
 *         - end_date
 *       properties:
 *         user_id:
 *           type: string
 *           format: uuid
 *           example: 550e8400-e29b-41d4-a716-446655440000
 *         title:
 *           type: string
 *           example: Trip Đà Nẵng
 *         destination:
 *           type: string
 *           example: Đà Nẵng
 *         start_date:
 *           type: string
 *           format: date
 *           example: 2025-06-01
 *         end_date:
 *           type: string
 *           format: date
 *           example: 2025-06-05
 *         total_budget:
 *           type: number
 *           example: 5000000
 *         currency:
 *           type: string
 *           example: VND
 *         status:
 *           type: string
 *           enum: [draft, planning, active, completed, cancelled]
 *         description:
 *           type: string
 *           example: Trip đi biển
 *         travel_style:
 *           type: string
 *           example: Relax
 *
 *     UpdateTripRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Trip updated
 *         destination:
 *           type: string
 *           example: Hội An
 *         start_date:
 *           type: string
 *           format: date
 *         end_date:
 *           type: string
 *           format: date
 *         total_budget:
 *           type: number
 *           example: 7000000
 *         currency:
 *           type: string
 *         status:
 *           type: string
 *           enum: [draft, planning, active, completed, cancelled]
 *         description:
 *           type: string
 *         travel_style:
 *           type: string
 */

/**
 * @swagger
 * /trips:
 *   post:
 *     summary: Create trip
 *     tags: [Trips]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTripRequest'
 *           example:
 *             user_id: 550e8400-e29b-41d4-a716-446655440000
 *             title: Trip Đà Nẵng
 *             destination: Đà Nẵng
 *             start_date: 2025-06-01
 *             end_date: 2025-06-05
 *             total_budget: 5000000
 *             currency: VND
 *             status: draft
 *             description: Trip đi biển
 *             travel_style: Relax
 *     responses:
 *       201:
 *         description: Trip created successfully
 *
 *   get:
 *     summary: Get all trips
 *     tags: [Trips]
 *     parameters:
 *       - in: query
 *         name: page
 *         example: 1
 *       - in: query
 *         name: limit
 *         example: 10
 *       - in: query
 *         name: search
 *         example: Đà Nẵng
 *       - in: query
 *         name: status
 *         example: planning
 *       - in: query
 *         name: start_date_from
 *         example: 2025-01-01
 *       - in: query
 *         name: start_date_to
 *         example: 2025-12-31
 *       - in: query
 *         name: sort_by
 *         example: created_at
 *       - in: query
 *         name: sort_order
 *         example: DESC
 *     responses:
 *       200:
 *         description: Trips fetched successfully
 */

/**
 * @swagger
 * /trips/count:
 *   get:
 *     summary: Count trips
 *     tags: [Trips]
 *     responses:
 *       200:
 *         description: Trips counted successfully
 */

/**
 * @swagger
 * /trips/user/{user_id}:
 *   get:
 *     summary: Get trips by user id
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       200:
 *         description: User trips fetched successfully
 */

/**
 * @swagger
 * /trips/{id}:
 *   get:
 *     summary: Get trip by id
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       200:
 *         description: Trip fetched successfully
 *
 *   patch:
 *     summary: Update trip
 *     tags: [Trips]
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
 *             $ref: '#/components/schemas/UpdateTripRequest'
 *           example:
 *             title: Trip updated
 *             destination: Hội An
 *             total_budget: 7000000
 *     responses:
 *       200:
 *         description: Trip updated successfully
 *
 *   delete:
 *     summary: Delete trip
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       200:
 *         description: Trip deleted successfully
 */
