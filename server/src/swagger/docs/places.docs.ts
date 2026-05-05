/**
 * @swagger
 * tags:
 *   name: Places
 *   description: Place management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Place:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         trip_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: Hồ Gươm
 *         type:
 *           type: string
 *           enum: [attraction, restaurant, hotel, airport, station, shopping, nature, museum, entertainment, other]
 *           example: attraction
 *         address:
 *           type: string
 *           example: Hoàn Kiếm, Hà Nội
 *         city:
 *           type: string
 *           example: Hà Nội
 *         country:
 *           type: string
 *           example: Việt Nam
 *         latitude:
 *           type: number
 *           example: 21.0285
 *         longitude:
 *           type: number
 *           example: 105.8542
 *         opening_hours:
 *           type: string
 *           example: "08:00 - 22:00"
 *         ticket_price:
 *           type: number
 *           example: 0
 *         estimated_duration_minutes:
 *           type: integer
 *           example: 60
 *         priority:
 *           type: integer
 *           example: 3
 *         description:
 *           type: string
 *           example: Địa điểm du lịch nổi tiếng ở Hà Nội
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreatePlaceRequest:
 *       type: object
 *       required:
 *         - trip_id
 *         - name
 *       properties:
 *         trip_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: Hồ Gươm
 *         type:
 *           type: string
 *           enum: [attraction, restaurant, hotel, airport, station, shopping, nature, museum, entertainment, other]
 *           example: attraction
 *         address:
 *           type: string
 *           example: Hoàn Kiếm, Hà Nội
 *         city:
 *           type: string
 *           example: Hà Nội
 *         country:
 *           type: string
 *           example: Việt Nam
 *         latitude:
 *           type: number
 *           example: 21.0285
 *         longitude:
 *           type: number
 *           example: 105.8542
 *         opening_hours:
 *           type: string
 *           example: "08:00 - 22:00"
 *         ticket_price:
 *           type: number
 *           example: 0
 *         estimated_duration_minutes:
 *           type: integer
 *           example: 60
 *         priority:
 *           type: integer
 *           example: 3
 *         description:
 *           type: string
 *           example: Địa điểm du lịch nổi tiếng ở Hà Nội
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdatePlaceRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Hồ Gươm Updated
 *         type:
 *           type: string
 *           enum: [attraction, restaurant, hotel, airport, station, shopping, nature, museum, entertainment, other]
 *           example: attraction
 *         address:
 *           type: string
 *           example: Hoàn Kiếm, Hà Nội
 *         city:
 *           type: string
 *           example: Hà Nội
 *         country:
 *           type: string
 *           example: Việt Nam
 *         latitude:
 *           type: number
 *           example: 21.0285
 *         longitude:
 *           type: number
 *           example: 105.8542
 *         opening_hours:
 *           type: string
 *           example: "08:00 - 22:00"
 *         ticket_price:
 *           type: number
 *           example: 20000
 *         estimated_duration_minutes:
 *           type: integer
 *           example: 90
 *         priority:
 *           type: integer
 *           example: 2
 *         description:
 *           type: string
 *           example: Cập nhật mô tả địa điểm
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PlaceQuery:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 10
 *         search:
 *           type: string
 *           example: hồ
 *         trip_id:
 *           type: string
 *           format: uuid
 *         type:
 *           type: string
 *           enum: [attraction, restaurant, hotel, airport, station, shopping, nature, museum, entertainment, other]
 *         city:
 *           type: string
 *           example: Hà Nội
 *         country:
 *           type: string
 *           example: Việt Nam
 *         sort_by:
 *           type: string
 *           example: created_at
 *         sort_order:
 *           type: string
 *           enum: [ASC, DESC]
 */

/**
 * @swagger
 * /places:
 *   post:
 *     summary: Create place
 *     tags: [Places]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePlaceRequest'
 *           example:
 *             trip_id: "550e8400-e29b-41d4-a716-446655440000"
 *             name: Hồ Gươm
 *             type: attraction
 *             address: Hoàn Kiếm, Hà Nội
 *             city: Hà Nội
 *             country: Việt Nam
 *             latitude: 21.0285
 *             longitude: 105.8542
 *             opening_hours: "08:00 - 22:00"
 *             ticket_price: 0
 *             estimated_duration_minutes: 60
 *             priority: 3
 *             description: Địa điểm du lịch nổi tiếng ở Hà Nội
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /places:
 *   get:
 *     summary: Get all places
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /places/count:
 *   get:
 *     summary: Count places
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /places/{id}:
 *   get:
 *     summary: Get place by id
 *     tags: [Places]
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
 *
 *   patch:
 *     summary: Update place
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePlaceRequest'
 *           example:
 *             name: Hồ Gươm Updated
 *             priority: 2
 *             ticket_price: 20000
 *     responses:
 *       200:
 *         description: Updated
 *
 *   delete:
 *     summary: Delete place
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted
 */