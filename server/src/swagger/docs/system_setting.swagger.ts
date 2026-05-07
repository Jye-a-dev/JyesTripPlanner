/**
 * @swagger
 * tags:
 *   - name: System Settings
 *     description: Quản lý cấu hình hệ thống
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SystemSetting:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         setting_key: { type: string }
 *         setting_value: { type: string }
 *         description: { type: string, nullable: true }
 *         updated_by: { type: string, format: uuid, nullable: true }
 *         created_at: { type: string, format: date-time }
 *         updated_at: { type: string, format: date-time }
 *
 *     CreateSystemSetting:
 *       type: object
 *       required: [setting_key, setting_value]
 *       properties:
 *         setting_key:
 *           type: string
 *           example: maintenance_mode
 *         setting_value:
 *           type: string
 *           example: "false"
 *         description: { type: string, nullable: true }
 *         updated_by: { type: string, format: uuid, nullable: true }
 *
 *     UpdateSystemSetting:
 *       type: object
 *       properties:
 *         setting_key: { type: string }
 *         setting_value: { type: string }
 *         description: { type: string, nullable: true }
 *         updated_by: { type: string, format: uuid, nullable: true }
 */

/**
 * @swagger
 * /system_setting:
 *   post:
 *     summary: Tạo system setting
 *     tags: [System Settings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSystemSetting'
 *     responses:
 *       201:
 *         description: System setting created successfully
 *   get:
 *     summary: Lấy danh sách system settings
 *     tags: [System Settings]
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
 *         name: setting_key
 *         schema: { type: string }
 *       - in: query
 *         name: updated_by
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
 *         description: System settings fetched successfully
 *
 * /system_setting/count:
 *   get:
 *     summary: Đếm system settings
 *     tags: [System Settings]
 *     responses:
 *       200:
 *         description: System settings counted successfully
 *
 * /system_setting/key/{key}:
 *   get:
 *     summary: Lấy system setting theo key
 *     tags: [System Settings]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: System setting fetched successfully
 *
 * /system_setting/{id}:
 *   get:
 *     summary: Lấy system setting theo id
 *     tags: [System Settings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: System setting fetched successfully
 *   patch:
 *     summary: Cập nhật system setting
 *     tags: [System Settings]
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
 *             $ref: '#/components/schemas/UpdateSystemSetting'
 *     responses:
 *       200:
 *         description: System setting updated successfully
 *   delete:
 *     summary: Xóa system setting
 *     tags: [System Settings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: System setting deleted successfully
 */