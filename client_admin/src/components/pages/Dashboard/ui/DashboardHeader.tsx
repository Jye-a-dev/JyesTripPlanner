type DashboardHeaderProps = {
  onLogout: () => void | Promise<void>;
};

export default function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <h1 className="m-0 text-3xl font-extrabold text-slate-900">Bảng điều hành quản trị</h1>
        <p className="text-slate-600">Quản lý người dùng và hành trình tại một nơi.</p>
      </div>
      <button
        onClick={onLogout}
        type="button"
        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Đăng xuất
      </button>
    </header>
  );
}

