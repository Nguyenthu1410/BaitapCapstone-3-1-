import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { movieService } from '../services/movieService';

/**
 * Custom hook xử lý logic lấy chi tiết phim
 */
export const useMovieDetail = () => {
  const { movieId } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await movieService.getMovieDetail(movieId);
        setDetail(res.data.content);
      } catch (error) {
        console.error("Lỗi lấy chi tiết phim:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchDetail();
    }
  }, [movieId]);

  return { detail, loading };
};

export default useMovieDetail