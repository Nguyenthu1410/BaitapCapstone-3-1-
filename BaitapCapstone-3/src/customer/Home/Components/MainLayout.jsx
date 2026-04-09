import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Banner from "./Banner";
import Footer from "./Footer";
import MovieListHome from "./MovieListHome";
import CinemaComplex from "../../../movie/components/CinemaComplex";

const MainLayout = () => {
  return (
   <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      <main className="flex-grow">
        {/* {Phần Banner */}
        <Banner />

        {/* Danh sách phim */}
        <MovieListHome />

        {/* Hệ thống rạp và lịch chiếu */}
        <CinemaComplex />
        
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};


export default MainLayout;
