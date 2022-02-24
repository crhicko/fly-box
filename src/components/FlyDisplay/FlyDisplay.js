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
            <div style={{position:'absolute', top:'.25em', right:'.25em'}}>
                <FavoriteIcon className='icon-shadow' isFavorite={favorite} setFavorite={setFavorite} fly_id={fly.id} />
            </div>
            <img src={fly.image_url} alt="Fly Pic"/>
            <div className="info-horizontal">
                <h3>{fly.name}</h3>
                <p className='fly-description'>{fly.tagline ? fly.tagline : fly.description}</p>
                <div className='bottom-row'>
                    <div className='icon-box' style={{padding: '6px'}}>

                    </div>
                    <span className='divider-bar'/>
                    <div className='tag-box'>
                        {fly.tag_list && fly.tag_list.split(',').map((tag, index) => <Tag text={tag} key={index} interactable={false}/>)}
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