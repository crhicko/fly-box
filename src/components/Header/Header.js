import './Header.css'

const Header = ({toggleLoginModal}) => {

    return (
        <header>
            {/* <img className="logo" src="http://localhost:3000/src/components/Header/3x.png" alt="logo"/> */}
            <nav>
                <ul className="nav_buttons">
                    <li><a href="s">Flies</a></li>
                    <li><a href="s">Techniques</a></li>
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