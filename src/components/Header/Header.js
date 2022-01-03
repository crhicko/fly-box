import './Header.css'
import { Link } from 'react-router-dom'

const Header = ({toggleLoginModal}) => {

    return (
        <header>
            {/* <img className="logo" src="http://localhost:3000/src/components/Header/3x.png" alt="logo"/> */}
            <nav>
                <ul className="nav_buttons">
                    <li><Link to="/flies">Flies</Link></li>
                    <li><Link to="/materials">Techniques</Link></li>
                    <li><a href="s">Kit Builder</a></li>
                    <button onClick={() => {
                        toggleLoginModal()
                    }}>Login</button>
                </ul>
            </nav>
        </header>

    )
}

export default Header