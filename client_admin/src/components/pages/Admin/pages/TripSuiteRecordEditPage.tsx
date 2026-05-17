import { useMemo } from "react";
import {
  useExpensesApi,
  useItineraryItemsApi,
  useNotesApi,
  usePlacesApi,
  useTripsApi,
} from "../../../../hooks";
import AdminModuleRecordEditPage from "./AdminModuleRecordEditPage";

export default function TripSuiteRecordEditPage() {
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

  return <AdminModuleRecordEditPage basePath="/admin/trip-suite" modules={modules} />;
}
