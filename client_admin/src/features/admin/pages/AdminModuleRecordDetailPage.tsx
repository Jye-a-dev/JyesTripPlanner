import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const [row, setRow] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
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
              const shouldRenderHtml = isRichTextField(key) || looksLikeHtml(textValue);
              return (
                <tr key={key} className="border-b border-slate-100 last:border-b-0">
                  <td className="px-2 py-2 font-semibold text-slate-700">{toViLabel(key)}</td>
                  <td className="px-2 py-2 text-slate-900">
                    {shouldRenderHtml ? (
                      <div className="word-like-content" dangerouslySetInnerHTML={{ __html: sanitizeRichTextHtml(textValue) }} />
                    ) : (
                      textValue
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
