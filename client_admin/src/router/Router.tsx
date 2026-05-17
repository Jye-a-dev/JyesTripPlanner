import PublicLayout from "../components/layouts/(public)/PublicLayout";

import Home from "../app/(public)/Home/Home";
import LoginPage from "../app/(public)/Auth/LoginPage";
import ProtectedRoute from "../components/pages/ProtectedRoute";
import { AdminDashboardLayout } from "../components/pages/Admin/ui";
import {
  AdminHomePage,
  ModerationCrudPage,
  ModerationRecordDetailPage,
  ModerationRecordEditPage,
  SystemCrudPage,
  SystemRecordDetailPage,
  SystemRecordEditPage,
  TripSuiteCrudPage,
  TripSuiteRecordDetailPage,
  TripSuiteRecordEditPage,
  UserCreatePage,
  UserDetailPage,
  UserEditPage,
  UsersListPage,
} from "../app/(user)/Dashboard/admin/pages";

const routes = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminDashboardLayout />,
        children: [
          { index: true, element: <AdminHomePage /> },
          { path: "users", element: <UsersListPage /> },
          { path: "users/create", element: <UserCreatePage /> },
          { path: "users/:id", element: <UserDetailPage /> },
          { path: "users/:id/edit", element: <UserEditPage /> },
          { path: "trip-suite", element: <TripSuiteCrudPage /> },
          { path: "trip-suite/:module/:id", element: <TripSuiteRecordDetailPage /> },
          { path: "trip-suite/:module/:id/edit", element: <TripSuiteRecordEditPage /> },
          { path: "moderation", element: <ModerationCrudPage /> },
          { path: "moderation/:module/:id", element: <ModerationRecordDetailPage /> },
          { path: "moderation/:module/:id/edit", element: <ModerationRecordEditPage /> },
          { path: "system", element: <SystemCrudPage /> },
          { path: "system/:module/:id", element: <SystemRecordDetailPage /> },
          { path: "system/:module/:id/edit", element: <SystemRecordEditPage /> },
        ],
      },
    ],
  },
];

export default routes;
