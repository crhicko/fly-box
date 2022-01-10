import './Header.css'
import { Link, useNavigate} from 'react-router-dom'
import { useContext, useState } from 'react'
import {UserContext} from '../../context/UserContext'

const Header = () => {

    const {user, setUser} = useContext(UserContext)
    const [loginState, setLoginState] = useState(user)
    const navigate = useNavigate()

    const logoutUser = async () => {
        await fetch('http://localhost:4000/logout', {
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
                    <li><a href="s">Kit Builder</a></li>
                </ul>
            </nav>
            <div className="right-button-box">
                {user && <h1>{user?.username}</h1>}
                {user ?

                            <button onClick={() => {logoutUser()}}>Logout</button>
                        :
                        <button onClick={() => {
                            navigate('/login')
                        }}>Login</button>}
            </div>
        </header>

    )
}

export default Header