import React, { useEffect, useState } from 'react';
import { Tabs, Card, Tag } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { cinemaService } from '../services/cinemaService';

const CinemaPage = () => {
  const [systems, setSystems] = useState([]);
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await cinemaService.getSystemInfo();
      setSystems(res.data.content);
      if (res.data.content.length > 0) fetchClusters(res.data.content[0].maHeThongRap);
    };
    fetchData();
  }, []);

  const fetchClusters = async (id) => {
    const res = await cinemaService.getShowtimesBySystem(id);
    setClusters(res.data.content[0]?.lstCumRap || []);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-orange-500 pl-4">HỆ THỐNG RẠP CHIẾU</h2>
      <Tabs
        tabPosition="top"
        centered
        onChange={fetchClusters}
        items={systems.map(s => ({
          label: <img src={s.logo} className="w-12 h-12 p-1 bg-white rounded-full shadow-sm" alt={s.tenHeThongRap} />,
          key: s.maHeThongRap,
          children: (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {clusters.map(c => (
                <Card key={c.maCumRap} className="bg-slate-900 border-gray-800 hover:border-orange-500 transition-all">
                  <h3 className="text-orange-500 font-bold text-lg mb-3">{c.tenCumRap}</h3>
                  <p className="text-gray-400 text-sm flex items-start gap-2 mb-2">
                    <EnvironmentOutlined className="mt-1" /> {c.diaChi}
                  </p>
                  <Tag color="orange" className="mt-2">Đang hoạt động</Tag>
                </Card>
              ))}
            </div>
          )
        }))}
      />
    </div>
  );
};

export default CinemaPage;