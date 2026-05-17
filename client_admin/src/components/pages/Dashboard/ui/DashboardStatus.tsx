type DashboardStatusProps = {
  loading: boolean;
  error: string;
};

export default function DashboardStatus({ loading, error }: DashboardStatusProps) {
  if (!loading && !error) {
    return null;
  }

  return (
    <section className="mb-6 grid gap-3">
      {loading ? <p className="rounded-xl bg-slate-100 px-4 py-3 text-slate-700">Đang tải dữ liệu...</p> : null}
      {error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-rose-700">{error}</p> : null}
    </section>
  );
}
