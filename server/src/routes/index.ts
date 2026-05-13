import { Router } from "express";
import usersRoute from "../modules/users/users.route";
import tripsRoute from "../modules/trips/trips.route";
import placesRoute from "../modules/places/places.route";
import itineraryItemsRoute from "../modules/itinerary_items/itinerary_items.route";
import notesRoute from "../modules/notes/notes.route";
import expensesRoute from "../modules/expenses/expenses.route";
import userBansRoute from "../modules/user_bans/user_bans.route";
import userReportsRoute from "../modules/user_reports/user_reports.route";
import systemSettingRoute from "../modules/system_setting/system_setting.route";
import systemLogRoute from "../modules/system_log/system_log.route";
import authRoute from "../modules/auth/auth.route";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    message: "API is ready",
  });
});

const moduleRoutes = [
  { paths: ["/users"], route: usersRoute },
  { paths: ["/trips"], route: tripsRoute },
  { paths: ["/places"], route: placesRoute },
  { paths: ["/itinerary_items"], route: itineraryItemsRoute },
  { paths: ["/notes"], route: notesRoute },
  { paths: ["/expenses"], route: expensesRoute },
  { paths: ["/user_bans"], route: userBansRoute },
  { paths: ["/user_report", "/user_reports"], route: userReportsRoute },
  { paths: ["/system_setting", "/system_settings"], route: systemSettingRoute },
  { paths: ["/setting_log", "/system_log"], route: systemLogRoute },
  { paths: ["/auth"], route: authRoute },
];

for (const { paths, route } of moduleRoutes) {
  for (const path of paths) {
    router.use(path, route);
  }
}

export default router;
