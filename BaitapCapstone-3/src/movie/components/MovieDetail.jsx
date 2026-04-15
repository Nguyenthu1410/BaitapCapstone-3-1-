import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useMovieDetail from "../hooks/useMovieDetail";
import { Rate, Button } from "antd";
import dayjs from "dayjs";

const MovieDetail = () => {
  const { movieId } = useParams();
  const { data: movie, isLoading } = useMovieDetail(movieId);
  const navigate = useNavigate();

  if (isLoading)
    return <div className="text-white text-center py-20">Đang tải...</div>;

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 blur-sm"
        style={{ backgroundImage: `url(${movie?.hinhAnh})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          {/* Poster */}
          <div className="w-64 md:w-80 flex-shrink-0 shadow-2xl rounded-lg overflow-hidden border border-gray-700">
            <img
              src={movie?.hinhAnh}
              alt={movie?.tenPhim}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div>
              <p className="text-gray-400 mb-2">
                {movie?.ngayKhoiChieu
                  ? dayjs(movie.ngayKhoiChieu).format("DD.MM.YYYY")
                  : "Đang cập nhật"}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">
                {movie?.tenPhim}
              </h1>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <Rate disabled allowHalf value={movie?.danhGia / 2} />
              <span className="text-yellow-500 font-semibold text-lg">
                {movie?.danhGia}/10
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed max-w-2xl text-lg">
              {movie?.moTa}
            </p>

            <div className="pt-4">
              <button
                onClick={() => {
                  // Cuộn xuống phần lịch chiếu hoặc điều hướng
                  const element = document.getElementById("lich-chieu");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-md font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                MUA VÉ NGAY
              </button>
            </div>
          </div>
        </div>

        {/* Phần Lịch Chiếu (Sẽ hiển thị bên dưới) */}
        <div id="lich-chieu" className="mt-20">
          <h2 className="text-2xl font-bold mb-8 border-l-4 border-red-600 pl-4 uppercase">
            Lịch Chiếu Hệ Thống Rạp
          </h2>
          {/* Component hiển thị lịch chiếu của bạn sẽ đặt ở đây */}
          <div className="bg-white text-black rounded-lg overflow-hidden">
            {/* Gọi Component Showtimes tại đây */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
