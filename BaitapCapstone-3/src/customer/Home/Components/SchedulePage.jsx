import React, { useEffect, useState } from 'react';
import { Tabs, Tag } from 'antd';
import dayjs from 'dayjs';
import { cinemaService } from '../../../movie/services/cinemaService';
import { useNavigate } from 'react-router';

const SchedulePage = () => {
  const navigate = useNavigate();
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
    <div className="container mx-auto py-10 px-4">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden min-h-[700px]">
        <Tabs
          tabPosition="left"
          onChange={handleLoad}
          className="system-tabs"
          items={systems.map((sys) => ({
            label: (
              <div className="p-2 border-b border-gray-100 hover:opacity-80 transition-all">
                <img src={sys.logo} className="w-12 h-12 object-contain mx-auto" alt={sys.tenHeThongRap} />
              </div>
            ),
            key: sys.maHeThongRap,
            children: (
              <Tabs
                tabPosition="left"
                className="cluster-tabs h-[700px]"
                items={data[0]?.lstCumRap?.map((cum) => ({
                  label: (
                    <div className="w-64 text-left p-3 border-b border-gray-100 group">
                      <div className="flex gap-3 items-center">
                        <img src={sys.logo} className="w-10 h-10 rounded shadow-sm opacity-70 group-hover:opacity-100" alt="theater" />
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-gray-800 truncate leading-tight uppercase">
                            {cum.tenCumRap.replace(" - ", " ")}
                          </p>
                          <p className="text-[11px] text-gray-500 truncate mt-1">{cum.diaChi}</p>
                          <span className="text-[10px] text-orange-500 font-bold uppercase mt-1 block">[Chi tiết]</span>
                        </div>
                      </div>
                    </div>
                  ),
                  key: cum.maCumRap,
                  children: (
                    <div className="h-[700px] overflow-y-auto p-6 bg-white">
                      {cum.danhSachPhim.map((phim) => (
                        <div key={phim.maPhim} className="flex gap-5 mb-10 pb-8 border-b border-gray-100 last:border-0">
                          {/* Poster phim bên trái */}
                          <div className="relative flex-shrink-0">
                            <img 
                              src={phim.hinhAnh} 
                              className="w-24 h-36 object-cover rounded-md shadow-md" 
                              alt={phim.tenPhim} 
                            />
                            <div className="absolute top-1 left-1 bg-orange-600 text-white text-[10px] font-bold px-1 rounded">C18</div>
                          </div>

                          <div className="flex-grow">
                            <div className="mb-4">
                              <h4 className="text-lg font-bold text-slate-900 leading-tight">
                                <span className="bg-orange-500 text-white text-xs px-1 rounded mr-2 uppercase">2D</span>
                                {phim.tenPhim}
                              </h4>
                              <p className="text-xs text-gray-400 mt-1 italic">120 phút - TIX 8.5 - IMDb 0</p>
                            </div>

                            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
                              {phim.lstLichChieuTheoPhim.slice(0, 12).map((l) => (
                                <div 
                                  key={l.maLichChieu} 
                                  onClick={() => navigate(`/checkout/${l.maLichChieu}`)} 
                                  className="text-center py-2 px-1 border border-gray-100 bg-gray-50 rounded hover:border-green-500 group transition-all cursor-pointer"
                                >
                                  <span className="text-green-600 font-bold text-base group-hover:text-green-700">
                                    {dayjs(l.ngayChieuGioChieu).format('HH:mm')}
                                  </span>
                                </div>
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

      <style>{`
        .system-tabs .ant-tabs-nav { width: 80px; border-right: 1px solid #f0f0f0; }
        .system-tabs .ant-tabs-ink-bar { display: none; }
        .cluster-tabs .ant-tabs-nav { width: 280px; border-right: 1px solid #f0f0f0; }
        .cluster-tabs .ant-tabs-tab { padding: 0 !important; margin: 0 !important; }
        .cluster-tabs .ant-tabs-tab-active { background-color: #f9fafb; }
        .ant-tabs-left > .ant-tabs-content-holder { border-left: none; }
      `}</style>
    </div>
  );
};

export default SchedulePage;