import React from 'react'
import Banner from './Banner'
import MovieListHome from './MovieListHome'
import SchedulePage from '../../../movie/components/SchedulePage'
import CinemaPage from '../../../movie/components/CinemaPage'

const HomePage = () => {
  return (
    <div>
        <Banner />
        <MovieListHome />
        <SchedulePage />
        <CinemaPage />
    </div>
  )
}

export default HomePage