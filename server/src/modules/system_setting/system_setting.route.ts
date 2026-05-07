import { Router } from "express";

import systemSettingsController from "./system_setting.controller";

import validateMiddleware from "../../middlewares/validate.middleware";

import { createSystemSettingSchema, updateSystemSettingSchema, systemSettingIdSchema, systemSettingQuerySchema } from "./system_setting.validator";

const router = Router();

router.post("/", validateMiddleware(createSystemSettingSchema), systemSettingsController.create);

router.get("/", validateMiddleware(systemSettingQuerySchema), systemSettingsController.findAll);

router.get("/count", validateMiddleware(systemSettingQuerySchema), systemSettingsController.countAll);

router.get("/key/:key", systemSettingsController.findByKey);

router.get("/:id", validateMiddleware(systemSettingIdSchema), systemSettingsController.findById);

router.patch("/:id", validateMiddleware(updateSystemSettingSchema), systemSettingsController.update);

router.delete("/:id", validateMiddleware(systemSettingIdSchema), systemSettingsController.delete);

export default router;
