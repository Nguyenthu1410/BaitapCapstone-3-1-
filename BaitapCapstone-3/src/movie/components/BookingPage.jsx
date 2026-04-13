import React from 'react';
import { Button, Divider, Spin } from 'antd';
import useBooking from '../hooks/useBooking';

const BookingPage = () => {
  const { seatList, selectedSeats, movieInfo, loading, totalPrice, handleSelectSeat } = useBooking();

  if (loading) return (
    <div className="h-screen bg-slate-950 flex items-center justify-center">
        <Spin size="large" description="Đang tải phòng vé..." />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-4">
      <div className="container mx-auto grid grid-cols-12 gap-8">
        
        <div className="col-span-12 lg:col-span-8 bg-slate-900/40 p-10 rounded-2xl border border-slate-800">
          <div className="w-full h-1.5 bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)] mb-2"></div>
          <p className="text-center text-gray-600 text-[10px] uppercase tracking-[0.3em] mb-16">Màn hình</p>

          <div className="grid grid-cols-10 gap-2 md:gap-3 justify-center max-w-xl mx-auto">
            {seatList?.map((seat) => {
              const isSelected = selectedSeats.find(s => s.maGhe === seat.maGhe);
              return (
                <button
                  key={seat.maGhe}
                  disabled={seat.daDat}
                  onClick={() => handleSelectSeat(seat)}
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-sm text-[10px] font-bold transition-all duration-300
                    ${seat.daDat ? 'bg-slate-800 opacity-20 cursor-not-allowed' : 
                      isSelected ? 'bg-green-500 text-white scale-110 shadow-[0_0_15px_#22c55e]' : 
                      seat.loaiGhe === 'Vip' ? 'border border-orange-500/50 text-orange-500 hover:bg-orange-500 hover:text-white' : 
                      'bg-slate-800 text-gray-400 hover:bg-slate-700'}`}
                >
                  {seat.daDat ? "X" : seat.tenGhe}
                </button>
              );
            })}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white text-slate-900 rounded-2xl p-8 sticky top-24 shadow-2xl">
            <h2 className="text-4xl font-black text-center text-green-600 mb-8 tabular-nums">
              {totalPrice.toLocaleString()}đ
            </h2>
            <Divider />
            
            <div className="space-y-6">
              <div>
                <span className="text-gray-400 font-bold text-xs uppercase block mb-1">Phim</span>
                <span className="font-black text-xl uppercase tracking-tighter">
                  {movieInfo?.tenPhim}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-bold text-xs uppercase">Rạp</span>
                <span className="font-bold">{movieInfo?.tenCumRap}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-bold text-xs uppercase">Suất chiếu</span>
                <span className="font-bold">{movieInfo?.gioChieu} | {movieInfo?.ngayChieu}</span>
              </div>
              <div className="flex justify-between items-start border-t pt-6">
                <span className="text-gray-400 font-bold text-xs uppercase">Ghế chọn</span>
                <div className="flex flex-wrap gap-1 justify-end max-w-[200px]">
                  {selectedSeats.length > 0 ? selectedSeats.map(s => (
                    <span key={s.maGhe} className="text-orange-600 font-bold">G{s.tenGhe}, </span>
                  )) : <span className="text-gray-300 italic">Chưa chọn ghế</span>}
                </div>
              </div>
            </div>

            <Button 
              type="primary" danger block size="large"
              className="mt-12 h-16 text-lg font-black uppercase rounded-xl"
              disabled={selectedSeats.length === 0}
            >
              THANH TOÁN
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingPage;