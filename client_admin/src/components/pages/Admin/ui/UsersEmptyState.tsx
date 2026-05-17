import { Link } from "react-router-dom";

export default function UsersEmptyState() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
      <p className="text-lg font-semibold text-slate-900">Không tìm thấy người dùng.</p>
      <p className="mt-1 text-slate-600">Hãy tạo người dùng đầu tiên để bắt đầu.</p>
      <Link to="/admin/users/create" className="mt-4 inline-flex rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white">
        Tạo người dùng
      </Link>
    </div>
  );
}
