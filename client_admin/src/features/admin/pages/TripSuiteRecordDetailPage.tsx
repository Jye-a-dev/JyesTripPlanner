import { useMemo } from "react";
import {
  useExpensesApi,
  useItineraryItemsApi,
  useNotesApi,
  usePlacesApi,
  useTripsApi,
} from "../../../shared/hooks";
import AdminModuleRecordDetailPage from "./AdminModuleRecordDetailPage";

export default function TripSuiteRecordDetailPage() {
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

  return <AdminModuleRecordDetailPage sectionTitle="nhóm hành trình" basePath="/admin/trip-suite" modules={modules} />;
}




