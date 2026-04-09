import React from "react";
import { Card, Row, Col, Spin, Button } from "antd";
import { useMovieList } from "../../../movie/hooks/useMovieList";
import MovieItem from "../../../movie/components/MovieItem";

const MovieListHome = () => {
  const { movies, loading } = useMovieList();

  if (loading)
    return (
      <div className="text-center py-20">
        <Spin size="large" />
      </div>
    );

  return (
    <section className="bg-slate-950 py-16 px-4 sm:px-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-white border-l-4 border-orange-500 pl-4 uppercase tracking-tighter">
            Phim Đang Chiếu
          </h2>
          <span className="text-orange-500 cursor-pointer hover:underline font-medium">
            Xem tất cả {'>'}
          </span>
        </div>

        <Row gutter={[24, 32]}>
          {movies.slice(0, 8).map((movie) => (
            <Col xs={24} sm={12} md={8} lg={6} key={movie.maPhim}>
              <MovieItem movie={movie} />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default MovieListHome;
