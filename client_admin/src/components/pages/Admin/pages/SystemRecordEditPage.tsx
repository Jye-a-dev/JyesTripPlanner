import { useMemo } from "react";
import { useSystemLogsApi, useSystemSettingsApi } from "../../../../hooks";
import AdminModuleRecordEditPage from "./AdminModuleRecordEditPage";

export default function SystemRecordEditPage() {
  const systemSettingsApi = useSystemSettingsApi();
  const systemLogsApi = useSystemLogsApi();

  const modules = useMemo(
    () => [
      { key: "system_settings", label: "Cấu hình hệ thống", api: systemSettingsApi },
      { key: "system_log", label: "Nhật ký hệ thống", api: systemLogsApi },
    ],
    [systemSettingsApi, systemLogsApi],
  );

  return <AdminModuleRecordEditPage basePath="/admin/system" modules={modules} />;
}
