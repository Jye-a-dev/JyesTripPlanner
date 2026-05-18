import type { FormEvent } from "react";
import type { UserFormState, UserItem, UserRole } from "./types";

type UserCrudSectionProps = {
  users: UserItem[];
  editingUser: UserItem | null;
  form: UserFormState;
  onFormChange: (patch: Partial<UserFormState>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onEdit: (user: UserItem) => void;
  onDelete: (id: string) => void;
};

export default function UserCrudSection({
  users,
  editingUser,
  form,
  onFormChange,
  onSubmit,
  onEdit,
  onDelete,
}: UserCrudSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
      <h2 className="text-2xl font-bold text-slate-900">Quản lý người dùng</h2>
      <form onSubmit={onSubmit} className="mt-4 grid gap-3 md:max-w-xl">
        <input
          placeholder="Họ và tên"
          value={form.full_name}
          onChange={(event) => onFormChange({ full_name: event.target.value })}
          className="rounded-xl border border-slate-300 px-4 py-3"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(event) => onFormChange({ email: event.target.value })}
          className="rounded-xl border border-slate-300 px-4 py-3"
          required
        />
        {!editingUser ? (
          <input
            type="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={(event) => onFormChange({ password: event.target.value })}
            className="rounded-xl border border-slate-300 px-4 py-3"
            required
          />
        ) : null}
        <select
          value={form.role}
          onChange={(event) => onFormChange({ role: event.target.value as UserRole })}
          className="rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="user">Người dùng</option>
          <option value="admin">Quản trị</option>
        </select>
        <button type="submit" className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white">
          {editingUser ? "Cập nhật người dùng" : "Tạo người dùng"}
        </button>
      </form>

      <ul className="mt-5 grid gap-3">
        {users.map((user) => (
          <li key={user.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3">
            <p className="text-slate-700">
              {user.full_name} - {user.email} - {user.role}
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={() => onEdit(user)} className="rounded-lg border border-slate-300 px-3 py-1">
                Sửa
              </button>
              <button type="button" onClick={() => onDelete(user.id)} className="rounded-lg border border-rose-300 px-3 py-1 text-rose-700">
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}


