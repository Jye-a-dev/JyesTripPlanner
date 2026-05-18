export default function UsersErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
      <p>Có lỗi khi tải danh sách người dùng.</p>
      <p className="mt-1 text-sm">{message}</p>
      <button onClick={onRetry} className="mt-3 rounded-lg border border-rose-300 px-3 py-1.5 text-sm font-semibold">
        Thử lại
      </button>
    </div>
  );
}


