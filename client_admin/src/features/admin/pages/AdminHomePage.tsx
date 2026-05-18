import { Link } from "react-router-dom";

const quickPages = [
  { title: "Người dùng", description: "CRUD dữ liệu người dùng", to: "/admin/users" },
  { title: "Nhóm hành trình", description: "Trips, places, itinerary, notes, expenses", to: "/admin/trip-suite" },
  { title: "Nhóm kiểm duyệt", description: "User bans và user reports", to: "/admin/moderation" },
  { title: "Nhóm hệ thống", description: "System settings và system logs", to: "/admin/system" },
];

export default function AdminHomePage() {
  return (
    <section className="grid gap-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-slate-900">Tổng quan quản trị</h1>
        <p className="mt-2 text-slate-600">Chọn nhóm dữ liệu để CRUD theo module với giao diện card.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {quickPages.map((item) => (
          <Link key={item.to} to={item.to} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-teal-300">
            <p className="text-lg font-bold text-slate-900">{item.title}</p>
            <p className="mt-1 text-sm text-slate-600">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}




