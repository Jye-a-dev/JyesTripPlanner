type NotFoundContentProps = {
  title: string;
  message: string;
};

export default function NotFoundContent({ title, message }: NotFoundContentProps) {
  return (
    <section className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
      <p className="mt-3 text-slate-600">{message}</p>
    </section>
  );
}
