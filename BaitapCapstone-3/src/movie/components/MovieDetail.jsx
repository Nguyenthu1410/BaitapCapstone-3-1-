// src/movie/components/MovieDetail.jsx
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
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  // Hàm render danh sách lịch chiếu từ API
  const renderLichChieu = () => {
    if (!detail?.heThongRapChieu || detail.heThongRapChieu.length === 0) {
      return <div className="text-center py-10 text-gray-400">Hiện tại chưa có lịch chiếu.</div>;
    }

    return detail.heThongRapChieu.map((heThong) => (
      <div key={heThong.maHeThongRap} className="mb-8 bg-white/5 p-4 rounded-lg">
        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-3">
          <img src={heThong.logo} alt="logo" className="w-12 h-12" />
          <h2 className="text-xl font-bold text-orange-500 uppercase">{heThong.tenHeThongRap}</h2>
        </div>

        {heThong.cumRapChieu.map((cumRap) => (
          <div key={cumRap.maCumRap} className="mb-6 last:mb-0 ml-4">
            <h3 className="text-white font-semibold text-lg mb-3">{cumRap.tenCumRap}</h3>
            <div className="flex flex-wrap gap-4">
              {cumRap.lichChieuPhim.map((lich) => (
                <button
                  key={lich.maLichChieu}
                  onClick={() => navigate(`/checkout/${lich.maLichChieu}`)}
                  className="bg-slate-800 hover:bg-orange-600 hover:text-white transition-all px-4 py-2 rounded border border-white/10 text-sm font-medium"
                >
                  <span className="text-orange-400 group-hover:text-white">
                    {dayjs(lich.ngayChieuGioChieu).format("HH:mm")}
                  </span>
                  <span className="mx-1">|</span>
                  <span>{dayjs(lich.ngayChieuGioChieu).format("DD/MM")}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* Phần Banner phía trên giữ nguyên theo cấu trúc của bạn */}
      <div className="relative h-[550px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30 scale-110"
          style={{ backgroundImage: `url(${detail?.hinhAnh})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

        <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <img src={detail?.hinhAnh} alt={detail?.tenPhim} className="w-[220px] h-[320px] object-cover rounded shadow-2xl border border-gray-700" />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4 uppercase">{detail?.tenPhim}</h1>
            <p className="text-gray-400 mb-6">{dayjs(detail?.ngayKhoiChieu).format("DD.MM.YYYY")} - 120 phút</p>
            <button className="bg-red-600 hover:bg-red-700 px-10 py-3 rounded font-bold shadow-lg">MUA VÉ</button>
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
              label: <span className="text-xl font-bold uppercase px-6">Lịch chiếu</span>,
              key: "1",
              children: <div className="max-w-5xl mx-auto">{renderLichChieu()}</div>,
            },
            {
              label: <span className="text-xl font-bold uppercase px-6">Thông tin</span>,
              key: "2",
              children: (
                <div className="max-w-4xl mx-auto py-10">
                  <h3 className="text-orange-500 font-bold mb-4">NỘI DUNG PHIM</h3>
                  <p className="text-gray-300 leading-relaxed text-justify">{detail?.moTa}</p>
                </div>
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