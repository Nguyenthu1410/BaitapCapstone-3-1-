import React, { useState, useMemo } from 'react';

const dateUtils = {
  getNext7Days: () => {
    return [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return d;
    });
  },
  formatToCompare: (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  },
  formatTime: (dateStr) => {
    return new Date(dateStr).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  },
  getDayName: (date) => {
    return new Intl.DateTimeFormat('vi-VN', { weekday: 'short' }).format(date);
  }
};

const MovieDetail = ({ movieInfo, movieSchedule }) => {
  const [activeSystem, setActiveSystem] = useState(0);
  const [activeDate, setActiveDate] = useState(dateUtils.formatToCompare(new Date()));
  
  const daysArr = useMemo(() => dateUtils.getNext7Days(), []);

  if (!movieInfo || !movieSchedule) return null;

  const currentSystem = movieSchedule.heThongRapChieu?.[activeSystem];

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans">
      
      <div 
        className="relative py-20 px-6 bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(to top, #0a0a0a, transparent), url(${movieInfo.hinhAnh})` }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
        <div className="relative z-10 container mx-auto flex flex-col md:flex-row gap-10 items-center">
          <img src={movieInfo.hinhAnh} className="w-64 rounded shadow-2xl border border-gray-700" alt={movieInfo.tenPhim} />
          <div className="space-y-4">
            <h1 className="text-4xl font-bold uppercase tracking-tight">{movieInfo.tenPhim}</h1>
            <p className="text-red-500 font-bold text-sm">C18 - PHIM DÀNH CHO KHÁN GIẢ TRÊN 18 TUỔI</p>
            <p className="max-w-2xl text-gray-300 leading-relaxed line-clamp-3">{movieInfo.moTa}</p>
            <div className="flex gap-4 pt-4">
              <button className="bg-green-600 hover:bg-green-700 px-8 py-2 rounded font-bold uppercase text-xs transition shadow-lg">Xem Trailer</button>
              <button className="bg-lime-500 hover:bg-lime-600 px-8 py-2 rounded font-bold uppercase text-xs text-black transition shadow-lg">Mua vé ngay</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="bg-white rounded-xl flex flex-col md:flex-row min-h-[600px] overflow-hidden shadow-2xl">
          
          <div className="w-full md:w-[80px] lg:w-[280px] bg-gray-50 border-r border-gray-200">
            {movieSchedule.heThongRapChieu?.map((htr, index) => (
              <div 
                key={htr.maHeThongRap}
                onClick={() => setActiveSystem(index)}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 transition border-b ${
                  activeSystem === index ? 'bg-white border-l-4 border-green-500' : 'opacity-40'
                }`}
              >
                <img src={htr.logo} className="w-10 h-10" alt={htr.tenHeThongRap} />
                <span className="hidden lg:block text-black font-bold text-xs uppercase">{htr.tenHeThongRap}</span>
              </div>
            ))}
          </div>

          <div className="flex-grow flex flex-col">
            
            <div className="flex border-b overflow-x-auto bg-gray-50 scrollbar-hide">
              {daysArr.map((date, i) => {
                const sDate = dateUtils.formatToCompare(date);
                const isSelected = activeDate === sDate;
                return (
                  <div 
                    key={i} 
                    onClick={() => setActiveDate(sDate)}
                    className={`p-4 min-w-[90px] text-center cursor-pointer transition relative ${
                      isSelected ? 'text-red-600 font-bold' : 'text-gray-500'
                    }`}
                  >
                    <p className="text-[10px] uppercase">{dateUtils.getDayName(date)}</p>
                    <p className="text-2xl">{date.getDate()}</p>
                    {isSelected && <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600"></div>}
                  </div>
                );
              })}
            </div>

            <div className="p-6 overflow-y-auto max-h-[500px] text-black bg-white">
              {currentSystem?.cumRapChieu?.map((cum) => {
                const filteredLich = cum.lichChieuPhim?.filter(item => 
                  dateUtils.formatToCompare(item.ngayChieuGioChieu) === activeDate
                );

                if (filteredLich?.length === 0) return null;

                return (
                  <div key={cum.maCumRap} className="mb-10 last:mb-0">
                    <div className="flex gap-3 mb-5">
                      <img src={currentSystem.logo} className="w-12 h-12 rounded shadow-md border" alt="" />
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg leading-tight">{cum.tenCumRap}</h3>
                        <p className="text-xs text-gray-400 italic">{cum.diaChi}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {filteredLich.map((lich) => (
                        <button 
                          key={lich.maLichChieu} 
                          className="bg-gray-50 border border-gray-200 py-2 px-3 rounded hover:bg-green-50 hover:border-green-300 transition group"
                        >
                          <span className="text-green-600 font-bold text-xl block">
                            {dateUtils.formatTime(lich.ngayChieuGioChieu)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
              
              {currentSystem?.cumRapChieu?.every(cum => 
                !cum.lichChieuPhim?.some(item => dateUtils.formatToCompare(item.ngayChieuGioChieu) === activeDate)
              ) && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 italic">
                  <p>Không có suất chiếu cho ngày này.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieDetail;