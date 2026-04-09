import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
// import './App.css'
import { Route, Routes } from 'react-router'
import MainLayout from './customer/Home/Components/MainLayout'
import { PUBLIC_PATH } from './constant'
import LichChieuPhim from './movie/components/LichChieuPhim'
import RapChieuPhim from './movie/components/RapChieuPhim'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
          <Route path={PUBLIC_PATH.HOME} element={<h1 className='h-[3000px]'>Home</h1>} />

          <Route path={PUBLIC_PATH.SCHEDULE} element={<LichChieuPhim />}/>
          <Route path={PUBLIC_PATH.CINEMA} element={<RapChieuPhim />} />

          <Route path='/register' />
          <Route path='/signIn'/>
      </Route>
    </Routes>
  )
}

export default App
