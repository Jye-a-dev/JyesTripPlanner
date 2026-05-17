import {
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
import AdminModuleCrudSection from "../ui/AdminModuleCrudSection";

export default function AllModulesCrudPage() {
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

  return (
    <section className="grid gap-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h1 className="text-2xl font-bold text-slate-900">CRUD toàn bộ dữ liệu modules</h1>
        <p className="text-slate-600">
          Quản lý đầy đủ tạo, xem, sửa, xóa cho tất cả modules trong hệ thống.
        </p>
      </div>

      <AdminModuleCrudSection
        title="Quản lý dữ liệu tổng hợp"
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
    </section>
  );
}


