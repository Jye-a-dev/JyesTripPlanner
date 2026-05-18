/* eslint-disable react-refresh/only-export-components */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "../../../shared/components/RichTextEditor";
import { isRichTextField, looksLikeHtml, toEditorValue, toPlainText } from "../../../shared/utils/richText";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type ApiModule = {
  create?: (payload: unknown) => Promise<unknown>;
  findAll: (query?: QueryParams) => Promise<unknown>;
  countAll?: (query?: QueryParams) => Promise<unknown>;
  findById?: (id: string) => Promise<unknown>;
  update?: (id: string, payload: unknown) => Promise<unknown>;
  delete?: (id: string) => Promise<unknown>;
};

type ModuleItem = { key: string; label: string; api: ApiModule };

type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "date" | "number";
  options?: Array<{ value: string; label: string }>;
};

type AdminModuleCrudSectionProps = {
  title: string;
  modules: ModuleItem[];
  showSectionHeader?: boolean;
  showCrudForms?: boolean;
  basePath?: string;
};

type ApiResponse<T = unknown> = {
  data?: T;
  message?: string;
};

type SelectOption = {
  value: string;
  label: string;
};

type CrudPanel = "create" | "detail" | "update" | "delete" | null;

export const moduleFields: Record<string, FieldDef[]> = {
  users: [
    { name: "full_name", label: "Họ và tên" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Mật khẩu" },
    { name: "role", label: "Vai trò", options: [{ value: "user", label: "Người dùng" }, { value: "admin", label: "Quản trị" }] },
  ],
  trips: [
    { name: "user_id", label: "Mã người dùng" },
    { name: "title", label: "Tên hành trình" },
    { name: "destination", label: "Điểm đến" },
    { name: "start_date", label: "Ngày bắt đầu", type: "date" },
    { name: "end_date", label: "Ngày kết thúc", type: "date" },
    { name: "total_budget", label: "Ngân sách", type: "number" },
    { name: "currency", label: "Tiền tệ" },
    { name: "description", label: "Mô tả" },
  ],
  places: [{ name: "trip_id", label: "Mã hành trình" }, { name: "name", label: "Tên địa điểm" }, { name: "address", label: "Địa chỉ" }],
  itinerary_items: [{ name: "trip_id", label: "Mã hành trình" }, { name: "title", label: "Tên hoạt động" }, { name: "note", label: "Ghi chú" }],
  notes: [{ name: "trip_id", label: "Mã hành trình" }, { name: "title", label: "Tiêu đề" }, { name: "content", label: "Nội dung" }],
  expenses: [{ name: "trip_id", label: "Mã hành trình" }, { name: "title", label: "Tên khoản chi" }, { name: "amount", label: "Số tiền", type: "number" }],
  user_bans: [{ name: "user_id", label: "Mã người dùng" }, { name: "reason", label: "Lý do" }],
  user_reports: [{ name: "reporter_user_id", label: "Mã người báo" }, { name: "target_user_id", label: "Mã người bị báo" }, { name: "reason", label: "Lý do" }],
  system_settings: [{ name: "setting_key", label: "Tên cài đặt" }, { name: "setting_value", label: "Giá trị" }],
  system_log: [{ name: "action", label: "Hành động" }, { name: "entity_type", label: "Loại dữ liệu" }],
};

function getErrorMessage(err: unknown) {
  return err instanceof Error ? err.message : "Có lỗi xảy ra";
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
  const data = (response as ApiResponse<Record<string, unknown>[]>)?.data;
  return Array.isArray(data) ? data : [];
}

function extractTotal(response: unknown): number {
  const total = (response as ApiResponse<{ total?: number }>)?.data?.total;
  return typeof total === "number" ? total : 0;
}

function DataForm({ fields, values, fkOptions, onChange }: { fields: FieldDef[]; values: Record<string, string>; fkOptions: Record<string, SelectOption[]>; onChange: (name: string, value: string) => void; }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {fields.map((field) => (
        <label key={field.name} className="grid gap-1 text-sm font-semibold text-slate-700">
          {field.label}
          {field.options?.length ? (
            <select value={values[field.name] ?? ""} onChange={(event) => onChange(field.name, event.target.value)} className="rounded-xl border border-slate-300 px-3 py-2">
              <option value="">Chọn {field.label.toLowerCase()}</option>
              {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          ) : fkOptions[field.name]?.length ? (
            <select value={values[field.name] ?? ""} onChange={(event) => onChange(field.name, event.target.value)} className="rounded-xl border border-slate-300 px-3 py-2">
              <option value="">Chọn {field.label.toLowerCase()}</option>
              {fkOptions[field.name].map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          ) : (
            isRichTextField(field.name) ? (
              <RichTextEditor
                value={toEditorValue(values[field.name] ?? "", field.name)}
                placeholder={`Nhập ${field.label.toLowerCase()}`}
                onChange={(nextValue) => onChange(field.name, nextValue)}
              />
            ) : (
              <input type={field.type ?? "text"} value={values[field.name] ?? ""} onChange={(event) => onChange(field.name, event.target.value)} className="rounded-xl border border-slate-300 px-3 py-2" />
            )
          )}
        </label>
      ))}
    </div>
  );
}

export default function AdminModuleCrudSection({
  title,
  modules,
  showSectionHeader = false,
  showCrudForms = true,
  basePath,
}: AdminModuleCrudSectionProps) {
  const navigate = useNavigate();
  const [moduleKey, setModuleKey] = useState(modules[0]?.key ?? "");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [total, setTotal] = useState(0);
  const [readLoading, setReadLoading] = useState(false);

  const [detailId, setDetailId] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [createValues, setCreateValues] = useState<Record<string, string>>({});
  const [updateValues, setUpdateValues] = useState<Record<string, string>>({});
  const [fkOptions, setFkOptions] = useState<Record<string, SelectOption[]>>({});

  const [resultText, setResultText] = useState("Sẵn sàng thao tác");
  const [actionLoading, setActionLoading] = useState(false);
  const [activePanel, setActivePanel] = useState<CrudPanel>(null);

  const selectedModule = useMemo(() => modules.find((item) => item.key === moduleKey) ?? modules[0], [moduleKey, modules]);
  const fields = useMemo(() => moduleFields[selectedModule?.key ?? ""] ?? [], [selectedModule?.key]);

  const query = useMemo(() => ({ page, limit, ...(searchText.trim() ? { search: searchText.trim() } : {}) }), [page, limit, searchText]);
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const loadList = useCallback(async () => {
    if (!selectedModule) return;
    setReadLoading(true);
    try {
      const listRes = await selectedModule.api.findAll(query);
      const list = extractDataArray(listRes);
      setRows(list);

      if (selectedModule.api.countAll) {
        const countRes = await selectedModule.api.countAll({ search: query.search });
        setTotal(extractTotal(countRes));
      } else {
        setTotal(list.length);
      }
    } catch (err) {
      setResultText(getErrorMessage(err));
      setRows([]);
      setTotal(0);
    } finally {
      setReadLoading(false);
    }
  }, [query, selectedModule]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    void loadList();
  }, [loadList]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const loadFkOptions = async () => {
      const fieldNames = new Set(fields.map((field) => field.name));
      const needsUser = fieldNames.has("user_id") || fieldNames.has("reporter_user_id") || fieldNames.has("target_user_id");
      const needsTrip = fieldNames.has("trip_id");

      const nextOptions: Record<string, SelectOption[]> = {};
      try {
        if (needsUser) {
          const usersModule = modules.find((moduleItem) => moduleItem.key === "users");
          if (usersModule) {
            const users = extractDataArray(await usersModule.api.findAll({ page: 1, limit: 100 }));
            const userOptions = users.map((user) => ({ value: String(user.id ?? ""), label: `${String(user.full_name ?? "Không tên")} (${String(user.email ?? "")})` }));
            if (fieldNames.has("user_id")) nextOptions.user_id = userOptions;
            if (fieldNames.has("reporter_user_id")) nextOptions.reporter_user_id = userOptions;
            if (fieldNames.has("target_user_id")) nextOptions.target_user_id = userOptions;
          }
        }

        if (needsTrip) {
          const tripsModule = modules.find((moduleItem) => moduleItem.key === "trips");
          if (tripsModule) {
            const trips = extractDataArray(await tripsModule.api.findAll({ page: 1, limit: 100 }));
            nextOptions.trip_id = trips.map((trip) => ({ value: String(trip.id ?? ""), label: `${String(trip.title ?? "Không tiêu đề")} - ${String(trip.destination ?? "")}` }));
          }
        }
      } catch {
        // ignore
      }
      setFkOptions(nextOptions);
    };

    void loadFkOptions();
  }, [fields, modules]);

  if (!selectedModule) return null;
  const api = selectedModule.api;

  const buildPayload = (source: Record<string, string>) => {
    const payload: Record<string, unknown> = {};
    for (const field of fields) {
      const raw = source[field.name] ?? "";
      if (raw.trim() !== "") payload[field.name] = castValue(raw);
    }
    return payload;
  };

  const runAction = async (handler: () => Promise<unknown>, refreshList = false) => {
    setActionLoading(true);
    setResultText("Đang xử lý...");
    try {
      const result = await handler();
      setResultText((result as ApiResponse)?.message ?? "Thao tác thành công");
      if (refreshList) await loadList();
    } catch (err) {
      setResultText(getErrorMessage(err));
    } finally {
      setActionLoading(false);
    }
  };

  const applyRow = (row: Record<string, unknown>) => {
    const id = String(row.id ?? "");
    setDetailId(id);
    setUpdateId(id);
    setDeleteId(id);

    const nextValues: Record<string, string> = {};
    for (const field of fields) {
      const value = row[field.name];
      nextValues[field.name] = value === undefined || value === null ? "" : String(value);
    }
    setUpdateValues(nextValues);
  };

  const resetPanelValues = () => {
    setDetailId("");
    setUpdateId("");
    setDeleteId("");
    setCreateValues({});
    setUpdateValues({});
  };

  const tableCols = rows.length ? Object.keys(rows[0]).slice(0, 5) : ["id", ...fields.slice(0, 4).map((f) => f.name)];

  return (
    <section className="grid gap-4">
      {showSectionHeader ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          <p className="mt-1 text-slate-600">Chọn module và thao tác CRUD trực tiếp.</p>
        </div>
      ) : null}

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-2 lg:grid-cols-6">
        <select value={moduleKey} onChange={(e) => { setModuleKey(e.target.value); setPage(1); setActivePanel(null); resetPanelValues(); }} className="rounded-lg border border-slate-300 px-3 py-2 lg:col-span-2">
          {modules.map((m) => <option key={m.key} value={m.key}>{m.label}</option>)}
        </select>
        <input value={searchText} onChange={(e) => { setSearchText(e.target.value); setPage(1); }} placeholder="Tìm kiếm dữ liệu" className="rounded-lg border border-slate-300 px-3 py-2 lg:col-span-2" />
        <select value={limit} onChange={(e) => { setLimit(Math.max(1, Number(e.target.value) || 10)); setPage(1); }} className="rounded-lg border border-slate-300 px-3 py-2">
          <option value={10}>10 / trang</option><option value={20}>20 / trang</option><option value={50}>50 / trang</option>
        </select>
        <button onClick={() => void loadList()} disabled={readLoading} className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white">{readLoading ? "Đang tải..." : "Làm mới"}</button>
        {showCrudForms ? (
          <button onClick={() => { setActivePanel("create"); setResultText("Sẵn sàng thao tác"); }} className="rounded-lg bg-teal-700 px-3 py-2 text-sm font-semibold text-white">+ Tạo mới</button>
        ) : null}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-left text-slate-700"><tr>{tableCols.map((col) => <th key={col} className="px-4 py-3">{col}</th>)}<th className="px-4 py-3">Thao tác</th></tr></thead>
          <tbody>
            {rows.length === 0 ? <tr><td colSpan={tableCols.length + 1} className="px-4 py-8 text-center text-slate-500">Không có dữ liệu</td></tr> : rows.map((row, idx) => (
              <tr key={idx} className="border-t border-slate-200">{tableCols.map((col) => {
                const rawValue = String(row[col] ?? "");
                const displayValue = looksLikeHtml(rawValue) ? toPlainText(rawValue) : rawValue;
                return <td key={col} className="px-4 py-3">{displayValue}</td>;
              })}<td className="px-4 py-3"><div className="flex gap-2"><button onClick={() => { const id = String(row.id ?? ""); if (!id) return; if (basePath) { navigate(`${basePath}/${moduleKey}/${id}/edit`); return; } applyRow(row); setActivePanel("update"); setResultText("Sẵn sàng thao tác"); }} className="rounded border border-slate-300 px-2 py-1">Sửa</button><button onClick={() => { const id = String(row.id ?? ""); if (!id) return; if (basePath) { navigate(`${basePath}/${moduleKey}/${id}`); return; } setDetailId(id); setActivePanel("detail"); setResultText("Sẵn sàng thao tác"); }} className="rounded border border-slate-300 px-2 py-1">Xem</button><button onClick={() => { setDeleteId(String(row.id ?? "")); setActivePanel("delete"); setResultText("Sẵn sàng thao tác"); }} className="rounded border border-rose-300 px-2 py-1 text-rose-700">Xóa</button></div></td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
        <p>Hiển thị {total === 0 ? 0 : (page - 1) * limit + 1}-{total === 0 ? 0 : Math.min(page * limit, total)} trên tổng {total}</p>
        <div className="flex items-center gap-2"><button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded border border-slate-300 px-3 py-1 disabled:opacity-40">Trước</button><span>{page}/{totalPages}</span><button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="rounded border border-slate-300 px-3 py-1 disabled:opacity-40">Sau</button></div>
      </div>

      {showCrudForms && activePanel ? (
        <>
          <section className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-sm font-bold">{activePanel === "create" ? "Tạo mới" : activePanel === "detail" ? "Xem theo mã" : activePanel === "update" ? "Cập nhật" : "Xóa"}</p>
              <button onClick={() => setActivePanel(null)} className="rounded border border-slate-300 px-3 py-1 text-sm">Đóng</button>
            </div>

            {activePanel === "create" ? (
              <>
                <DataForm fields={fields} values={createValues} fkOptions={fkOptions} onChange={(name, value) => setCreateValues((p) => ({ ...p, [name]: value }))} />
                <button onClick={() => runAction(() => { if (!api.create) throw new Error("Module không hỗ trợ tạo mới"); return api.create(buildPayload(createValues)); }, true)} disabled={actionLoading} className="mt-3 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white">Tạo</button>
              </>
            ) : null}

            {activePanel === "detail" ? (
              <div className="flex gap-2">
                <input value={detailId} onChange={(e) => setDetailId(e.target.value)} placeholder="Nhập mã" className="flex-1 rounded-lg border border-slate-300 px-3 py-2" />
                <button onClick={() => runAction(() => { if (!api.findById) throw new Error("Module không hỗ trợ xem chi tiết"); if (!detailId.trim()) throw new Error("Vui lòng nhập mã"); return api.findById(detailId.trim()); })} disabled={actionLoading} className="rounded-lg border border-slate-300 px-4 py-2">Xem</button>
              </div>
            ) : null}

            {activePanel === "update" ? (
              <>
                <input value={updateId} onChange={(e) => setUpdateId(e.target.value)} placeholder="Mã bản ghi" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
                <div className="mt-3">
                  <DataForm fields={fields} values={updateValues} fkOptions={fkOptions} onChange={(name, value) => setUpdateValues((p) => ({ ...p, [name]: value }))} />
                </div>
                <button onClick={() => runAction(() => { if (!api.update) throw new Error("Module không hỗ trợ cập nhật"); if (!updateId.trim()) throw new Error("Vui lòng nhập mã"); return api.update(updateId.trim(), buildPayload(updateValues)); }, true)} disabled={actionLoading} className="mt-3 rounded-lg border border-slate-300 px-4 py-2">Lưu</button>
              </>
            ) : null}

            {activePanel === "delete" ? (
              <div className="flex gap-2">
                <input value={deleteId} onChange={(e) => setDeleteId(e.target.value)} placeholder="Mã bản ghi" className="flex-1 rounded-lg border border-slate-300 px-3 py-2" />
                <button onClick={() => runAction(() => { if (!api.delete) throw new Error("Module không hỗ trợ xóa"); if (!deleteId.trim()) throw new Error("Vui lòng nhập mã"); return api.delete(deleteId.trim()); }, true)} disabled={actionLoading} className="rounded-lg border border-rose-300 px-4 py-2 text-rose-700">Xóa</button>
              </div>
            ) : null}
          </section>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700">{resultText}</div>
        </>
      ) : null}
    </section>
  );
}





