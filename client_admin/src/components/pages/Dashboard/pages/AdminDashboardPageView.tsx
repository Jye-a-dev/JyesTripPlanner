import { useNavigate } from "react-router-dom";
import {
  useAuthApi,
  useExpensesApi,
  useItineraryItemsApi,
  useNotesApi,
  usePlacesApi,
  useSystemLogsApi,
  useSystemSettingsApi,
  useTripsApi,
  useUserBansApi,
  useUserReportsApi,
  useUsersApi,
} from "../../../../hooks";
import { AdminModuleCrudSection } from "../../Admin/ui";
import DashboardHeader from "../ui/DashboardHeader";

export default function AdminDashboardPageView() {
  const usersApi = useUsersApi();
  const tripsApi = useTripsApi();
  const placesApi = usePlacesApi();
  const itineraryItemsApi = useItineraryItemsApi();
  const notesApi = useNotesApi();
  const expensesApi = useExpensesApi();
  const userBansApi = useUserBansApi();
  const userReportsApi = useUserReportsApi();
  const systemSettingsApi = useSystemSettingsApi();
  const systemLogsApi = useSystemLogsApi();
  const authApi = useAuthApi();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      localStorage.removeItem("admin_access_token");
      navigate("/login");
    }
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6">
      <DashboardHeader onLogout={logout} />

      <div className="mt-6 grid gap-6">
        <AdminModuleCrudSection
          title="CRUD toàn bộ module"
          showSectionHeader
          modules={[
            { key: "users", label: "Người dùng", api: usersApi },
            { key: "trips", label: "Hành trình", api: tripsApi },
            { key: "places", label: "Địa điểm", api: placesApi },
            { key: "itinerary_items", label: "Lịch trình chi tiết", api: itineraryItemsApi },
            { key: "notes", label: "Ghi chú", api: notesApi },
            { key: "expenses", label: "Chi phí", api: expensesApi },
            { key: "user_bans", label: "Cấm người dùng", api: userBansApi },
            { key: "user_reports", label: "Báo cáo người dùng", api: userReportsApi },
            { key: "system_settings", label: "Cấu hình hệ thống", api: systemSettingsApi },
            { key: "system_log", label: "Nhật ký hệ thống", api: systemLogsApi },
          ]}
        />
      </div>
    </main>
  );
}

