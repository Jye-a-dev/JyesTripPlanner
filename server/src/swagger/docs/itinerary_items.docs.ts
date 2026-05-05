/**
 * @swagger
 * tags:
 *   name: ItineraryItems
 *   description: Itinerary item management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ItineraryItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         trip_id:
 *           type: string
 *           format: uuid
 *         place_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         day_number:
 *           type: integer
 *           example: 1
 *         visit_date:
 *           type: string
 *           format: date
 *           example: "2026-05-20"
 *         start_time:
 *           type: string
 *           example: "08:00:00"
 *         end_time:
 *           type: string
 *           example: "10:00:00"
 *         title:
 *           type: string
 *           example: Tham quan Hồ Gươm
 *         activity:
 *           type: string
 *           example: Đi bộ, chụp ảnh
 *         transport_method:
 *           type: string
 *           example: Taxi
 *         estimated_cost:
 *           type: number
 *           example: 100000
 *         order_index:
 *           type: integer
 *           example: 0
 *         status:
 *           type: string
 *           enum: [planned, done, skipped, cancelled]
 *           example: planned
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /itinerary_items:
 *   post:
 *     summary: Create itinerary item
 *     tags: [ItineraryItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItineraryItem'
 *           example:
 *             trip_id: "550e8400-e29b-41d4-a716-446655440000"
 *             place_id: "550e8400-e29b-41d4-a716-446655440001"
 *             day_number: 1
 *             visit_date: "2026-05-20"
 *             start_time: "08:00:00"
 *             end_time: "10:00:00"
 *             title: Tham quan Hồ Gươm
 *             activity: Đi bộ, chụp ảnh
 *             transport_method: Taxi
 *             estimated_cost: 100000
 *             order_index: 0
 *             status: planned
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Itinerary item created successfully"
 *               data:
 *                 id: "550e8400-e29b-41d4-a716-446655440999"
 *                 trip_id: "550e8400-e29b-41d4-a716-446655440000"
 *                 place_id: "550e8400-e29b-41d4-a716-446655440001"
 *                 day_number: 1
 *                 visit_date: "2026-05-20"
 *                 start_time: "08:00:00"
 *                 end_time: "10:00:00"
 *                 title: Tham quan Hồ Gươm
 *                 activity: Đi bộ, chụp ảnh
 *                 transport_method: Taxi
 *                 estimated_cost: 100000
 *                 order_index: 0
 *                 status: planned
 */

/**
 * @swagger
 * /itinerary_items:
 *   get:
 *     summary: Get all itinerary items
 *     tags: [ItineraryItems]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Itinerary items fetched successfully"
 *               data: []
 */

/**
 * @swagger
 * /itinerary_items/count:
 *   get:
 *     summary: Count itinerary items
 *     tags: [ItineraryItems]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Itinerary items counted successfully"
 *               data:
 *                 total: 5
 */

/**
 * @swagger
 * /itinerary_items/{id}:
 *   get:
 *     summary: Get itinerary item by id
 *     tags: [ItineraryItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Itinerary item fetched successfully"
 *               data:
 *                 id: "550e8400-e29b-41d4-a716-446655440999"
 *                 trip_id: "550e8400-e29b-41d4-a716-446655440000"
 *                 day_number: 1
 *                 title: Tham quan Hồ Gươm
 *
 *   patch:
 *     summary: Update itinerary item
 *     tags: [ItineraryItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: Tham quan Hồ Gươm Updated
 *             status: done
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Itinerary item updated successfully"
 *               data:
 *                 id: "550e8400-e29b-41d4-a716-446655440999"
 *                 title: Tham quan Hồ Gươm Updated
 *                 status: done
 *
 *   delete:
 *     summary: Delete itinerary item
 *     tags: [ItineraryItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Itinerary item deleted successfully"
 */