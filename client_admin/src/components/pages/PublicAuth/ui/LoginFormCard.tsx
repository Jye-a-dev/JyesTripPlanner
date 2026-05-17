import type { FormEvent } from "react";

type LoginFormCardProps = {
  email: string;
  password: string;
  loading: boolean;
  error: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function LoginFormCard({
  email,
  password,
  loading,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <form onSubmit={onSubmit} className="grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Địa chỉ email
          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Mật khẩu
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-teal-400"
        >
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>

      {error ? <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
    </article>
  );
}
