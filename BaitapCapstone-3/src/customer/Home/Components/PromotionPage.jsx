import React from 'react';

const PromotionPage = () => {
  const promotions = [
    {
      maKhuyenMai: 1,
      tenKhuyenMai: 'NGÀY HỘI THÀNH VIÊN - ĐỒNG GIÁ 45K',
      hinhAnh: 'https://via.placeholder.com/600x400/1f2937/ffffff?text=Member+45K',
      moTa: 'Dành riêng cho thành viên đăng ký mới, ưu đãi đồng giá vé cực sốc vào mỗi thứ Hai.',
      ngayBatDau: '2024-01-01',
      ngayKetThuc: '2024-12-31',
      loaiKhuyenMai: 'Member',
    },
    {
      maKhuyenMai: 2,
      tenKhuyenMai: 'COMBO BẮP NƯỚC SIÊU TIẾT KIỆM',
      hinhAnh: 'https://via.placeholder.com/600x400/111827/ffa500?text=Combo+Bap+Nuoc',
      moTa: 'Giảm ngay 30% khi mua kèm combo bắp nước lớn tại quầy hoặc đặt trước online.',
      ngayBatDau: '2024-03-01',
      ngayKetThuc: '2024-05-01',
      loaiKhuyenMai: 'Combo',
    },
    {
      maKhuyenMai: 3,
      tenKhuyenMai: 'U22 - ĐỒNG GIÁ 50K TOÀN QUỐC',
      hinhAnh: 'https://via.placeholder.com/600x400/111827/38bdf8?text=U22+50K',
      moTa: 'Ưu đãi đặc biệt dành cho học sinh, sinh viên dưới 22 tuổi trên toàn hệ thống rạp.',
      ngayBatDau: '2024-01-01',
      ngayKetThuc: '2024-12-31',
      loaiKhuyenMai: 'Student',
    },
    {
      maKhuyenMai: 4,
      tenKhuyenMai: 'THANH TOÁN MOMO - GIẢM NGAY 20K',
      hinhAnh: 'https://via.placeholder.com/600x400/111827/f97316?text=MOMO+20K',
      moTa: 'Nhận voucher giảm giá trực tiếp khi chọn thanh toán qua ví điện tử MoMo.',
      ngayBatDau: '2024-04-01',
      ngayKetThuc: '2024-04-30',
      loaiKhuyenMai: 'Payment',
    },
    {
      maKhuyenMai: 5,
      tenKhuyenMai: 'THỨ TƯ GIẢM GIÁ - VÉ CHỈ 55K',
      hinhAnh: 'https://via.placeholder.com/600x400/111827/0ea5e9?text=Wednesday+55K',
      moTa: 'Giá vé giảm chỉ 55K cho tất cả suất chiếu vào thứ Tư, áp dụng cho mọi thể loại phim.',
      ngayBatDau: '2024-05-01',
      ngayKetThuc: '2024-08-31',
      loaiKhuyenMai: 'Midweek',
    },
    {
      maKhuyenMai: 6,
      tenKhuyenMai: 'HAPPY BIRTHDAY - QUÀ TẶNG 1 BẮP NƯỚC',
      hinhAnh: 'https://via.placeholder.com/600x400/111827/f472b6?text=Happy+Birthday',
      moTa: 'Khách hàng sinh nhật tháng này nhận ngay combo bắp nước miễn phí khi mua vé.',
      ngayBatDau: '2024-06-01',
      ngayKetThuc: '2024-06-30',
      loaiKhuyenMai: 'Birthday',
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 min-h-screen">
      <h2 className="text-3xl font-bold text-black mb-8 border-l-4 border-orange-500 pl-4">
        TIN KHUYẾN MÃI
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {promotions.map((item) => (
          <div
            key={item.maKhuyenMai}
            className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border border-slate-800 hover:border-orange-500 transition-all duration-300"
          >
            <div className="relative overflow-hidden h-56">
              <img
                src={item.hinhAnh}
                alt={item.tenKhuyenMai}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-4">
                <span className="inline-block bg-orange-500 text-slate-950 text-xs font-semibold uppercase px-3 py-1 rounded-full">
                  {item.loaiKhuyenMai}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-white leading-tight">{item.tenKhuyenMai}</h3>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{item.moTa}</p>
              <div className="text-sm text-gray-500">
                <p>Thời gian: {item.ngayBatDau} đến {item.ngayKetThuc}</p>
              </div>
              <button className="w-full bg-orange-500 hover:bg-orange-400 text-slate-950 font-semibold py-3 rounded-full transition-colors duration-200">
                XEM CHI TIẾT
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionPage;