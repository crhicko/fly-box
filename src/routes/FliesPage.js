import AddFly from "../components/AddFly"
import Button from "../components/Button"
import FlyDisplay from "../components/FlyDisplay/FlyDisplay"
import { useEffect, useState } from "react"
import Loader from "../util/Loader/Loader"

const FliesPage = () => {
    const [flies, setFlies] = useState([])
    const [reqFinished , setReqFinished] = useState(false)

    useEffect(() => {

        const fetchFlies = async () => {
          setReqFinished(false)
          const res = await fetch(process.env.REACT_APP_API_URL + '/flies', {
            credentials: 'include'
          })
          const data = await res.json()

          setFlies(data)
          setReqFinished(true)
        }

        fetchFlies()
      }, [])


      const addFly = async (fly) => {
        console.log("posting")
        const res = await fetch(process.env.REACT_APP_API_URL + 'flies', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fly)
        });
        const data = await res.json();

        console.log(data)
      }

    return(
        <div className="rounded-box styled-scrollbar" style={{height: '100%', overflowY: "scroll"}}>
            {reqFinished ?
            (flies.length == 0 ? <p style={{ textAlign: 'center'}}>No Search Results Found</p> :
            <div className="fly-grid">
              {flies.map((f) => (<FlyDisplay key={f.id} fly={f}/>))}
            </div>
              ) :
            <Loader style={{textAlign: 'center', margin: 'auto'}}/>}
        </div>
    )
}

export default FliesPage