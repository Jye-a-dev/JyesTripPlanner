import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "../../../shared/components/RichTextEditor";
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

const viLabels: Record<string, string> = {
  id: "Mã",
  user_id: "Mã người dùng",
  reporter_user_id: "Mã người báo cáo",
  target_user_id: "Mã người bị báo cáo",
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

function toViLabel(key: string) {
  return viLabels[key] ?? key.replaceAll("_", " ");
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
  const [values, setValues] = useState<Record<string, string>>({});
  const [allKeys, setAllKeys] = useState<string[]>([]);
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
          const listRes = await selectedModule.api.findAll({ page: 1, limit: 200, search: id });
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
            {isRichTextField(key) ? (
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
