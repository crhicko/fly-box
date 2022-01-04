import { useParams } from "react-router"
import { useEffect, useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import './FlyPage.css'
import Loader from "../util/Loader"

const FlyPage = () => {
    const [fly, setFly] = useState(null)
    const [favorite, setFavorite] = useState(false)

    const { id } = useParams()
    const user = useContext(UserContext)

    useEffect(() => {
        const getFly = async () => {
            const res = await fetch('http://localhost:4000/flies/' + id, {
                credentials: 'include'
            })
            const data = await res.json()
            console.log(data)
            setFly(data)
            console.log(data.is_favorite)
            if(data.is_favorite === true)
                setFavorite(true)
        }
        getFly()
    }, [])

    return (
        <div className="container">
            {fly ? <div className="topLevel">
                <div className="leftBox">
                    <img src="https://cdn11.bigcommerce.com/s-gozd41z4b7/images/stencil/1280x1280/products/456/1025/BH_Trip_Saver__92913.1574435303.jpg?c=1" alt="Fly Pic"/>
                    <div className="tagBox">
                        <span className="tag">Nymph</span>
                        <span className="tag">Nymph</span>
                        <span className="tag">Nymph</span>
                        <span className="tag">Nymph</span>
                        <span className="tag">Nymph</span>
                        <span className="tag">Nymph</span>
                        <span className="tag">Nymph</span>
                    </div>
                </div>
                <div className="info">
                    {favorite ? <i className="fas fa-star"/> : <i className="far fa-star"/>}
                    <h1>{fly.name}</h1>

                    <p className="description" >{fly.description}</p>
                </div>
            </div> :
            <Loader/>}
        </div>
    )
}

export default FlyPage