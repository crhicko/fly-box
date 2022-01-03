import './FlyDisplay.css'
import {  useState } from 'react'
import useDidUpdateEffect from '../../util/useDidUpdateEffect'

const FlyDisplay = ({ fly }) => {

    const [favorite, setFavorite] = useState(fly.fly_id)


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
        <div className="card">
            <img src="https://cdn11.bigcommerce.com/s-gozd41z4b7/images/stencil/1280x1280/products/456/1025/BH_Trip_Saver__92913.1574435303.jpg?c=1" alt="Fly Pic"/>
            <h1>{fly.name}</h1>
            <span className="tag">Nymph</span>
            <p>LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUMLOREM IPSUM vvvLOREM IPSUMLOREM IPSUM vv  vvvv vLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUMLOREM IPSUM</p>
            <button className={`${favorite ? 'favorite' : ''}`} onClick={() => setFavorite(!favorite)}>Favorite</button>
        </div>

    )
}

FlyDisplay.propTypes = {

}

export default FlyDisplay