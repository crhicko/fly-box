import FlyDisplay from "../../components/FlyDisplay/FlyDisplay"
import { useEffect, useState } from "react"
import Loader from "../../util/Loader/Loader"
import './FliesPage.css'

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

    return(
      <section className="content-bounding-box">
        <input className="input-box fly-search-box" placeholder="Search...THIS DOES NOT WORK YET" type="search"></input>
        <div className="center-box  styled-scrollbar scrollable" style={{height: '100%'}}>

            {reqFinished ?
            (flies.length == 0 ? <p style={{ textAlign: 'center'}}>No Search Results Found</p> :
            <>
              <div className="fly-grid">
                {flies.map((f) => (<FlyDisplay key={f.id} fly={f}/>))}
              </div>
              <div style={{width: "100%", textAlign: 'center', margin:'20px 0'}}>

                {/* <button className="btn text-large load-more-btn">Load More</button> TEMP DISABLE*/}
              </div>
            </>
              ) :
            <Loader style={{textAlign: 'center', margin: 'auto'}}/>}
        </div>
      </section>
    )
}

export default FliesPage