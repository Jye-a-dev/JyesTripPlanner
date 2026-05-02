// src/modules/trips/trips.route.ts

import { Router } from "express";
import tripsController from "./trips.controller";
import validateMiddleware from "../../middlewares/validate.middleware";
import { createTripSchema, updateTripSchema, tripIdSchema, tripQuerySchema } from "./trips.validator";

const router = Router();

router.post("/", validateMiddleware(createTripSchema), tripsController.create);

router.get("/", validateMiddleware(tripQuerySchema), tripsController.findAll);

router.get("/count", validateMiddleware(tripQuerySchema), tripsController.countAll);

router.get("/user/:user_id", tripsController.findByUserId);

router.get("/:id", validateMiddleware(tripIdSchema), tripsController.findById);

router.patch("/:id", validateMiddleware(updateTripSchema), tripsController.update);

router.delete("/:id", validateMiddleware(tripIdSchema), tripsController.delete);

export default router;
