import { useEffect, useState } from "react"
import { movieService } from "../services/movieService";


const useMovieDetail = (movieId) => {
  const [data, setData] = useState({
    movieInfo: null,
    movieSchedule: null,
    loading: true,
    error: null,    
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resInfo, resSchedule] = await Promise.all([
          movieService.getMovieSchedule(movieId),
          movieService.getMovieDetail(movieId)
        ]);

        setData({
          movieInfo: resInfo.data.content,
          movieSchedule: resSchedule.data.content,
          loading: false,
          error: null,
        });        
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setData(prev => ({
          ...prev,
          loading: false,
          error:'Không thể lấy thông tin phim. Kiểm tra lại Token hoặc ID phim!'
        }));
      }
    };

    if (movieId) {
      fetchMovieData();
    }
  }, [movieId]);
  
  return data;
}

export default useMovieDetail;