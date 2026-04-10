import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { Route, Routes } from "react-router";
import MainLayout from "./customer/Home/Components/MainLayout";
import { PUBLIC_PATH } from "./constant";
import SchedulePage from "./customer/Home/Components/SchedulePage";
import CinemaPage from "./customer/Home/Components/CinemaPage";
import HomePage from "./customer/Home/Components/HomePage";
import PromotionPage from "./customer/Home/Components/PromotionPage";
import AppPage from "./customer/Home/Components/AppPage";
import SupportPage from "./customer/Home/Components/SupportPage";
import MovieDetail from "./movie/components/MovieDetail";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path={PUBLIC_PATH.HOME}
          element={
            <h1>
              <HomePage />
            </h1>
          }
        />

        <Route path={PUBLIC_PATH.SCHEDULE} element={<SchedulePage />} />
        <Route path={PUBLIC_PATH.CINEMA} element={<CinemaPage />} />
        <Route path={PUBLIC_PATH.PROMOTION} element={<PromotionPage />}/>
        <Route path={PUBLIC_PATH.APP} element={<AppPage />}/>
        <Route path={PUBLIC_PATH.SUPPORT} element={<SupportPage />}/>
        <Route path={PUBLIC_PATH.MOVIE_DETAIL} element={<MovieDetail />}/>

        <Route path="/register" />
        <Route path="/signIn" />
      </Route>
    </Routes>
  );
}

export default App;
