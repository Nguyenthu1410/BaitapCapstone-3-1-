import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { movieService } from '../services/movieService';
import { FieldNumberOutlined } from '@ant-design/icons';


export const useBooking = () => {
  const { showtimeId } = useParams(); // Lấy mã suất chiếu từ URL
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatList, setSeatList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Giả lập gọi API lấy danh sách ghế
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true);
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