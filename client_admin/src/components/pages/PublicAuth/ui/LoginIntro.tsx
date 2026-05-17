export type LoginResponse = {
  data?: {
    access_token?: string;
  };
};

type LoginIntroProps = {
  title: string;
  description: string;
};

export default function LoginIntro({ title, description }: LoginIntroProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur md:p-8">
      <p className="mb-3 inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-700">
        Đăng nhập quản trị
      </p>
      <h1 className="mb-4 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">{title}</h1>
      <p className="text-base leading-7 text-slate-600">{description}</p>
    </article>
  );
}
