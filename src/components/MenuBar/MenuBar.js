import BarItem from "./BarItem"
import "./MenuBar.css"

const MenuBar = () => {
    return(
        <ul className="container">
            <BarItem title='Flies'></BarItem>
            <BarItem title='Techniques'></BarItem>
            <BarItem title='Kit Builder'></BarItem>
        </ul>
    )
}

export default MenuBar