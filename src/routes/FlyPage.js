import { useParams } from "react-router"
import { useEffect, useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import './FlyPage.css'
import Loader from "../util/Loader/Loader"
import FavoriteIcon from "../components/FavoriteIcon"
import Tag from "../components/Tag/Tag"

const FlyPage = () => {
    const [fly, setFly] = useState(null)
    const [favorite, setFavorite] = useState(false)

    const { id } = useParams()
    const user = useContext(UserContext)

    useEffect(() => {
        const getFly = async () => {
            const res = await fetch(process.env.REACT_APP_API_URL + '/flies/' + id, {
                credentials: 'include'
            })
            const data = await res.json()
            console.log(data)
            setFly(data)
            if(data.is_favorite === true)
                setFavorite(true)
        }
        getFly()
    }, [])

    return (
        <div className="rounded-box fly-content">
            {fly ? <div className="top-level">
                <div className="left-box">
                    <img src={fly.image_url} alt="Fly Pic"/>
                    {/* <img src="https://cdn11.bigcommerce.com/s-gozd41z4b7/images/stencil/1280x1280/products/456/1025/BH_Trip_Saver__92913.1574435303.jpg?c=1" alt="Fly Pic"/> */}
                    <div className="tagBox">
                        {fly.tag_list.split(',').map((tag, index) => <Tag text={tag} key={index} interactable={false}/>)}
                    </div>
                </div>
                <div className="info">
                    <div className="iconBox">
                        {(fly.user_id === user?.id) && <i className="far fa-edit"/>}
                        <FavoriteIcon isFavorite={favorite} setFavorite={setFavorite} fly_id={fly.id}/>
                    </div>
                    <h1>{fly.name}</h1>

                    <p className="description" >{fly.description}</p>
                </div>
            </div> :
            <Loader/>}
        </div>
    )
}

export default FlyPage