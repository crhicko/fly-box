import './App.css';
import Header from './components/Header/Header'
import { useEffect, useState} from 'react'
import Login from './components/Login'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ErrorPage from './routes/ErrorPage';
import FliesPage from './routes/FliesPage';
import { UserContext } from './context/UserContext';
import HomePage from './routes/HomePage';
import FlyPage from './routes/FlyPage';

function App() {

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [user, setUser] = useState(null)

  const toggleLoginModal = () => {
    if (!openLoginModal) setOpenLoginModal(true)
    else setOpenLoginModal(false)
  }

  useEffect(() => {
    const checkLoggedIn = async () => {
      console.log('Checking auth')
      const res = await fetch('http://localhost:4000/user', {
        credentials: 'include'
      })
      const data = await res.json();
      console.log(data)
      if (data.is_auth) {
        console.log('setting user')
        setUser(data.user)
      }
    }
    checkLoggedIn()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Header toggleLoginModal={toggleLoginModal} />
        {openLoginModal && <Login toggleLoginModal={toggleLoginModal} />}
        <div className="centerBox">
          <Routes>
            <Route path="/materials" element={<Login />} />
            <Route path="/flies/:id" element={<FlyPage />} />
            <Route path="/flies" element={<FliesPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
