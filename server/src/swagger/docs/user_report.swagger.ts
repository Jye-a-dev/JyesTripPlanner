/**
 * @swagger
 * tags:
 *   - name: User Reports
 *     description: Quản lý báo cáo của user
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserReport:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         user_id: { type: string, format: uuid }
 *         trip_id: { type: string, format: uuid, nullable: true }
 *         title: { type: string }
 *         content: { type: string }
 *         status:
 *           type: string
 *           enum: [pending, reviewing, resolved, rejected]
 *         handled_by: { type: string, format: uuid, nullable: true }
 *         handled_note: { type: string, nullable: true }
 *         handled_at: { type: string, format: date-time, nullable: true }
 *         created_at: { type: string, format: date-time }
 *         updated_at: { type: string, format: date-time }
 *
 *     CreateUserReport:
 *       type: object
 *       required: [user_id, title, content]
 *       properties:
 *         user_id: { type: string, format: uuid }
 *         trip_id: { type: string, format: uuid, nullable: true }
 *         title:
 *           type: string
 *           example: Lỗi lịch trình
 *         content:
 *           type: string
 *           example: Trip không hiển thị đúng ngày
 *         status:
 *           type: string
 *           enum: [pending, reviewing, resolved, rejected]
 *
 *     UpdateUserReport:
 *       type: object
 *       properties:
 *         title: { type: string }
 *         content: { type: string }
 *         status:
 *           type: string
 *           enum: [pending, reviewing, resolved, rejected]
 *         handled_by: { type: string, format: uuid, nullable: true }
 *         handled_note: { type: string, nullable: true }
 *         handled_at: { type: string, format: date-time, nullable: true }
 */

/**
 * @swagger
 * /user_report:
 *   post:
 *     summary: Tạo user report
 *     tags: [User Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserReport'
 *     responses:
 *       201:
 *         description: User report created successfully
 *   get:
 *     summary: Lấy danh sách user reports
 *     tags: [User Reports]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 100 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: user_id
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: trip_id
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, reviewing, resolved, rejected]
 *       - in: query
 *         name: handled_by
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: sort_by
 *         schema: { type: string }
 *       - in: query
 *         name: sort_order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *     responses:
 *       200:
 *         description: User reports fetched successfully
 *
 * /user_report/count:
 *   get:
 *     summary: Đếm user reports
 *     tags: [User Reports]
 *     responses:
 *       200:
 *         description: User reports counted successfully
 *
 * /user_report/{id}:
 *   get:
 *     summary: Lấy user report theo id
 *     tags: [User Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: User report fetched successfully
 *   patch:
 *     summary: Cập nhật user report
 *     tags: [User Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserReport'
 *     responses:
 *       200:
 *         description: User report updated successfully
 *   delete:
 *     summary: Xóa user report
 *     tags: [User Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: User report deleted successfully
 */