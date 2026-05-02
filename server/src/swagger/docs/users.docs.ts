/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         full_name:
 *           type: string
 *           example: Nguyễn Văn A
 *         email:
 *           type: string
 *           example: user@gmail.com
 *         avatar_url:
 *           type: string
 *           example: https://example.com/avatar.jpg
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           example: user
 *         is_active:
 *           type: boolean
 *           example: true
 *         is_banned:
 *           type: boolean
 *           example: false
 *         last_login_at:
 *           type: string
 *           format: date-time
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
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - full_name
 *         - email
 *         - password
 *       properties:
 *         full_name:
 *           type: string
 *           example: admin
 *         email:
 *           type: string
 *           example: admin@gmail.com
 *         password:
 *           type: string
 *           example: "123456"
 *         avatar_url:
 *           type: string
 *           example: https://example.com/avatar.jpg
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           example: user
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         full_name:
 *           type: string
 *           example: Updated Name
 *         email:
 *           type: string
 *           example: updated@gmail.com
 *         password:
 *           type: string
 *           example: "newpassword123"
 *         avatar_url:
 *           type: string
 *           example: https://example.com/avatar.jpg
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           example: user
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserQuery:
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
 *           example: admin
 *         role:
 *           type: string
 *           enum: [admin, user]
 *         sort_by:
 *           type: string
 *           example: created_at
 *         sort_order:
 *           type: string
 *           enum: [ASC, DESC]
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *           example:
 *             full_name: admin
 *             email: admin@gmail.com
 *             password: "123456"
 *     responses:
 *       201:
 *         description: Created
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /users/count:
 *   get:
 *     summary: Count users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Get user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           example: user@gmail.com
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: User not found
 */
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [Users]
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
 *     summary: Update user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *           example:
 *             full_name: Updated Name
 *             password: "newpassword123"
 *     responses:
 *       200:
 *         description: Updated
 *
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted
 */