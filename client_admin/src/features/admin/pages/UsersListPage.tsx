import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUsersApi } from "../../../shared/hooks";
import UsersEmptyState from "../components/UsersEmptyState";
import UsersErrorState from "../components/UsersErrorState";
import UsersLoadingState from "../components/UsersLoadingState";
import { toUserItem } from "../components/users";
import type { ApiResponse, UserItem } from "../components/users";
import { useDebouncedValue } from "../components/useDebouncedValue";

export default function UsersListPage() {
  const usersApi = useUsersApi();
  const navigate = useNavigate();
  const [rows, setRows] = useState<UserItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("updated_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [toast, setToast] = useState("");
  const [deleteUser, setDeleteUser] = useState<UserItem | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const debouncedSearch = useDebouncedValue(search, 300);

  const query = useMemo(() => {
    const nextQuery: Record<string, string | number | boolean> = { page, limit };
    if (debouncedSearch.trim()) nextQuery.search = debouncedSearch.trim();
    if (role) nextQuery.role = role;
    if (status) nextQuery.is_active = status === "true";
    return nextQuery;
  }, [page, limit, debouncedSearch, role, status]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [listRes, countRes] = await Promise.allSettled([usersApi.findAll(query), usersApi.countAll({ search: query.search, role: query.role, is_active: query.is_active })]);
      if (listRes.status !== "fulfilled") {
        throw listRes.reason;
      }
      const list = ((listRes.value as ApiResponse<Record<string, unknown>[]>).data ?? []).map(toUserItem);
      const nextTotal =
        countRes.status === "fulfilled"
          ? Number(((countRes.value as ApiResponse<{ total?: number }>).data?.total ?? list.length))
          : list.length;
      setRows(list);
      setTotal(nextTotal);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tải dữ liệu thất bại");
    } finally {
      setLoading(false);
    }
  }, [query, usersApi]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    void load();
  }, [load]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(""), 2500);
    return () => window.clearTimeout(t);
  }, [toast]);

  const onDelete = async (event: FormEvent) => {
    event.preventDefault();
    if (!deleteUser) return;
    setDeleting(true);
    try {
      await usersApi.delete(deleteUser.id);
      setToast(`Đã xóa ${deleteUser.full_name} thành công`);
      setDeleteUser(null);
      setConfirmText("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xóa thất bại");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Người dùng</h1>
          <p className="text-slate-600">Quản lý toàn bộ người dùng trong hệ thống.</p>
        </div>
        <Link to="/admin/users/create" className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white">+ Tạo người dùng</Link>
      </div>

      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-2 lg:grid-cols-6">
        <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Tìm theo tên hoặc email" className="rounded-lg border border-slate-300 px-3 py-2 lg:col-span-2" />
        <select value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }} className="rounded-lg border border-slate-300 px-3 py-2">
          <option value="">Vai trò: Tất cả</option><option value="admin">Quản trị viên</option><option value="user">Người dùng</option>
        </select>
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="rounded-lg border border-slate-300 px-3 py-2">
          <option value="">Trạng thái: Tất cả</option><option value="true">Hoạt động</option><option value="false">Ngưng hoạt động</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} disabled className="rounded-lg border border-slate-300 px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50">
          <option value="full_name">Tên</option><option value="created_at">Ngày tạo</option><option value="updated_at">Ngày cập nhật</option><option value="is_active">Trạng thái</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} disabled className="rounded-lg border border-slate-300 px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50">
          <option value="asc">Tăng dần</option><option value="desc">Giảm dần</option>
        </select>
      </div>

      {loading ? <UsersLoadingState /> : error ? <UsersErrorState message={error} onRetry={() => void load()} /> : rows.length === 0 ? <UsersEmptyState /> : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-left text-slate-700"><tr><th className="px-4 py-3">Mã</th><th className="px-4 py-3">Tên</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Vai trò</th><th className="px-4 py-3">Trạng thái</th><th className="px-4 py-3">Thao tác</th></tr></thead>
            <tbody>
              {rows.map((user) => (
                <tr key={user.id} className="border-t border-slate-200"><td className="px-4 py-3">{user.id}</td><td className="px-4 py-3 font-semibold">{user.full_name}</td><td className="px-4 py-3">{user.email}</td><td className="px-4 py-3">{user.role === "admin" ? "Quản trị viên" : "Người dùng"}</td><td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs font-semibold ${user.is_active ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"}`}>{user.is_active ? "Hoạt động" : "Ngưng hoạt động"}</span></td><td className="px-4 py-3"><div className="flex gap-2"><button onClick={() => navigate(`/admin/users/${user.id}`)} className="rounded border border-slate-300 px-2 py-1">Xem</button><button onClick={() => navigate(`/admin/users/${user.id}/edit`)} className="rounded border border-slate-300 px-2 py-1">Sửa</button><button onClick={() => setDeleteUser(user)} className="rounded border border-rose-300 px-2 py-1 text-rose-700">Xóa</button></div></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
        <p>Hiển thị {total === 0 ? 0 : (page - 1) * limit + 1}-{total === 0 ? 0 : Math.min(page * limit, total)} trên tổng {total}</p>
        <div className="flex items-center gap-2"><select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }} className="rounded border border-slate-300 px-2 py-1"><option value={10}>10</option><option value={20}>20</option><option value={50}>50</option></select><button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded border border-slate-300 px-3 py-1 disabled:opacity-40">Trước</button><span>{page}/{totalPages}</span><button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="rounded border border-slate-300 px-3 py-1 disabled:opacity-40">Sau</button></div>
      </div>

      {deleteUser ? (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/40 px-4">
          <form onSubmit={onDelete} className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900">Xóa người dùng?</h2>
            <p className="mt-2 text-slate-600">Bạn có chắc muốn xóa "{deleteUser.full_name}"? Hành động này không thể hoàn tác.</p>
            <label className="mt-4 grid gap-1 text-sm font-semibold text-slate-700">Nhập lại tên người dùng để xác nhận
              <input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2" />
            </label>
            <div className="mt-4 flex justify-end gap-2"><button type="button" onClick={() => setDeleteUser(null)} className="rounded-lg border border-slate-300 px-3 py-2">Hủy</button><button disabled={confirmText !== deleteUser.full_name || deleting} className="rounded-lg bg-rose-600 px-3 py-2 font-semibold text-white disabled:opacity-40">{deleting ? "Đang xóa..." : "Xóa"}</button></div>
          </form>
        </div>
      ) : null}

      {toast ? <div role="status" className="fixed bottom-4 right-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">{toast}</div> : null}
    </section>
  );
}










