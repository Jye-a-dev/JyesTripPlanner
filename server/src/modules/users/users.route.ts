// src/modules/users/users.route.ts

import { Router } from "express";
import usersController from "./users.controller";
import validateMiddleware from "../../middlewares/validate.middleware";
import { createUserSchema, updateUserSchema, userIdSchema, userQuerySchema } from "./users.validators";

const router = Router();

router.post("/", validateMiddleware(createUserSchema), usersController.create);

router.get("/", validateMiddleware(userQuerySchema), usersController.findAll);

router.get("/count", validateMiddleware(userQuerySchema), usersController.countAll);

router.get("/email/:email", usersController.findByEmail);

router.get("/:id", validateMiddleware(userIdSchema), usersController.findById);

router.patch("/:id", validateMiddleware(updateUserSchema), usersController.update);

router.delete("/:id", validateMiddleware(userIdSchema), usersController.delete);

export default router;
