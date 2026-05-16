import { Link, NavLink } from "react-router-dom";

const navItems = [
  { label: "Trang chủ", to: "/" },
  { label: "Đăng nhập", to: "/login" },
  { label: "Quản trị", to: "/admin" },
];

export default function BaseNavbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight text-slate-900 transition hover:text-teal-700"
        >
          JyesTrip Planner
        </Link>

        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  isActive
                    ? "bg-teal-700 text-white shadow-sm"
                    : "text-slate-700 hover:bg-teal-50 hover:text-teal-700",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
