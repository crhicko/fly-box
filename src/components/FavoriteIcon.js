import useDidUpdateEffect from "../util/useDidUpdateEffect"

const FavoriteIcon = ( {isFavorite, setFavorite, fly_id} ) => {

    const toggleFavorite = () => {
        setFavorite(!isFavorite)
    }


    useDidUpdateEffect(() => {
        const updateFavorite = async() => {
            const res = await fetch('http://localhost:4000/flies/' + fly_id + '/favorite', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    set_favorite: isFavorite
                })
            })
            console.log(await res.json())
        }
        updateFavorite()
    },[isFavorite])

    return (
        <div>
            {isFavorite ? <i className="fas fa-star" onClick={toggleFavorite}/> : <i className="far fa-star" onClick={toggleFavorite}/>}
        </div>
    )
}

export default FavoriteIcon