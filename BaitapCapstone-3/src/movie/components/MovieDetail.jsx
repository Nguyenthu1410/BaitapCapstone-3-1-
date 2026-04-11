import React from "react";
import { Progress, Rate, Tabs, Spin } from "antd";
import { useMovieDetail } from "../hooks/useMovieDetail";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

const MovieDetail = () => {
  const { detail, loading } = useMovieDetail();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950">
        <Spin size="large" description="Đang tải dữ liệu..." />
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30 scale-110"
          style={{ backgroundImage: `url(${detail?.hinhAnh})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

        <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="relative group w-[220px] h-[320px] flex-shrink-0">
            <img
              src={detail?.hinhAnh}
              alt={detail?.tenPhim}
              className="w-full h-full object-cover rounded shadow-2xl border border-gray-700"
            />
            <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-bold px-1 rounded">
              C18
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 cursor-pointer">
              <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center">
                <span className="text-white text-2xl ml-1">▶</span>
              </div>
            </div>
          </div>

          <div className="flex-grow text-center md:text-left">
            <p className="text-sm text-gray-400 mb-1">
              {dayjs(detail?.ngayKhoiChieu).format("DD.MM.YYYY")}
            </p>
            <h1 className="text-3xl font-bold mb-3 uppercase tracking-wider">
              <span className="bg-orange-500 text-white text-xs px-1 rounded mr-2 align-middle">
                P
              </span>
              {detail?.tenPhim}
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              120 phút - 0 IMDb - 2D/Digital
            </p>

            <button
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-bold transition-all shadow-lg active:scale-95"
              onClick={() => navigate(`/checkout/${detail.maPhim}`)}
            >
              MUA VÉ
            </button>
          </div>

          <div className="hidden lg:flex flex-col items-center gap-2">
            <div className="relative">
              <Progress
                type="circle"
                percent={detail?.danhGia * 10}
                format={() => (
                  <span className="text-white font-bold text-2xl">
                    {detail?.danhGia}
                  </span>
                )}
                strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                strokeWidth={8}
                size={120}
              />
            </div>
            <Rate
              disabled
              defaultValue={detail?.danhGia / 2}
              allowHalf
              className="text-orange-500 text-sm"
            />
            <p className="text-xs text-gray-400">10 người đánh giá</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20 pb-20">
        <Tabs
          defaultActiveKey="1"
          centered
          className="custom-movie-tabs"
          items={[
            {
              label: (
                <span className="text-xl font-bold uppercase px-4">
                  Lịch chiếu
                </span>
              ),
              key: "1",
              children: (
                <div className="p-10 bg-white/5 rounded-lg border border-white/10 text-center text-gray-400">
                  Hiện tại chưa có lịch chiếu cho bộ phim này.
                </div>
              ),
            },
            {
              label: (
                <span className="text-xl font-bold uppercase px-4">
                  Thông tin
                </span>
              ),
              key: "2",
              children: (
                <div className="max-w-4xl mx-auto py-10">
                  <h3 className="text-orange-500 font-bold mb-4">
                    NỘI DUNG PHIM
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-justify">
                    {detail?.moTa}
                  </p>
                </div>
              ),
            },
            {
              label: (
                <span className="text-xl font-bold uppercase px-4">
                  Đánh giá
                </span>
              ),
              key: "3",
              children: (
                <div className="text-center py-20">Chưa có đánh giá nào.</div>
              ),
            },
          ]}
        />
      </div>

      <style>{`
        .custom-movie-tabs .ant-tabs-nav::before { border-bottom: none; }
        .custom-movie-tabs .ant-tabs-tab { color: #94a3b8 !important; transition: all 0.3s; }
        .custom-movie-tabs .ant-tabs-tab-active .ant-tabs-tab-btn { color: #f97316 !important; transform: scale(1.1); }
        .custom-movie-tabs .ant-tabs-ink-bar { background: #f97316 !important; height: 3px !important; }
      `}</style>
    </div>
  );
};

export default MovieDetail;
