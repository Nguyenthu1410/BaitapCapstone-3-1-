import { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';

export const useBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      try {
        const res = await movieService.getBannerList();
        setBanners(res.data.content);
      } catch (err) {
        console.error("Lỗi API Banner:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  return { banners, loading };
};

export default useBanner