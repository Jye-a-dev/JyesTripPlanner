import { Router } from "express";
import itineraryItemsController from "./itinerary_items.controller";
import validateMiddleware from "../../middlewares/validate.middleware";

import {
  createItinerarySchema,
  updateItinerarySchema,
  itineraryIdSchema,
  itineraryQuerySchema,
} from "./itinerary_items.validator";

const router = Router();

router.post(
  "/",
  validateMiddleware(createItinerarySchema),
  itineraryItemsController.create
);

router.get(
  "/",
  validateMiddleware(itineraryQuerySchema),
  itineraryItemsController.findAll
);

router.get(
  "/count",
  validateMiddleware(itineraryQuerySchema),
  itineraryItemsController.countAll
);

router.get(
  "/:id",
  validateMiddleware(itineraryIdSchema),
  itineraryItemsController.findById
);

router.patch(
  "/:id",
  validateMiddleware(updateItinerarySchema),
  itineraryItemsController.update
);

router.delete(
  "/:id",
  validateMiddleware(itineraryIdSchema),
  itineraryItemsController.delete
);

export default router;