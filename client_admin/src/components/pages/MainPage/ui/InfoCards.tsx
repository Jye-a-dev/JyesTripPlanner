type InfoCard = {
  title: string;
  headline: string;
  description: string;
  accent?: boolean;
};

const infoCards: InfoCard[] = [
  {
    title: "Quản lý người dùng",
    headline: "Tạo mới / Cập nhật / Xóa",
    description: "Điều chỉnh vai trò, trạng thái hoạt động và quyền truy cập tài khoản.",
  },
  {
    title: "Điều phối hành trình",
    headline: "Chỉnh sửa nhanh theo nhu cầu",
    description: "Cập nhật điểm đến, thời gian và tiến độ chuyến đi linh hoạt.",
  },
  {
    title: "Mục tiêu",
    headline: "Tối ưu trải nghiệm quản trị",
    description: "Mang lại trải nghiệm quản trị rõ ràng, nhanh gọn và dễ theo dõi.",
    accent: true,
  },
];

export default function InfoCards() {
  return (
    <aside className="grid gap-4">
      {infoCards.map((card) => (
        <div
          key={card.title}
          className={
            card.accent
              ? "rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 p-5"
              : "rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm"
          }
        >
          <p className={card.accent ? "text-xs font-semibold uppercase tracking-wide text-teal-700" : "text-sm text-slate-500"}>
            {card.title}
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{card.headline}</p>
          <p className="mt-2 text-sm text-slate-600">{card.description}</p>
        </div>
      ))}
    </aside>
  );
}

