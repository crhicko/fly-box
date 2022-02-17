import { useParams } from "react-router"
import { useEffect, useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import './FlyPage.css'
import Loader from "../util/Loader/Loader"
import FavoriteIcon from "../components/FavoriteIcon/FavoriteIcon"
import Tag from "../components/Tag/Tag"

const FlyPage = () => {
    const [fly, setFly] = useState(null)
    const [favorite, setFavorite] = useState(false)
    const [isDeletePrompt, setIsDeletePrompt] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const navigate = useNavigate()

    const { id } = useParams()
    const { user } = useContext(UserContext)

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

    const deleteFly = async () => {
        setIsDeleting(true)
        const res = await fetch(process.env.REACT_APP_API_URL + '/flies/' + id, {
            credentials: 'include',
            method: 'delete'
        })
        const data = await res.json()
        setIsDeleting(false)
        console.log(data)
        navigate('/flies')
    }

    const deleteQuestion = () => {
        return(
            <div className='overlay' onClick={() => setIsDeletePrompt(false)} style={{textAlign: 'center'}}>
                <div className="rounded-box" onClick={(e) => {e.stopPropagation()}} style={{width: '200px', boxShadow: 'var(--box-shadow-standard)'}}>
                    {!isDeleting ?
                    <>
                        <h3 style={{margin: '0 0 .75em 0'}}>Are you sure you want to delete?</h3>
                        <br/>
                        <button className='btn btn-delete' onClick={deleteFly} >Delete</button>
                    </>
                    :
                    <Loader/>}
                </div>
            </div>
        )
    }

    return (
        <div className="rounded-box fly-content">
            {isDeletePrompt ? deleteQuestion() : null}
            {fly ? <div className="top-level">
                <div className="left-box">
                    <img src={fly.image_url} alt="Fly Pic"/>
                    <div className="tagBox">
                        {fly.tag_list && fly.tag_list.split(',').map((tag, index) => <Tag text={tag} key={index} interactable={false}/>)}
                    </div>
                </div>
                <div className="info">
                    <div className="iconBox">
                        {(fly.user_id === user?.id) && <i style={{height: '18px'}} className="button-icon fas fa-trash-alt" onClick={() => setIsDeletePrompt(true)}/>}
                        {(fly.user_id === user?.id) && <i className="button-icon fas fa-pencil-alt"/>}
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