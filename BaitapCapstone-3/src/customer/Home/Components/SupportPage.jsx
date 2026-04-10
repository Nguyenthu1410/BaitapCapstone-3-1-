import React, { useState } from 'react';

const SupportPage = () => {
  // Dữ liệu giả cho trang hỗ trợ
  const supportData = {
    tieuDe: "Chúng tôi có thể giúp gì cho bạn?",
    danhMuc: [
      { id: 1, icon: "🎫", ten: "Đặt vé & Thanh toán", moTa: "Hướng dẫn cách đặt vé và các phương thức thanh toán." },
      { id: 2, icon: "👤", ten: "Tài khoản & Bảo mật", moTa: "Quản lý thông tin cá nhân và bảo mật tài khoản." },
      { id: 3, icon: "🎁", ten: "Ưu đãi & Thành viên", moTa: "Thông tin về quyền lợi thẻ thành viên và quà tặng." },
      { id: 4, icon: "🎬", ten: "Rạp & Suất chiếu", moTa: "Tìm hiểu thông tin về các cụm rạp và giờ chiếu." },
    ],
    faqs: [
      { id: 1, cauHoi: "Làm sao để đổi/trả vé đã mua?", traLoi: "Hiện tại hệ thống không hỗ trợ đổi hoặc trả vé đã thanh toán thành công. Vui lòng kiểm tra kỹ thông tin trước khi xác nhận." },
      { id: 2, cauHoi: "Tôi có thể mua tối đa bao nhiêu vé?", traLoi: "Mỗi giao dịch bạn có thể đặt tối đa 8 vé để đảm bảo tính công bằng cho mọi khách hàng." },
      { id: 3, cauHoi: "Tại sao tôi không nhận được email xác nhận?", traLoi: "Vui lòng kiểm tra hòm thư Spam hoặc liên hệ hotline 1900 xxxx nếu sau 15 phút vẫn chưa nhận được email." }
    ]
  };

  const { tieuDe, danhMuc, faqs } = supportData;

  return (
    <div className="bg-slate-950 min-h-screen text-white pb-20">
      <div className="bg-gradient-to-b from-orange-600/20 to-slate-950 py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">{tieuDe}</h1>
        <div className="max-w-2xl mx-auto relative">
          <input 
            type="text" 
            placeholder="Nhập vấn đề bạn cần giúp đỡ..."
            className="w-full py-4 px-6 rounded-full bg-slate-900 border border-slate-700 focus:border-orange-500 outline-none transition-all"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition-colors">
            🔍
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {danhMuc.map((item) => (
            <div key={item.id} className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-orange-500 transition-all cursor-pointer group text-center shadow-lg">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 text-orange-500">{item.ten}</h3>
              <p className="text-gray-400 text-sm">{item.moTa}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center uppercase border-b border-slate-800 pb-4">
            Câu hỏi thường gặp
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.id} className="group bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
                <summary className="flex justify-between items-center p-5 cursor-pointer font-bold hover:bg-slate-800 transition-colors">
                  {faq.cauHoi}
                  <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-5 text-gray-400 border-t border-slate-800 leading-relaxed bg-slate-900/50">
                  {faq.traLoi}
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center p-10 bg-orange-600/10 rounded-3xl border border-orange-500/20">
          <h3 className="text-xl font-bold mb-4">Vẫn chưa tìm thấy câu trả lời?</h3>
          <p className="text-gray-400 mb-6">Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn 24/7.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-orange-500 font-bold">Hotline:</span> 1900 1234
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-500 font-bold">Email:</span> support@tix.vn
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;