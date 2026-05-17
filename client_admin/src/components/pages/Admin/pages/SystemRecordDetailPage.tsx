import { useMemo } from "react";
import { useSystemLogsApi, useSystemSettingsApi } from "../../../../hooks";
import AdminModuleRecordDetailPage from "./AdminModuleRecordDetailPage";

export default function SystemRecordDetailPage() {
  const systemSettingsApi = useSystemSettingsApi();
  const systemLogsApi = useSystemLogsApi();

  const modules = useMemo(
    () => [
      { key: "system_settings", label: "Cấu hình hệ thống", api: systemSettingsApi },
      { key: "system_log", label: "Nhật ký hệ thống", api: systemLogsApi },
    ],
    [systemSettingsApi, systemLogsApi],
  );

  return <AdminModuleRecordDetailPage sectionTitle="nhóm hệ thống" basePath="/admin/system" modules={modules} />;
}
