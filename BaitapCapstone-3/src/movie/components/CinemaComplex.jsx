import React, { useEffect, useState } from 'react';
import { Tabs, Spin } from 'antd';
import { cinemaService } from '../../services/cinemaService';
import dayjs from 'dayjs';

const CinemaComplex = () => {
  const [systems, setSystems] = useState([]); // Lưu API 1
  const [showtimes, setShowtimes] = useState([]); // Lưu API 2
  const [loading, setLoading] = useState(false);

  // Bước 1: Lấy danh sách hệ thống rạp ngay khi load trang
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        const res = await cinemaService.getSystemInfo();
        setSystems(res.data.content);
        
        // Mặc định lấy lịch chiếu của hệ thống đầu tiên trong danh sách
        if (res.data.content.length > 0) {
          handleGetShowtimes(res.data.content[0].maHeThongRap);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  // Bước 2: Hàm lấy lịch chiếu khi click vào logo rạp
  const handleGetShowtimes = async (maHeThong) => {
    try {
      const res = await cinemaService.getShowtimesBySystem(maHeThong);
      setShowtimes(res.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Spin size="large" className="block mx-auto my-10" />;

  return (
    <div className="container mx-auto py-12 px-4 bg-white rounded-lg shadow-lg">
      <Tabs
        tabPosition="left"
        onChange={(key) => handleGetShowtimes(key)} // Gọi API 2 khi đổi tab rạp
        items={systems.map((sys) => ({
          label: <img src={sys.logo} alt={sys.tenHeThongRap} className="w-12 h-12 transition-transform hover:scale-110" />,
          key: sys.maHeThongRap,
          children: (
            <Tabs
              tabPosition="left"
              className="h-[600px] overflow-hidden"
              items={showtimes[0]?.lstCumRap.map((cum) => ({
                label: (
                  <div className="w-64 text-left border-b pb-2">
                    <p className="text-green-600 font-bold truncate">{cum.tenCumRap}</p>
                    <p className="text-xs text-gray-400 truncate">{cum.diaChi}</p>
                  </div>
                ),
                key: cum.maCumRap,
                children: (
                  <div className="h-full overflow-y-auto pr-4 custom-scrollbar">
                    {cum.danhSachPhim.map((phim) => (
                      <div key={phim.maPhim} className="flex gap-4 mb-8 border-b border-gray-100 pb-4 last:border-0">
                        <img src={phim.hinhAnh} alt={phim.tenPhim} className="w-20 h-28 object-cover rounded shadow" />
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-slate-800 uppercase mb-3">{phim.tenPhim}</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {phim.lstLichChieuTheoPhim.slice(0, 8).map((lich) => (
                              <button key={lich.maLichChieu} className="bg-gray-50 border border-gray-200 text-green-600 py-1 rounded hover:bg-green-500 hover:text-white transition-all text-sm font-medium">
                                {dayjs(lich.ngayChieuGioChieu).format('DD/MM ~ HH:mm')}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              }))}
            />
          ),
        }))}
      />
    </div>
  );
};

export default CinemaComplex;