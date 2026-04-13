import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { movieService } from '../services/movieService';

export const useBooking = () => {
  const { showtimeId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatList, setSeatList] = useState([]); // Chứa danh sách ghế (mảng)
  const [movieInfo, setMovieInfo] = useState(null); // Chứa thông tin phim/rạp
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true);
        const res = await movieService.getBookingMovie(showtimeId);
        
        const { thongTinPhim, danhSachGhe } = res.data.content;
        setSeatList(danhSachGhe); 
        setMovieInfo(thongTinPhim); 
      } catch (error) {
        console.error("Lỗi lấy vé phim:", error);       
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();
  }, [showtimeId]);

  const handleSelectSeat = (seat) => {
    if (seat.daDat) return;
    const index = selectedSeats.findIndex(s => s.maGhe === seat.maGhe);
    if (index !== -1) {
      setSelectedSeats(selectedSeats.filter(s => s.maGhe !== seat.maGhe));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const totalPrice = selectedSeats.reduce((total, seat) => total + seat.giaVe, 0);

  return {
    seatList,
    selectedSeats,
    movieInfo, 
    loading,
    totalPrice,
    handleSelectSeat
  };
};

export default useBooking;