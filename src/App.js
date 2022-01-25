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
import Footer from './components/Footer';
import AddFlyPage from './routes/AddFlyPage';

function App() {

  const [user, setUser] = useState(null)

  const toggleLoginModal = () => {
    if (!openLoginModal) setOpenLoginModal(true)
    else setOpenLoginModal(false)
  }

  useEffect(() => {
    const checkLoggedIn = async () => {
      console.log(process.env.REACT_APP_API_URL)
      const res = await fetch(process.env.REACT_APP_API_URL + '/user', {
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
    <div className='sizing-wrapper'>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Header/>
          <div className="center-box">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/flies/:id" element={<FlyPage />} />
              <Route path="/flies" element={<FliesPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/add-fly" element={<AddFlyPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
