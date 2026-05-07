import { Router } from "express";

import userReportsController from "./user_reports.controller";

import validateMiddleware from "../../middlewares/validate.middleware";

import { createUserReportSchema, updateUserReportSchema, userReportIdSchema, userReportQuerySchema } from "./user_reports.validator";

const router = Router();

router.post("/", validateMiddleware(createUserReportSchema), userReportsController.create);

router.get("/", validateMiddleware(userReportQuerySchema), userReportsController.findAll);

router.get("/count", validateMiddleware(userReportQuerySchema), userReportsController.countAll);

router.get("/:id", validateMiddleware(userReportIdSchema), userReportsController.findById);

router.patch("/:id", validateMiddleware(updateUserReportSchema), userReportsController.update);

router.delete("/:id", validateMiddleware(userReportIdSchema), userReportsController.delete);

export default router;
