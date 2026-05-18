import { useMemo } from "react";
import {
  useExpensesApi,
  useItineraryItemsApi,
  useNotesApi,
  usePlacesApi,
  useTripsApi,
} from "../../../shared/hooks";
import AdminModuleCrudSection from "../components/AdminModuleCrudSection";

export default function TripSuiteCrudPage() {
  const tripsApi = useTripsApi();
  const placesApi = usePlacesApi();
  const itineraryItemsApi = useItineraryItemsApi();
  const notesApi = useNotesApi();
  const expensesApi = useExpensesApi();

  const modules = useMemo(
    () => [
      { key: "trips", label: "Hành trình", api: tripsApi },
      { key: "places", label: "Địa điểm", api: placesApi },
      { key: "itinerary_items", label: "Lịch trình chi tiết", api: itineraryItemsApi },
      { key: "notes", label: "Ghi chú", api: notesApi },
      { key: "expenses", label: "Chi phí", api: expensesApi },
    ],
    [tripsApi, placesApi, itineraryItemsApi, notesApi, expensesApi],
  );

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Nhóm hành trình</h1>
          <p className="text-slate-600">Quản lý toàn bộ dữ liệu liên quan tới chuyến đi.</p>
        </div>
      </div>

      <AdminModuleCrudSection title="CRUD dữ liệu hành trình" basePath="/admin/trip-suite" modules={modules} />
    </section>
  );
}





