import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { movieService } from '../services/movieService';

export const useBooking = () => {
  const { showtimeId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatList, setSeatList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true);
        // showtimeId từ URL sẽ được truyền vào đây
        const res = await movieService.getBookingMovie(showtimeId);
        setSeatList(res.data.content);
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

  // Tính tổng tiền dựa trên danh sách ghế đã chọn
  const totalPrice = selectedSeats.reduce((total, seat) => total + seat.giaVe, 0);

  return {
    seatList,
    selectedSeats,
    loading,
    totalPrice,
    handleSelectSeat
  };
};

export default useBooking;