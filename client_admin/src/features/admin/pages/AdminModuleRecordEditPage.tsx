import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "../../../shared/components/RichTextEditor";
import { useTripsApi } from "../../../shared/hooks/useTripsApi";
import { useUsersApi } from "../../../shared/hooks/useUsersApi";
import { isRichTextField, toEditorValue } from "../../../shared/utils/richText";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type ApiModule = {
  findAll: (query?: QueryParams) => Promise<unknown>;
  findById?: (id: string) => Promise<unknown>;
  update?: (id: string, payload: unknown) => Promise<unknown>;
};

type ModuleItem = { key: string; label: string; api: ApiModule };

type ApiResponse<T = unknown> = {
  data?: T;
};

type SelectOption = {
  value: string;
  label: string;
};

const fkFields = new Set(["user_id", "reporter_user_id", "target_user_id", "trip_id"]);

const viLabels: Record<string, string> = {
  id: "Mã",
  user_id: "Tên người dùng",
  reporter_user_id: "Tên người báo cáo",
  target_user_id: "Tên người bị báo cáo",
  trip_id: "Mã hành trình",
  full_name: "Họ và tên",
  email: "Email",
  role: "Vai trò",
  is_active: "Trạng thái hoạt động",
  title: "Tiêu đề",
  destination: "Điểm đến",
  start_date: "Ngày bắt đầu",
  end_date: "Ngày kết thúc",
  total_budget: "Ngân sách",
  currency: "Tiền tệ",
  description: "Mô tả",
  name: "Tên",
  address: "Địa chỉ",
  note: "Ghi chú",
  content: "Nội dung",
  amount: "Số tiền",
  reason: "Lý do",
  setting_key: "Khóa cài đặt",
  setting_value: "Giá trị cài đặt",
  action: "Hành động",
  entity_type: "Loại dữ liệu",
  created_at: "Ngày tạo",
  updated_at: "Ngày cập nhật",
};

const enumOptions: Record<string, SelectOption[]> = {
  role: [
    { value: "user", label: "Người dùng" },
    { value: "admin", label: "Quản trị" },
  ],
  is_active: [
    { value: "true", label: "Hoạt động" },
    { value: "false", label: "Ngưng hoạt động" },
  ],
  is_banned: [
    { value: "false", label: "Không bị cấm" },
    { value: "true", label: "Bị cấm" },
  ],
  status: [
    { value: "draft", label: "Nháp" },
    { value: "planning", label: "Đang lên kế hoạch" },
    { value: "active", label: "Đang diễn ra" },
    { value: "completed", label: "Hoàn thành" },
    { value: "cancelled", label: "Đã hủy" },
  ],
  type: [
    { value: "restaurant", label: "Nhà hàng" },
    { value: "hotel", label: "Khách sạn" },
    { value: "attraction", label: "Điểm tham quan" },
    { value: "transport", label: "Di chuyển" },
    { value: "shopping", label: "Mua sắm" },
    { value: "other", label: "Khác" },
  ],
  currency: [
    { value: "VND", label: "VND" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "JPY", label: "JPY" },
  ],
};

function toViLabel(key: string) {
  return viLabels[key] ?? key.replaceAll("_", " ");
}

function isFkField(key: string) {
  return fkFields.has(key);
}

function castValue(input: string): string | number | boolean | null {
  const raw = input.trim();
  if (raw === "") return "";
  if (raw.toLowerCase() === "true") return true;
  if (raw.toLowerCase() === "false") return false;
  if (raw.toLowerCase() === "null") return null;
  if (!Number.isNaN(Number(raw))) return Number(raw);
  return input;
}

function extractDataArray(response: unknown): Record<string, unknown>[] {
  const data = (response as ApiResponse<Record<string, unknown>[]>).data;
  return Array.isArray(data) ? data : [];
}

function pickRowById(rows: Record<string, unknown>[], id: string) {
  const lowerId = id.toLowerCase();
  return rows.find((row) => {
    for (const [key, value] of Object.entries(row)) {
      if (!key.toLowerCase().includes("id")) continue;
      if (String(value ?? "").toLowerCase() === lowerId) return true;
    }
    return false;
  }) ?? null;
}

export default function AdminModuleRecordEditPage({
  basePath,
  modules,
}: {
  basePath: string;
  modules: ModuleItem[];
}) {
  const { module = "", id = "" } = useParams();
  const navigate = useNavigate();
  const usersApi = useUsersApi();
  const tripsApi = useTripsApi();
  const [values, setValues] = useState<Record<string, string>>({});
  const [allKeys, setAllKeys] = useState<string[]>([]);
  const [fkOptions, setFkOptions] = useState<Record<string, SelectOption[]>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const selectedModule = useMemo(() => modules.find((item) => item.key === module), [module, modules]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        if (!selectedModule) throw new Error("Module không hợp lệ");

        let record: Record<string, unknown> | null = null;
        if (selectedModule.api.findById) {
          const res = await selectedModule.api.findById(id);
          const data = (res as ApiResponse<Record<string, unknown>>).data;
          if (data && Object.keys(data).length > 0) record = data;
        }

        if (!record) {
          const listRes = await selectedModule.api.findAll({ page: 1, limit: 100, search: id });
          record = pickRowById(extractDataArray(listRes), id);
        }

        if (!record) throw new Error("Không tìm thấy bản ghi");

        const keys = Object.keys(record);
        const nextValues: Record<string, string> = {};
        for (const key of keys) {
          const value = record[key];
          nextValues[key] = value === undefined || value === null ? "" : String(value);
        }

        setAllKeys(keys);
        setValues(nextValues);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Tải dữ liệu thất bại");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [id, selectedModule]);

  useEffect(() => {
    const loadSelectOptions = async () => {
      const keySet = new Set(allKeys);
      const nextOptions: Record<string, SelectOption[]> = {};

      try {
        if (keySet.has("user_id") || keySet.has("reporter_user_id") || keySet.has("target_user_id")) {
          const users = extractDataArray(await usersApi.findAll({ page: 1, limit: 100 }));
          const userOptions = users.map((user) => ({
            value: String(user.id ?? ""),
            label: `${String(user.full_name ?? "Không tên")} (${String(user.email ?? "")})`,
          }));
          if (keySet.has("user_id")) nextOptions.user_id = userOptions;
          if (keySet.has("reporter_user_id")) nextOptions.reporter_user_id = userOptions;
          if (keySet.has("target_user_id")) nextOptions.target_user_id = userOptions;

          // Fallback: keep current value selectable even when list API returns empty.
          if (keySet.has("user_id") && values.user_id && !userOptions.some((option) => option.value === values.user_id)) {
            try {
              const userRes = await usersApi.findById?.(values.user_id);
              const user = (userRes as ApiResponse<Record<string, unknown>>)?.data;
              if (user) {
                nextOptions.user_id = [
                  {
                    value: String(user.id ?? values.user_id),
                    label: `${String(user.full_name ?? "Không tên")} (${String(user.email ?? "")})`,
                  },
                  ...(nextOptions.user_id ?? []),
                ];
              }
            } catch {
              nextOptions.user_id = [{ value: values.user_id, label: `User hiện tại (${values.user_id})` }, ...(nextOptions.user_id ?? [])];
            }
          }
        }

        if (keySet.has("trip_id")) {
          const trips = extractDataArray(await tripsApi.findAll({ page: 1, limit: 100 }));
          nextOptions.trip_id = trips.map((trip) => ({
            value: String(trip.id ?? ""),
            label: `${String(trip.title ?? "Không tiêu đề")} - ${String(trip.destination ?? "")}`,
          }));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Không tải được danh sách dropdown");
      }

      setFkOptions(nextOptions);
    };

    if (allKeys.length > 0) {
      void loadSelectOptions();
    }
  }, [allKeys, tripsApi, usersApi]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedModule?.api.update) {
      setError("Module không hỗ trợ cập nhật");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const payload: Record<string, unknown> = {};
      for (const key of allKeys) {
        const raw = values[key] ?? "";
        if (raw.trim() !== "") payload[key] = castValue(raw);
      }

      await selectedModule.api.update(id, payload);
      navigate(`${basePath}/${module}/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lưu thay đổi thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="rounded-xl border border-slate-200 bg-white p-4">Đang tải dữ liệu...</div>;

  return (
    <section className="grid gap-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5"><h1 className="text-2xl font-bold text-slate-900">Chỉnh sửa {selectedModule?.label ?? "bản ghi"}</h1></div>
      {error ? <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div> : null}
      <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5">
        {allKeys.map((key) => (
          <label key={key} className="grid gap-1 text-sm font-semibold text-slate-700">
            {toViLabel(key)}
            {enumOptions[key]?.length ? (
              <select
                value={values[key] ?? ""}
                onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="">Chọn {toViLabel(key).toLowerCase()}</option>
                {enumOptions[key].map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : isFkField(key) ? (
              <select
                value={values[key] ?? ""}
                onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="">{fkOptions[key]?.length ? `Chọn ${toViLabel(key).toLowerCase()}` : "Không có dữ liệu để chọn"}</option>
                {(fkOptions[key] ?? []).map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : isRichTextField(key) ? (
              <RichTextEditor
                value={toEditorValue(values[key] ?? "", key)}
                placeholder={`Nhập ${toViLabel(key).toLowerCase()}`}
                onChange={(nextValue) => setValues((prev) => ({ ...prev, [key]: nextValue }))}
              />
            ) : (
              <input value={values[key] ?? ""} onChange={(e) => setValues((prev) => ({ ...prev, [key]: e.target.value }))} className="rounded-lg border border-slate-300 px-3 py-2" />
            )}
          </label>
        ))}
        <div className="flex justify-end gap-2">
          <button type="button" onClick={() => navigate(`${basePath}/${module}/${id}`)} className="rounded-lg border border-slate-300 px-4 py-2">Hủy</button>
          <button disabled={submitting} className="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white">{submitting ? "Đang lưu..." : "Lưu thay đổi"}</button>
        </div>
      </form>
    </section>
  );
}
