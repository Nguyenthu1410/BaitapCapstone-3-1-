import { useEffect, useState } from 'react';
import { movieService } from '../services/movieService';

export const useMovieDetail = (movieId) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) {
      setDetail(null);
      setLoading(false);
      return;
    }

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await movieService.getMovieDetail(movieId);
        setDetail(res.data.content);
      } catch (error) {
        console.error('Lỗi lấy chi tiết phim:', error);
        setDetail(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [movieId]);

  return { detail, loading };
};

export default useMovieDetail;