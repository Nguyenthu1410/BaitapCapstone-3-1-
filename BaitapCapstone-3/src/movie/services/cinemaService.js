import axios from "axios";

const BASE_URL = 'https://movienew.cybersoft.edu.vn/api';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4OCIsIkhldEhhblN0cmluZyI6IjEzLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTI1NzYwMDAwMCIsIm5iZiI6MTc2MDAyOTIwMCwiZXhwIjoxNzg5NDA1MjAwfQ.iI-CMLB1SVt9X1NenUM2bnWci5Iq2JJHDgI0k0d29dg';

export const cinemaService = {
  getShowtimesBySystem: (maHeThongRap) => {
    return axios.get(`${BASE_URL}/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP01`, {
      headers: {
        TokenCybersoft: TOKEN,
      },
    });
  },

  getSystemInfo: () => {
    return axios.get(`${BASE_URL}/QuanLyRap/LayThongTinHeThongRap`, {
      headers: {
        TokenCybersoft: TOKEN,
      },       
    });
  },

};