// src/swagger/docs/notes.docs.ts

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Note management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
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
 *         itinerary_item_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         title:
 *           type: string
 *           example: Ghi chú khách sạn
 *         content:
 *           type: string
 *           example: Cần check-in trước 14h
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     CreateNoteRequest:
 *       type: object
 *       required:
 *         - trip_id
 *         - title
 *         - content
 *       properties:
 *         trip_id:
 *           type: string
 *           format: uuid
 *           example: 550e8400-e29b-41d4-a716-446655440000
 *         place_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           example: 550e8400-e29b-41d4-a716-446655440001
 *         itinerary_item_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           example: 550e8400-e29b-41d4-a716-446655440002
 *         title:
 *           type: string
 *           example: Ghi chú khách sạn
 *         content:
 *           type: string
 *           example: Cần check-in trước 14h
 *
 *     UpdateNoteRequest:
 *       type: object
 *       properties:
 *         place_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         itinerary_item_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         title:
 *           type: string
 *           example: Ghi chú đã cập nhật
 *         content:
 *           type: string
 *           example: Đổi giờ check-in sang 15h
 */

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNoteRequest'
 *           example:
 *             trip_id: 550e8400-e29b-41d4-a716-446655440000
 *             place_id: 550e8400-e29b-41d4-a716-446655440001
 *             itinerary_item_id: 550e8400-e29b-41d4-a716-446655440002
 *             title: Ghi chú khách sạn
 *             content: Cần check-in trước 14h
 *     responses:
 *       201:
 *         description: Note created successfully
 *
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     parameters:
 *       - in: query
 *         name: page
 *         example: 1
 *       - in: query
 *         name: limit
 *         example: 10
 *       - in: query
 *         name: search
 *         example: khách sạn
 *       - in: query
 *         name: trip_id
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *       - in: query
 *         name: place_id
 *         example: 550e8400-e29b-41d4-a716-446655440001
 *       - in: query
 *         name: itinerary_item_id
 *         example: 550e8400-e29b-41d4-a716-446655440002
 *       - in: query
 *         name: sort_by
 *         example: created_at
 *       - in: query
 *         name: sort_order
 *         example: DESC
 *     responses:
 *       200:
 *         description: Notes fetched successfully
 */

/**
 * @swagger
 * /notes/count:
 *   get:
 *     summary: Count notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Notes counted successfully
 */

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get note by id
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       200:
 *         description: Note fetched successfully
 *
 *   patch:
 *     summary: Update note
 *     tags: [Notes]
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
 *             $ref: '#/components/schemas/UpdateNoteRequest'
 *           example:
 *             title: Ghi chú đã cập nhật
 *             content: Đổi giờ check-in sang 15h
 *     responses:
 *       200:
 *         description: Note updated successfully
 *
 *   delete:
 *     summary: Delete note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       200:
 *         description: Note deleted successfully
 */