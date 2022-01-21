import './Header.css'
import { Link, useNavigate} from 'react-router-dom'
import { useContext, useState } from 'react'
import {UserContext} from '../../context/UserContext'

const Header = () => {

    const {user, setUser} = useContext(UserContext)
    const [loginState, setLoginState] = useState(user)
    const navigate = useNavigate()

    const logoutUser = async () => {
        await fetch(process.env.REACT_APP_API_URL + '/logout', {
            credentials: 'include'
        })
        setUser(null)
        navigate("/home")
    }

    return (
        <header>
            <div>
                <img className="logo" src="http://localhost:3000/src/components/Header/3x.png" alt="logo"/>
            </div>
            <nav>
                <ul className="nav_buttons">
                    <li><Link to="/flies">Flies</Link></li>
                    <li><Link to="/materials">Materials</Link></li>
                    <li><Link to="/error">Kit Builder</Link></li>
                </ul>
            </nav>
            <div className="right-button-box">
                {user && <h1>{user?.username}</h1>}
                {user ?
                            <button className="btn" onClick={() => {logoutUser()}}>Logout</button>
                        :
                        <button className="btn" onClick={() => {
                            navigate('/login')
                        }}>Log In</button>}
            </div>
        </header>

    )
}

export default Header