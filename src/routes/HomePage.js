import FlyDisplay from "../components/FlyDisplay/FlyDisplay"
import { useEffect, useState } from "react"
import './HomePage.css'

const HomePage = () => {

    const [flies, setFlies] = useState([])

    useEffect(() => {
        const fetchFlies = async () => {
            const res = await fetch('http://localhost:4000/flies', {
                credentials: 'include'
            })
            const data = await res.json()
            console.log(data)
            setFlies(data)
        }

        fetchFlies()
    }, [])


    return (
        <div className="FlyContainer">
            {flies.map((fly) => (<FlyDisplay key={fly.id} fly={fly} />))}
        </div>
    )
}

export default HomePage