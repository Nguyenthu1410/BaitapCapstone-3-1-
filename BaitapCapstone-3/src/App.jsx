import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
// import './App.css'
import { Route, Routes } from 'react-router'
import MainLayout from './customer/Home/Components/MainLayout'
// import { PUBLIC_PATH } from './constant'

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
          <Route path="/" element={<h1 className='h-[[3000px]'>Home</h1>} />
          <Route path='/register' />
          <Route path='/signIn'/>
      </Route>
    </Routes>
  )
}

export default App
