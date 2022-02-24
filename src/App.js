import './App.css';
import Header from './components/Header/Header'
import { useEffect, useState} from 'react'
import Login from './components/Login'
import { BrowserRouter, Routes, Route, Navigate, Switch} from "react-router-dom";
import ErrorPage from './routes/ErrorPage';
import FliesPage from './routes/FliesPage/FliesPage';
import { UserContext } from './context/UserContext';
import FlyPage from './routes/FlyPage';
import Footer from './components/Footer';
import AddFlyPage from './routes/AddFlyPage';
import LandingPage from './routes/LandingPage/LandingPage'

function App() {

  const [user, setUser] = useState(null)

  const toggleLoginModal = () => {
    if (!openLoginModal) setOpenLoginModal(true)
    else setOpenLoginModal(false)
  }

  useEffect(() => {
    const checkLoggedIn = async () => {
      const res = await fetch(process.env.REACT_APP_API_URL + '/user', {
        credentials: 'include'
      })
      const data = await res.json();
      if (data.is_auth) {
        setUser(data.user)
      }
    }
    checkLoggedIn()
  }, [])

  //overwrite the console.log reference to point to an empty function if in production
  if (process.env.REACT_APP_ENV === 'prod')
    console.log = function no_console() {};

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>

          {/* <div className="center-box"> */}
            <Routes>
              <Route element={<Header/>}>
                <Route path="/flies/:id" element={<FlyPage />} />
                <Route path="/flies" element={<FliesPage />} />
                <Route path="/add-fly" element={user ? <> <AddFlyPage /> </>: <Navigate to="/login"/>} />
              </Route>
              {/* <Route path="/" element={<Navigate to="/flies"/>} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          {/* </div> */}
          <Footer/>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
