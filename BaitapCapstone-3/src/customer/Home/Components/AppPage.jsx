import React from 'react'

const AppPage = () => {
  const appData = {
    tieuDe: "TIX - ĐẶT VÉ XEM PHIM & ƯU ĐÃI",
    moTaChinh: "Ứng dụng đặt vé xem phim hàng đầu Việt Nam. Không chỉ giúp bạn đặt vé nhanh chóng, TIX còn là nơi quản lý thẻ thành viên và cập nhật những khuyến mãi độc quyền dành riêng cho bạn.",
    hinhAnhDienThoai: "https://movie-booking-project.vercel.app/img/mobile/iphone.png",
    linkTai: {
      ios: "https://apps.apple.com/vn/app/tix-%C4%91%E1%BA%B7t-v%C3%A9-xem-phim/id1123456789",
      android: "https://play.google.com/store/apps/details?id=vn.tix.app",
    },
    danhSachTinhNang: [
    {
      id: 1,
      tieuDe: "Đặt vé siêu tốc",
      chiTiet: "Chọn phim, chọn rạp và thanh toán chỉ trong 1 phút.",
      icon: "⚡"
    },
    {
      id: 2,
      tieuDe: "Tích điểm thành viên",
      chiTiet: "Tự động tích điểm và đổi quà trực tiếp trên ứng dụng.",
      icon: "🎁"
    },
    {
      id: 3,
      tieuDe: "Nhắc lịch chiếu",
      chiTiet: "Không bao giờ bỏ lỡ suất chiếu của bộ phim bạn yêu thích.",
      icon: "🔔"
    },
    {
      id: 4,
      tieuDe: "Ưu đãi độc quyền",
      chiTiet: "Hàng ngàn voucher giảm giá mỗi tuần dành riêng cho App.",
      icon: "🔥"
    }
  ]
  }

  return (
   <div className="bg-slate-950 min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="lg:w-1/2 text-white">
            <h2 className="text-4xl font-extrabold mb-6 leading-tight uppercase">
              {tenUngDung}
            </h2>
            <p className="text-gray-400 text-lg mb-8 italic">
              "{moTaChinh}"
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {danhSachTinhNang.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-slate-900 rounded-lg border border-slate-800 hover:border-orange-500 transition-all">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-orange-500">{item.tieuDe}</h4>
                    <p className="text-xs text-gray-400">{item.chiTiet}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Nút tải App dùng link từ dữ liệu giả */}
            <div className="flex flex-wrap gap-4">
              <a 
                href={linkTai.ios} 
                target="_blank" 
                rel="noreferrer"
                className="bg-white text-black px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-200 transition-all"
              >
                <i className="fab fa-apple text-xl"></i> App Store
              </a>
              <a 
                href={linkTai.android} 
                target="_blank" 
                rel="noreferrer"
                className="border border-white text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-white hover:text-black transition-all"
              >
                <i className="fab fa-google-play text-xl"></i> Play Store
              </a>
            </div>
          </div>

          {/* Cột Phải: Hình ảnh Mockup điện thoại */}
          <div className="lg:w-1/2 flex justify-center relative">
            {/* Hiệu ứng phát sáng phía sau */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-600/10 blur-[120px] rounded-full"></div>
            
            <div className="relative w-[300px] h-[600px] border-[10px] border-slate-800 rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <img 
                src={hinhAnhDienThoai} 
                alt="App Preview" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://via.placeholder.com/300x600?text=TIX+APP"; }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AppPage