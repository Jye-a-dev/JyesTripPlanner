export default function HeroSection() {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur md:p-10">
      <p className="mb-3 inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-700">
        Trung tâm điều hành
      </p>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
        Quản lý toàn bộ hành trình trong một không gian gọn gàng và rõ ràng.
      </h1>
      <p className="max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
        Theo dõi người dùng, cập nhật chuyến đi và kiểm soát trạng thái vận hành mỗi ngày một cách nhất quán.
      </p>
    </article>
  );
}
