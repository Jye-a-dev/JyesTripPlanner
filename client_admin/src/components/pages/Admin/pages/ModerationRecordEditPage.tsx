import { useMemo } from "react";
import { useUserBansApi, useUserReportsApi } from "../../../../hooks";
import AdminModuleRecordEditPage from "./AdminModuleRecordEditPage";

export default function ModerationRecordEditPage() {
  const userBansApi = useUserBansApi();
  const userReportsApi = useUserReportsApi();

  const modules = useMemo(
    () => [
      { key: "user_bans", label: "Cấm người dùng", api: userBansApi },
      { key: "user_reports", label: "Báo cáo người dùng", api: userReportsApi },
    ],
    [userBansApi, userReportsApi],
  );

  return <AdminModuleRecordEditPage basePath="/admin/moderation" modules={modules} />;
}
