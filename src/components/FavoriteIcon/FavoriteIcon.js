import PropTypes from 'prop-types'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Star } from 'phosphor-react'

const FavoriteIcon = ( {className, isFavorite, setFavorite, fly_id} ) => {

    const {user} = useContext(UserContext)

    const toggleFavorite = () => {
        if(!user) return
        updateFavorite(!isFavorite)
        setFavorite(!isFavorite)
    }

    const updateFavorite = async(fav) => {
        const res = await fetch(process.env.REACT_APP_API_URL + '/flies/' + fly_id + '/favorite', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                set_favorite: fav
            })
        })
        console.log(await res.json())
    }

    return (
        <Star className={`grow-icon ${className}`} size={24} weight={isFavorite ? 'fill' : 'duotone'} color={isFavorite ? 'gold' : 'white'} onClick={(e) => {toggleFavorite(); e.stopPropagation();}}/>
    )
}

FavoriteIcon.propTypes = {
    isFavorite: PropTypes.bool.isRequired,
    setFavorite: PropTypes.func.isRequired,
    fly_id: PropTypes.number.isRequired
}

export default FavoriteIcon