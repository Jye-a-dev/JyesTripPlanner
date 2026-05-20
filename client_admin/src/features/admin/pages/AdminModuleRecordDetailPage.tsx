import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTripsApi } from "../../../shared/hooks/useTripsApi";
import { useUsersApi } from "../../../shared/hooks/useUsersApi";
import { isRichTextField, looksLikeHtml, sanitizeRichTextHtml } from "../../../shared/utils/richText";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type ApiModule = {
  findAll: (query?: QueryParams) => Promise<unknown>;
  findById?: (id: string) => Promise<unknown>;
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

function resolveUserDetailLabel(
  row: Record<string, unknown>,
  key: string,
  textValue: string,
  fkLabelMaps: Record<string, Map<string, string>>,
): string | undefined {
  if (key === "user_name") return fkLabelMaps.user_id?.get(textValue) ?? fkLabelMaps.user_id?.get(String(row.user_id ?? ""));
  if (key === "reporter_user_name") return fkLabelMaps.reporter_user_id?.get(textValue) ?? fkLabelMaps.reporter_user_id?.get(String(row.reporter_user_id ?? ""));
  if (key === "target_user_name") return fkLabelMaps.target_user_id?.get(textValue) ?? fkLabelMaps.target_user_id?.get(String(row.target_user_id ?? ""));
  return undefined;
}

export default function AdminModuleRecordDetailPage({
  sectionTitle,
  basePath,
  modules,
}: {
  sectionTitle: string;
  basePath: string;
  modules: ModuleItem[];
}) {
  const { module = "", id = "" } = useParams();
  const navigate = useNavigate();
  const usersApi = useUsersApi();
  const tripsApi = useTripsApi();
  const [row, setRow] = useState<Record<string, unknown> | null>(null);
  const [fkLabelMaps, setFkLabelMaps] = useState<Record<string, Map<string, string>>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selectedModule = useMemo(() => modules.find((item) => item.key === module), [module, modules]);

  useEffect(() => {
    const loadFkLabels = async () => {
      const nextMaps: Record<string, Map<string, string>> = {};
      try {
        const users = extractDataArray(await usersApi.findAll({ page: 1, limit: 100 }));
        const userMap = new Map(users.map((user) => [String(user.id ?? ""), `${String(user.full_name ?? "Không tên")} (${String(user.email ?? "")})`]));

        const userIdsFromRow = new Set<string>();
        if (row) {
          const userKeys = ["user_id", "reporter_user_id", "target_user_id", "user_name", "reporter_user_name", "target_user_name"];
          for (const userKey of userKeys) {
            const rawId = String(row[userKey] ?? "").trim();
            if (rawId && !userMap.has(rawId)) userIdsFromRow.add(rawId);
          }
        }
        for (const userId of userIdsFromRow) {
          try {
            const userRes = await usersApi.findById?.(userId);
            const user = (userRes as ApiResponse<Record<string, unknown>>)?.data;
            if (!user) continue;
            userMap.set(
              String(user.id ?? userId),
              `${String(user.full_name ?? "Không tên")} (${String(user.email ?? "")})`,
            );
          } catch {
            // ignore missing ids
          }
        }

        nextMaps.user_id = userMap;
        nextMaps.reporter_user_id = userMap;
        nextMaps.target_user_id = userMap;

        const trips = extractDataArray(await tripsApi.findAll({ page: 1, limit: 100 }));
        nextMaps.trip_id = new Map(trips.map((trip) => [String(trip.id ?? ""), `${String(trip.title ?? "Không tiêu đề")} - ${String(trip.destination ?? "")}`]));
      } catch {
        // ignore
      }
      setFkLabelMaps(nextMaps);
    };

    void loadFkLabels();
  }, [row, tripsApi, usersApi]);

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
        setRow(record);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Tải dữ liệu thất bại");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [id, selectedModule]);

  if (loading) return <div className="rounded-xl border border-slate-200 bg-white p-4">Đang tải chi tiết...</div>;
  if (error || !row || !selectedModule) return <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">{error || "Không tìm thấy bản ghi"}</div>;

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Chi tiết {selectedModule.label}</h1>
          <Link to={basePath} className="text-sm text-teal-700">Quay lại {sectionTitle}</Link>
        </div>
        <button onClick={() => navigate(`${basePath}/${module}/${id}/edit`)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">Chỉnh sửa</button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4">
        <table className="min-w-full text-sm">
          <tbody>
            {Object.entries(row).map(([key, value]) => {
              const textValue = String(value ?? "");
              const fkLabel = fkLabelMaps[key]?.get(textValue) ?? resolveUserDetailLabel(row, key, textValue, fkLabelMaps);
              const shouldRenderHtml = isRichTextField(key) || looksLikeHtml(textValue);
              return (
                <tr key={key} className="border-b border-slate-100 last:border-b-0">
                  <td className="px-2 py-2 font-semibold text-slate-700">{toViLabel(key)}</td>
                  <td className="px-2 py-2 text-slate-900">
                    {shouldRenderHtml ? (
                      <div className="word-like-content" dangerouslySetInnerHTML={{ __html: sanitizeRichTextHtml(textValue) }} />
                    ) : (
                      fkLabel ? `${textValue} - ${fkLabel}` : textValue
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
