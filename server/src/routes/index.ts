import { Router } from "express";
import usersRoute from "../modules/users/users.route";
import tripsRoute from "../modules/trips/trips.route";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    message: "API is ready",
  });
});

router.use("/users", usersRoute)
router.use("/trips", tripsRoute)


export default router;
