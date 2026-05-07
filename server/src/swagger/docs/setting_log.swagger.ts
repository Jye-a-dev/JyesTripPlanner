/**
 * @swagger
 * tags:
 *   - name: Setting Logs
 *     description: Quản lý log hệ thống
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SettingLog:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         user_id: { type: string, format: uuid, nullable: true }
 *         action:
 *           type: string
 *           enum: [create, update, delete, login, logout, ban, unban, other]
 *         target_table: { type: string, nullable: true }
 *         target_id: { type: string, format: uuid, nullable: true }
 *         description: { type: string, nullable: true }
 *         created_at: { type: string, format: date-time }
 *
 *     CreateSettingLog:
 *       type: object
 *       required: [action]
 *       properties:
 *         user_id: { type: string, format: uuid, nullable: true }
 *         action:
 *           type: string
 *           enum: [create, update, delete, login, logout, ban, unban, other]
 *         target_table:
 *           type: string
 *           example: system_settings
 *         target_id: { type: string, format: uuid, nullable: true }
 *         description:
 *           type: string
 *           example: Admin updated maintenance_mode
 */

/**
 * @swagger
 * /setting_log:
 *   post:
 *     summary: Tạo setting log
 *     tags: [Setting Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSettingLog'
 *     responses:
 *       201:
 *         description: System log created successfully
 *   get:
 *     summary: Lấy danh sách setting logs
 *     tags: [Setting Logs]
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
 *         name: action
 *         schema:
 *           type: string
 *           enum: [create, update, delete, login, logout, ban, unban, other]
 *       - in: query
 *         name: target_table
 *         schema: { type: string }
 *       - in: query
 *         name: target_id
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
 *         description: System logs fetched successfully
 *
 * /setting_log/count:
 *   get:
 *     summary: Đếm setting logs
 *     tags: [Setting Logs]
 *     responses:
 *       200:
 *         description: System logs counted successfully
 *
 * /setting_log/{id}:
 *   get:
 *     summary: Lấy setting log theo id
 *     tags: [Setting Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: System log fetched successfully
 *   delete:
 *     summary: Xóa setting log
 *     tags: [Setting Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: System log deleted successfully
 */