import type { FormEvent } from "react";
import type { TripFormState, TripItem, TripStatus } from "./types";

type TripCrudSectionProps = {
  trips: TripItem[];
  editingTrip: TripItem | null;
  form: TripFormState;
  onFormChange: (patch: Partial<TripFormState>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onEdit: (trip: TripItem) => void;
  onDelete: (id: string) => void;
};

export default function TripCrudSection({
  trips,
  editingTrip,
  form,
  onFormChange,
  onSubmit,
  onEdit,
  onDelete,
}: TripCrudSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
      <h2 className="text-2xl font-bold text-slate-900">Quản lý hành trình</h2>
      <form onSubmit={onSubmit} className="mt-4 grid gap-3 md:max-w-xl">
        <input
          placeholder="Mã người dùng"
          value={form.user_id}
          onChange={(event) => onFormChange({ user_id: event.target.value })}
          required={!editingTrip}
          disabled={Boolean(editingTrip)}
          className="rounded-xl border border-slate-300 px-4 py-3"
        />
        <input
          placeholder="Tiêu đề hành trình"
          value={form.title}
          onChange={(event) => onFormChange({ title: event.target.value })}
          required
          className="rounded-xl border border-slate-300 px-4 py-3"
        />
        <input
          placeholder="Điểm đến"
          value={form.destination}
          onChange={(event) => onFormChange({ destination: event.target.value })}
          required
          className="rounded-xl border border-slate-300 px-4 py-3"
        />
        {!editingTrip ? (
          <>
            <input
              type="date"
              value={form.start_date}
              onChange={(event) => onFormChange({ start_date: event.target.value })}
              required
              className="rounded-xl border border-slate-300 px-4 py-3"
            />
            <input
              type="date"
              value={form.end_date}
              onChange={(event) => onFormChange({ end_date: event.target.value })}
              required
              className="rounded-xl border border-slate-300 px-4 py-3"
            />
          </>
        ) : null}
        <select
          value={form.status}
          onChange={(event) => onFormChange({ status: event.target.value as TripStatus })}
          className="rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="draft">Bản nháp</option>
          <option value="planning">Lập kế hoạch</option>
          <option value="active">Đang diễn ra</option>
          <option value="completed">Hoàn tất</option>
          <option value="cancelled">Đã hủy</option>
        </select>
        <button type="submit" className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white">
          {editingTrip ? "Cập nhật hành trình" : "Tạo hành trình"}
        </button>
      </form>

      <ul className="mt-5 grid gap-3">
        {trips.map((trip) => (
          <li key={trip.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3">
            <p className="text-slate-700">
              {trip.title} - {trip.destination} - {trip.status}
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={() => onEdit(trip)} className="rounded-lg border border-slate-300 px-3 py-1">
                Sửa
              </button>
              <button type="button" onClick={() => onDelete(trip.id)} className="rounded-lg border border-rose-300 px-3 py-1 text-rose-700">
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
