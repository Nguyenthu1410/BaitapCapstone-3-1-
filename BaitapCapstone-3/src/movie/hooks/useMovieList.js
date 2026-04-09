import { useEffect, useState } from "react"
import { movieService } from "../services/movieService";

export const useMovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await movieService.getMovieList();
        setMovies(res.data.content); 
      } catch (error) {
        console.error("Lỗi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return { movies, loading };
};

export default useMovieList