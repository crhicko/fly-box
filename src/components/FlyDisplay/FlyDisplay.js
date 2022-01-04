import './FlyDisplay.css'
import {  useState, useContext } from 'react'
import useDidUpdateEffect from '../../util/useDidUpdateEffect'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import FavoriteIcon from '../FavoriteIcon'

const FlyDisplay = ({ fly }) => {

    const [favorite, setFavorite] = useState(false)

    const {user} = useContext(UserContext)
    const navigate = useNavigate();

    return(
        <div className="card" onClick={() => navigate('/flies/' + fly.id)}>
            <img src="https://cdn11.bigcommerce.com/s-gozd41z4b7/images/stencil/1280x1280/products/456/1025/BH_Trip_Saver__92913.1574435303.jpg?c=1" alt="Fly Pic"/>
            <h1>{fly.name}</h1>
            <span className="tag">Nymph</span>
            <p>{fly.description}</p>
            {(fly.user_id === user?.id) && <button>Edit</button>}
            <FavoriteIcon isFavorite={favorite} setFavorite={setFavorite} fly_id={fly.id}/>
        </div>

    )
}


FlyDisplay.propTypes = {

}

export default FlyDisplay