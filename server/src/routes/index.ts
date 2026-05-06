import { Router } from "express";
import usersRoute from "../modules/users/users.route";
import tripsRoute from "../modules/trips/trips.route";
import placesRoute from "../modules/places/places.route";
import itinerary_itemsRoute from "../modules/itinerary_items/itinerary_items.route";
import notesRoute from "../modules/notes/notes.route";
import expensesRoute from "../modules/expenses/expenses.route";

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
router.use("/notes", notesRoute)
router.use("/expenses", expensesRoute)

export default router;
