import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUsersApi } from "../../../../hooks";
import { formatDate, toUserItem } from "../ui/users";
import type { ApiResponse, UserItem } from "../ui/users";

export default function UserDetailPage() {
  const { id = "" } = useParams();
  const usersApi = useUsersApi();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await usersApi.findById(id);
        const data = (res as ApiResponse<Record<string, unknown>>).data;
        if (!data) throw new Error("Không tìm thấy người dùng");
        setUser(toUserItem(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Tải dữ liệu thất bại");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [id, usersApi]);

  if (loading) return <div className="rounded-xl border border-slate-200 bg-white p-4">Đang tải chi tiết người dùng...</div>;
  if (error || !user) return <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">{error || "Không tìm thấy người dùng"}</div>;

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-5">
        <div><h1 className="text-2xl font-bold text-slate-900">Chi tiết người dùng</h1><Link to="/admin/users" className="text-sm text-teal-700">Quay lại</Link></div>
        <div className="flex gap-2"><button onClick={() => navigate(`/admin/users/${user.id}/edit`)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">Chỉnh sửa</button><button onClick={() => navigate("/admin/users")} className="rounded-lg border border-rose-300 px-3 py-2 text-sm text-rose-700">Xóa tại danh sách</button></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Họ tên</p>
          <p className="mt-1 text-base font-bold text-slate-900">{user.full_name}</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
          <p className="mt-1 text-base font-bold text-slate-900">{user.email}</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Vai trò</p>
          <p className="mt-1 text-base font-bold text-slate-900">{user.role === "admin" ? "Quản trị viên" : "Người dùng"}</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Trạng thái</p>
          <span className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${user.is_active ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"}`}>{user.is_active ? "Hoạt động" : "Ngưng hoạt động"}</span>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Ngày tạo</p>
          <p className="mt-1 text-base font-bold text-slate-900">{formatDate(user.created_at)}</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Ngày cập nhật</p>
          <p className="mt-1 text-base font-bold text-slate-900">{formatDate(user.updated_at)}</p>
        </article>
      </div>
    </section>
  );
}




