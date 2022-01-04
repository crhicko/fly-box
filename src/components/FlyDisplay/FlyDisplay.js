import './FlyDisplay.css'
import {  useState, useContext } from 'react'
import useDidUpdateEffect from '../../util/useDidUpdateEffect'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

const FlyDisplay = ({ fly }) => {

    const [favorite, setFavorite] = useState(false)

    const {user} = useContext(UserContext)
    const navigate = useNavigate();

    useDidUpdateEffect(() => {
        const postFavorite = async() => {
            const res = await fetch(`http://localhost:4000/flies/${fly.id}/favorite`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    set_favorite: favorite,
                    fly_id: fly.id
                })
            });
            const data = await res.json();
            console.log(data)
        }

        postFavorite()
    }, [favorite])

    return(
        <div className="card" onClick={() => navigate('/flies/' + fly.id)}>
            <img src="https://cdn11.bigcommerce.com/s-gozd41z4b7/images/stencil/1280x1280/products/456/1025/BH_Trip_Saver__92913.1574435303.jpg?c=1" alt="Fly Pic"/>
            <h1>{fly.name}</h1>
            <span className="tag">Nymph</span>
            <p>{fly.description}</p>
            {(fly.user_id === user?.id) && <button>Edit</button>}
            <button className={`${favorite ? 'favorite' : ''}`} onClick={() => setFavorite(!favorite)}>Favorite</button>
        </div>

    )
}


FlyDisplay.propTypes = {

}

export default FlyDisplay