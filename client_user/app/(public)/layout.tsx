
import React from "react";
import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-5.5 h-5.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 bg-clip-text text-transparent tracking-tight">
                  JyesTrip<span className="text-indigo-600 font-extrabold">Planner</span>
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-6">
                <Link href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                  Khám phá
                </Link>
                <Link href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                  Lập kế hoạch
                </Link>
                <Link href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                  Bản đồ hot
                </Link>
                <Link href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                  Tính năng
                </Link>
              </nav>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="hidden sm:inline-flex text-sm font-semibold text-slate-700 hover:text-indigo-600 px-4 py-2 transition-colors rounded-lg hover:bg-slate-100"
              >
                Đăng nhập
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 px-5 py-2.5 rounded-xl shadow-sm shadow-indigo-100 transition-all duration-200 hover:shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98]"
              >
                Bắt đầu miễn phí
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  JyesTrip<span className="text-indigo-400">Planner</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-slate-400">
                Ứng dụng đồng hành hoàn hảo cho mọi chuyến đi. Lập kế hoạch chi tiết, quản lý chi tiêu nhóm thông minh và lưu giữ mọi kỷ niệm.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Sản phẩm</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Tính năng chính</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Bảng giá</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Cộng đồng chia sẻ</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Cập nhật mới</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Hỗ trợ</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Tài liệu hướng dẫn</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Trung tâm trợ giúp</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Liên hệ chúng tôi</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Báo cáo sự cố</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Pháp lý</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Chính sách bảo mật</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Chính sách Cookie</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              &copy; {new Date().getFullYear()} JyesTripPlanner. Tất cả quyền được bảo lưu. Thiết kế và tối ưu bởi Jyes Team.
            </p>
            <p className="text-xs text-slate-500">
              Made with ❤️ for smart travelers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
