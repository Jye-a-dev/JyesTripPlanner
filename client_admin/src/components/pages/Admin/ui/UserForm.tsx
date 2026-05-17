import type { FormEvent } from "react";
import type { UserFormErrors, UserFormValues } from "./userFormSchema";

export default function UserForm({ mode, values, errors, submitting, onChange, onSubmit, onCancel }: {
  mode: "create" | "edit";
  values: UserFormValues;
  errors: UserFormErrors;
  submitting: boolean;
  onChange: (name: keyof UserFormValues, value: string) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
}) {
  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5">
      <label className="grid gap-1 text-sm font-semibold">Họ tên *
        <input value={values.full_name} onBlur={() => null} onChange={(e) => onChange("full_name", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2" />
        {errors.full_name ? <span className="text-xs text-rose-600">{errors.full_name}</span> : null}
      </label>
      <label className="grid gap-1 text-sm font-semibold">Email *
        <input type="email" value={values.email} onChange={(e) => onChange("email", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2" />
        {errors.email ? <span className="text-xs text-rose-600">{errors.email}</span> : null}
      </label>
      {mode === "create" ? <label className="grid gap-1 text-sm font-semibold">Mật khẩu *
        <input type="password" value={values.password} onChange={(e) => onChange("password", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2" />
        {errors.password ? <span className="text-xs text-rose-600">{errors.password}</span> : null}
      </label> : null}
      <label className="grid gap-1 text-sm font-semibold">Vai trò *
        <select value={values.role} onChange={(e) => onChange("role", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2"><option value="user">Người dùng</option><option value="admin">Quản trị viên</option></select>
      </label>
      <label className="grid gap-1 text-sm font-semibold">Trạng thái *
        <select value={values.is_active} onChange={(e) => onChange("is_active", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2"><option value="true">Hoạt động</option><option value="false">Ngưng hoạt động</option></select>
      </label>
      <div className="flex justify-end gap-2"><button type="button" onClick={onCancel} className="rounded-lg border border-slate-300 px-4 py-2">Hủy</button><button disabled={submitting} className="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white">{submitting ? "Đang lưu..." : mode === "create" ? "Tạo mới" : "Lưu thay đổi"}</button></div>
    </form>
  );
}
