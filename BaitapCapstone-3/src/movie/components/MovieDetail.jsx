// src/movie/components/MovieDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { Spin, Rate, Button, Tag, message } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const MovieDetail = () => {
  const { movieId } = useParams();
  const { detail: movie, loading } = useMovieDetail(movieId);

  const handleOpenTrailer = () => {
    if (movie?.trailer) {
      window.open(movie.trailer, '_blank');
      return;
    }
    message.info('Trailer chưa có sẵn');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900">
        <Spin size="large" tip="Đang tải thông tin phim..." />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">Không tìm thấy thông tin phim</p>
          <p className="text-gray-400">Vui lòng kiểm tra lại đường dẫn hoặc thử lại sau.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-28 pb-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cột 1: Hình ảnh phim */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="relative group w-full max-w-sm">
              <img 
                src={movie?.hinhAnh} 
                alt={movie?.tenPhim} 
                className="rounded-xl shadow-2xl border-2 border-slate-800 w-full object-cover h-125"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                <Button
                  type="primary"
                  danger
                  size="large"
                  shape="round"
                  icon={<PlayCircleOutlined />}
                  onClick={handleOpenTrailer}
                >
                  XEM TRAILER
                </Button>
              </div>
            </div>
          </div>

          {/* Cột 2: Thông tin chi tiết */}
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {movie?.dangChieu && <Tag color="green">Đang chiếu</Tag>}
                {movie?.sapChieu && <Tag color="blue">Sắp chiếu</Tag>}
                {movie?.hot && <Tag color="volcano">Phim hot</Tag>}
              </div>
              <h1 className="text-5xl font-black tracking-tighter uppercase text-orange-500">
                {movie?.tenPhim}
              </h1>
              <p className="text-gray-400">Mã phim: {movie?.maPhim}</p>
            </div>

            <div className="flex items-center gap-6 py-4 border-y border-slate-800">
              <div className="text-center">
                <p className="text-gray-400 text-sm uppercase mb-1">Đánh giá</p>
                <Rate disabled allowHalf defaultValue={movie?.danhGia / 2} />
                <span className="ml-2 text-yellow-500 font-bold">{movie?.danhGia}/10</span>
              </div>
              <div className="h-10 w-px bg-slate-800"></div>
              <div>
                <p className="text-gray-400 text-sm uppercase mb-1">Khởi chiếu</p>
                <p className="font-bold">{dayjs(movie?.ngayKhoiChieu).format('DD - MM - YYYY')}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold border-l-4 border-orange-500 pl-3">NỘI DUNG</h3>
              <p className="text-gray-300 text-lg leading-relaxed italic">
                {movie?.moTa || "Thông tin đang được cập nhật..."}
              </p>
            </div>

            <div className="pt-6">
              <Button
                type="primary"
                danger
                size="large"
                className="h-14 px-10 text-lg font-black uppercase tracking-widest"
                onClick={() => window.location.href = `/checkout/${movie.maPhim}`}
              >
                Đặt Vé Ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;