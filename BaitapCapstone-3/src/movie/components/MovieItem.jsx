import React from 'react';
import { Button, Tag } from 'antd';
import { PlayCircleOutlined, StarFilled } from '@ant-design/icons';

const MovieItem = ({ movie }) => {
  return (
    <div className="group relative bg-slate-900 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <Button 
             type="primary" 
             danger 
             shape="circle" 
             icon={<PlayCircleOutlined className="text-3xl" />} 
             className="w-16 h-16 mb-4 scale-50 group-hover:scale-100 transition-transform duration-300"
           />
           <Button className="font-bold border-white text-white hover:bg-white hover:text-black">
             CHI TIẾT
           </Button>
        </div>

        <div className="absolute top-2 right-2">
          <Tag color="warning" className="m-0 font-bold flex items-center gap-1 border-none bg-orange-500 text-white">
            <StarFilled /> {movie.danhGia}
          </Tag>
        </div>
      </div>

      <div className="p-4 bg-slate-900">
        <h3 className="text-white font-bold text-lg truncate uppercase mb-1">
          {movie.tenPhim}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 h-10">
          {movie.moTa}
        </p>
        
        <div className="mt-4">
          <Button 
            block 
            danger 
            type="primary" 
            className="h-10 font-bold tracking-wider"
          >
            MUA VÉ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieItem