import './Header.css'
import { Link, useNavigate, Outlet} from 'react-router-dom'
import { useContext, useState } from 'react'
import {UserContext} from '../../context/UserContext'
import { User } from 'phosphor-react'
import logo from '../../images/logo.png'

const Header = () => {

    const {user, setUser, hasCheckedUser} = useContext(UserContext)
    const [loginState, setLoginState] = useState(user)
    const navigate = useNavigate()

    console.log('Header: ' + user)

    const logoutUser = async () => {
        console.log("HERE")
        await fetch(process.env.REACT_APP_API_URL + '/logout', {
            credentials: 'include'
        })
        setUser(null)
        navigate("/flies")
    }

    const buttonResolver = () => {
        return (
            user ?
                <>
                    <button className="btn user-button" onClick={() =>  logoutUser()}>
                        <h3>{user?.username}</h3>
                        <User size={20} />
                    </button>
                </>
                    :
                    <button className="btn" onClick={() => {
                        navigate('/login')
                    }}><h3>Log In</h3></button>
        )
    }

    return (
        <>
        <header>
            <div>
                <img className="logo" src={logo} alt="logo" onClick={() => navigate('/flies')}/>
            </div>
            <nav>
                <ul className="nav_buttons">
                    <li><Link to="/flies">Flies</Link></li>
                    <li><Link to="/add-fly">Add Fly</Link></li>
                    {/* <li><Link to="/error">Kit Builder</Link></li> */}
                </ul>
            </nav>
            {/* navigate(`/users/${user.username}` */}
            <div className="right-button-box">
                {hasCheckedUser ? buttonResolver() : null}
            </div>
        </header>

        <Outlet/>
        </>

    )
}

export default Header