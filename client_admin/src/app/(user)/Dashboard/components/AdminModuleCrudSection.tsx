import { useEffect, useMemo, useState } from "react";

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
};

type ApiResponse<T = unknown> = {
  data?: T;
  message?: string;
};

type SelectOption = {
  value: string;
  label: string;
};

const moduleFields: Record<string, FieldDef[]> = {
  users: [
    { name: "full_name", label: "Họ và tên" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Mật khẩu" },
    {
      name: "role",
      label: "Vai trò",
      options: [
        { value: "user", label: "Người dùng" },
        { value: "admin", label: "Quản trị" },
      ],
    },
  ],
  trips: [
    { name: "user_id", label: "Mã người dùng" },
    { name: "title", label: "Tên hành trình" },
    { name: "destination", label: "Điểm đến" },
    { name: "start_date", label: "Ngày bắt đầu", type: "date" },
    { name: "end_date", label: "Ngày kết thúc", type: "date" },
    { name: "total_budget", label: "Ngân sách", type: "number" },
    { name: "currency", label: "Tiền tệ" },
    {
      name: "status",
      label: "Trạng thái",
      options: [
        { value: "draft", label: "Bản nháp" },
        { value: "planning", label: "Lập kế hoạch" },
        { value: "active", label: "Đang diễn ra" },
        { value: "completed", label: "Hoàn tất" },
        { value: "cancelled", label: "Đã hủy" },
      ],
    },
    { name: "description", label: "Mô tả" },
    { name: "travel_style", label: "Phong cách du lịch" },
  ],
  places: [
    { name: "trip_id", label: "Mã hành trình" },
    { name: "name", label: "Tên địa điểm" },
    { name: "address", label: "Địa chỉ" },
  ],
  itinerary_items: [
    { name: "trip_id", label: "Mã hành trình" },
    { name: "title", label: "Tên hoạt động" },
    { name: "note", label: "Ghi chú" },
  ],
  notes: [
    { name: "trip_id", label: "Mã hành trình" },
    { name: "title", label: "Tiêu đề" },
    { name: "content", label: "Nội dung" },
  ],
  expenses: [
    { name: "trip_id", label: "Mã hành trình" },
    { name: "title", label: "Tên khoản chi" },
    { name: "amount", label: "Số tiền", type: "number" },
  ],
  user_bans: [
    { name: "user_id", label: "Mã người dùng" },
    { name: "reason", label: "Lý do" },
  ],
  user_reports: [
    { name: "reporter_user_id", label: "Mã người báo" },
    { name: "target_user_id", label: "Mã người bị báo" },
    { name: "reason", label: "Lý do" },
  ],
  system_settings: [
    { name: "setting_key", label: "Tên cài đặt" },
    { name: "setting_value", label: "Giá trị" },
  ],
  system_log: [
    { name: "action", label: "Hành động" },
    { name: "entity_type", label: "Loại dữ liệu" },
  ],
};

const fieldLabelMap: Record<string, string> = {
  id: "Mã",
  full_name: "Họ và tên",
  email: "Email",
  avatar_url: "Ảnh đại diện",
  role: "Vai trò",
  is_active: "Trạng thái",
  created_at: "Ngày tạo",
  updated_at: "Ngày cập nhật",
  user_id: "Mã người dùng",
  trip_id: "Mã hành trình",
  title: "Tiêu đề",
  destination: "Điểm đến",
  amount: "Số tiền",
  currency: "Tiền tệ",
  status: "Trạng thái",
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

function prettyFieldName(field: string) {
  return fieldLabelMap[field] ?? field.replaceAll("_", " ");
}

function extractDataArray(response: unknown): Record<string, unknown>[] {
  const data = (response as ApiResponse<Record<string, unknown>[]>)?.data;
  return Array.isArray(data) ? data : [];
}

function extractTotal(response: unknown): number {
  const total = (response as ApiResponse<{ total?: number }>)?.data?.total;
  return typeof total === "number" ? total : 0;
}

function DataForm({
  fields,
  values,
  fkOptions,
  onChange,
}: {
  fields: FieldDef[];
  values: Record<string, string>;
  fkOptions: Record<string, SelectOption[]>;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {fields.map((field) => (
        <label key={field.name} className="grid gap-1 text-sm font-semibold text-slate-700">
          {field.label}
          {field.options?.length ? (
            <select
              value={values[field.name] ?? ""}
              onChange={(event) => onChange(field.name, event.target.value)}
              className="rounded-xl border border-slate-300 px-3 py-2"
            >
              <option value="">Chọn {field.label.toLowerCase()}</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : fkOptions[field.name]?.length ? (
            <select
              value={values[field.name] ?? ""}
              onChange={(event) => onChange(field.name, event.target.value)}
              className="rounded-xl border border-slate-300 px-3 py-2"
            >
              <option value="">Chọn {field.label.toLowerCase()}</option>
              {fkOptions[field.name].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type ?? "text"}
              value={values[field.name] ?? ""}
              onChange={(event) => onChange(field.name, event.target.value)}
              className="rounded-xl border border-slate-300 px-3 py-2"
            />
          )}
        </label>
      ))}
    </div>
  );
}

export default function AdminModuleCrudSection({ title, modules }: AdminModuleCrudSectionProps) {
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

  const [resultText, setResultText] = useState("Kết quả sẽ hiển thị tại đây...");
  const [resultData, setResultData] = useState<unknown>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const selectedModule = useMemo(() => modules.find((item) => item.key === moduleKey) ?? modules[0], [moduleKey, modules]);
  const fields = moduleFields[selectedModule?.key ?? ""] ?? [];

  const query = useMemo(
    () => ({ page, limit, ...(searchText.trim() ? { search: searchText.trim() } : {}) }),
    [page, limit, searchText]
  );

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const loadList = async () => {
    if (!selectedModule) return;

    setReadLoading(true);
    try {
      const listRes = await selectedModule.api.findAll(query);
      setRows(extractDataArray(listRes));

      if (selectedModule.api.countAll) {
        const countRes = await selectedModule.api.countAll(query);
        setTotal(extractTotal(countRes));
      } else {
        setTotal(extractDataArray(listRes).length);
      }
    } catch (err) {
      setResultText(getErrorMessage(err));
      setRows([]);
      setTotal(0);
    } finally {
      setReadLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [moduleKey, searchText, limit]);

  useEffect(() => {
    void loadList();
  }, [moduleKey, page, limit, searchText]);

  useEffect(() => {
    const loadFkOptions = async () => {
      const fieldNames = new Set(fields.map((field) => field.name));
      const needsUser = fieldNames.has("user_id") || fieldNames.has("reporter_user_id") || fieldNames.has("target_user_id") || fieldNames.has("updated_by");
      const needsTrip = fieldNames.has("trip_id");

      const nextOptions: Record<string, SelectOption[]> = {};

      try {
        if (needsUser) {
          const usersModule = modules.find((moduleItem) => moduleItem.key === "users");
          if (usersModule) {
            const usersRes = await usersModule.api.findAll({ page: 1, limit: 100 });
            const users = extractDataArray(usersRes);
            const userOptions = users.map((user) => ({
              value: String(user.id ?? ""),
              label: `${String(user.full_name ?? "Không tên")} (${String(user.email ?? "")})`,
            }));

            if (fieldNames.has("user_id")) nextOptions.user_id = userOptions;
            if (fieldNames.has("reporter_user_id")) nextOptions.reporter_user_id = userOptions;
            if (fieldNames.has("target_user_id")) nextOptions.target_user_id = userOptions;
            if (fieldNames.has("updated_by")) nextOptions.updated_by = userOptions;
          }
        }

        if (needsTrip) {
          const tripsModule = modules.find((moduleItem) => moduleItem.key === "trips");
          if (tripsModule) {
            const tripsRes = await tripsModule.api.findAll({ page: 1, limit: 100 });
            const trips = extractDataArray(tripsRes);
            nextOptions.trip_id = trips.map((trip) => ({
              value: String(trip.id ?? ""),
              label: `${String(trip.title ?? "Không tiêu đề")} - ${String(trip.destination ?? "")}`,
            }));
          }
        }
      } catch {
        // keep manual input fallback if options loading fails
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
      const message = (result as ApiResponse)?.message ?? "Thao tác thành công";
      setResultText(message);
      setResultData((result as ApiResponse)?.data ?? null);
      if (refreshList) await loadList();
    } catch (err) {
      setResultText(getErrorMessage(err));
      setResultData(null);
    } finally {
      setActionLoading(false);
    }
  };

  const applyRowToUpdate = (row: Record<string, unknown>) => {
    const id = String(row.id ?? "");
    setUpdateId(id);
    setDeleteId(id);
    setDetailId(id);

    const nextValues: Record<string, string> = {};
    for (const field of fields) {
      const value = row[field.name];
      nextValues[field.name] = value === undefined || value === null ? "" : String(value);
    }
    setUpdateValues(nextValues);
  };

  const displayFields = rows.length > 0 ? Object.keys(rows[0]).slice(0, 8) : [];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
      <h2 className="text-2xl font-extrabold text-slate-900">{title}</h2>

      <div className="mt-4 rounded-2xl border border-slate-200 p-4">
        <p className="text-sm font-bold text-slate-700">1) Chọn nhóm dữ liệu</p>
        <select
          value={moduleKey}
          onChange={(event) => {
            setModuleKey(event.target.value);
            setCreateValues({});
            setUpdateValues({});
            setDetailId("");
            setUpdateId("");
            setDeleteId("");
          }}
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2"
        >
          {modules.map((moduleItem) => (
            <option key={moduleItem.key} value={moduleItem.key}>
              {moduleItem.label}
            </option>
          ))}
        </select>
      </div>

      <section className="mt-4 rounded-2xl border border-slate-200 p-4">
        <p className="text-sm font-bold text-slate-700">Read - Xem dữ liệu</p>
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          <input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Tìm kiếm" className="rounded-xl border border-slate-300 px-3 py-2" />
          <input
            type="number"
            min={1}
            value={limit}
            onChange={(e) => setLimit(Math.max(1, Number(e.target.value) || 10))}
            placeholder="Số bản ghi"
            className="rounded-xl border border-slate-300 px-3 py-2"
          />
          <button onClick={() => void loadList()} disabled={readLoading} className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white">
            {readLoading ? "Đang tải..." : "Làm mới"}
          </button>
          <div className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
            Tổng: <b>{total}</b>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <p className="md:col-span-2 text-xs text-slate-500">Mẹo: bấm vào một card để nạp nhanh dữ liệu vào phần Cập nhật.</p>
          {rows.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-slate-500">
              Không có dữ liệu
            </div>
          ) : (
            rows.map((row, index) => {
              const fullName = String(row.full_name ?? row.title ?? "");
              const email = String(row.email ?? "");
              const role = String(row.role ?? "");
              const isActive = String(row.is_active ?? "");

              return (
                <article
                  key={index}
                  onClick={() => applyRowToUpdate(row)}
                  className="cursor-pointer rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-teal-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {"avatar_url" in row && typeof row.avatar_url === "string" && row.avatar_url ? (
                        <img
                          src={row.avatar_url}
                          alt="avatar"
                          className="h-16 w-16 rounded-full border-2 border-white object-cover shadow"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-600">
                          {fullName ? fullName.charAt(0).toUpperCase() : "?"}
                        </div>
                      )}
                      <div>
                        <p className="text-base font-bold text-slate-900">{fullName || "Chưa có tên"}</p>
                        <p className="text-sm text-slate-600">{email || "Chưa có email"}</p>
                      </div>
                    </div>
                    <div className="grid gap-2 text-right">
                      {role ? <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">{role}</span> : null}
                      {isActive ? (
                        <span
                          className={
                            isActive === "true"
                              ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
                              : "rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700"
                          }
                        >
                          {isActive === "true" ? "Đang hoạt động" : "Ngưng hoạt động"}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-3 grid gap-1 text-sm">
                    {displayFields.map((field) => (
                      <p key={field} className="text-slate-700">
                        <span className="font-semibold text-slate-900">{prettyFieldName(field)}:</span>{" "}
                        {String(row[field] ?? "")}
                      </p>
                    ))}
                  </div>
                </article>
              );
            })
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-slate-600">Trang {page}/{totalPages}</p>
          <div className="flex gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1 || readLoading} className="rounded-xl border border-slate-300 px-3 py-2 text-sm">
              Trước
            </button>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages || readLoading} className="rounded-xl border border-slate-300 px-3 py-2 text-sm">
              Sau
            </button>
          </div>
        </div>
      </section>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 p-4">
          <p className="text-sm font-bold text-slate-700">Create - Thêm mới</p>
          <div className="mt-3">
            <DataForm
              fields={fields}
              values={createValues}
              fkOptions={fkOptions}
              onChange={(name, value) => setCreateValues((prev) => ({ ...prev, [name]: value }))}
            />
          </div>
          <button
            onClick={() => runAction(() => { if (!api.create) throw new Error("Chưa hỗ trợ thêm mới"); return api.create(buildPayload(createValues)); }, true)}
            disabled={actionLoading}
            className="mt-3 rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white"
          >
            Thêm mới
          </button>
        </section>

        <section className="rounded-2xl border border-slate-200 p-4">
          <p className="text-sm font-bold text-slate-700">Read theo mã</p>
          <div className="mt-3 flex gap-2">
            <input value={detailId} onChange={(e) => setDetailId(e.target.value)} placeholder="Nhập mã bản ghi" className="flex-1 rounded-xl border border-slate-300 px-3 py-2" />
            <button
              onClick={() => runAction(() => { if (!api.findById) throw new Error("Chưa hỗ trợ xem chi tiết"); if (!detailId.trim()) throw new Error("Vui lòng nhập mã bản ghi"); return api.findById(detailId.trim()); })}
              disabled={actionLoading}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold"
            >
              Xem
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 p-4">
          <p className="text-sm font-bold text-slate-700">Update - Cập nhật</p>
          <input value={updateId} onChange={(e) => setUpdateId(e.target.value)} placeholder="Mã bản ghi cần cập nhật" className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2" />
          <div className="mt-3">
            <DataForm
              fields={fields}
              values={updateValues}
              fkOptions={fkOptions}
              onChange={(name, value) => setUpdateValues((prev) => ({ ...prev, [name]: value }))}
            />
          </div>
          <button
            onClick={() => runAction(() => { if (!api.update) throw new Error("Chưa hỗ trợ cập nhật"); if (!updateId.trim()) throw new Error("Vui lòng nhập mã bản ghi"); return api.update(updateId.trim(), buildPayload(updateValues)); }, true)}
            disabled={actionLoading}
            className="mt-3 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold"
          >
            Cập nhật
          </button>
        </section>

        <section className="rounded-2xl border border-slate-200 p-4">
          <p className="text-sm font-bold text-slate-700">Delete - Xóa</p>
          <div className="mt-3 flex gap-2">
            <input value={deleteId} onChange={(e) => setDeleteId(e.target.value)} placeholder="Mã bản ghi cần xóa" className="flex-1 rounded-xl border border-slate-300 px-3 py-2" />
            <button
              onClick={() => runAction(() => { if (!api.delete) throw new Error("Chưa hỗ trợ xóa"); if (!deleteId.trim()) throw new Error("Vui lòng nhập mã bản ghi"); return api.delete(deleteId.trim()); }, true)}
              disabled={actionLoading}
              className="rounded-xl border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700"
            >
              Xóa
            </button>
          </div>
        </section>
      </div>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-bold text-slate-800">{actionLoading ? "Đang xử lý..." : resultText}</p>
        {resultData && typeof resultData === "object" && !Array.isArray(resultData) ? (
          <div className="mt-3 grid gap-1 text-sm text-slate-700">
            {Object.entries(resultData as Record<string, unknown>).map(([key, value]) => (
              <p key={key}>
                <span className="font-semibold">{prettyFieldName(key)}:</span> {String(value ?? "")}
              </p>
            ))}
          </div>
        ) : null}
      </section>
    </section>
  );
}
