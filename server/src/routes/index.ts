import { Router } from "express";
import usersRoute from "../modules/users/users.route";
import tripsRoute from "../modules/trips/trips.route";
import placesRoute from "../modules/places/places.route";
import itinerary_itemsRoute from "../modules/itinerary_items/itinerary_items.route";
import notesRoute from "../modules/notes/notes.route";
import expensesRoute from "../modules/expenses/expenses.route";
import userBansRoute from "../modules/user_bans/user_bans.route";
import userReportRoute from "../modules/user_reports/user_reports.route";
import systemSettingRoute from "../modules/system_setting/system_setting.route";
import settingLogRoute from "../modules/system_log/system_log.route";
import authRoute from "../modules/auth/auth.route";

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
router.use("/user_bans", userBansRoute)
router.use("/user_report", userReportRoute)
router.use("/system_setting", systemSettingRoute)
router.use("/setting_log", settingLogRoute)
router.use("/auth", authRoute)


export default router;
