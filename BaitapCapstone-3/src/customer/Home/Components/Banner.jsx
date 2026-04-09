import React from 'react';
import { Carousel, Spin } from 'antd';
import { useBanner } from '../../../movie/hooks/useBanner';

const Banner = () => {
  const { banners, loading } = useBanner();

  if (loading) return (
    <div className="h-[500px] flex items-center justify-center bg-black text-white">
      <Spin description ='loading'/>
    </div>
  );
  return (
    <div className="relative group p-5 bg-slate-800">
      <Carousel 
        autoplay 
        effect="fade"
        dots={{ className: "custom-dots" }}
      >
        {banners.map((banner) => (
          <div key={banner.maBanner}>
            <div 
              className="h-[300px] sm:h-[500px] md:h-[700px] w-full bg-no-repeat bg-cover bg-center transition-all duration-700 rounded"
              style={{ 
                backgroundImage: `url(${banner.hinhAnh})`,
              }}
            >
              <div className="w-full h-full bg-black/30 flex items-center">
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <style>
        {`
          .ant-carousel .slick-dots li button {
            width: 10px !important;
            height: 10px !important;
            border-radius: 50% !important;
          }
          .ant-carousel .slick-dots li.slick-active button {
            width: 30px !important;
            border-radius: 5px !important;
            background: #ff4d4f !important;
          }
        `}
      </style>
    </div>
  );
};

export default Banner;