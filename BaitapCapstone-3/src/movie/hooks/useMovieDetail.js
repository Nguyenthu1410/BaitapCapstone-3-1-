// src/movie/hooks/useMovieDetail.js
import { useEffect, useState } from 'react';
import { movieService } from '../services/movieService';

export const useMovieDetail = () => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await movieService.getMovieSchedule(); 
        setDetail(res.data.content);
      } catch (error) {
        console.error("Lỗi lấy chi tiết phim:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, []); 

  return { detail, loading };
};

export default useMovieDetail;