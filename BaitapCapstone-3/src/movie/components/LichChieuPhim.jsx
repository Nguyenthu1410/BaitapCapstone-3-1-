import React, { useEffect, useState } from 'react';
import { Tabs, Tag } from 'antd';
import dayjs from 'dayjs';
import { cinemaService } from '../services/cinemaService';

const LichChieuPhim = () => {
  const [systems, setSystems] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const init = async () => {
      const res = await cinemaService.getSystemInfo();
      setSystems(res.data.content);
      if (res.data.content.length > 0) handleLoad(res.data.content[0].maHeThongRap);
    };
    init();
  }, []);

  const handleLoad = async (id) => {
    const res = await cinemaService.getShowtimesBySystem(id);
    setData(res.data.content);
  };

  return (
    <div className="container mx-auto py-10 bg-white rounded-xl shadow-2xl overflow-hidden my-10">
      <Tabs
        tabPosition="left"
        onChange={handleLoad}
        items={systems.map(sys => ({
          label: <img src={sys.logo} className="w-12 h-12" alt="logo" />,
          key: sys.maHeThongRap,
          children: (
            <Tabs
              tabPosition="left"
              className="h-[600px]"
              items={data[0]?.lstCumRap.map(cum => ({
                label: (
                  <div className="w-60 text-left border-b pb-2">
                    <p className="text-green-700 font-bold truncate">{cum.tenCumRap}</p>
                    <p className="text-xs text-gray-400 truncate">{cum.diaChi}</p>
                  </div>
                ),
                key: cum.maCumRap,
                children: (
                  <div className="h-[600px] overflow-y-auto p-4">
                    {cum.danhSachPhim.map(phim => (
                      <div key={phim.maPhim} className="flex gap-4 mb-10 pb-6 border-b">
                        <img src={phim.hinhAnh} className="w-24 h-32 object-cover rounded" alt="phim" />
                        <div>
                          <h4 className="text-xl font-bold text-slate-800 mb-4">{phim.tenPhim}</h4>
                          <div className="flex flex-wrap gap-3">
                            {phim.lstLichChieuTheoPhim.slice(0, 8).map(l => (
                              <Tag key={l.maLichChieu} color="green" className="cursor-pointer hover:scale-105 transition-transform py-1 px-3 text-sm font-medium">
                                {dayjs(l.ngayChieuGioChieu).format('HH:mm')}
                              </Tag>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              }))}
            />
          )
        }))}
      />
    </div>
  );
};

export default LichChieuPhim;