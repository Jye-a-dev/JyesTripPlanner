/**
 * @swagger
 * tags:
 *   - name: User Bans
 *     description: Quản lý khóa user
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserBan:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         user_id: { type: string, format: uuid }
 *         admin_id: { type: string, format: uuid, nullable: true }
 *         reason: { type: string }
 *         banned_at: { type: string, format: date-time }
 *         expired_at: { type: string, format: date-time, nullable: true }
 *         is_active: { type: boolean }
 *
 *     CreateUserBan:
 *       type: object
 *       required: [user_id, reason]
 *       properties:
 *         user_id: { type: string, format: uuid }
 *         admin_id: { type: string, format: uuid, nullable: true }
 *         reason:
 *           type: string
 *           example: Spam nội dung
 *         expired_at: { type: string, format: date-time, nullable: true }
 *         is_active:
 *           type: boolean
 *           example: true
 *
 *     UpdateUserBan:
 *       type: object
 *       properties:
 *         admin_id: { type: string, format: uuid, nullable: true }
 *         reason: { type: string }
 *         expired_at: { type: string, format: date-time, nullable: true }
 *         is_active: { type: boolean }
 */

/**
 * @swagger
 * /user_bans:
 *   post:
 *     summary: Tạo user ban
 *     tags: [User Bans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserBan'
 *     responses:
 *       201:
 *         description: User ban created successfully
 *   get:
 *     summary: Lấy danh sách user bans
 *     tags: [User Bans]
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
 *         name: admin_id
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: is_active
 *         schema: { type: boolean }
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
 *         description: User bans fetched successfully
 *
 * /user_bans/count:
 *   get:
 *     summary: Đếm user bans
 *     tags: [User Bans]
 *     responses:
 *       200:
 *         description: User bans counted successfully
 *
 * /user_bans/{id}:
 *   get:
 *     summary: Lấy user ban theo id
 *     tags: [User Bans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: User ban fetched successfully
 *   patch:
 *     summary: Cập nhật user ban
 *     tags: [User Bans]
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
 *             $ref: '#/components/schemas/UpdateUserBan'
 *     responses:
 *       200:
 *         description: User ban updated successfully
 *   delete:
 *     summary: Xóa user ban
 *     tags: [User Bans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: User ban deleted successfully
 */