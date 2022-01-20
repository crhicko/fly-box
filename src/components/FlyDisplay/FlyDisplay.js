import './FlyDisplay.css'
import { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import FavoriteIcon from '../FavoriteIcon'
import PropTypes from 'prop-types'

const FlyDisplay = ({ fly }) => {

    const [favorite, setFavorite] = useState(fly.is_favorite || false)

    const { user } = useContext(UserContext)
    const navigate = useNavigate();

    return (
        <div className="card-horizontal" onClick={() => navigate('/flies/' + fly.id)}>
            <img src="https://cdn11.bigcommerce.com/s-gozd41z4b7/images/stencil/1280x1280/products/456/1025/BH_Trip_Saver__92913.1574435303.jpg?c=1" alt="Fly Pic" />
            <div className="info-horizontal">
                <h1>{fly.name}</h1>


                <p className='fly-description'>{fly.description}</p>
                <div className='bottom-row'>
                    <div className='icon-box'>
                        {(fly.user_id === user?.id) && <button>Edit</button>}
                        <FavoriteIcon isFavorite={favorite} setFavorite={setFavorite} fly_id={fly.id} />
                    </div>
                    <span className='divider-bar'/>
                    <div className='tag-box'>
                        <span className="tag">Nymph</span>
                        <span className="tag">Nymph</span>
                        <span className="tag">Nymph</span>
                    </div>
                </div>
            </div>
        </div>

        // <div className="card" onClick={() => navigate('/flies/' + fly.id)}>
        //     <img src="https://cdn11.bigcommerce.com/s-gozd41z4b7/images/stencil/1280x1280/products/456/1025/BH_Trip_Saver__92913.1574435303.jpg?c=1" alt="Fly Pic"/>
        //     <h1>{fly.name}</h1>
        //     <span className="tag">Nymph</span>
        //     <p>{fly.description}</p>
        //     <div className='icon-box'>
        //         {(fly.user_id === user?.id) && <button>Edit</button>}
        //         <FavoriteIcon isFavorite={favorite} setFavorite={setFavorite} fly_id={fly.id}/>
        //     </div>
        // </div>

    )
}


FlyDisplay.propTypes = {
    fly: PropTypes.object.isRequired
}

export default FlyDisplay