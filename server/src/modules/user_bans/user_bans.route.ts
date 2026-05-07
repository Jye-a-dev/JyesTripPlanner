import { Router } from "express";

import userBansController from "./user_bans.controller";

import validateMiddleware from "../../middlewares/validate.middleware";

import { createUserBanSchema, updateUserBanSchema, userBanIdSchema, userBanQuerySchema } from "./user_bans.validator";

const router = Router();

router.post("/", validateMiddleware(createUserBanSchema), userBansController.create);

router.get("/", validateMiddleware(userBanQuerySchema), userBansController.findAll);

router.get("/count", validateMiddleware(userBanQuerySchema), userBansController.countAll);

router.get("/:id", validateMiddleware(userBanIdSchema), userBansController.findById);

router.patch("/:id", validateMiddleware(updateUserBanSchema), userBansController.update);

router.delete("/:id", validateMiddleware(userBanIdSchema), userBansController.delete);

export default router;
