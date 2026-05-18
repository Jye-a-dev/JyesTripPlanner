import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthApi } from "../../../shared/hooks";

const navItems = [
  { label: "Tổng quan", to: "/admin", disabled: false },
  { label: "Người dùng", to: "/admin/users", disabled: false },
  { label: "Nhóm hành trình", to: "/admin/trip-suite", disabled: false },
  { label: "Nhóm kiểm duyệt", to: "/admin/moderation", disabled: false },
  { label: "Nhóm hệ thống", to: "/admin/system", disabled: false },
];

export default function AdminDashboardLayout() {
  const authApi = useAuthApi();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      localStorage.removeItem("admin_access_token");
      navigate("/login");
    }
  };

  const pageTitle = navItems.find((item) => !item.disabled && location.pathname.startsWith(item.to))?.label ?? "Quản trị";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-slate-200 bg-white p-4 lg:p-6">
          <Link to="/admin" className="font-[var(--heading)] text-xl font-bold text-slate-900">Jyes Quản trị</Link>
          <nav className="mt-6 grid gap-2">
            {navItems.map((item) => item.disabled ? (
              <button key={item.label} disabled title="Sắp ra mắt" className="cursor-not-allowed rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-400">
                {item.label}
              </button>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-sm font-semibold transition ${isActive ? "bg-teal-100 text-teal-800" : "text-slate-600 hover:bg-slate-100"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="grid min-h-screen grid-rows-[auto_1fr]">
          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Bảng điều khiển</p>
              <p className="text-lg font-bold text-slate-900">{pageTitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm">Thông báo</button>
              <button onClick={logout} className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white">Đăng xuất</button>
            </div>
          </header>

          <main className="px-4 py-5 lg:px-8 lg:py-7">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}





