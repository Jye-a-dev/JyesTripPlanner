import { Router } from "express";

import systemLogsController from "./system_log.controller";

import validateMiddleware from "../../middlewares/validate.middleware";

import { createSystemLogSchema, systemLogIdSchema, systemLogQuerySchema } from "./system_log.validator";

const router = Router();

router.post("/", validateMiddleware(createSystemLogSchema), systemLogsController.create);

router.get("/", validateMiddleware(systemLogQuerySchema), systemLogsController.findAll);

router.get("/count", validateMiddleware(systemLogQuerySchema), systemLogsController.countAll);

router.get("/:id", validateMiddleware(systemLogIdSchema), systemLogsController.findById);

router.delete("/:id", validateMiddleware(systemLogIdSchema), systemLogsController.delete);

export default router;
