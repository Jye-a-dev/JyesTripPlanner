const actions = [
  {
    href: "/login",
    label: "Đăng nhập quản trị",
    className: "rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800",
  },
  {
    href: "/admin",
    label: "Mở trang điều hành",
    className:
      "rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700",
  },
];

export default function MainActionButtons() {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {actions.map((action) => (
        <a key={action.href} href={action.href} className={action.className}>
          {action.label}
        </a>
      ))}
    </div>
  );
}
