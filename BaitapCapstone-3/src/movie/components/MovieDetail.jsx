import React from 'react';
import { Spin, Rate } from 'antd';
import useMovieDetail from '../hooks/useMovieDetail';

const MovieDetail = () => {
  const { detail, loading } = useMovieDetail();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <Spin size="large" description ="Đang tải dữ liệu..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-4">
      <div className="container mx-auto flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <img 
            src={detail?.hinhAnh} 
            alt={detail?.tenPhim} 
            className="w-full rounded-xl shadow-2xl border border-slate-800"
            onError={(e) => { e.target.src = "https://via.placeholder.com/300x450?text=No+Image"; }}
          />
        </div>

        <div className="w-full md:w-2/3 lg:w-3/4">
          <h1 className="text-4xl font-bold mb-4 uppercase text-orange-500">
            {detail?.tenPhim}
          </h1>
          
          <div className="flex items-center gap-4 mb-6 text-xl">
             <Rate disabled defaultValue={detail?.danhGia / 2} allowHalf className="text-orange-500" />
             <span className="text-gray-400">({detail?.danhGia}/10)</span>
          </div>

          <div className="space-y-4">
            <p className="text-lg">
              <span className="text-orange-500 font-bold">Ngày chiếu:</span>{" "}
              {new Date(detail?.ngayKhoiChieu).toLocaleDateString()}
            </p>
            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800">
              <p className="font-bold mb-2 text-white text-lg">Nội dung phim:</p>
              <p className="text-gray-400 leading-relaxed text-justify">
                {detail?.moTa || "Đang cập nhật nội dung..."}
              </p>
            </div>
          </div>

          <button className="mt-8 bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-orange-500/20 active:scale-95">
            ĐẶT VÉ NGAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;