import React from "react";
import { useNavigate, useParams} from 'react-router'
import { Rate } from "antd";
import dayjs from "dayjs";
import useMovieDetail from "../hooks/useMovieDetail";

const MovieDetail = () => {
  const { movieId } = useParams();
  const { data: movie, isLoading } = useMovieDetail();
  const navigate = useNavigate() ;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Đang tải thông tin phim...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        Không tìm thấy thông tin phim.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white">
      {/* Background mờ */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 blur-md"
        style={{ backgroundImage: `url(${movie?.hinhAnh})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black"></div>

      {/* Nội dung chính */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          
          {/* Poster */}
          <div className="w-64 md:w-80 flex-shrink-0 shadow-2xl rounded-lg overflow-hidden border border-gray-800">
            <img 
              src={movie?.hinhAnh} 
              alt={movie?.tenPhim} 
              className="w-full h-[450px] object-cover"
            />
          </div>

          {/* Thông tin phim */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div>
              <p className="text-red-500 font-semibold mb-2 uppercase tracking-widest">
                {/* Sửa lỗi format ngày tại đây */}
                {movie?.ngayKhoiChieu ? dayjs(movie.ngayKhoiChieu).format("DD.MM.YYYY") : "Sắp chiếu"}
              </p>
              <h1 className="text-4xl md:text-6xl font-extrabold uppercase mb-4">
                {movie?.tenPhim}
              </h1>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <Rate disabled allowHalf value={(movie?.danhGia || 0) / 2} />
              <span className="text-yellow-500 font-bold text-2xl">
                {movie?.danhGia}/10
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed max-w-2xl text-lg italic">
              {movie?.moTa || "Mô tả đang được cập nhật..."}
            </p>

            <div className="pt-6">
              <button 
                onClick={() => {
                  const element = document.getElementById('lich-chieu');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.5)]"
              >
                MUA VÉ NGAY
              </button>
            </div>
          </div>
        </div>

        {/* Anchor cho phần lịch chiếu */}
        <div id="lich-chieu" className="mt-32">
            <h2 className="text-3xl font-bold mb-10 border-l-8 border-red-600 pl-6 uppercase">
                Lịch Chiếu
            </h2>
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 min-h-[400px]">
                {/* Chèn component lịch chiếu của bạn ở đây */}
                <p className="text-center text-gray-400">Hệ thống lịch chiếu đang tải...</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;