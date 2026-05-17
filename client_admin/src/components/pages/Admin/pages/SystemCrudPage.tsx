import { useMemo } from "react";
import { useSystemLogsApi, useSystemSettingsApi } from "../../../../hooks";
import AdminModuleCrudSection from "../ui/AdminModuleCrudSection";

export default function SystemCrudPage() {
  const systemSettingsApi = useSystemSettingsApi();
  const systemLogsApi = useSystemLogsApi();

  const modules = useMemo(
    () => [
      { key: "system_settings", label: "Cấu hình hệ thống", api: systemSettingsApi },
      { key: "system_log", label: "Nhật ký hệ thống", api: systemLogsApi },
    ],
    [systemSettingsApi, systemLogsApi],
  );

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Nhóm hệ thống</h1>
          <p className="text-slate-600">Quản trị thông số và theo dõi nhật ký vận hành.</p>
        </div>
      </div>

      <AdminModuleCrudSection title="CRUD dữ liệu hệ thống" basePath="/admin/system" modules={modules} />
    </section>
  );
}
