import { useMemo } from "react";
import { useUserBansApi, useUserReportsApi } from "../../../../hooks";
import AdminModuleRecordDetailPage from "./AdminModuleRecordDetailPage";

export default function ModerationRecordDetailPage() {
  const userBansApi = useUserBansApi();
  const userReportsApi = useUserReportsApi();

  const modules = useMemo(
    () => [
      { key: "user_bans", label: "Cấm người dùng", api: userBansApi },
      { key: "user_reports", label: "Báo cáo người dùng", api: userReportsApi },
    ],
    [userBansApi, userReportsApi],
  );

  return <AdminModuleRecordDetailPage sectionTitle="nhóm kiểm duyệt" basePath="/admin/moderation" modules={modules} />;
}
