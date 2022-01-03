import './Header.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import {UserContext} from '../../context/UserContext'

const Header = ({toggleLoginModal}) => {

    const {user, setUser} = useContext(UserContext)

    const logoutUser = async () => {
        await fetch('http://localhost:4000/logout', {
            credentials: 'include'
        })
        setUser(null)
    }

    return (
        <header>
            {/* <img className="logo" src="http://localhost:3000/src/components/Header/3x.png" alt="logo"/> */}
            <nav>
                <ul className="nav_buttons">
                    <li><Link to="/flies">Flies</Link></li>
                    <li><Link to="/materials">{user?.username}</Link></li>
                    <li><a href="s">Kit Builder</a></li>
                    {user ?
                        <button onClick={() => {logoutUser()}}>Logout</button>
                    :
                    <button onClick={() => {
                        toggleLoginModal()
                    }}>Login</button>}
                </ul>
            </nav>
        </header>

    )
}

export default Header