import { Router } from "express";
import usersRoute from "../modules/users/users.route";
import tripsRoute from "../modules/trips/trips.route";
import placesRoute from "../modules/places/places.route";
import itinerary_itemsRoute from "../modules/itinerary_items/itinerary_items.route";


const router = Router();

router.get("/", (_req, res) => {
  res.json({
    message: "API is ready",
  });
});

router.use("/users", usersRoute)
router.use("/trips", tripsRoute)
router.use("/places", placesRoute)
router.use("/itinerary_items", itinerary_itemsRoute)

export default router;
