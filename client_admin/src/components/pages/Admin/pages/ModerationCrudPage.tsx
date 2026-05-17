import { useMemo } from "react";
import { useUserBansApi, useUserReportsApi } from "../../../../hooks";
import AdminModuleCrudSection from "../ui/AdminModuleCrudSection";

export default function ModerationCrudPage() {
  const userBansApi = useUserBansApi();
  const userReportsApi = useUserReportsApi();

  const modules = useMemo(
    () => [
      { key: "user_bans", label: "Cấm người dùng", api: userBansApi },
      { key: "user_reports", label: "Báo cáo người dùng", api: userReportsApi },
    ],
    [userBansApi, userReportsApi],
  );

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Nhóm kiểm duyệt</h1>
          <p className="text-slate-600">Kiểm soát an toàn nội dung và hành vi người dùng.</p>
        </div>
      </div>

      <AdminModuleCrudSection title="CRUD dữ liệu kiểm duyệt" basePath="/admin/moderation" modules={modules} />
    </section>
  );
}
