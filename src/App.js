import './App.css';
import Header from './components/Header/Header'
import {useState} from 'react'
import Login from './components/Login'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ErrorPage from './routes/ErrorPage';
import FliesPage from './routes/FliesPage';

function App() {

    const [openLoginModal, setOpenLoginModal] = useState(false);

    const toggleLoginModal = () => {
      if(!openLoginModal) setOpenLoginModal(true)
      else setOpenLoginModal(false)
    }

  return (
    <BrowserRouter>
      <Header toggleLoginModal={toggleLoginModal}/>
      {openLoginModal && <Login toggleLoginModal={toggleLoginModal}/>}
      <Routes>
        <Route path="/materials" element={<Login/>} />
        <Route path="/flies" element={<FliesPage/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
