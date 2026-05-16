import PublicLayout from "../components/layouts/(public)/PublicLayout";

import Home from "../app/(public)/Home/Home";
import LoginPage from "../app/(public)/Auth/LoginPage";
import AdminDashboardPage from "../app/(user)/Dashboard/AdminDashboardPage";
import ProtectedRoute from "../components/pages/ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <LoginPage /> },
    ],
  }
  ,
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [{ index: true, element: <AdminDashboardPage /> }],
  },
];

export default routes;
