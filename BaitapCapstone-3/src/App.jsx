import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { Outlet, Route, Routes } from "react-router";
import MainLayout from "./customer/Home/Components/MainLayout";
import { PUBLIC_PATH } from "./constant";
import SchedulePage from "./movie/components/SchedulePage";
import CinemaPage from "./movie/components/CinemaPage";
import HomePage from "./customer/Home/Components/HomePage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
      <Outlet />
      
        <Route
          path={PUBLIC_PATH.HOME}
          element={
            <h1 className="h-[3000px]">
              <HomePage />
            </h1>
          }
        />

        <Route path={PUBLIC_PATH.SCHEDULE} element={<SchedulePage />} />
        <Route path={PUBLIC_PATH.CINEMA} element={<CinemaPage />} />

        <Route path="/register" />
        <Route path="/signIn" />
      </Route>
    </Routes>
  );
}

export default App;
