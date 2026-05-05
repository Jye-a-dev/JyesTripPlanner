import { Router } from "express";
import placesController from "./places.controller";
import validateMiddleware from "../../middlewares/validate.middleware";

import {
  createPlaceSchema,
  updatePlaceSchema,
  placeIdSchema,
  placeQuerySchema,
} from "./places.validator";

const router = Router();

router.post(
  "/",
  validateMiddleware(createPlaceSchema),
  placesController.create
);

router.get(
  "/",
  validateMiddleware(placeQuerySchema),
  placesController.findAll
);

router.get(
  "/count",
  validateMiddleware(placeQuerySchema),
  placesController.countAll
);

router.get(
  "/:id",
  validateMiddleware(placeIdSchema),
  placesController.findById
);

router.patch(
  "/:id",
  validateMiddleware(updatePlaceSchema),
  placesController.update
);

router.delete(
  "/:id",
  validateMiddleware(placeIdSchema),
  placesController.delete
);

export default router;