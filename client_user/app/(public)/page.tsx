
import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 bg-gradient-to-b from-slate-50 via-white to-white">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-40 blur-3xl" aria-hidden="true">
          <div className="absolute top-12 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl"></div>
          <div className="absolute top-20 right-10 w-80 h-80 bg-violet-300 rounded-full mix-blend-multiply filter blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Tagline */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/10">
              ⚡️ Giải pháp lập kế hoạch du lịch thông minh số 1
            </span>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
              Lên kế hoạch du lịch <br />
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Chưa bao giờ dễ dàng đến thế
              </span>
            </h1>

            {/* Sub-heading */}
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              JyesTripPlanner giúp bạn tự tay kiến tạo những hành trình tuyệt vời, quản lý ngân sách thông minh, phân bổ lịch trình chi tiết và đồng hành cùng nhóm bạn trong mọi chuyến đi.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="#"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-200"
              >
                Lập kế hoạch ngay
                <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="#"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all duration-200"
              >
                Xem cách hoạt động
              </Link>
            </div>

            {/* Quick trust highlights */}
            <div className="pt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto text-slate-500 text-xs font-medium border-t border-slate-100 mt-12">
              <div>
                <span className="block text-xl font-bold text-indigo-600">10k+</span>
                Chuyến đi được tạo
              </div>
              <div className="border-x border-slate-200">
                <span className="block text-xl font-bold text-indigo-600">4.9★</span>
                Đánh giá người dùng
              </div>
              <div>
                <span className="block text-xl font-bold text-indigo-600">100%</span>
                Miễn phí & Dễ dùng
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE FEATURES SECTION */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Tính năng nổi bật</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Mọi công cụ bạn cần trên một nền tảng duy nhất
            </p>
            <p className="text-slate-600">
              Không còn lộn xộn giữa hàng chục ứng dụng Excel, Note hay Chat. JyesTripPlanner tích hợp đầy đủ các giải pháp tốt nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1: Itinerary */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Lịch trình thông minh</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Lên kế hoạch theo từng khung giờ chi tiết trong ngày, dễ dàng sắp xếp lại hành trình bằng thao tác kéo thả kéo trực quan.
                </p>
              </div>
              <span className="text-xs font-semibold text-indigo-600 mt-4 inline-flex items-center gap-1 group cursor-pointer">
                Tìm hiểu thêm <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>

            {/* Card 2: Expense Management */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.214-.114c1.11-.591 2.454-.591 3.564 0l.214.114V3.818l-.214-.114c-1.11-.591-2.454-.591-3.564 0L9 3.818h3m-3 12.364H9M12 6.364H9m0 0v10M12 6v12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Quản lý chi tiêu</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Theo dõi ngân sách, ghi chép mọi chi tiêu thực tế, chia đều hóa đơn cho các thành viên trong nhóm một cách minh bạch.
                </p>
              </div>
              <span className="text-xs font-semibold text-indigo-600 mt-4 inline-flex items-center gap-1 group cursor-pointer">
                Tìm hiểu thêm <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>

            {/* Card 3: Hot Spots / Places */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25gC4.5 6.358 7.858 3 12 3s7.5 3.358 7.5 7.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Bản đồ địa điểm</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Tích hợp bản đồ trực quan, giúp bạn hình dung khoảng cách, lưu nhanh các điểm ăn chơi, chụp ảnh nổi bật trên tuyến đường.
                </p>
              </div>
              <span className="text-xs font-semibold text-indigo-600 mt-4 inline-flex items-center gap-1 group cursor-pointer">
                Tìm hiểu thêm <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>

            {/* Card 4: Shared Notes */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Ghi chú & Checklists</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Lưu trữ thông tin vé máy bay, phòng khách sạn, tạo danh sách vật dụng cần mang theo để không bao giờ bỏ sót đồ đạc.
                </p>
              </div>
              <span className="text-xs font-semibold text-indigo-600 mt-4 inline-flex items-center gap-1 group cursor-pointer">
                Tìm hiểu thêm <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRENDING DESTINATIONS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Khơi nguồn cảm hứng</h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Địa điểm thịnh hành tuần này
              </p>
              <p className="text-slate-500 max-w-lg">
                Khám phá các điểm đến được yêu thích nhất bởi cộng đồng phượt thủ JyesTripPlanner.
              </p>
            </div>
            <Link href="#" className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              Xem toàn bộ điểm đến
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Destination 1 - Sapa */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-slate-100 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                {/* SVG Mock Image - Hoạt ảnh núi rừng rực rỡ */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-800 to-indigo-950 flex items-center justify-center text-white p-6">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto opacity-30 mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                    </svg>
                    <span className="text-xs uppercase tracking-widest font-bold opacity-75">Tây Bắc Việt Nam</span>
                    <h4 className="text-2xl font-black tracking-tight mt-1">Sapa huyền ảo</h4>
                  </div>
                </div>
                {/* Gradient phủ */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-semibold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                    3 Ngày 2 Đêm
                  </span>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="font-bold">Đèo Ô Quy Hồ, Bản Cát Cát...</span>
                    <span className="text-emerald-400 font-extrabold text-sm">~ 2.5Tr VNĐ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Destination 2 - Ha Long */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-slate-100 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-800 to-blue-950 flex items-center justify-center text-white p-6">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto opacity-30 mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5v9l9 5.25M3 7.5l9 5.25M9 10.5v2.25M12 10.5v2.25M15 10.5v2.25" />
                    </svg>
                    <span className="text-xs uppercase tracking-widest font-bold opacity-75">Vịnh Kỳ Quan</span>
                    <h4 className="text-2xl font-black tracking-tight mt-1">Hạ Long Kỳ Vĩ</h4>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-semibold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                    2 Ngày 1 Đêm
                  </span>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="font-bold">Du thuyền 5 sao, Đảo Ti Tốp...</span>
                    <span className="text-emerald-400 font-extrabold text-sm">~ 3.2Tr VNĐ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Destination 3 - Hoi An */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-slate-100 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-700 to-red-950 flex items-center justify-center text-white p-6">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto opacity-30 mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                    </svg>
                    <span className="text-xs uppercase tracking-widest font-bold opacity-75">Di Sản Cổ Kính</span>
                    <h4 className="text-2xl font-black tracking-tight mt-1">Hội An Hoài Niệm</h4>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-semibold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                    3 Ngày 2 Đêm
                  </span>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="font-bold">Phố đèn lồng, Sông Hoài...</span>
                    <span className="text-emerald-400 font-extrabold text-sm">~ 1.8Tr VNĐ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Destination 4 - Phu Quoc */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-slate-100 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-700 to-indigo-950 flex items-center justify-center text-white p-6">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto opacity-30 mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 18.75V21m-9-9h1.5m16.5 0H21m-2.81-5.69l-1.06 1.06M7.69 16.31l-1.06 1.06m0-10.62l1.06 1.06m9.19 9.19l1.06 1.06M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
                    </svg>
                    <span className="text-xs uppercase tracking-widest font-bold opacity-75">Thiên Đường Đảo Ngọc</span>
                    <h4 className="text-2xl font-black tracking-tight mt-1">Phú Quốc Nắng Vàng</h4>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-semibold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                    4 Ngày 3 Đêm
                  </span>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="font-bold">Bãi Sao, Sunset Sanato...</span>
                    <span className="text-emerald-400 font-extrabold text-sm">~ 4.5Tr VNĐ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Quy trình đơn giản</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              3 bước đơn giản để có chuyến đi hoàn hảo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="text-center space-y-4 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-black text-2xl mx-auto shadow-lg shadow-indigo-100">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900">Tạo Chuyến Đi</h3>
              <p className="text-sm text-slate-500 leading-relaxed px-4">
                Nhập điểm đến, chọn khoảng thời gian di chuyển và đặt tên cho chuyến hành trình thú vị sắp tới của bạn.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-black text-2xl mx-auto shadow-lg shadow-indigo-100">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900">Thiết Kế Lịch Trình</h3>
              <p className="text-sm text-slate-500 leading-relaxed px-4">
                Thêm các địa điểm tham quan, quán ăn, khách sạn vào từng ngày. Phân chia khung thời gian và ghi chú lưu ý.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-black text-2xl mx-auto shadow-lg shadow-indigo-100">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900">Chia sẻ & Trải Nghiệm</h3>
              <p className="text-sm text-slate-500 leading-relaxed px-4">
                Mời bạn bè cùng tham gia chỉnh sửa lịch trình, chia sẻ gánh nặng tài chính và cùng nhau xách ba lô lên đi thôi!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[40px] bg-slate-950 px-8 py-16 sm:px-16 sm:py-24 text-center shadow-2xl">
            {/* Decorative BG element */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-indigo-600 rounded-full opacity-20 filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-violet-600 rounded-full opacity-20 filter blur-3xl"></div>

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Bắt đầu hành trình <br />
                của bạn ngay hôm nay
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Hơn 10,000 người yêu thích du lịch đã và đang lên kế hoạch cùng JyesTripPlanner. Tạo tài khoản hoàn toàn miễn phí và bắt đầu cuộc phiêu lưu của bạn.
              </p>
              <div className="pt-6">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-950 bg-white hover:bg-slate-100 rounded-2xl transition-all duration-200 active:scale-95 shadow-lg shadow-white/5"
                >
                  Bắt đầu lập kế hoạch miễn phí
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
