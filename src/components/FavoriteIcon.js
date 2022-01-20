import PropTypes from 'prop-types'

const FavoriteIcon = ( {isFavorite, setFavorite, fly_id} ) => {

    const toggleFavorite = () => {
        updateFavorite(!isFavorite)
        setFavorite(!isFavorite)
    }

    const updateFavorite = async(fav) => {
        const res = await fetch('http://localhost:4000/flies/' + fly_id + '/favorite', {
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
        <div style={{margin: 'auto'}}>
            {isFavorite ? <i className="fas fa-star" onClick={toggleFavorite}/> : <i className="far fa-star" onClick={toggleFavorite}/>}
        </div>
    )
}

FavoriteIcon.propTypes = {
    isFavorite: PropTypes.bool.isRequired,
    setFavorite: PropTypes.func.isRequired,
    fly_id: PropTypes.number.isRequired
}

export default FavoriteIcon