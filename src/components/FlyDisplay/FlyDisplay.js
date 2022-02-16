import './FlyDisplay.css'
import { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon'
import PropTypes from 'prop-types'
import Tag from '../Tag/Tag'

const FlyDisplay = ({ fly, handleClick, className }) => {

    const [favorite, setFavorite] = useState(fly.is_favorite || false)

    const { user } = useContext(UserContext)
    const navigate = useNavigate();

    if(handleClick === null)
        handleClick= () => navigate('/flies/' + fly.id)

    return (
        <div className={`card ${className ? className : ''}`} onClick={handleClick}>
            <img src={fly.image_url} alt="Fly Pic"/>
            {/* <img src="https://cdn11.bigcommerce.com/s-gozd41z4b7/images/stencil/1280x1280/products/456/1025/BH_Trip_Saver__92913.1574435303.jpg?c=1" alt="Fly Pic" /> */}
            <div className="info-horizontal">
                <h1>{fly.name}</h1>


                <p className='fly-description'>{fly.description}</p>
                <div className='bottom-row'>
                    <div className='icon-box' style={{padding: '6px'}}>
                        {/* {(fly.user_id === user?.id) && <button>Edit</button>} */}
                        <FavoriteIcon isFavorite={favorite} setFavorite={setFavorite} fly_id={fly.id} />
                    </div>
                    <span className='divider-bar'/>
                    <div className='tag-box'>
                        {fly.tag_list && fly.tag_list.split(',').map((tag, index) => <Tag text={tag} key={index}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

FlyDisplay.propTypes = {
    fly: PropTypes.object.isRequired,
    handleClick: PropTypes.func,
    className: PropTypes.string
}

FlyDisplay.defaultProps = {
    handleClick: null
}

export default FlyDisplay